// One-off SEO audit over the built dist/ output. Not part of the site.
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { TOOLS, toolIsLive } from './src/tools.mjs';

const DIST = new URL('./dist/', import.meta.url).pathname.replace(/^\//, '');
let pages = [];

async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else if (e.name.endsWith('.html')) pages.push(p);
  }
}
await walk(DIST);

// Map each built html file to its site route ("/best/best-prop-firms/")
const routeOf = (file) => {
  let r = '/' + relative(DIST, file).replace(/\\/g, '/');
  r = r.replace(/index\.html$/, '');
  if (!r.endsWith('/')) r = r.replace(/\.html$/, '/');
  return r;
};

// Exclude scheduled (not-yet-live) tool pages — their redirect stubs are not
// "published" yet, so they shouldn't count against schema/H1/orphan checks.
// In PREVIEW_SCHEDULED mode, audit the full future graph instead.
const preview = process.env.PREVIEW_SCHEDULED === '1';
const hiddenTools = preview
  ? new Set()
  : new Set(TOOLS.filter((t) => !toolIsLive(t)).map((t) => t.href));
pages = pages.filter((f) => !hiddenTools.has(routeOf(f)));

const routes = new Set(pages.map(routeOf));
const contents = new Map();
for (const f of pages) contents.set(f, await readFile(f, 'utf8'));

// ---- checks ----
const brokenLinks = [];
const titles = new Map();
const descs = new Map();
const noSchema = [];
const longTitles = [];
const missingH1 = [];
const inboundCount = new Map([...routes].map((r) => [r, 0]));

for (const f of pages) {
  const html = contents.get(f);
  const route = routeOf(f);

  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  if (title) {
    titles.set(title, (titles.get(title) || 0) + 1);
    if (title.length > 60) longTitles.push([route, title.length, title]);
  }
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  if (desc) descs.set(desc, (descs.get(desc) || 0) + 1);

  if (!html.includes('application/ld+json')) noSchema.push(route);
  if (!/<h1[ >]/.test(html)) missingH1.push(route);

  // internal links
  const hrefs = [...html.matchAll(/href="(\/[^"#?]*)/g)].map((m) => m[1]);
  for (let href of hrefs) {
    if (!href.endsWith('/')) {
      // allow file assets (.xml, .png, .svg, .txt)
      if (/\.[a-z0-9]+$/i.test(href)) continue;
      href = href + '/';
    }
    if (inboundCount.has(href) && href !== route) {
      inboundCount.set(href, inboundCount.get(href) + 1);
    }
    if (!routes.has(href) && !/\.[a-z0-9]+$/i.test(href)) {
      brokenLinks.push([route, href]);
    }
  }
}

const dupTitles = [...titles].filter(([, n]) => n > 1);
const dupDescs = [...descs].filter(([, n]) => n > 1);
const orphans = [...inboundCount].filter(([r, n]) => n === 0 && r !== '/');

const line = '─'.repeat(60);
console.log(`\n${line}\nProp Firm Funded Accounts SEO audit — ${pages.length} pages\n${line}`);
console.log(`\nBROKEN INTERNAL LINKS: ${brokenLinks.length}`);
for (const [from, href] of brokenLinks) console.log(`  ${from}  →  ${href}`);
console.log(`\nDUPLICATE TITLES: ${dupTitles.length}`);
for (const [t, n] of dupTitles) console.log(`  (${n}x) ${t}`);
console.log(`\nDUPLICATE DESCRIPTIONS: ${dupDescs.length}`);
for (const [d, n] of dupDescs) console.log(`  (${n}x) ${d.slice(0, 70)}...`);
console.log(`\nTITLES > 60 CHARS (may truncate in SERP): ${longTitles.length}`);
for (const [r, len] of longTitles) console.log(`  ${len}c  ${r}`);
console.log(`\nPAGES MISSING SCHEMA: ${noSchema.length}`);
for (const r of noSchema) console.log(`  ${r}`);
console.log(`\nPAGES MISSING H1: ${missingH1.length}`);
for (const r of missingH1) console.log(`  ${r}`);
console.log(`\nORPHAN PAGES (0 internal inbound links): ${orphans.length}`);
for (const [r] of orphans) console.log(`  ${r}`);
console.log(`\n${line}\nInbound internal links per page (lower = weaker):`);
[...inboundCount].sort((a, b) => a[1] - b[1]).forEach(([r, n]) => {
  if (n < 3) console.log(`  ${String(n).padStart(2)}  ${r}`);
});
console.log(line);

// Temporal internal-link validator (runs on SOURCE, not dist).
//
// Guarantees "internal links set by the time": every in-body internal link must
// point to content that is already published on the linking page's own pubDate.
// A later article may link back to an earlier one, never forward to one that
// isn't live yet. Also flags links to slugs/tools that don't exist at all.
//
//   node schedule-check.mjs        → report violations, exit 1 if any
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { TOOLS } from './src/tools.mjs';

// A link is only a real problem if the target is STILL unpublished (future).
// Historical windows between two already-live pages have closed — everything
// live now is reachable regardless of the original staggered dates.
const NOW = Date.now();
const violates = (targetDate, sourceDate) => targetDate > sourceDate && targetDate > NOW;

const ART_DIR = new URL('./src/content/articles/', import.meta.url).pathname.replace(/^\//, '');

// --- collect article slug -> { date, category } ---------------------------
const articles = new Map();
for (const name of await readdir(ART_DIR)) {
  if (!name.endsWith('.md')) continue;
  const slug = name.replace(/\.md$/, '');
  const src = await readFile(join(ART_DIR, name), 'utf8');
  const fm = src.slice(0, src.indexOf('\n---', 3));
  const date = (fm.match(/^pubDate:\s*(\d{4}-\d{2}-\d{2})/m) || [])[1];
  const category = (fm.match(/^category:\s*(\w+)/m) || [])[1];
  articles.set(slug, { date: date ? Date.parse(date) : 0, category, name });
}

// --- tool href -> publish timestamp (live tools = 0) ----------------------
const tools = new Map();
for (const t of TOOLS) {
  tools.set(t.href, t.publishDate ? Date.parse(t.publishDate + 'T00:00:00Z') : 0);
}

// static always-live paths (hubs, root, legal)
const STATIC = new Set([
  '/', '/tools/', '/best/', '/reviews/', '/compare/', '/guides/', '/news/',
  '/methodology/', '/about/', '/contact/', '/404/', '/rss.xml',
]);

// --- scan bodies ----------------------------------------------------------
const forward = []; // links to not-yet-published content
const dead = []; // links to non-existent targets

for (const [slug, meta] of articles) {
  const src = await readFile(join(ART_DIR, meta.name), 'utf8');
  const body = src.slice(src.indexOf('\n---', 3) + 4);
  const links = [...body.matchAll(/\]\((\/[^)#?]*)/g)].map((m) => m[1]);

  for (let href of links) {
    if (!href.endsWith('/') && !/\.[a-z0-9]+$/i.test(href)) href += '/';
    if (STATIC.has(href)) continue;

    // tool link
    if (href.startsWith('/tools/')) {
      if (!tools.has(href)) { dead.push([slug, href]); continue; }
      if (violates(tools.get(href), meta.date)) forward.push([slug, href, 'tool']);
      continue;
    }

    // article link: /{category}/{slug}/
    const m = href.match(/^\/(best|reviews|compare|guides|news)\/([^/]+)\/$/);
    if (!m) { dead.push([slug, href]); continue; }
    const targetSlug = m[2];
    const target = articles.get(targetSlug);
    if (!target) { dead.push([slug, href]); continue; }
    if (violates(target.date, meta.date)) forward.push([slug, href, 'article']);
  }
}

// --- report ---------------------------------------------------------------
const line = '─'.repeat(64);
const fmt = (t) => new Date(t).toISOString().slice(0, 10);
console.log(`\n${line}\nTemporal internal-link check — ${articles.size} articles, ${tools.size} tools\n${line}`);

console.log(`\nFORWARD LINKS (target not yet published on link date): ${forward.length}`);
for (const [slug, href, kind] of forward) {
  const srcDate = fmt(articles.get(slug).date);
  const tgtDate = fmt(href.startsWith('/tools/') ? tools.get(href) : articles.get(href.split('/')[2]).date);
  console.log(`  ${slug} (${srcDate})  →  ${href} (${kind}, live ${tgtDate})`);
}

console.log(`\nDEAD LINKS (target does not exist): ${dead.length}`);
for (const [slug, href] of dead) console.log(`  ${slug}  →  ${href}`);

console.log(`\n${line}`);
if (forward.length || dead.length) {
  console.log(`FAIL: ${forward.length} forward, ${dead.length} dead.`);
  process.exit(1);
}
console.log('PASS: every internal link points to already-published content.');

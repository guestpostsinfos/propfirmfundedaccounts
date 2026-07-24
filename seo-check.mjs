// Deeper SEO checks over built dist/ HTML (supplements audit.mjs).
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

function walk(d) {
  let r = [];
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) r = r.concat(walk(p));
    else if (e.name.endsWith('.html')) r.push(p);
  }
  return r;
}
const pages = walk('dist');
const route = (f) => '/' + relative('dist', f).split('\\').join('/').replace(/index\.html$/, '');

const multiH1 = [], imgNoAlt = [], noCanon = [], descLong = [], descShort = [], descMissing = [],
  svgNoLabel = [], titleLong = [], titleShort = [], noOG = [];

for (const f of pages) {
  const h = readFileSync(f, 'utf8'), r = route(f);
  if (r === '/404/') continue;
  const h1 = (h.match(/<h1[ >]/g) || []).length;
  if (h1 > 1) multiH1.push(`${r} (${h1})`);
  for (const im of h.match(/<img\b[^>]*>/g) || []) if (!/\balt=/.test(im)) imgNoAlt.push(r);
  if (!/<link rel="canonical"/.test(h)) noCanon.push(r);
  if (!/<meta property="og:image"/.test(h)) noOG.push(r);
  const dm = h.match(/<meta name="description" content="([^"]*)"/);
  if (!dm) descMissing.push(r);
  else {
    const L = dm[1].length;
    if (L > 160) descLong.push(`${r} (${L})`);
    if (L < 70) descShort.push(`${r} (${L})`);
  }
  const tm = h.match(/<title>([^<]*)<\/title>/);
  if (tm) {
    const L = tm[1].length;
    if (L > 60) titleLong.push(`${r} (${L})`);
    if (L < 30) titleShort.push(`${r} (${L})`);
  }
  for (const sv of h.match(/<svg\b[^>]*>/g) || [])
    if (!/aria-label|role="img"/.test(sv)) svgNoLabel.push(r);
}

const show = (t, a) => {
  console.log(`\n${t}: ${a.length}`);
  [...new Set(a)].slice(0, 25).forEach((x) => console.log('  ' + x));
};
console.log(`Pages scanned: ${pages.length}`);
show('MULTIPLE H1 (should be 1 per page)', multiH1);
show('IMG WITHOUT ALT', imgNoAlt);
show('MISSING CANONICAL', noCanon);
show('MISSING OG:IMAGE', noOG);
show('DESCRIPTION MISSING', descMissing);
show('DESCRIPTION > 160 (may truncate)', descLong);
show('DESCRIPTION < 70 (too short)', descShort);
show('TITLE < 30 (too short)', titleShort);
show('SVG WITHOUT LABEL', svgNoLabel);
console.log(`\nTITLE > 60 count: ${new Set(titleLong).size} (soft — Google may truncate)`);

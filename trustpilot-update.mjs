// Weekly Trustpilot tracker updater.
//
// Scaffolds a fresh weekly snapshot in src/data/trustpilot.json so it can be
// filled with this week's REAL, search-verified figures. This is the manual
// equivalent of the news pipeline — the "checkreviews" workflow the user runs
// through Claude. It never invents numbers: it carries last week's values
// forward as editable placeholders and prints a checklist of each firm's
// Trustpilot page to re-read.
//
// Usage:
//   node trustpilot-update.mjs                 # scaffold the current week (Monday)
//   node trustpilot-update.mjs --week=2026-08-03   # scaffold a specific week
//   node trustpilot-update.mjs --check         # just print the fill-in checklist
//
// After scaffolding, update each firm's score/reviews/asOf and (for the newest
// week) dist/praise/complaints/take/sources with real data, then run:
//   npm run build && node audit.mjs && node seo-check.mjs
import { readFile, writeFile } from 'node:fs/promises';

const FILE = 'src/data/trustpilot.json';
const argv = process.argv.slice(2);
const weekArg = argv.find((a) => a.startsWith('--week='));
const checkOnly = argv.includes('--check');

function mondayOf(d) {
  const x = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = x.getUTCDay(); // 0=Sun
  x.setUTCDate(x.getUTCDate() + (day === 0 ? -6 : 1 - day));
  return x.toISOString().slice(0, 10);
}

const data = JSON.parse(await readFile(FILE, 'utf8'));
const today = new Date();
const todayIso = today.toISOString().slice(0, 10);
const week = weekArg ? weekArg.split('=')[1] : mondayOf(today);

const line = '─'.repeat(64);
const checklist = () => {
  console.log(`\n${line}\nFill each firm's REAL Trustpilot figures for week ${week}:\n${line}`);
  for (const f of data.firms) {
    console.log(`\n  ${f.name}  (${f.market})`);
    console.log(`    ${f.trustpilotUrl}`);
    console.log(`    → score (x/5), reviews (total), asOf, dist, 5 praise, 5 complaints, take`);
  }
  console.log(`\n${line}`);
  console.log('Reminder: ratings/counts must be REAL & verifiable. praise/complaints are');
  console.log('recurring THEMES from the review corpus — never fabricated verbatim reviews.');
  console.log(line);
};

if (checkOnly) {
  checklist();
  process.exit(0);
}

if (data.weeks.some((w) => w.weekOf === week)) {
  console.error(`Week ${week} already exists in ${FILE}. Edit it directly, or pass --week=YYYY-MM-DD for a different week.`);
  process.exit(1);
}

const last = data.weeks[data.weeks.length - 1];
const snapshots = {};
for (const f of data.firms) {
  const prev = (last && last.snapshots[f.slug]) || {};
  snapshots[f.slug] = {
    score: prev.score ?? null, // carried forward — REPLACE with this week's real score
    reviews: prev.reviews ?? null, // carried forward — REPLACE with this week's real count
    asOf: todayIso,
    dist: null,
    praise: [],
    complaints: [],
    take: '',
    sources: [],
  };
}

data.weeks.push({ weekOf: week, snapshots });
data.updated = todayIso;
await writeFile(FILE, JSON.stringify(data, null, 2) + '\n');

console.log(`✓ Scaffolded week ${week} in ${FILE} (values carried forward from ${last ? last.weekOf : 'none'} — replace with real data).`);
checklist();

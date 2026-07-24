// Shared loader for the Trustpilot weekly tracker. Reads trustpilot.json and
// derives week-over-week deltas + re-ranking so the pages stay dumb.
//
// Ranking rule (matches the product spec): firms are ranked by current
// TrustScore (desc), tie-broken by review volume. A firm whose score rose since
// last week rises in rank and is flagged ▲ "rising"; a firm whose score fell
// drops and is flagged ▼ "falling". Review-count momentum is a secondary signal.
import data from './trustpilot.json';

export const UPDATED = data.updated;
export const FIRMS = data.firms;
export const WEEKS = data.weeks; // chronological, oldest → newest

export const firmBySlug = (slug) => FIRMS.find((f) => f.slug === slug);

export const latestWeek = () => WEEKS[WEEKS.length - 1] || null;
export const priorWeek = () => (WEEKS.length > 1 ? WEEKS[WEEKS.length - 2] : null);

const round2 = (n) => Math.round(n * 100) / 100;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Human label for a Monday ISO date, e.g. "Jul 20, 2026". */
export function weekLabel(weekOf) {
  const d = new Date(weekOf + 'T00:00:00Z');
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** Label a snapshot's `asOf`, which may be a full date, "YYYY-MM", or free text. */
export function asOfLabel(asOf) {
  if (!asOf) return '';
  const full = /^(\d{4})-(\d{2})-(\d{2})$/.exec(asOf);
  if (full) return `${MONTHS[+full[2] - 1]} ${+full[3]}, ${full[1]}`;
  const ym = /^(\d{4})-(\d{2})$/.exec(asOf);
  if (ym) return `${MONTHS[+ym[2] - 1]} ${ym[1]}`;
  return asOf;
}

/** Rank a set of {slug, score, reviews} rows: score desc, then reviews desc. */
function rankBy(rows, scoreKey, reviewsKey) {
  return [...rows]
    .filter((r) => r[scoreKey] != null)
    .sort(
      (a, b) => b[scoreKey] - a[scoreKey] || (b[reviewsKey] ?? 0) - (a[reviewsKey] ?? 0),
    )
    .map((r, i) => [r.slug, i + 1]);
}

/**
 * Full leaderboard for the latest week, sorted best → worst, each row carrying:
 *   score, reviews, prevScore, prevReviews, scoreDelta, reviewsDelta,
 *   rank, prevRank, rankDelta (+ = moved up), trend ('up'|'down'|'steady'|'new'),
 *   plus the raw snapshot (praise/complaints/take/dist/sources).
 */
export function leaderboard() {
  const cur = latestWeek();
  const prev = priorWeek();
  if (!cur) return [];

  const rows = FIRMS.map((f) => {
    const s = cur.snapshots[f.slug] || {};
    const p = prev ? prev.snapshots[f.slug] || {} : {};
    const score = s.score ?? null;
    const reviews = s.reviews ?? null;
    const prevScore = p.score ?? null;
    const prevReviews = p.reviews ?? null;
    return {
      ...f,
      snapshot: s,
      score,
      reviews,
      prevScore,
      prevReviews,
      scoreDelta: score != null && prevScore != null ? round2(score - prevScore) : null,
      reviewsDelta: reviews != null && prevReviews != null ? reviews - prevReviews : null,
    };
  });

  const curRank = new Map(rankBy(rows, 'score', 'reviews'));
  const prevRank = new Map(rankBy(rows, 'prevScore', 'prevReviews'));

  for (const r of rows) {
    r.rank = curRank.get(r.slug) ?? null;
    r.prevRank = prevRank.get(r.slug) ?? null;
    r.rankDelta = r.rank != null && r.prevRank != null ? r.prevRank - r.rank : null;
    r.trend =
      r.scoreDelta == null
        ? 'new'
        : r.scoreDelta > 0
          ? 'up'
          : r.scoreDelta < 0
            ? 'down'
            : 'steady';
  }

  return rows.sort((a, b) => {
    if (a.rank == null) return 1;
    if (b.rank == null) return -1;
    return a.rank - b.rank;
  });
}

/** Per-firm rating history across every tracked reading (oldest → newest). */
export function historyFor(slug) {
  return WEEKS.map((w) => {
    const snap = w.snapshots[slug];
    if (!snap || snap.score == null) return null;
    return {
      weekOf: w.weekOf,
      label: snap.asOf ? asOfLabel(snap.asOf) : weekLabel(w.weekOf),
      score: snap.score,
      reviews: snap.reviews ?? null,
    };
  }).filter(Boolean);
}

/** Biggest TrustScore riser and faller vs the previous reading (null if none). */
export function topMovers() {
  const board = leaderboard();
  const moved = board.filter((r) => r.scoreDelta != null && r.scoreDelta !== 0);
  const risers = moved.filter((r) => r.scoreDelta > 0).sort((a, b) => b.scoreDelta - a.scoreDelta);
  const fallers = moved.filter((r) => r.scoreDelta < 0).sort((a, b) => a.scoreDelta - b.scoreDelta);
  return {
    riser: risers[0] || null,
    faller: fallers[0] || null,
  };
}

/** Headline figures across all firms for the hub summary strip. */
export function marketSummary() {
  const board = leaderboard().filter((r) => r.score != null);
  const n = board.length || 1;
  const avg = round2(board.reduce((s, r) => s + r.score, 0) / n);
  const totalReviews = board.reduce((s, r) => s + (r.reviews ?? 0), 0);
  const topRated = [...board].sort((a, b) => b.score - a.score || (b.reviews ?? 0) - (a.reviews ?? 0))[0] || null;
  return { avg, totalReviews, topRated, count: board.length };
}

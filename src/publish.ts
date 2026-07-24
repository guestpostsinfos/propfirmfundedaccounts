// Scheduled-publishing gate. Content with a future `pubDate` is written to the
// repo now but stays hidden until its date arrives. A daily rebuild (see
// .github/workflows/scheduled-publish.yml) re-evaluates NOW so due posts and
// tools go live automatically with no manual push.
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

// Build-time "now". Allow an override for previewing scheduled content locally:
//   PREVIEW_SCHEDULED=1 npm run build   → shows everything regardless of date.
// Read from process.env (Node build context) since Vite doesn't surface
// arbitrary shell vars through import.meta.env.
export const PREVIEW =
  typeof process !== 'undefined' && process.env?.PREVIEW_SCHEDULED === '1';
export const NOW = Date.now();

/** True if a date has arrived (or preview mode is on). */
export const isLive = (date: Date): boolean => PREVIEW || date.valueOf() <= NOW;

/** For date-gated standalone pages (tools): true while still hidden. */
export const beforePublish = (iso: string): boolean =>
  !PREVIEW && Date.now() < Date.parse(iso);

type ArticleData = CollectionEntry<'articles'>['data'];

/** Published, non-draft, already-due articles — newest first. Optional extra filter. */
export async function livePosts(extra?: (data: ArticleData) => boolean) {
  return (
    await getCollection(
      'articles',
      ({ data }) => !data.draft && isLive(data.pubDate) && (extra ? extra(data) : true),
    )
  ).sort(
    (a, b) =>
      (b.data.updatedDate ?? b.data.pubDate).valueOf() -
      (a.data.updatedDate ?? a.data.pubDate).valueOf(),
  );
}

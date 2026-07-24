// Scaffold a news post from a tweet — no API keys required.
//   node news-new.mjs <tweetUrl> <handle> "<Firm Name>" "<Headline>"
// Creates a DRAFT markdown file in src/content/articles/ with the tweet
// embedded and placeholders to fill in. Set draft:false when it's ready.
//
// Example:
//   node news-new.mjs https://x.com/FTMO_com/status/123 FTMO_com "FTMO" "FTMO cuts Phase 1 target to 8%"
import { writeFile } from 'node:fs/promises';

const [, , tweetUrl, handleArg, nameArg, ...titleParts] = process.argv;
if (!tweetUrl || !handleArg || !titleParts.length) {
  console.error('Usage: node news-new.mjs <tweetUrl> <handle> "<Firm Name>" "<Headline>"');
  process.exit(1);
}

const handle = handleArg.startsWith('@') ? handleArg : '@' + handleArg;
const name = nameArg || handle;
const title = titleParts.join(' ');
const today = new Date().toISOString().slice(0, 10);
const slug =
  'news-' +
  today +
  '-' +
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50);

const md = `---
title: ${JSON.stringify(title)}
description: "TODO 120-160 char summary of what ${name} announced and why it matters to traders."
category: news
pubDate: ${today}
directAnswer: "TODO 40-60 word plain-English summary of the announcement and its practical impact for prop firm traders."
source:
  tweetUrl: ${JSON.stringify(tweetUrl)}
  handle: ${JSON.stringify(handle)}
  name: ${JSON.stringify(name)}
takeaways:
  - "TODO key point 1"
  - "TODO key point 2"
draft: true
---

TODO: Write the news post. Summarise what ${name} announced in the embedded tweet
above, then add the context traders actually need — what changes, who it affects,
and what to do about it. Link to relevant guides/reviews. Keep it factual and tied
to the source; do not add claims the tweet does not support.
`;

const path = `src/content/articles/${slug}.md`;
await writeFile(path, md, { flag: 'wx' }).catch((e) => {
  if (e.code === 'EEXIST') {
    console.error(`Already exists: ${path}`);
    process.exit(1);
  }
  throw e;
});
console.log(`Created draft: ${path}`);
console.log('Fill in the TODOs, then set draft:false to publish on the next build.');

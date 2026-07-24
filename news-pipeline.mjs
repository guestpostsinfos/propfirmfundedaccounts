// Auto news pipeline: fetch new tweets from official prop firm accounts,
// convert the newsworthy ones into news posts (with the tweet embedded), and
// write them into src/content/articles/. A scheduled GitHub Action commits the
// results, which triggers the site rebuild.
//
// REQUIRES two secrets (set as env vars):
//   X_BEARER_TOKEN     — X/Twitter API v2 bearer token (paid tier)
//   ANTHROPIC_API_KEY  — for turning tweets into informative news
//
// Optional env:
//   NEWS_MODEL=claude-haiku-4-5   — cheaper model (default: claude-opus-4-8)
//   NEWS_AUTO_PUBLISH=1           — publish immediately (default: draft for review)
//   NEWS_MAX_PER_RUN=5            — cap posts created per run (default 5)
//
// Design choices (deliberate, see NEWS-AUTOMATION.md):
//   • Only *newsworthy* tweets become posts (rule changes, launches, payouts,
//     outages…) — not promos/giveaways/memes. Turning every tweet into a page
//     is scaled-content spam and hurts SEO.
//   • New posts default to draft:true for a human review gate.
//   • The real tweet is embedded and cited — nothing is fabricated.
import { readFile, writeFile, readdir } from 'node:fs/promises';

const X_TOKEN = process.env.X_BEARER_TOKEN;
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.NEWS_MODEL || 'claude-opus-4-8';
const AUTO_PUBLISH = process.env.NEWS_AUTO_PUBLISH === '1';
const MAX_PER_RUN = parseInt(process.env.NEWS_MAX_PER_RUN || '5', 10);
const ART_DIR = 'src/content/articles';
const STATE_FILE = 'news-state.json';

if (!X_TOKEN || !ANTHROPIC_KEY) {
  console.error('Missing X_BEARER_TOKEN and/or ANTHROPIC_API_KEY — pipeline is dormant.');
  console.error('See NEWS-AUTOMATION.md for setup. Exiting without changes.');
  process.exit(process.env.CI ? 0 : 1);
}

// Newsworthiness heuristics — a tweet must match NEWS and not match SKIP.
const NEWS_RE =
  /\b(announc\w*|launch\w*|introduc\w*|new rule|rule change|updat\w*|now (?:available|live)|chang\w*|payout\w*|withdraw\w*|drawdown|scaling|maintenance|outage|restored|discontinu\w*|clos(?:ing|ed)|shut ?down|acquir\w*|partner\w*|regulat\w*|pricing|profit split|evaluation|challenge rules?)\b/i;
const SKIP_RE =
  /\b(giveaway|retweet to win|rt (?:&|and) follow|tag \d|discount code|promo code|% ?off|coupon|flash sale|sale ends|good luck|happy (?:friday|weekend))\b/i;

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 50);

async function loadState() {
  try {
    return JSON.parse(await readFile(STATE_FILE, 'utf8'));
  } catch {
    return { processed: [] };
  }
}

async function xGet(path) {
  const res = await fetch('https://api.twitter.com/2/' + path, {
    headers: { Authorization: `Bearer ${X_TOKEN}` },
  });
  if (!res.ok) throw new Error(`X API ${res.status} on ${path}: ${await res.text()}`);
  return res.json();
}

async function recentTweets(handle) {
  const user = await xGet(`users/by/username/${handle}`);
  const id = user?.data?.id;
  if (!id) return [];
  const tl = await xGet(
    `users/${id}/tweets?max_results=10&exclude=retweets,replies&tweet.fields=created_at`,
  );
  return (tl.data || []).map((t) => ({
    id: t.id,
    text: t.text,
    createdAt: t.created_at,
    url: `https://x.com/${handle}/status/${t.id}`,
  }));
}

const NEWS_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['title', 'description', 'directAnswer', 'takeaways', 'body'],
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    directAnswer: { type: 'string' },
    takeaways: { type: 'array', items: { type: 'string' } },
    body: { type: 'string' },
  },
};

async function writeNews(firm, handle, tweet) {
  const system =
    'You are a prop-firm trading news editor. You are given a single tweet from an official prop firm account. ' +
    'Write a short, factual news post based ONLY on the tweet — never invent facts, numbers, dates, or claims it does not state. ' +
    'If the tweet is vague, keep the post appropriately hedged. Audience: prop firm traders. Tone: neutral, informative, no hype. ' +
    'Return JSON only. Fields: title (<=65 chars, includes the firm name), description (120-160 chars), ' +
    'directAnswer (40-60 words summarising what was announced and its practical impact), ' +
    'takeaways (2-4 short bullet strings), body (200-350 words of markdown; explain what changed and what it means for traders; ' +
    'do NOT restate the tweet verbatim and do NOT include the tweet embed — that is added automatically).';
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1500,
      system,
      output_config: { effort: 'low', format: { type: 'json_schema', schema: NEWS_SCHEMA } },
      messages: [
        {
          role: 'user',
          content: `Firm: ${firm}\nHandle: @${handle}\nTweet: """${tweet.text}"""`,
        },
      ],
    }),
  });
  if (!res.ok) throw new Error(`Anthropic ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const text = (data.content || []).map((b) => b.text || '').join('');
  const out = JSON.parse(text);

  const today = tweet.createdAt ? tweet.createdAt.slice(0, 10) : new Date().toISOString().slice(0, 10);
  const slug = `news-${today}-${slugify(out.title)}`;
  const md = `---
title: ${JSON.stringify(out.title)}
description: ${JSON.stringify(out.description.slice(0, 168))}
category: news
pubDate: ${today}
directAnswer: ${JSON.stringify(out.directAnswer)}
source:
  tweetUrl: ${JSON.stringify(tweet.url)}
  handle: ${JSON.stringify('@' + handle)}
  name: ${JSON.stringify(firm)}
takeaways:
${out.takeaways.map((t) => `  - ${JSON.stringify(t)}`).join('\n')}
draft: ${AUTO_PUBLISH ? 'false' : 'true'}
---

${out.body.trim()}
`;
  const path = `${ART_DIR}/${slug}.md`;
  await writeFile(path, md, { flag: 'wx' });
  return path;
}

// --- run ------------------------------------------------------------------
const { accounts } = JSON.parse(await readFile('news-accounts.json', 'utf8'));
const state = await loadState();
const seen = new Set(state.processed);
const existing = new Set(await readdir(ART_DIR));
let created = 0;

for (const acc of accounts) {
  if (!acc.enabled || created >= MAX_PER_RUN) continue;
  let tweets = [];
  try {
    tweets = await recentTweets(acc.handle);
  } catch (e) {
    console.error(`skip ${acc.handle}: ${e.message}`);
    continue;
  }
  for (const t of tweets) {
    if (created >= MAX_PER_RUN) break;
    if (seen.has(t.id)) continue;
    seen.add(t.id); // mark seen regardless, so we don't re-evaluate next run
    if (t.text.length < 40 || !NEWS_RE.test(t.text) || SKIP_RE.test(t.text)) continue;
    try {
      const path = await writeNews(acc.name, acc.handle, t);
      console.log(`+ ${path}`);
      created++;
    } catch (e) {
      console.error(`failed ${acc.handle}/${t.id}: ${e.message}`);
    }
  }
}

state.processed = [...seen].slice(-500); // keep last 500 ids
await writeFile(STATE_FILE, JSON.stringify(state, null, 2) + '\n');
console.log(`Done. Created ${created} ${AUTO_PUBLISH ? 'published' : 'draft'} post(s).`);

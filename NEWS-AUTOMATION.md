# Prop Firm News Automation

Turn official prop firm tweets into informative, tweet-embedded news posts on the
site. There are two ways to run it — a manual/assisted path that works today with
no paid APIs, and a fully-automated pipeline that needs two API keys.

---

## What's built

| Piece | What it does | Needs keys? |
|-------|--------------|-------------|
| **Tweet embed** (`source` frontmatter) | Any news post with a `source.tweetUrl` embeds the real tweet + a cited source link, and is marked up as `NewsArticle` schema | No |
| **`news-new.mjs`** | Scaffolds a draft news post from a tweet URL for you to fill in | No |
| **`news-accounts.json`** | The official accounts to follow | No |
| **`news-pipeline.mjs`** | Fetches new tweets → converts newsworthy ones to posts → embeds the tweet | **Yes** (X + Anthropic) |
| **`.github/workflows/news-pipeline.yml`** | Runs the pipeline every 6h and commits results | **Yes** |

The tweet is always **embedded and cited** — the pipeline summarises the real
post, it never fabricates a tweet or invents facts.

---

## The honest constraints (read before enabling the auto pipeline)

1. **Reading tweets needs the paid X/Twitter API v2.** There is no free/reliable
   way to poll tweets. You supply `X_BEARER_TOKEN` (Basic tier ~$100/mo).
2. **"Convert to news" runs an LLM in CI** — you supply `ANTHROPIC_API_KEY`. Cost
   is a few cents per post; set `NEWS_MODEL=claude-haiku-4-5` to cut it further.
3. **⚠️ Don't auto-publish *every* tweet.** Promos, giveaways and memes turned into
   individual pages are thin, low-value content that Google's *scaled-content-abuse*
   spam policy targets — and they dilute the topical authority the rest of the site
   builds. So the pipeline **only** converts genuinely newsworthy tweets (rule
   changes, launches, payouts, outages, pricing, regulation) and **skips**
   giveaways/promos. New posts default to **draft** for a quick human review.

---

## Path A — manual / assisted (works now, no keys)

Best for quality. When a firm posts something newsworthy:

```bash
node news-new.mjs "https://x.com/FTMO_com/status/123" FTMO_com "FTMO" "FTMO cuts Phase 1 target to 8%"
```

This creates `src/content/articles/news-YYYY-MM-DD-<slug>.md` as a **draft** with
the tweet already embedded and TODO placeholders. Fill in the summary (or paste the
tweet to Claude and ask for a draft), set `draft: false`, commit — it publishes on
the next build. The embed renders the real tweet automatically.

---

## Path B — fully automated (needs two keys)

### One-time setup
1. Get an **X API v2 bearer token** (paid tier) → add repo secret `X_BEARER_TOKEN`.
2. Add repo secret `ANTHROPIC_API_KEY`.
   *(GitHub → Settings → Secrets and variables → Actions → New repository secret.)*
3. **Verify the handles** in `news-accounts.json` against each firm's real verified
   account. Wrong handles just fetch nothing; set `enabled: false` to skip any.
4. (Optional) repo *variables*: `NEWS_MODEL` (e.g. `claude-haiku-4-5`),
   `NEWS_AUTO_PUBLISH=1` to skip the draft gate.

### How it runs
The `news-pipeline.yml` workflow fires every 6 hours (and on-demand via **Actions →
News pipeline → Run workflow**). Each run:
1. Fetches recent tweets (excluding retweets/replies) from each enabled account.
2. Keeps only **newsworthy** tweets (keyword filter, skips promos/giveaways) it
   hasn't seen before (`news-state.json` tracks processed IDs).
3. Sends each to Claude to write a factual, tweet-grounded post (title, summary,
   takeaways, body) — capped at `NEWS_MAX_PER_RUN` (default 5) per run.
4. Writes the markdown with the tweet embedded, validates links with
   `schedule-check.mjs`, commits, and pushes → the site rebuilds → posts go live.

Until the two secrets exist, the job exits cleanly and changes nothing.

### Recommended: keep the review gate
Leave `NEWS_AUTO_PUBLISH` unset so new posts land as `draft:true`. Skim them, set
`draft:false` on the good ones, delete the rest. This keeps quality high and avoids
publishing an inaccurate take on a firm's tweet. Flip to `NEWS_AUTO_PUBLISH=1` only
once you trust the output.

---

## How a news post embeds a tweet

Add a `source` block to any `news` article's frontmatter:

```yaml
category: news
source:
  tweetUrl: "https://x.com/FTMO_com/status/123456789"
  handle: "@FTMO_com"
  name: "FTMO"
```

The Article layout renders the official X embed (via `platform.twitter.com/widgets.js`,
loaded only on posts that have a tweet), a cited source link for crawlers, and
`NewsArticle` JSON-LD. If the tweet is later deleted, the embed degrades to the
source link — nothing breaks.

---

## A note on ethics & SEO
- **Attribution:** every post embeds and links the original tweet as its source.
- **No fabrication:** the LLM is constrained to summarise the real tweet only.
- **Quality over volume:** newsworthiness filter + draft gate keep the site from
  becoming an auto-generated tweet mill, which protects both readers and rankings.

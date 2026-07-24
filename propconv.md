# Prop Firm Funded Accounts — Build Conversation Log

A record of the full conversation and work done building the **Prop Firm Funded Accounts**
site (propfirmfundedaccounts.com).

---

## 1. Initial request

**User:** Wanted to create an informative website in the prop firm niche that would become a
top prop firm site within 1 month, rank on all popular prop firm keywords, follow updated
semantic SEO, be optimized for SEO + AI chatbots + AEO, have high engagement and popular
ranking articles (comparisons etc.), be resilient to Google updates, and be seen by Google as
highly valuable / a top expert deserving the highest SERP position. Also wanted comparisons and
things that grab high traffic from prop firm users.

**Assistant approach:** Researched the current (July 2026) prop firm market via web search, then
built a production-ready static site with Astro, focused on genuine E-E-A-T and semantic SEO
rather than tricks. Was honest that no site can guarantee #1 in 30 days.

### Market research captured (July 2026)
- **FTMO:** 2-Step ~$619 / 1-Step ~$579 at 100K; range $155–$1,080. Phase 1 target cut 10%→8%
  in 2026. New **0.5–1% risk-per-trade cap** on funded accounts. 80→90% split. $500M+ paid
  since 2015. Fee refunded with first payout.
- **FundedNext:** ~$129–$449. Pays **15% of evaluation-phase profits even if you fail**. Up to
  95% split, scaling to $4M. Founded 2022.
- **FundingPips:** from ~$129. 1-step/2-step/instant. 3–5% daily / 6–10% max drawdown. 60–100%
  split. Founded 2022.
- **Topstep (futures):** $49+/mo + $149 activation. 100% of first $10K then 90/10. Consistency
  Score. Since 2012.
- **Apex (futures):** **March 1 2026 overhaul** — one-time pricing, EOD/intraday drawdown choice,
  MAE rule removed, 50% consistency rule. 100% of first $25K. Trailing drawdown.
- **The5ers:** since 2016, level/scaling system to 100% split.
- **Industry:** ~80–100 firms shut down 2024–early 2026 (MyFundedFX Feb 2026, FundingTicks Dec
  2025, True Forex Funds 2024 ~$1.2M unpaid, The Funded Trader ~10% denial rate). CFTC/FCA/ASIC
  moving toward registration requirements.

---

## 2. Site built (Astro static site)

### Tech / infrastructure
- **Astro 5** static build, `@astrojs/sitemap` + `@astrojs/rss`, `trailingSlash: 'always'`.
- Central identity in `src/consts.ts` (SITE, AUTHOR, NAV, CATEGORIES).
- Content collection (`src/content.config.ts`) with rich frontmatter: `directAnswer`,
  `takeaways`, `faqs`, `review` (firm/rating/pros/cons), dates, draft flag.
- `Base.astro` layout: full meta, canonical, OG/Twitter tags, OG image, article date tags, and
  Organization + WebSite JSON-LD sitewide.
- `Article.astro`: breadcrumbs, direct-answer box, review verdict box, takeaways, FAQ accordion,
  author box, related articles, and Article + Review + FAQPage + BreadcrumbList JSON-LD.
- `Tool.astro`: WebApplication + BreadcrumbList + FAQPage schema for calculators.
- Design system in `src/styles/global.css` (dark-on-light editorial, brand green #0d6b5c / gold
  #c8871a). ~17KB pages, near-zero JS except calculators.
- robots.txt open to GPTBot/ClaudeBot/PerplexityBot (AEO). Sitemap, RSS, favicon, 404 page.

### Pages / routes
- Home, category hubs (`/best/`, `/reviews/`, `/compare/`, `/guides/`, `/news/`, `/tools/`),
  article route, `/about/`, `/methodology/` (public weighted scoring), `/contact/`, `/404/`.

### Scoring methodology (public, E-E-A-T)
Payout reliability 35% · Rule fairness 25% · Real cost 15% · Platform & execution 15% ·
Stability & transparency 10%.

---

## 3. Content written (22 articles)

**Reviews:** FTMO, FundedNext, FundingPips, Topstep, The5ers, Apex Trader Funding.
**Comparisons:** FTMO vs FundedNext, Topstep vs Apex, FTMO Alternatives.
**Best-of:** Best Prop Firms, Best Futures Prop Firms, Cheapest Prop Firms, Best for Beginners,
Best Instant Funding.
**Guides:** What Is a Prop Firm, How to Pass a Challenge, Drawdown Explained, Are Prop Firms
Legit, 1-Step vs 2-Step, Consistency Rules, How Prop Firms Make Money, Payout Methods.
**News:** Prop Firm Rule Changes July 2026 (seeded the /news/ hub, monthly cadence).

Every article: 40–60 word direct-answer box (snippet/AEO target), question-format H2s, comparison
tables, 4–6 self-contained FAQs, dense pillar↔sibling↔tool interlinking.

---

## 4. Interactive tools (5 calculators, client-side, no signup)

- **Position Size Calculator** — lot size + daily-loss survival verdict, forex/gold/index presets.
- **Challenge Pass Probability Simulator** — 20,000-run Monte Carlo of win rate / RR / sizing vs
  real drawdown + target rules; pass %, breach %, expected attempts.
- **Drawdown & Breach Calculator** — exact breach prices, static + trailing modes.
- **True Challenge Cost Calculator** — fee ÷ pass rate = expected spend, cumulative odds table.
- **Profit Split & Payout Calculator** — take-home incl. futures 100%-bands + fee refunds.

Tools hub at `/tools/`; linked from nav, footer, homepage, and contextually from articles.

---

## 5. SEO audit + polish

Wrote `audit.mjs` (parses built `dist/` HTML). Final result:
- Broken internal links: **0**
- Duplicate titles: **0** · Duplicate descriptions: **0**
- Missing schema: **0** · Missing H1: **0**
- Orphan pages: **1** (the intentional `/404/`)

Fixes applied:
- **Staggered dates** — removed the identical `updatedDate` on all posts; pillar content spread
  across Jul 5–13, the 9 newest articles have no `updatedDate` (avoids the manipulation
  footprint). In-body "verified" dates synced.
- Added `article:published_time` / `article:modified_time` OG tags.
- Generated a 1200×630 `og-default.png` share image; wired `og:image` + `twitter:image` sitewide.
- Added branded 404 page; seeded /news/ to remove the orphan hub.
- Trimmed over-length `<title>` tags (dropped redundant brand suffix on long titles).

---

## 6. Rebrand → Prop Firm Funded Accounts

Renamed sitewide from the placeholder "PropVerdict" to **Prop Firm Funded Accounts** and domain
**propfirmfundedaccounts.com**: consts, astro.config, logo, footer heading, contact email
(research@propfirmfundedaccounts.com), robots.txt sitemap, package name, tool metaTitles,
homepage title, CSS comment, internal docs, and a regenerated two-line OG image. Rebuild + audit
re-confirmed clean; no old-brand strings remain in output. 39 pages total.

---

## 7. GitHub

Committed and pushed (public):
**https://github.com/guestpostsinfos/propfirmfundedaccounts** — branch `main`, 57 files.
`.gitignore` excludes `dist/`, `.astro/`, `node_modules/`, env files.

---

## 8. Deployment status & what's left for the user

**Could not deploy headlessly** — Cloudflare/Netlify/Vercel need interactive OAuth login (no API
token was set). **Nameservers cannot be provided in advance** — Cloudflare assigns them per-account
only after you add the domain as a site.

### Finish deploy (Cloudflare Pages)
1. dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git → pick
   `propfirmfundedaccounts`.
2. Framework: **Astro** · Build: `npm run build` · Output: `dist` · (env `NODE_VERSION=20` if
   needed) → **Save and Deploy** → live `*.pages.dev` URL in ~2 min; auto-deploys on push.

### Nameservers + custom domain
1. Cloudflare → **Add a site** → `propfirmfundedaccounts.com` → Free plan.
2. Cloudflare shows **two account-specific nameservers** (e.g. `xxxx.ns.cloudflare.com` /
   `yyyy.ns.cloudflare.com`).
3. At your registrar, replace existing nameservers with those two (propagation minutes–24h).
4. Pages project → Custom domains → add apex + www; HTTPS issues automatically.

Full written guide: `DEPLOY.md`. Growth/topical plan: `STRATEGY.md`.

### Recommended before going live
- Replace the placeholder `AUTHOR` in `src/consts.ts` with a real person + photo + LinkedIn
  (biggest E-E-A-T lever).
- Fact-check firm numbers and add first-hand dashboard/payout screenshots.
- Submit sitemap to Google Search Console **and** Bing Webmaster Tools (Bing feeds ChatGPT/Copilot).

### Alternative offered
If the user provides a **Cloudflare API token** (env var), the assistant can install Wrangler and
deploy directly without dashboard clicks.

---

## Honest framing given throughout
A new domain cannot outrank aged competitors on head terms ("best prop firms") in ~30 days. What
this build maximizes: fast long-tail rankings, AI-engine citations (no domain-age penalty), and a
compounding topical-authority foundation for head-term rankings at months 3–6 — contingent on the
off-site work (real author identity, backlinks, consistent publishing) in STRATEGY.md.

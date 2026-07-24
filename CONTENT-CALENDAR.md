# 6-Month Content Calendar & Topical Authority Plan

The auto-publishing schedule for Prop Firm Funded Accounts, July 2026 → January 2027.
Content is written now with a future `pubDate` / `publishDate`; a daily Cloudflare rebuild
(`.github/workflows/scheduled-publish.yml`) flips each item live on its date. Internal links are
**time-correct**: every in-body link points only to content already published on the linking
page's own date, enforced by `node schedule-check.mjs`.

---

## Semantic authority architecture

The site is a hub-and-spoke topical map. Four pillars, each with a supporting cluster that links
up to the pillar and across to siblings and tools. Density of *relevant* interlinks — surfaced
automatically by the related-articles module, category hubs and homepage, plus hand-written
in-body links — is what builds topical authority.

| Pillar (hub) | Cluster covers |
|--------------|----------------|
| **Best Prop Firms** (`/best/best-prop-firms/`) | forex, futures, crypto, instant, beginners, cheapest, scalping, swing, low-drawdown, gold/XAUUSD, one-step, 2027 |
| **Reviews** (`/reviews/`) | FTMO, FundedNext, FundingPips, Topstep, The5ers, Apex, MyFundedFutures, Take Profit Trader, E8 Markets, Alpha Capital |
| **Comparisons** (`/compare/`) | firm-vs-firm across every reviewed pair |
| **Guides** (`/guides/`) | what/how/why prop firms, every rule type, risk, psychology, tax, platforms, scaling, trends |
| **Tools** (`/tools/`) | 11 calculators feeding contextual links into every cluster |

**Time-correct linking rule:** a page dated *D* may link to any page dated *≤ D*. Newer content
links back to the pillars and earlier cluster posts; the automated surfaces (related articles,
hubs, RSS, homepage) only ever show already-live content, so no link is ever broken in transit.
`schedule-check.mjs` fails the build if any in-body link points forward in time.

---

## Publish schedule

### Live at launch (Jun–Jul 2026)
24 foundation articles + 6 tools (see `/best/`, `/reviews/`, `/guides/`, `/compare/`, `/tools/`).

### Phase 1 — dense launch burst (Jul 26 – Aug 14 2026)
| Date | Type | Title |
|------|------|-------|
| Jul 26 | guide | Can You Trade News on Prop Firms? |
| Jul 27 | review | MyFundedFutures |
| Jul 28 | compare | FundingPips vs FTMO |
| Jul 29 | guide | Can You Use EAs & Algo Trading? |
| Jul 30 | **tool** | Scaling Plan Projection Calculator |
| Jul 31 | review | Take Profit Trader |
| Aug 1 | best | Best Forex Prop Firms |
| Aug 2 | compare | FundedNext vs FundingPips |
| Aug 3 | guide | How Long Do Payouts Take? |
| Aug 4 | review | E8 Markets |
| Aug 5 | compare | The5ers vs FTMO |
| Aug 6 | guide / **tool** | How Is Prop Firm Income Taxed? · Risk of Ruin Calculator |
| Aug 7 | review | Alpha Capital Group |
| Aug 8 | compare | FundedNext vs The5ers |
| Aug 9 | best | Best Crypto Prop Firms |
| Aug 11 | guide | Weekend & Overnight Holding Rules |
| Aug 13 | **tool** | Trading Expectancy Calculator |
| Aug 14 | guide | 7 Prop Firm Red Flags |

### Phase 2 — 6-month authority build (Aug 16 2026 – Jan 20 2027)
| Date | Type | Title | Cluster |
|------|------|-------|---------|
| Aug 16 | guide | How to Choose a Prop Firm (7-step framework) | connective hub |
| Aug 20 | best | Best Prop Firms for Scalping | Best |
| Aug 20 | **tool** | Payout Withdrawal Date Calculator | Tools |
| Aug 24 | compare | MyFundedFutures vs Take Profit Trader | Compare |
| Aug 27 | **tool** | Challenge Fee Recovery Calculator | Tools |
| Aug 28 | guide | Trading Platforms Explained (MT4/MT5/cTrader…) | Guides |
| Sep 2 | best | Best Low-Drawdown Prop Firms | Best |
| Sep 7 | guide | What Is Instant Funding? | Guides |
| Sep 12 | compare | Topstep vs MyFundedFutures | Compare |
| Sep 17 | guide | Prop Firm Risk Management | Guides |
| Sep 22 | best | Best Prop Firms for Swing Trading | Best |
| Sep 28 | guide | Trading Psychology for Prop Firms | Guides |
| Oct 4 | compare | Apex vs MyFundedFutures | Compare |
| Oct 11 | guide | Reset vs New Account After a Breach | Guides |
| Oct 18 | best | Best Prop Firms for Gold (XAUUSD) | Best |
| Oct 25 | guide | Forex vs Futures Prop Firms | Guides |
| Nov 2 | compare | E8 Markets vs FTMO | Compare |
| Nov 10 | guide | Are Prop Firm Payouts Real? (payout proof) | Guides |
| Nov 18 | best | Best One-Step Prop Firms | Best |
| Nov 27 | guide | The Rules That Actually Breach Traders | Guides |
| Dec 7 | guide | How to Scale a Funded Account to Six Figures | Guides |
| Dec 17 | best | Best Prop Firms 2027 (early rankings) | Best |
| Jan 8 | guide | Prop Firm Industry Trends 2027 | Guides |
| Jan 20 | compare | Topstep vs Take Profit Trader | Compare |

**Totals:** 42 scheduled articles + 5 scheduled tools across ~6 months, on top of the live
foundation — 62 articles and 11 tools when the calendar completes.

---

## How the system enforces quality

- **Date-gating** (`src/publish.ts`, `src/tools.mjs`) hides future content from every listing,
  the sitemap and the direct URL until its date.
- **`schedule-check.mjs`** guarantees time-correct internal links (0 forward, 0 dead).
- **`audit.mjs`** guarantees 0 broken links / duplicate titles / missing schema across live pages,
  and validates the full future graph under `PREVIEW_SCHEDULED=1`.
- **Daily rebuild** publishes due content automatically — no manual push.

## Extending past January 2027

Add a new `.md` with a future `pubDate` (link only to earlier-dated content), or a new tool in
`src/tools.mjs` with a `publishDate`, then run `node schedule-check.mjs` and
`PREVIEW_SCHEDULED=1 npm run build && PREVIEW_SCHEDULED=1 node audit.mjs`. Candidate future
clusters: more firm reviews (FXIFY, Funded Trading Plus, Goat Funded Trader, Blue Guardian),
country guides (US/UK/India restrictions), platform deep-dives, and monthly "best firms" refreshes.

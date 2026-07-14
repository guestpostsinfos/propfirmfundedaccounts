# Prop Firm Funded Accounts — Semantic SEO & Growth Playbook

The site is built. This document is the operating manual for the next 90 days: what to publish,
in what order, and which non-content actions actually move rankings and AI citations.

**Honest baseline:** a new domain will not outrank PropFirmMatch on "best prop firms" in 30 days —
no site can, and anyone promising it is selling something. What a new site CAN do in 30 days:
rank on long-tail queries (comparisons, rule questions, firm-specific queries), get cited by
ChatGPT/Perplexity/Claude (AI engines don't require domain age the way Google's top-3 does), and
build the topical-authority foundation that compounds into head-term rankings at months 3–6.

---

## 1. What's already built (and why)

| Asset | SEO purpose |
|---|---|
| 13 seed articles across 4 categories | Initial topical coverage of the niche's core entities |
| `directAnswer` block on every article | Featured-snippet + AI-citation target (40–60 word direct answers) |
| FAQPage / Article / Review / BreadcrumbList JSON-LD | Rich results + entity clarity for Google and AI engines |
| Organization + WebSite schema sitewide | Consistent publisher entity |
| /methodology/ + /about/ + dated "last verified" stamps | E-E-A-T signals; the #1 Helpful-Content-update survival factor |
| ~17KB pages, zero JS payload | Perfect Core Web Vitals out of the box |
| robots.txt open to GPTBot/ClaudeBot/PerplexityBot | AEO: AI engines can crawl and cite |
| Sitemap + RSS + canonical + trailing-slash discipline | Clean crawl surface |

## 2. Before launch (do these in order)

1. **Buy the domain** and replace `https://propfirmfundedaccounts.com` in `astro.config.mjs`, `src/consts.ts`
   and `public/robots.txt`. (Brand "Prop Firm Funded Accounts" is a placeholder — rename freely, but avoid
   exact-match spam like "bestpropfirms2026.com".)
2. **Replace the author placeholder in `src/consts.ts` with a REAL person** — real name, real
   photo, LinkedIn/X profiles that mention the site. This is the single highest-leverage E-E-A-T
   action. Google and AI engines cross-check author entities. A fake persona is an update
   liability; a real one is an asset.
3. **Fact-check every number in the articles.** Prices/rules were verified against July 2026
   sources but prop firms change monthly. Add screenshots of firm dashboards where you have them —
   original images are first-hand-experience evidence.
4. **Deploy** to Cloudflare Pages / Vercel / Netlify (all free): `npm run build` → deploy `dist/`.
5. **Google Search Console + Bing Webmaster Tools**: verify, submit sitemap. Bing matters more
   than people think — it feeds ChatGPT browsing and Copilot.

## 3. The topical map — publish order for weeks 1–12

Rule: 3–4 articles/week, alternating money pages and informational support. Every article links
up to its pillar and sideways to 2–3 siblings. Update `updatedDate` whenever facts are re-verified.

### Cluster A — Firm reviews (money + entity coverage)
Already live: FTMO, FundedNext, FundingPips, Topstep.
Queue: The5ers, Apex Trader Funding, Alpha Capital Group, E8 Markets, MyFundedFutures,
Funded Trading Plus, Blueberry Funded, ThinkCapital, City Traders Imperium, Instant Funding,
Goat Funded Trader, FXIFY, Maven Trading, Seacrest Funded, DNA Funded, Lark Funding.

### Cluster B — Comparisons (highest conversion intent per session)
Already live: FTMO vs FundedNext, Topstep vs Apex.
Queue: FTMO vs FundingPips, FundedNext vs FundingPips, FTMO vs The5ers, FTMO vs Topstep
(forex vs futures angle), Apex vs MyFundedFutures, The5ers vs City Traders Imperium,
"FTMO alternatives" (huge query), "Apex alternatives".

### Cluster C — Best-of pages (head terms; these mature at months 3–6)
Already live: best prop firms, best futures prop firms, cheapest prop firms.
Queue: best forex prop firms, best crypto prop firms, best instant funding prop firms,
best prop firms for beginners, best prop firms without time limits, best 1-step challenges,
best prop firms for scalping / news trading / EAs / swing trading, best prop firms in
[US / UK / India / Nigeria / Pakistan / South Africa] (country pages are underserved),
prop firms that allow copy trading, prop firms with highest profit split.

### Cluster D — Guides (topical authority + AI-citation magnets)
Already live: what is a prop firm, how to pass a challenge, drawdown explained, are prop firms legit.
Queue: prop firm taxes (huge, underserved — get professional review), 1-step vs 2-step vs instant,
consistency rules explained, prop firm payout methods compared, how prop firms make money,
can you trade news at prop firms, prop firm scaling plans compared, funded account psychology,
best lot size calculator for challenges (build an actual calculator tool — link magnet),
prop trading vs own account: the real math, why traders fail challenges (data post).

### Cluster E — News/updates (freshness signals + fastest indexing)
Queue (weekly cadence): monthly "prop firm rule changes" roundup, shutdown tracker (update the
are-prop-firms-legit data), payout report roundups, regulation tracker (CFTC/FCA/ASIC).
News posts index in hours, earn the site crawl frequency, and are what other sites link to.

### Interlinking rule (semantic SEO core)
Every page answers ONE query cluster, links UP to its pillar, ACROSS to 2–3 siblings, and DOWN to
supporting detail. No orphan pages, ever. The four pillars are: best-prop-firms (commercial),
what-is-a-prop-firm (informational), the reviews hub, and are-prop-firms-legit (trust).

## 4. AEO / AI-chatbot optimization (already wired in, keep doing)

- Keep the `directAnswer` frontmatter on every article: one 40–60 word self-contained answer.
  This is the exact shape AI engines quote.
- Keep H2s as questions matching real queries; first sentence under each H2 answers it directly.
- Keep FAQs 4–6 per article with self-contained answers (no "see above" — AI engines quote
  fragments out of context).
- Tables beat prose for comparative facts — LLMs parse and cite them preferentially.
- Include the date in updated content ("verified July 2026") — AI engines prefer dated facts.
- Publish original data as soon as possible (survey your users, aggregate payout-proof stats).
  "According to Prop Firm Funded Accounts's payout study…" is how AI engines cite you by name.

## 5. Update-resistance checklist (what "Google thinks it's valuable" actually means)

Google's Helpful Content system and reviews-system updates target exactly this niche (thin
affiliate reviews). Survival = being the thing the updates promote:

- [ ] Real author with verifiable identity (see §2.2)
- [ ] First-hand evidence in reviews: purchased-challenge screenshots, payout receipts, dashboards
- [ ] "Last verified" dates kept honest — re-verify money pages monthly
- [ ] Cons listed for every firm, including affiliates (reviews-system update explicitly checks)
- [ ] Affiliate disclosure on page (footer done; add inline disclosure at first affiliate link)
- [ ] No mass-produced AI-sounding filler — every article must contain facts not on the firm's
      own site (this seed set does; keep the bar)
- [ ] Cover negatives (shutdowns, denials, regulation) as prominently as positives — trust content
      is what separates this site's profile from the affiliate farms

## 6. Off-site (rankings are earned off-site; nothing on-site substitutes)

- **Digital PR:** the shutdown tracker and any original payout-data study are genuinely
  link-worthy — pitch them to trading publications and finance journalists.
- **Communities:** genuinely useful (non-promotional) presence where prop traders live —
  r/propfirms, r/Daytrading, Forex Factory, X/Twitter prop-trading circles, Discords. Answer
  rule questions; link only when the article IS the answer.
- **YouTube/Shorts:** even simple "FTMO rule change explained in 60s" clips rank on YouTube search
  and build the author entity.
- **HARO/Qwoted** finance queries for authority backlinks.
- Track in GSC weekly: impressions on comparison queries are the leading indicator — they appear
  weeks before clicks.

## 7. Realistic milestones

| When | Expect |
|---|---|
| Weeks 1–2 | Indexed; impressions on firm-name long-tails; first AI-engine citations possible |
| Month 1 | Long-tail rankings (positions 10–40) on comparisons and rule questions; ~40 articles live |
| Months 2–3 | Top-10 on mid-tail ("FTMO vs FundedNext", "prop firm drawdown"); traffic in the hundreds/day if publishing cadence held |
| Months 3–6 | Head-term movement ("best prop firms") IF backlinks + original data exist; this is where most sites stall by stopping publishing |

The compounding loop: fresh rule-change coverage → crawl frequency → faster indexing → long-tail
wins → internal links push pillars → head terms. Consistency is the ranking factor nobody can buy.

---
title: "Prop Firm Drawdown Rules Explained: Static vs Trailing (With Math)"
description: "Daily drawdown, max drawdown, static vs trailing, balance vs equity, EOD vs intraday — every prop firm drawdown type explained with the math that prevents breaches."
category: guides
pubDate: 2026-06-14
updatedDate: 2026-07-07
directAnswer: "Prop firm drawdown rules come in three flavors: daily loss limits (usually 5%, resetting at a set server time), maximum loss limits (usually 10%, either static from starting balance or trailing behind your equity peak), and per-trade risk caps. Trailing drawdowns — standard at futures firms like Apex — are the most dangerous because profits move the breach floor up behind you."
takeaways:
  - "More funded accounts die to drawdown mechanics than to profit targets — this is the highest-ROI rules knowledge in prop trading."
  - "Static drawdown (FTMO-style) is measured from starting balance and never moves; trailing drawdown ratchets up with your equity peak."
  - "Daily loss limits are calculated on balance or equity depending on the firm, and reset at a server time you must know."
  - "Floating profits count against you under intraday trailing rules — you can breach while your position is still open."
faqs:
  - q: "What is the difference between static and trailing drawdown?"
    a: "Static drawdown is a fixed floor: a $100K account with 10% static drawdown breaches at $90K, always. Trailing drawdown follows your equity peak upward: reach $105K and a $5K trailing floor moves to $100K — your starting balance. Trailing drawdown converts open profits into risk, which is why it breaches far more traders."
  - q: "What does 5% daily drawdown mean?"
    a: "You cannot lose more than 5% of the account (calculation base varies by firm — balance, equity, or start-of-day equity) within one server day. The counter resets at a fixed server time. Both realized losses and floating losses typically count, so an open losing position can breach you."
  - q: "Does floating profit count toward drawdown?"
    a: "Under intraday trailing rules (Apex's intraday option, some futures firms), yes — your equity peak includes unrealized profit, so the floor rises while your trade is still open, and giving back that floating profit can breach you. End-of-day trailing variants only mark the peak at session close, which is meaningfully more forgiving."
  - q: "Which prop firms have the fairest drawdown rules?"
    a: "FTMO and FundedNext use static daily and maximum limits — the most predictable structure. Among futures firms, Topstep's structured loss limits are gentler than trailing systems; Apex's 2026 end-of-day trailing option is the fairer of its two modes. As a rule: static > end-of-day trailing > intraday trailing."
---

Ask funded traders what killed their accounts and you'll hear the same answer with different details: *the drawdown rule I didn't fully understand.* Profit targets get all the attention; drawdown mechanics do all the killing. This guide covers every variant with the exact math.

## The three rules every firm combines

1. **Daily loss limit** — typically 5% (as low as 3% at [discount firms](/reviews/fundingpips-review/)). Resets at a fixed server time.
2. **Maximum loss limit** — typically 10%, measured either *statically* from starting balance or *trailing* behind your equity peak.
3. **Per-trade risk caps** — the new frontier: [FTMO added a 0.5–1% per-trade limit in 2026](/reviews/ftmo-review/).

Each has calculation details that decide breaches. Take them in order of lethality.

## Trailing drawdown: the funded-account killer

**Static** drawdown is simple: $100K account, 10% limit, floor at $90K forever. Make $8K, lose $8K, you're at breakeven and fine.

**Trailing** drawdown moves the floor up as you profit. Same account with a $5K trailing limit:

| Your equity peak | Breach floor | Room below current equity if you're at $100K |
|-----------------:|-------------:|----------------------------------------------|
| $100,000 (start) | $95,000 | $5,000 |
| $103,000 | $98,000 | $2,000 |
| $105,000 | $100,000 | **$0 — breakeven breaches you** |

Read that last row again: after a good week, **your own starting balance becomes a losing position**. Every dollar of profit converts one-for-one into risk until the floor caps (most firms stop trailing at starting balance + buffer). This is the single most common death at [Apex](/compare/topstep-vs-apex/) and why we treat drawdown type as a bigger selection criterion than price.

**Intraday vs end-of-day trailing** matters nearly as much: intraday marks your peak continuously — including *floating* profit, so an open trade that runs +$3K and returns to entry may have already moved your floor. EOD trailing (Apex's more forgiving 2026 option) marks the peak only at session close. If you're given the choice, take EOD.

## Daily loss limits: know two numbers

**Your reset time.** "Daily" means the firm's server day. A floating loss carried toward the reset boundary is the classic avoidable breach — traders get ended at 4:55pm server time by a position they planned to "give room overnight."

**Your calculation base.** Firms compute the daily limit from prior-day balance, prior-day equity, or start-of-day equity — and floating losses almost always count in real time. Concretely: if your base is yesterday's balance of $102K with a 5% limit, your hard floor today is $96,900 in *equity*, not balance. Know the formula at your firm before your first trade; it's in the FAQ of every dashboard.

**The professional adaptation:** set a personal daily stop at 40–50% of the official limit (-2% against a 5% rule). It makes a daily breach arithmetically impossible and — more valuable — it interrupts revenge-trading sequences before they compound. This one habit is most of [what separates passers from repeat customers](/guides/how-to-pass-a-prop-firm-challenge/).

## Per-trade risk caps: the 2026 trend

FTMO's 0.5–1% risk-per-trade rule on funded accounts signals the industry direction: firms are moving risk control from *account level* to *trade level*. Expect copies. If your strategy concentrates risk in single high-conviction positions, audit any firm's per-trade rules before buying — this now differentiates firms as much as pricing does. (It's a core axis in our [FTMO vs FundedNext comparison](/compare/ftmo-vs-fundednext/).)

## Drawdown rules by firm (July 2026)

| Firm | Daily | Max | Type | Per-trade cap |
|------|-------|-----|------|---------------|
| FTMO | 5% | 10% | Static | 0.5–1% (funded) |
| FundedNext (Stellar) | 5% | 10% | Static | — |
| FundingPips | 3–5% | 6–10% | Static | — |
| Topstep | Daily loss limit | Max loss limit | Structured | — |
| Apex | — | Trailing | EOD or intraday (your choice) | — |

**Selection rule of thumb: static > end-of-day trailing > intraday trailing** — and a wider drawdown is worth paying for. The [cheapest challenge](/best/cheapest-prop-firms/) with the tightest rules is frequently the most expensive path to funding. Full rankings with drawdown fairness weighted at 25%: [best prop firms 2026](/best/best-prop-firms/).

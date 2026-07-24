---
title: "Can You Trade News on Prop Firms? News-Trading Rules by Firm (2026)"
description: "Which prop firms allow news trading, which impose blackout windows around high-impact events, and how to avoid a breach on NFP, CPI and FOMC days."
category: guides
pubDate: 2026-07-26
directAnswer: "Some prop firms allow news trading freely, some ban opening or closing trades within a window (commonly 2–5 minutes) around high-impact releases, and a few void trades or profits made during that window. The rule is almost always about the seconds around the release, not the whole day — but breaching it can reset your account, so check your firm's exact news policy before NFP, CPI or FOMC."
takeaways:
  - "News-trading rules target the seconds around a release, not the whole session — usually a 2–5 minute no-open/no-close window on high-impact events."
  - "The harshest firms don't just breach the trade; they remove the profit or reset the account, so read the consequence, not just the window."
  - "Slippage and spread-widening around news can blow through your stop and breach a daily drawdown even where news trading is 'allowed'."
  - "If your edge is event-driven, pick a firm with no news restriction rather than fighting a blackout window."
faqs:
  - q: "Why do prop firms restrict news trading?"
    a: "Because the seconds around a high-impact release are the easiest place to make an outsized, luck-based gain on extreme volatility and thin liquidity — exactly the lottery-ticket behaviour firms filter out. Restricting news trading also protects the firm's own hedging: it cannot reliably offset your position when spreads gap and fills are unpredictable."
  - q: "What counts as high-impact news for prop firm rules?"
    a: "Typically the red-folder events on an economic calendar: US Non-Farm Payrolls (NFP), CPI inflation prints, FOMC rate decisions and press conferences, and major central-bank announcements. Some firms publish the exact calendar they enforce; if yours doesn't, treat any red-flagged event on ForexFactory as inside the window."
  - q: "Can you hold a trade through a news release?"
    a: "Where a firm has a news window, the rule usually bars opening or closing a position inside it — a position opened well before the release and closed well after may be fine, but you carry full gap risk. Where news trading is banned outright, holding through the event can still void the trade. Always confirm whether the rule is 'no trading' or 'no opening/closing' in the window."
  - q: "Which prop firms allow news trading?"
    a: "Policies change often, so verify at purchase, but as a rule futures firms are generally more permissive on news than tightly-hedged one-step forex firms. The safest approach for an event-driven strategy is to buy only where the terms explicitly say news trading is permitted with no window — never assume."
---

"News trading" is one of the most misunderstood rules in prop trading, because traders imagine it bans trading on release days entirely. It almost never does. What firms restrict is the handful of seconds around a high-impact print — and the details of that restriction decide whether your event-driven edge is viable at a given firm.

## What the rule actually restricts

Nearly every news rule is a **window rule**: you may not open or close a trade within *X* minutes of a designated high-impact release, where *X* is commonly 2, 3 or 5 minutes on each side. Outside that window you trade normally. The differences between firms come down to three parameters:

| Parameter | Common values | Why it matters |
|-----------|---------------|----------------|
| The window | ±2 to ±5 minutes | How much room around the print you lose |
| The events | NFP, CPI, FOMC, central banks | Whether your instrument's driver is even covered |
| The consequence | Trade void · profit removed · account reset | Benign vs account-ending |

That last column is the one that ends accounts. A firm that merely voids the offending trade is survivable; a firm that **resets the account** for a single news violation turns a rule you forgot into a lost evaluation. Read the consequence before the window.

## The breach that gets "allowed" news traders anyway

Even where news trading is explicitly permitted, the release itself can breach you through mechanics that have nothing to do with the news rule. Spreads widen violently, and a market order can fill several points past your intended level; a stop-loss becomes a *stop-market* that executes wherever liquidity exists, often well beyond your planned risk. That single slippage event can punch straight through a [daily drawdown limit](/guides/prop-firm-drawdown-explained/) and end the account under the *drawdown* rule, not the news rule.

The defence is position sizing that assumes a worse-than-usual fill. Run your event-day trades through the [position size calculator](/tools/position-size-calculator/) with a wider effective stop, and confirm the resulting worst case still sits inside your [breach levels](/tools/drawdown-calculator/).

## Match the firm to your edge

If your profits come *from* events — trend continuation after NFP, mean reversion after an overreaction — a firm with a strict news window isn't a minor inconvenience, it's a structural mismatch that will quietly cap your edge. This is the same logic as [consistency rules](/guides/prop-firm-consistency-rules-explained/): pick firms whose rulebook fits how you actually make money, rather than forcing your strategy through hostile terms.

Conversely, if you're a steady intraday trader who simply wants to avoid getting caught out, the practical rule is boring and effective: **flatten before the window opens and stand aside until it closes.** You give up nothing an edge depends on, and you remove an entire category of avoidable breach.

Before you buy any evaluation, find the news policy in the terms — not the marketing page — and weigh it alongside [drawdown fairness and payout reliability](/best/best-prop-firms/). A permissive news rule is worth real money to an event trader and irrelevant to everyone else; know which one you are.

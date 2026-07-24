// Single source of truth for the tools hub, per-tool publish gating and the
// sitemap filter. Tools with a future `publishDate` are built but hidden
// (redirected + delisted + kept out of the sitemap) until their date arrives.
// A daily rebuild flips them live automatically. Live tools omit publishDate.

/**
 * @typedef {Object} ToolMeta
 * @property {string} href           Trailing-slash path, e.g. '/tools/foo/'
 * @property {string} title          Card + heading title
 * @property {string} desc           One-line description for the hub card
 * @property {string} [publishDate]  ISO 'YYYY-MM-DD'; omit if already live
 */

/** @type {ToolMeta[]} */
export const TOOLS = [
  {
    href: '/tools/position-size-calculator/',
    title: 'Position Size Calculator',
    desc: 'Lot size from account, risk % and stop distance — with prop-firm-safe presets for forex, gold and indices.',
  },
  {
    href: '/tools/challenge-pass-simulator/',
    title: 'Challenge Pass Probability Simulator',
    desc: 'Monte Carlo simulation of your win rate, risk:reward and sizing against real challenge rules — see your true pass odds before you pay.',
  },
  {
    href: '/tools/drawdown-calculator/',
    title: 'Drawdown & Breach Calculator',
    desc: 'Exactly how much room you have left before a daily or max drawdown breach — static and trailing modes.',
  },
  {
    href: '/tools/challenge-cost-calculator/',
    title: 'True Challenge Cost Calculator',
    desc: 'Expected total spend to get funded based on fee and realistic pass rates — the number sticker prices hide.',
  },
  {
    href: '/tools/profit-split-calculator/',
    title: 'Profit Split & Payout Calculator',
    desc: 'Your real take-home from a payout: split tiers, fee refunds and effective return on your challenge fee.',
  },
  {
    href: '/tools/consistency-rule-calculator/',
    title: 'Consistency Rule Calculator',
    desc: "Check your best day against your firm's consistency cap — pass/fail and the exact extra profit needed before a compliant payout.",
  },
  {
    href: '/tools/scaling-plan-projection-calculator/',
    title: 'Scaling Plan Projection Calculator',
    desc: 'Project how your funded balance and take-home grow across scaling milestones — capital and split compounding together.',
    publishDate: '2026-07-30',
  },
  {
    href: '/tools/risk-of-ruin-calculator/',
    title: 'Risk of Ruin Calculator',
    desc: 'The probability your win rate and risk-per-trade breach a drawdown before you pass — the number that decides your sizing.',
    publishDate: '2026-08-06',
  },
  {
    href: '/tools/trading-expectancy-calculator/',
    title: 'Trading Expectancy Calculator',
    desc: 'Your expected profit per trade from win rate and average win/loss — is your edge even positive before firm rules?',
    publishDate: '2026-08-13',
  },
  {
    href: '/tools/payout-withdrawal-date-calculator/',
    title: 'Payout Withdrawal Date Calculator',
    desc: 'Your first eligible withdrawal date and payout schedule from minimum trading days and cycle length.',
    publishDate: '2026-08-20',
  },
  {
    href: '/tools/fee-recovery-calculator/',
    title: 'Challenge Fee Recovery Calculator',
    desc: 'How much you must earn — and at what return — to recoup your challenge fee and reach real profit after the split.',
    publishDate: '2026-08-27',
  },
];

/** True if a tool has no future publishDate (i.e. it should be shown). */
export const toolIsLive = (t, now = Date.now()) =>
  !t.publishDate || new Date(t.publishDate + 'T00:00:00Z').valueOf() <= now;

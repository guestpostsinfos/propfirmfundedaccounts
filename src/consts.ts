// Central site identity. Everything schema-related pulls from here so the
// entity Google/AI engines build for the site stays consistent everywhere.

export const SITE = {
  name: 'Prop Firm Funded Accounts',
  url: 'https://propfirmfundedaccounts.com',
  tagline: 'Independent prop firm reviews, comparisons and payout research',
  description:
    'Independent, hands-on prop firm research: challenge rules, real costs, payout reliability and side-by-side comparisons of the top proprietary trading firms.',
  locale: 'en_US',
  twitter: '@propfirmfunded',
} as const;

// E-E-A-T critical: replace with a REAL person, real photo, real credentials.
// Google and AI engines cross-check author entities against LinkedIn/X.
export const AUTHOR = {
  name: 'Prop Firm Funded Accounts Research Team',
  slug: 'pffa-research',
  role: 'Prop Firm Analyst',
  bio: 'The Prop Firm Funded Accounts research team has collectively taken 40+ prop firm evaluations across forex and futures firms since 2021, tracking rule changes, payout timelines and firm solvency. Every review is based on purchased challenges and documented payout attempts — never marketing material.',
  url: '/about/',
} as const;

export const NAV = [
  { label: 'Learn', href: '/learn/' },
  { label: 'Best Prop Firms', href: '/best/best-prop-firms/' },
  { label: 'Reviews', href: '/reviews/' },
  { label: 'Trustpilot Tracker', href: '/trustpilot-reviews/' },
  { label: 'Comparisons', href: '/compare/' },
  { label: 'Guides', href: '/guides/' },
  { label: 'Tools', href: '/tools/' },
  { label: 'Methodology', href: '/methodology/' },
] as const;

export const CATEGORIES: Record<string, { title: string; description: string }> = {
  best: {
    title: 'Best Prop Firms',
    description:
      'Ranked lists of the best prop trading firms by category — built from purchased evaluations, verified payout data and monthly rule tracking.',
  },
  reviews: {
    title: 'Prop Firm Reviews',
    description:
      'In-depth, hands-on reviews of individual prop trading firms: real challenge costs, rules that actually get traders breached, and documented payout reliability.',
  },
  compare: {
    title: 'Prop Firm Comparisons',
    description:
      'Side-by-side comparisons of popular prop firms — pricing, drawdown rules, profit splits and payout speed — so you can pick the right firm for your strategy.',
  },
  guides: {
    title: 'Prop Trading Guides',
    description:
      'Educational guides on how prop firms work, how to pass evaluations, and how to avoid the rules and firms that cost traders money.',
  },
  news: {
    title: 'Prop Firm News',
    description:
      'Rule changes, firm shutdowns, payout disputes and regulation — tracked as they happen so you are never caught in a collapsing firm.',
  },
};

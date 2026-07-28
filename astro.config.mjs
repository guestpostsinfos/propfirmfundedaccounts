import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { TOOLS, toolIsLive } from './src/tools.mjs';

import cloudflare from "@astrojs/cloudflare";

const SITE = 'https://propfirmfundedaccounts.com';

// Keep scheduled (not-yet-live) tool pages out of the sitemap until their date.
const hiddenToolUrls = new Set(
  TOOLS.filter((t) => !toolIsLive(t)).map((t) => `${SITE}${t.href}`),
);

// https://astro.build/config
export default defineConfig({
  site: SITE,
  integrations: [sitemap({ filter: (page) => !hiddenToolUrls.has(page) })],
  trailingSlash: 'always',

  build: {
    format: 'directory',
  },

  adapter: cloudflare()
});
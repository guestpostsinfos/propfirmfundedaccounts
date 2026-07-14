# Deploying Prop Firm Funded Accounts to Cloudflare Pages

Astro builds a fully static site (`dist/`), so hosting is free and fast on Cloudflare
Pages. There are two ways to deploy — pick one.

---

## Before you deploy (5 minutes, do this first)

1. **Set your real domain** in three files (replace `https://propfirmfundedaccounts.com`):
   - `astro.config.mjs` → `site:`
   - `src/consts.ts` → `SITE.url`
   - `public/robots.txt` → the `Sitemap:` line
2. **Replace the author placeholder** in `src/consts.ts` (`AUTHOR`) with a real person —
   this is the biggest E-E-A-T lever. See `STRATEGY.md` §2.
3. Run `npm run build` once locally to confirm it still compiles.

---

## Option A — Connect your Git repo (recommended, auto-deploys on every push)

This gives you automatic rebuilds whenever you add an article.

1. Put the project on GitHub (or GitLab):
   ```bash
   cd c:\Users\pc\Desktop\VSProjects\Propfirm-expertblog
   git init
   git add .
   git commit -m "Initial Prop Firm Funded Accounts site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/propfirmfundedaccounts.git
   git push -u origin main
   ```
   (Create the empty `propfirmfundedaccounts` repo on github.com first.)

2. Go to **dash.cloudflare.com** → **Workers & Pages** → **Create** →
   **Pages** → **Connect to Git** → authorize and pick your repo.

3. Set the build configuration:
   | Field | Value |
   |-------|-------|
   | Framework preset | **Astro** |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Node version | 20 or newer (add env var `NODE_VERSION` = `20` if it defaults lower) |

4. Click **Save and Deploy**. First build takes ~1–2 minutes. You get a free
   `your-project.pages.dev` URL immediately.

5. Every `git push` now triggers a new deploy automatically.

---

## Option B — Direct upload with Wrangler (no Git, fastest one-off)

1. Install the CLI and log in:
   ```bash
   npm install -g wrangler
   wrangler login
   ```
2. Build and deploy the folder:
   ```bash
   npm run build
   wrangler pages deploy dist --project-name=propfirmfundedaccounts
   ```
   To publish updates later, re-run those two lines. (No auto-deploy — you push manually.)

---

## Connecting your custom domain

1. In the Pages project → **Custom domains** → **Set up a custom domain** → enter
   `propfirmfundedaccounts.com` (and add `www.propfirmfundedaccounts.com` too).
2. If your domain's DNS is already on Cloudflare, records are added automatically.
   If not, Cloudflare shows you the CNAME/A records to add at your registrar, or you can
   move the domain's nameservers to Cloudflare (free, recommended).
3. HTTPS is automatic and free — wait a few minutes for the certificate to issue.

---

## Immediately after the site is live

1. **Google Search Console** (search.google.com/search-console): add the property,
   verify (DNS TXT record via Cloudflare is easiest), and submit
   `https://propfirmfundedaccounts.com/sitemap-index.xml`.
2. **Bing Webmaster Tools** (bing.com/webmasters): same — Bing feeds ChatGPT browsing
   and Copilot, so this matters for AI citations.
3. **Test rich results**: paste any review URL into
   [search.google.com/test/rich-results](https://search.google.com/test/rich-results) —
   you should see Article, Review, FAQPage and Breadcrumb detected.
4. **Test social/AI cards**: paste a URL into
   [opengraph.xyz](https://www.opengraph.xyz) to confirm the OG image renders.
5. Then follow the publishing cadence and off-site plan in `STRATEGY.md`.

---

## Notes specific to this build

- **Trailing slashes**: the site is configured with `trailingSlash: 'always'`. Cloudflare
  Pages serves the `/directory/index.html` structure correctly out of the box — no config
  needed.
- **404 page**: `dist/404.html` is generated automatically and Cloudflare Pages serves it
  for unknown routes with no setup.
- **No server, no database, no environment secrets** — it's pure static files, so there's
  nothing to misconfigure and nothing that can be hacked server-side.
- **Redeploys are safe**: the same content always produces the same URLs, so links and
  rankings are preserved across deploys.

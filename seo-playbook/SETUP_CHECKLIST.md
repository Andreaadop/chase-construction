# One-time setup checklist (per site)

Work top to bottom. Most items are 2–10 minutes. Skip nothing — these are the
table stakes that make everything else count.

## Domain & serving

- [ ] Pick www or non-www; the other 301-redirects to it. One canonical host.
- [ ] HTTPS everywhere; HTTP redirects to HTTPS.
- [ ] Site renders real HTML to bots (view-source shows content, not an empty
      JS shell). If it's a JS framework, confirm SSR/prerendering.
- [ ] Mobile-friendly; loads fast enough to not feel broken. Run PageSpeed
      Insights; fix anything red.

## On-page basics (ask Claude to audit — it's fast at this)

- [ ] One H1 per page, containing the page's target query.
- [ ] Unique title tag (≤60 chars, keyword first) and meta description
      (≤155 chars) on every indexable page. No duplicates.
- [ ] URL slugs: short, stable, matching the H1's topic. No query strings on
      canonical URLs.
- [ ] Canonical tag on every indexable page.
- [ ] Alt text on meaningful images.
- [ ] No orphan pages — everything important is reachable via internal links.
- [ ] Fix 404s and redirect chains.
- [ ] Structured data where it applies: Organization + WebSite on home,
      Product/Article + Breadcrumb on detail pages, FAQPage where you have
      FAQs (this is what AI search engines quote).

## Search engine registration

- [ ] Google Search Console: add the property, verify, submit sitemap.xml.
- [ ] Request indexing (URL Inspection) for the homepage + top 3 pages.
- [ ] Bing Webmaster Tools: register via **"Import from Google Search
      Console"** — one click, no DNS. Confirm the sitemap imported.
      (Bing's index feeds ChatGPT search — this matters more than Bing itself.)
      Gotcha: the Google account you connect must be one that actually has
      the site in ITS Search Console — check which account owns the property.
- [ ] robots.txt allows all public pages; sitemap.xml auto-updates when
      content is added (platforms like Shopify do this; static sites need it
      wired into the build).

## Tooling

- [ ] Copy `seo_config.example.json` → `seo_config.json`, fill in `site_url`.
- [ ] Run `python tools/google_auth.py` once (account that owns the GSC property).
- [ ] Run `python tools/gsc_weekly_review.py` — confirm it prints a report
      (a brand-new site will show near-zero rows; that's fine, it grows).
- [ ] Do keyword research and write down the target clusters BEFORE writing
      content. Exact volumes matter: "temperament" can out-search
      "personality" 3:1 for the same topic — you want to know that before
      titling anything. (DataForSEO pay-as-you-go is ~$0.09/query; Ahrefs
      works too.)

## Recurring (put it on the calendar)

- [ ] Weekly: `python tools/gsc_weekly_review.py` + act per WEEKLY_LOOP.md.
- [ ] Weekly: one quality post per CONTENT_PLAYBOOK.md.
- [ ] After publishing anything: request indexing in GSC (and Bing URL
      Submission — its quota is generous).

# SEO Playbook — portable kit

A copy-paste SEO system distilled from John Rush's "1M clicks from SEO" playbook
(https://johnrushx.substack.com/p/everything-ive-done-to-score-1-million),
battle-tested on mainpups.com. Drop this folder into any website project and
follow the three documents in order.

## What's inside

```
seo-playbook/
  README.md               <- you are here (install + the system at a glance)
  SETUP_CHECKLIST.md      <- one-time setup per site (~1 hour)
  WEEKLY_LOOP.md          <- the recurring 20-minute weekly review (the compounding part)
  CONTENT_PLAYBOOK.md     <- what to publish and how to structure it
  seo_config.example.json <- copy to seo_config.json and fill in
  tools/
    google_auth.py        <- one-time OAuth consent; saves a reusable token
    gsc_weekly_review.py  <- pulls Search Console, finds the low-hanging fruit
```

## Install into a new project

1. Copy this whole folder into the project (e.g. `myproject/seo-playbook/`).
2. `pip install google-auth google-auth-oauthlib google-api-python-client`
3. Create a Google Cloud project (or reuse one), enable the **Search Console API**,
   create an OAuth Desktop client, download `client_secret_*.json` into
   `seo-playbook/`. (One cloud project can serve all your sites.)
4. `cp seo_config.example.json seo_config.json` and set `site_url` to the
   property EXACTLY as it appears in Search Console (either
   `https://example.com/` for URL-prefix or `sc-domain:example.com`).
5. `python tools/google_auth.py` — browser opens once, pick the Google account
   that owns the site's Search Console property.
6. Work through `SETUP_CHECKLIST.md` once.
7. Every week: `python tools/gsc_weekly_review.py` and act on the output.
   The how-to-act part is in `WEEKLY_LOOP.md`.

`seo_config.json`, `google_token.json`, and `client_secret_*.json` are
site/account-specific — gitignore them and never commit them.

## The system at a glance

The playbook is three loops running at different speeds:

- **Once per site** (SETUP_CHECKLIST.md): technical foundations — indexing,
  schema, titles, GSC + Bing registration. Boring, finite, non-negotiable.
- **Weekly** (WEEKLY_LOOP.md): pull Search Console, find queries at position
  8–20 ("striking distance"), give those pages a small push. This is the
  highest-ROI habit in SEO — improving pages Google already half-likes beats
  writing new ones into the void.
- **Continuously** (CONTENT_PLAYBOOK.md): one quality post per week into
  keyword clusters you researched, structured hub-and-spoke, repurposed to
  social the day it ships, seasonal content published 8–10 weeks before the
  season peaks.

The single most important principle, from the source material: **most SEO
effort is wasted on new content while pages sitting at position 11 go
untouched.** The weekly tool exists to make that impossible to ignore.

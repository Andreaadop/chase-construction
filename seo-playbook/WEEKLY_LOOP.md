# The weekly loop (~20 minutes)

Run `python tools/gsc_weekly_review.py`. It compares the last 28 days to the
28 before and buckets every query. Then act, in this order:

## 1. Striking distance (position 8–20) — the money bucket

These pages are on page 2, one push from page 1. For each (do the top 1–3,
not all):

- Put the **exact query** in the page's title tag and H1 — or, if the title
  already carries it, into an H2.
- Add **2 internal links** pointing at this page from your other pages, using
  the query (or a close variant) as anchor text.
- Read the top 5 current results for the query. Whatever section they all
  have and you don't — add it.
- Request indexing in GSC when done.

Expect movement in 1–3 weeks. The tool's report next week tells you if it
worked.

## 2. CTR fixes (ranking fine, nobody clicks)

The page ranks but the snippet doesn't earn the click. Rewrite the title
(query in the first 60 characters + a reason to click) and the meta
description. Don't touch the content — it's already working.

## 3. Movers (falling)

A page that lost impressions vs the prior window. One-off wobble → ignore.
Two weeks in a row → the content is decaying or someone outpublished you:
refresh it with genuinely new material (not a reworded paragraph) and
request indexing.

## 4. Watch list (position 21–40)

Do nothing yet. These graduate into striking distance on their own if the
site's overall authority grows. Just know they exist — they tell you which
future content clusters already have traction.

## What NOT to do

- Don't rewrite pages that are ranking well. If it's position 1–7 with
  healthy CTR, leave it alone.
- Don't act on queries with 1–2 impressions on a young site — noise. The
  tool's thresholds filter most of this; trust them and raise them as
  traffic grows (MIN_IMP_* constants at the top of the script).
- Don't skip a week because "nothing changed." The compounding comes from
  the streak — 10 minutes confirming nothing needs action is a valid week.

## The habit stack

Same session, after the review: publish this week's post (CONTENT_PLAYBOOK.md),
link it from 2 existing pages, add it to its hub page, request indexing,
repurpose it to one social platform. One sitting, whole system serviced.

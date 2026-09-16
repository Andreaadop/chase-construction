#!/usr/bin/env python3
"""
gsc_weekly_review.py — Weekly Search Console low-hanging-fruit review (portable).

Compares the last N days (default 28) to the N days before and buckets every
query so you can act per WEEKLY_LOOP.md:

  STRIKING  pos 8-20   -> page 2 knocking on page 1: query into H1/title,
                          add 2 internal links, cover missing subtopics
  CTR FIX   ranks, no clicks -> rewrite title/meta, leave content alone
  WATCH     pos 21-40  -> no action; future striking distance
  MOVERS    pages whose impressions changed most vs the prior window
  TOP PAGES what earns impressions/clicks today

Usage:
  python tools/gsc_weekly_review.py            # print report + save markdown
  python tools/gsc_weekly_review.py --json     # also dump raw buckets as JSON

Config: ../seo_config.json (site_url, token_path, window_days, min_impressions).
Auth:   run tools/google_auth.py once first.
Reports land in ../seo-reports/ (gitignore it or keep it, your call).
"""
import datetime
import json
import os
import sys

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # playbook root
LAG = 2  # GSC data lags ~2 days

# Rough expected CTR by position bucket — a query far below its bucket's
# number has a snippet problem, not a ranking problem.
CTR_BENCH = [(3, 0.10), (5, 0.06), (10, 0.03), (20, 0.01)]


def load_config():
    path = os.path.join(HERE, "seo_config.json")
    if not os.path.exists(path):
        sys.exit("seo_config.json missing - copy seo_config.example.json and fill it in")
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def gsc_service(cfg):
    from google.oauth2.credentials import Credentials
    from googleapiclient.discovery import build
    token_path = os.path.join(HERE, cfg.get("token_path", "google_token.json"))
    if not os.path.exists(token_path):
        sys.exit(f"{token_path} missing - run: python tools/google_auth.py")
    creds = Credentials.from_authorized_user_file(token_path)
    return build("searchconsole", "v1", credentials=creds)


def query(svc, site, start, end, dims, row_limit=5000):
    rows, start_row = [], 0
    while True:
        body = {"startDate": str(start), "endDate": str(end),
                "dimensions": dims, "rowLimit": row_limit, "startRow": start_row}
        r = svc.searchanalytics().query(siteUrl=site, body=body).execute()
        batch = r.get("rows", [])
        rows += batch
        if len(batch) < row_limit:
            return rows
        start_row += row_limit


def windows(window_days):
    end = datetime.date.today() - datetime.timedelta(days=LAG)
    start = end - datetime.timedelta(days=window_days - 1)
    prev_end = start - datetime.timedelta(days=1)
    prev_start = prev_end - datetime.timedelta(days=window_days - 1)
    return (start, end), (prev_start, prev_end)


def expected_ctr(pos):
    for limit, ctr in CTR_BENCH:
        if pos <= limit:
            return ctr
    return 0.005


def short_page(url, site):
    root = site.replace("sc-domain:", "https://").rstrip("/")
    return url.replace(root, "") or "/"


def fetch(svc, site, window_days):
    (start, end), (pstart, pend) = windows(window_days)
    return {"windows": ((start, end), (pstart, pend)),
            "cur_q": query(svc, site, start, end, ["query"]),
            "prev_q": query(svc, site, pstart, pend, ["query"]),
            "cur_p": query(svc, site, start, end, ["page"]),
            "prev_p": query(svc, site, pstart, pend, ["page"]),
            "cur_qp": query(svc, site, start, end, ["query", "page"])}


def analyze(data, thresholds):
    prev_by_q = {r["keys"][0]: r for r in data["prev_q"]}
    prev_by_p = {r["keys"][0]: r for r in data["prev_p"]}
    page_for_q = {}
    for r in data["cur_qp"]:
        q, p = r["keys"]
        if q not in page_for_q or r["impressions"] > page_for_q[q]["impressions"]:
            page_for_q[q] = {"page": p, "impressions": r["impressions"]}

    def totals(rows):
        clicks = sum(r["clicks"] for r in rows)
        imp = sum(r["impressions"] for r in rows)
        pos = (sum(r["position"] * r["impressions"] for r in rows) / imp) if imp else 0
        return {"clicks": clicks, "impressions": imp, "position": pos}

    striking, watch, ctr_fix = [], [], []
    for r in data["cur_q"]:
        q, pos, imp = r["keys"][0], r["position"], r["impressions"]
        prev = prev_by_q.get(q)
        row = {"query": q, "page": page_for_q.get(q, {}).get("page", ""),
               "position": pos, "impressions": imp, "clicks": r["clicks"],
               "ctr": r["ctr"], "prev_pos": prev["position"] if prev else None}
        if 8 <= pos <= 20 and imp >= thresholds.get("striking", 2):
            striking.append(row)
        elif 20 < pos <= 40 and imp >= thresholds.get("watch", 2):
            watch.append(row)
        if imp >= thresholds.get("ctr_fix", 10) and r["ctr"] < expected_ctr(pos):
            ctr_fix.append(row)

    for bucket in (striking, watch, ctr_fix):
        bucket.sort(key=lambda r: -r["impressions"])

    movers = []
    cur_by_p = {r["keys"][0]: r for r in data["cur_p"]}
    for p in set(cur_by_p) | set(prev_by_p):
        ci = cur_by_p.get(p, {}).get("impressions", 0)
        pi = prev_by_p.get(p, {}).get("impressions", 0)
        if ci + pi >= 3 and ci != pi:
            movers.append({"page": p, "cur": ci, "prev": pi, "delta": ci - pi})
    movers.sort(key=lambda m: -abs(m["delta"]))

    top_pages = sorted(data["cur_p"],
                       key=lambda r: (-r["clicks"], -r["impressions"]))[:15]

    return {"totals_cur": totals(data["cur_q"]),
            "totals_prev": totals(data["prev_q"]),
            "striking": striking, "watch": watch, "ctr_fix": ctr_fix,
            "movers": movers[:10], "top_pages": top_pages}


def report_md(res, data, site):
    (start, end), (pstart, pend) = data["windows"]
    t, p = res["totals_cur"], res["totals_prev"]
    L = [f"# GSC weekly review — {site}",
         f"{start} to {end} (vs {pstart} to {pend})", "",
         f"**Clicks {t['clicks']}** (prev {p['clicks']}) · "
         f"**Impressions {t['impressions']}** (prev {p['impressions']}) · "
         f"avg position {t['position']:.1f} (prev {p['position']:.1f})", ""]

    def table(rows):
        out = ["| Query | Page | Pos | Impr | Clicks | Prev pos |",
               "|---|---|---|---|---|---|"]
        for r in rows:
            pv = f"{r['prev_pos']:.0f}" if r["prev_pos"] else "-"
            out.append(f"| {r['query']} | {short_page(r['page'], site)} | "
                       f"{r['position']:.1f} | {r['impressions']} | "
                       f"{r['clicks']} | {pv} |")
        return out

    L += ["## Striking distance (pos 8-20) — act on these first"]
    L += table(res["striking"]) if res["striking"] else ["(none this week)"]
    L += ["", "## CTR fixes (ranking, not clicked)"]
    L += table(res["ctr_fix"]) if res["ctr_fix"] else ["(none this week)"]
    L += ["", "## Watch list (pos 21-40) — no action yet"]
    L += table(res["watch"][:15]) if res["watch"] else ["(none this week)"]
    L += ["", "## Biggest page movers (impressions vs prior window)"]
    if res["movers"]:
        for m in res["movers"]:
            sign = "+" if m["delta"] > 0 else ""
            L.append(f"- {short_page(m['page'], site)}: {m['prev']} -> {m['cur']} "
                     f"({sign}{m['delta']})")
    else:
        L.append("(no meaningful movement yet)")
    L += ["", "## Top pages (current window)"]
    for r in res["top_pages"]:
        L.append(f"- {short_page(r['keys'][0], site)}: {r['impressions']} impr, "
                 f"{r['clicks']} clicks, pos {r['position']:.1f}")
    return "\n".join(L)


def main():
    if hasattr(sys.stdout, "reconfigure"):  # Windows console defaults to cp1252
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    cfg = load_config()
    site = cfg["site_url"]
    svc = gsc_service(cfg)
    print(f"pulling Search Console data for {site} ...")
    data = fetch(svc, site, cfg.get("window_days", 28))
    res = analyze(data, cfg.get("min_impressions", {}))
    md = report_md(res, data, site)

    outdir = os.path.join(HERE, "seo-reports")
    os.makedirs(outdir, exist_ok=True)
    out = os.path.join(outdir, f"gsc-weekly-{datetime.date.today()}.md")
    with open(out, "w", encoding="utf-8") as f:
        f.write(md)
    print()
    print(md)
    print(f"\n(saved to {out})")

    if "--json" in sys.argv:
        jout = out.replace(".md", ".json")
        dump = {k: v for k, v in res.items()}
        with open(jout, "w", encoding="utf-8") as f:
            json.dump(dump, f, indent=1, default=str)
        print(f"(raw buckets: {jout})")


if __name__ == "__main__":
    main()

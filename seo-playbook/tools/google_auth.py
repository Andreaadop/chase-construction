#!/usr/bin/env python3
"""
google_auth.py — One-time Google OAuth consent for the SEO playbook.

Finds client_secret_*.json in the playbook folder (or project root), runs the
browser consent flow with the Search Console scope, and saves a refreshable
token to the path named in seo_config.json ("token_path", default
google_token.json, saved next to seo_config.json).

Usage:
  python tools/google_auth.py

When the browser opens, pick the Google account that owns the site's Search
Console property. Re-run any time to switch accounts.

Requires: pip install google-auth google-auth-oauthlib google-api-python-client
"""
import glob
import json
import os
import sys

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # playbook root
SCOPES = ["https://www.googleapis.com/auth/webmasters"]


def load_config():
    path = os.path.join(HERE, "seo_config.json")
    if not os.path.exists(path):
        sys.exit("seo_config.json missing - copy seo_config.example.json and fill it in")
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def main():
    cfg = load_config()
    token_path = os.path.join(HERE, cfg.get("token_path", "google_token.json"))

    secrets = (glob.glob(os.path.join(HERE, "client_secret_*.json"))
               or glob.glob(os.path.join(HERE, "..", "client_secret_*.json")))
    if not secrets:
        sys.exit("No client_secret_*.json found - create an OAuth Desktop client "
                 "in Google Cloud (Search Console API enabled) and download it here")
    newest = max(secrets, key=os.path.getmtime)

    from google_auth_oauthlib.flow import InstalledAppFlow
    flow = InstalledAppFlow.from_client_secrets_file(newest, SCOPES)
    creds = flow.run_local_server(port=8765, prompt="select_account consent",
                                  authorization_prompt_message="",
                                  success_message="All set - you can close this tab.")
    with open(token_path, "w", encoding="utf-8") as f:
        f.write(creds.to_json())
    print(f"token saved to {token_path}")
    print("scopes:", creds.scopes)


if __name__ == "__main__":
    main()

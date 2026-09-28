#!/usr/bin/env python3
"""
gbp_auth.py - One-time Google OAuth consent for the Business Profile API.

Uses the OAuth Desktop client from the Cloud project where the Business
Profile API is enabled (client_secret_698375118697-*.json in the project root)
and saves a refreshable token to seo-playbook/gbp_token.json.

Usage:  python seo-playbook/tools/gbp_auth.py
Sign in as the Google account that manages the Chase Construction profile.
"""
import glob, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PLAYBOOK = os.path.join(ROOT, "seo-playbook")
TOKEN_PATH = os.path.join(PLAYBOOK, "gbp_token.json")
SCOPES = ["https://www.googleapis.com/auth/business.manage"]
CLIENT_GLOB = os.path.join(ROOT, "client_secret_698375118697-*.json")


def main():
    secrets = glob.glob(CLIENT_GLOB)
    if not secrets:
        sys.exit(f"No client secret matching {CLIENT_GLOB}")
    from google_auth_oauthlib.flow import InstalledAppFlow
    flow = InstalledAppFlow.from_client_secrets_file(secrets[0], SCOPES)
    creds = flow.run_local_server(port=8766, prompt="select_account consent",
                                  authorization_prompt_message="",
                                  success_message="All set - you can close this tab.")
    with open(TOKEN_PATH, "w", encoding="utf-8") as f:
        f.write(creds.to_json())
    print("token saved to", TOKEN_PATH)
    print("scopes:", creds.scopes)


if __name__ == "__main__":
    main()

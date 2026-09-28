#!/usr/bin/env python3
"""gbp_probe.py - list Business Profile accounts and locations reachable with gbp_token.json."""
import json, os, requests
import google.auth.transport.requests as tr
from google.oauth2.credentials import Credentials

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
creds = Credentials.from_authorized_user_file(os.path.join(HERE, "gbp_token.json"))
creds.refresh(tr.Request())
H = {"Authorization": "Bearer " + creds.token}

r = requests.get("https://mybusinessaccountmanagement.googleapis.com/v1/accounts", headers=H)
print("accounts:", r.status_code)
accts = r.json().get("accounts", []) if r.ok else []
if not r.ok: print(r.text[:800])
for a in accts:
    print(" -", a.get("name"), "|", a.get("accountName"), "|", a.get("type"), "|", a.get("role"))
    rm = "name,title,storefrontAddress,phoneNumbers,websiteUri,categories,metadata"
    l = requests.get(f"https://mybusinessbusinessinformation.googleapis.com/v1/{a['name']}/locations",
                     headers=H, params={"readMask": rm, "pageSize": 20})
    print("   locations:", l.status_code)
    if l.ok:
        for loc in l.json().get("locations", []):
            addr = loc.get("storefrontAddress", {})
            print("    *", loc.get("name"), "|", loc.get("title"), "|",
                  addr.get("locality"), addr.get("administrativeArea"), "|",
                  loc.get("phoneNumbers", {}).get("primaryPhone"), "|", loc.get("websiteUri"), "|",
                  loc.get("categories", {}).get("primaryCategory", {}).get("displayName"), "|",
                  "mapsUri=" + str(loc.get("metadata", {}).get("mapsUri")))
    else:
        print("   ", l.text[:800])

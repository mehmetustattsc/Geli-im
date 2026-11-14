"""Güncel bölümü için RSS ve Google Haberler'den başlık toplar -> data/news.json
GitHub Actions'ta her sabah çalışır. Sadece Python standart kütüphanesi kullanır.
Bir kaynak açılmazsa atlanır; liste yine oluşur. Kaynak eklemek için FEEDS'e satır ekle."""
import json, re, html, os, sys, time
import urllib.request, urllib.parse
import xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime
from datetime import datetime, timezone

def gnews(q, lang="de"):
    gl, ceid = ("DE", "DE:de") if lang == "de" else ("US", "US:en")
    return "https://news.google.com/rss/search?" + urllib.parse.urlencode({"q": q + " when:14d", "hl": lang, "gl": gl, "ceid": ceid})

# (kategori, kaynak adı, url, en fazla kaç yazı)
FEEDS = [
    ("ki",   "The Decoder",          "https://the-decoder.de/feed/", 4),
    ("ki",   "Google Haberler",      gnews("KI Controlling OR \"KI im Unternehmen\" OR Copilot Unternehmen"), 4),
    ("ctl",  "Google Haberler",      gnews("Controlling Digitalisierung OR Controller Automatisierung"), 5),
    ("de",   "DW: Langsam gesprochene Nachrichten", "https://rss.dw.com/xml/DKpodcast_lgn_de", 3),
    ("de",   "Google Haberler",      gnews("\"Deutsch lernen\" Beruf OR Berufssprache"), 2),
    ("sql",  "Brent Ozar",           "https://www.brentozar.com/feed/", 3),
    ("sql",  "SQLShack",             "https://www.sqlshack.com/feed/", 3),
    ("pbi",  "Power BI Blog",        "https://powerbi.microsoft.com/en-us/blog/feed/", 4),
    ("pbi",  "Google Haberler",      gnews("\"Power BI\"", "en"), 3),
    ("mkt",  "HubSpot",              "https://blog.hubspot.com/marketing/rss.xml", 4),
    ("mkt",  "Google Haberler",      gnews("Vereinsapp OR \"Vereins-App\" Amateurfußball OR Vereinsverwaltung"), 4),
    ("car",  "karrierebibel",        "https://karrierebibel.de/feed/", 4),
    ("car",  "Google Haberler",      gnews("Gehalt Controller OR Datenanalyst Gehalt OR Homeoffice Regelung"), 4),
    ("club", "Google Haberler",      gnews("Amateurfußball Baden OR \"Kreisliga Buchen\" OR Neckar-Odenwald Fußball"), 4),
]

UA = "Mozilla/5.0 (GelisimNewsBot; +https://github.com/mehmetustattsc/Geli-im)"
NS = {"atom": "http://www.w3.org/2005/Atom", "content": "http://purl.org/rss/1.0/modules/content/"}

def clean(s, n=220):
    s = html.unescape(re.sub(r"<[^>]+>", " ", s or ""))
    s = re.sub(r"\s+", " ", s).strip()
    return (s[: n - 1] + "…") if len(s) > n else s

def parse_date(s):
    if not s: return None
    try: return parsedate_to_datetime(s).astimezone(timezone.utc)
    except Exception: pass
    try: return datetime.fromisoformat(s.replace("Z", "+00:00")).astimezone(timezone.utc)
    except Exception: return None

def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/rss+xml, application/xml, text/xml, */*"})
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.read()

def items_of(raw):
    root = ET.fromstring(raw)
    out = []
    for it in root.iter("item"):
        src = it.find("source")
        out.append({"t": it.findtext("title"), "l": it.findtext("link"), "d": it.findtext("pubDate"),
                    "x": it.findtext("description"), "src": src.text if src is not None else None})
    for it in root.iter("{http://www.w3.org/2005/Atom}entry"):
        ln = it.find("atom:link", NS)
        out.append({"t": it.findtext("atom:title", namespaces=NS), "l": ln.get("href") if ln is not None else None,
                    "d": it.findtext("atom:updated", namespaces=NS) or it.findtext("atom:published", namespaces=NS),
                    "x": it.findtext("atom:summary", namespaces=NS), "src": None})
    return out

def main():
    res, seen, now = [], set(), datetime.now(timezone.utc)
    for cat, name, url, mx in FEEDS:
        try:
            raw = fetch(url)
            got = 0
            for it in items_of(raw):
                if not it["t"] or not it["l"]: continue
                title = clean(it["t"], 160)
                key = re.sub(r"\W+", "", title.lower())[:60]
                if key in seen: continue
                dt = parse_date(it["d"])
                if dt and (now - dt).days > 45: continue
                src = it["src"] or name
                if name == "Google Haberler" and " - " in title:  # "Başlık - Kaynak"
                    title, src = title.rsplit(" - ", 1)[0], title.rsplit(" - ", 1)[1]
                summ = "" if name == "Google Haberler" else clean(it["x"])
                seen.add(key)
                res.append({"t": title, "l": it["l"].strip(), "s": src, "tr": cat,
                            "d": dt.strftime("%d.%m.%Y") if dt else "", "ts": dt.timestamp() if dt else 0, "x": summ})
                got += 1
                if got >= mx: break
            print(f"ok   {cat:4} {name}: {got}")
        except Exception as e:
            print(f"skip {cat:4} {name}: {e}", file=sys.stderr)
        time.sleep(0.5)
    res.sort(key=lambda r: r["ts"], reverse=True)
    for r in res: r.pop("ts", None)
    os.makedirs("data", exist_ok=True)
    out = {"updated": datetime.now().strftime("%d.%m.%Y %H:%M"), "items": res}
    with open("data/news.json", "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=0)
    print(f"{len(res)} yazı yazıldı")

if __name__ == "__main__":
    main()

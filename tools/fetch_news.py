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

# ---------- podcastlar ----------
# (kategori, iTunes'ta aranacak ad, yedek RSS adresi, kaç bölüm)
# lern = Almanca öğrenmek için yavaş/açıklamalı, nat = doğal hızda Almanca, ki = yapay zekâ, is = iş ve kariyer
PODCASTS = [
    ("lern", "Langsam gesprochene Nachrichten", "https://rss.dw.com/xml/DKpodcast_lgn_de", 6),
    ("lern", "Top-Thema mit Vokabeln", "https://rss.dw.com/xml/DKpodcast_topthemamitvokabeln_de", 5),
    ("lern", "Easy German Podcast", None, 3),
    ("nat",  "tagesschau in 100 Sekunden", None, 3),
    ("nat",  "Deutschlandfunk Der Tag", None, 3),
    ("ki",   "KI-Update heise", None, 3),
    ("ki",   "Der KI-Podcast ARD", None, 2),
    ("is",   "Controlling Podcast", None, 3),
    ("is",   "Karriere Podcast Gehalt Bewerbung", None, 3),
]

def itunes(term):
    url = "https://itunes.apple.com/search?" + urllib.parse.urlencode({"term": term, "media": "podcast", "country": "DE", "limit": 1})
    j = json.loads(fetch(url))
    r = (j.get("results") or [None])[0]
    return (r.get("feedUrl"), r.get("collectionName"), r.get("artworkUrl600")) if r else (None, None, None)

def dur(s):
    if not s: return 0
    try:
        p = [int(float(x)) for x in s.strip().split(":")]
        return p[0] if len(p) == 1 else (p[-1] + p[-2] * 60 + (p[-3] * 3600 if len(p) > 2 else 0))
    except Exception: return 0

def podcasts():
    IT = "{http://www.itunes.com/dtds/podcast-1.0.dtd}"
    eps, now = [], datetime.now(timezone.utc)
    for cat, term, fallback, n in PODCASTS:
        try:
            feed, name, img = None, None, None
            try: feed, name, img = itunes(term)
            except Exception as e: print(f"itunes skip {term}: {e}", file=sys.stderr)
            feed = fallback or feed
            if not feed: raise Exception("feed yok")
            root = ET.fromstring(fetch(feed))
            ch = root.find("channel")
            name = (ch.findtext("title") if ch is not None else None) or name or term
            im = ch.find(IT + "image") if ch is not None else None
            img = img or (im.get("href") if im is not None else None)
            got = 0
            for it in root.iter("item"):
                enc = it.find("enclosure")
                if enc is None or not enc.get("url"): continue
                u = enc.get("url").strip()
                if u.startswith("http://"): u = "https://" + u[7:]
                dt = parse_date(it.findtext("pubDate"))
                if dt and (now - dt).days > 120: continue
                eim = it.find(IT + "image")
                eps.append({"id": (it.findtext("guid") or u)[:200], "t": clean(it.findtext("title"), 140), "show": clean(name, 60), "cat": cat,
                            "url": u, "img": (eim.get("href") if eim is not None else None) or img, "dur": dur(it.findtext(IT + "duration")),
                            "d": dt.strftime("%d.%m.%Y") if dt else "", "ts": dt.timestamp() if dt else 0})
                got += 1
                if got >= n: break
            print(f"pod  {cat:4} {name}: {got}")
        except Exception as e:
            print(f"pod skip {term}: {e}", file=sys.stderr)
        time.sleep(0.5)
    order = {"lern": 0, "nat": 1, "ki": 2, "is": 3}
    eps.sort(key=lambda e: (order.get(e["cat"], 9), -e["ts"]))
    for e in eps: e.pop("ts", None)
    with open("data/podcasts.json", "w", encoding="utf-8") as f:
        json.dump({"updated": datetime.now().strftime("%d.%m.%Y %H:%M"), "eps": eps}, f, ensure_ascii=False, indent=0)
    print(f"{len(eps)} bölüm yazıldı")

if __name__ == "__main__":
    main()
    podcasts()

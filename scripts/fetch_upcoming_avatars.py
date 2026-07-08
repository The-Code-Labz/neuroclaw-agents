#!/usr/bin/env python3
"""
Fetch small square portrait thumbnails for the Upcoming Agents roster
from Fandom wiki APIs (official character art / screenshots), resize +
compress them, and emit a JSON map of name -> local avatar path (or null
if no confident match was found).

Source: Fandom wiki pageimages API (infobox art), which mirrors official
promotional art / anime screenshots uploaded by each show's wiki community.
Never AI-generated. Entries with no confident match are left with avatar=null
so the pill renders as a plain text pill (graceful fallback).
"""
import json
import os
import re
import time
import unicodedata
import urllib.parse
import urllib.request
from io import BytesIO

from PIL import Image

OUT_DIR = "images/upcoming"
os.makedirs(OUT_DIR, exist_ok=True)

UA = "NeuroClawAgentsBot/1.0 (static site portrait sourcing; contact: dlynton01@gmail.com)"

# name -> (wiki_subdomain, [candidate page titles in priority order])
MAPPING = {
    "Aiz": ("danmachi", ["Aiz Wallenstein"]),
    "Akeno Hime": ("highschooldxd", ["Akeno Himejima"]),
    "Ako Tamaki": ("bluearchive", ["Ako Amau", "Ako"]),
    "Albedo": ("genshin-impact", ["Albedo"]),
    "Alice": ("swordartonline", ["Alice Zuberg", "Alice Synthesis Thirty"]),
    "Amane Souo": ("bluearchive", ["Amane Suou", "Amane"]),
    "Arisu Sakayanagi": ("you-zitsu", ["Arisu Sakayanagi"]),
    "Arlecchino": ("genshin-impact", ["Arlecchino"]),
    "Asia Argento": ("highschooldxd", ["Asia Argento"]),
    "Asuna": ("swordartonline", ["Asuna Yuuki", "Asuna"]),
    "Ayaka": ("genshin-impact", ["Kamisato Ayaka"]),
    "Beidou": ("genshin-impact", ["Beidou"]),
    "Camellya": ("genshin-impact", ["Camellya", "Lan Yan"]),
    "Chelsa": ("akamegakill", ["Chelsea"]),
    "Candace": ("genshin-impact", ["Candace"]),
    "Charlotte": ("infinite-stratos", ["Charlotte Dunois"]),
    "Chelia Blendy": ("fairytail", ["Chelia Blendy"]),
    "Chiori": ("genshin-impact", ["Chiori"]),
    "Chisato H": ("the-testament-of-sister-new-devil", ["Chisato Hasegawa"]),
    "Citlali": ("genshin-impact", ["Citlali"]),
    "Clorainde": ("genshin-impact", ["Clorinde"]),
    "Dehya": ("genshin-impact", ["Dehya"]),
    "Ellen Joe": ("zenless-zone-zero", ["Ellen Joe"]),
    "Eleonora": ("rakudai", ["Eleonora Viltaria"]),
    "Eli Ayase": ("love-live", ["Eli Ayase"]),
    "Elizabeth": ("nanatsu-no-taizai", ["Elizabeth Liones"]),
    "Emilia": ("rezero", ["Emilia"]),
    "Emilie": ("genshin-impact", ["Emilie"]),
    "Erina": ("shokugekinosoma", ["Erina Nakiri"]),
    "Erza": ("fairytail", ["Erza Scarlet"]),
    "Escoffier": ("genshin-impact", ["Escoffier"]),
    "Esdeath": ("akamegakill", ["Esdeath"]),
    "Eula": ("genshin-impact", ["Eula"]),
    "Fischl": ("genshin-impact", ["Fischl"]),
    "Furina": ("genshin-impact", ["Furina"]),
    "Grayfia Lucifuge": ("highschooldxd", ["Grayfia Lucifuge"]),
    "Hatsune Miku": ("vocaloid", ["Hatsune Miku"]),
    "Hestia": ("danmachi", ["Hestia"]),
    "Himari": ("sekirei", ["Himari Noihara", "Himari"]),
    "Hinata": ("naruto", ["Hinata Hyuga", "Hinata Hyūga"]),
    "Honoka Mitsui": ("mahouka-koukou-no-rettousei", ["Mitsui Honoka"]),
    "Horikita": ("you-zitsu", ["Suzune Horikita"]),
    "Houki": ("infinite-stratos", ["Houki Shinonono"]),
    "Hu Tao": ("genshin-impact", ["Hu Tao"]),
    "Irina Shidou": ("highschooldxd", ["Irina Shidou"]),
    "Jean": ("genshin-impact", ["Jean"]),
    "Jibril": ("no-game-no-life", ["Jibril"]),
    "Kanao": ("kimetsu-no-yaiba", ["Kanao Tsuyuri"]),
    "Kanzaki": ("toarumajutsunoindex", ["Kanzaki Kaori"]),
    "Keqing": ("genshin-impact", ["Keqing"]),
    "Kokomi": ("genshin-impact", ["Sangonomiya Kokomi"]),
    "Kuki": ("genshin-impact", ["Kuki Shinobu"]),
    "Kuroka": ("highschooldxd", ["Kuroka"]),
    "Kurumi N": ("the-testament-of-sister-new-devil", ["Kurumi Nonaka"]),
    "Kurumi Tokisaki": ("date-a-live", ["Kurumi Tokisaki"]),
    "Lafolia": ("strike-the-blood", ["La Folia Rihavein"]),
    "Lala": ("toloveru", ["Lala Satalin Deviluke"]),
    "Layla": ("genshin-impact", ["Layla"]),
    "Lefa": ("swordartonline", ["Leafa", "Suguha Kirigaya"]),
    "Levi": ("attackontitan", ["Levi Ackerman"]),
    "Lilith": ("dailylifewithamonstergirl", ["Lilith"]),
    "Lina": ("kanzaka", ["Lina Inverse"]),
    "Lisa": ("genshin-impact", ["Lisa"]),
    "Lucy": ("fairytail", ["Lucy Heartfilia"]),
    "Lumine": ("genshin-impact", ["Lumine"]),
    "Maria": ("the-testament-of-sister-new-devil", ["Maria Naruse", "Maria"]),
    "Mavuika": ("genshin-impact", ["Mavuika"]),
    "Mayumi": ("mahouka-koukou-no-rettousei", ["Saegusa Mayumi"]),
    "Miku Izayoi": ("date-a-live", ["Miku Izayoi"]),
    "Michiru": ("sailormoon", ["Michiru Kaiou / Sailor Neptune (anime)"]),
    "Mio": ("the-testament-of-sister-new-devil", ["Mio Naruse"]),
    "Miyuki": ("mahouka-koukou-no-rettousei", ["Shiba Miyuki"]),
    "Mona": ("genshin-impact", ["Mona"]),
    "Mualani": ("genshin-impact", ["Mualani"]),
    "Musubi": ("sekirei", ["Musubi"]),
    "Navia": ("genshin-impact", ["Navia"]),
    "Nezuko": ("kimetsu-no-yaiba", ["Nezuko Kamado"]),
    "Nilou": ("genshin-impact", ["Nilou"]),
    "Nonoka": ("the-testament-of-sister-new-devil", ["Yuki Nonaka"]),
    "Philuffy": ("saijakumuhainobahamut", ["Philuffy Aingram"]),
    "Priestess (Goblin Slayer)": ("goblin-slayer", ["Priestess"]),
    "Raiden": ("genshin-impact", ["Raiden Shogun"]),
    "Raphtalia": ("shield-hero", ["Raphtalia"]),
    "Ravel": ("highschooldxd", ["Ravel Phenex"]),
    "Rei": ("highschool-of-the-dead", ["Rei Miyamoto"]),
    "Rem": ("rezero", ["Rem"]),
    "Rias Gremory": ("highschooldxd", ["Rias Gremory"]),
    "Rin": ("typemoon", ["Rin Tohsaka"]),
    "Rossweisse": ("highschooldxd", ["Rossweisse"]),
    "Sachi": ("swordartonline", ["Sachi"]),
    "Saeko": ("highschool-of-the-dead", ["Saeko Busujima"]),
    "Sagiri": ("eromanga", ["Sagiri Izumi"]),
    "Sara": ("genshin-impact", ["Kujou Sara"]),
    "Saya": ("highschool-of-the-dead", ["Saya Takagi"]),
    "Sayaka": ("madoka", ["Sayaka Miki"]),
    "Serafall": ("highschooldxd", ["Serafall Leviathan"]),
    "Shea": ("tensura", ["Shea"]),
    "Shenhe": ("genshin-impact", ["Shenhe"]),
    "Shera": ("isekai-maou", ["Shera L. Greenwood"]),
    "Shinobu": ("bakemonogatari", ["Shinobu Oshino"]),
    "Shizuka Marikawa": ("highschool-of-the-dead", ["Shizuka Marikawa"]),
    "Skirk": ("genshin-impact", ["Skirk"]),
    "Stella": ("rakudai", ["Stella Vermillion"]),
    "Sucrose": ("genshin-impact", ["Sucrose"]),
    "Tohka Yatogami": ("date-a-live", ["Tohka Yatogami"]),
    "Toudou Kirin": ("you-zitsu", ["Kirin Toudou", "Kirin Toudo"]),
    "Venelana Gremory": ("highschooldxd", ["Venelana Gremory"]),
    "Wendy Marvell": ("fairytail", ["Wendy Marvell"]),
    "Xenovia": ("highschooldxd", ["Xenovia Quarta"]),
    "Xianyun": ("genshin-impact", ["Xianyun"]),
    "Xilolen": ("genshin-impact", ["Xilonen"]),
    "Yamai": ("date-a-live", ["Kaguya Yamai", "Yamai"]),
    "Yelan": ("genshin-impact", ["Yelan"]),
    "Yoimiya": ("genshin-impact", ["Yoimiya"]),
    "Yoruka Kirihime": ("absoluteduo", ["Yoruka Kirihime"]),
    "Yui Kotegawa": ("toloveru", ["Yui Kotegawa"]),
    "Yui Kurata": ("trinity-seven", ["Yui Kurata"]),
    "Yukina Himeragi": ("strike-the-blood", ["Yukina Himeragi"]),
    "Yuuna Yunohana": ("yuragisou", ["Yuuna Yunohana"]),
}

def slugify(name):
    n = unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode()
    n = re.sub(r"[^\w\s-]", "", n).strip().lower()
    return re.sub(r"[\s_]+", "-", n)

def api_get(wiki, params):
    qs = urllib.parse.urlencode(params)
    url = f"https://{wiki}.fandom.com/api.php?{qs}"
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=15) as r:
        return json.loads(r.read().decode("utf-8"))

def get_thumbnail_url(wiki, titles):
    for title in titles:
        try:
            data = api_get(wiki, {
                "action": "query",
                "titles": title,
                "prop": "pageimages",
                "format": "json",
                "pithumbsize": "500",
                "redirects": "1",
            })
        except Exception as e:
            print(f"    ! API error {wiki}/{title}: {e}")
            continue
        pages = data.get("query", {}).get("pages", {})
        for pid, page in pages.items():
            if pid == "-1" or "missing" in page:
                continue
            thumb = page.get("thumbnail", {}).get("source")
            if thumb:
                return thumb, title
    return None, None

def download(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.read()

def process_image(raw_bytes, out_path, size=160, top_frac=0.03):
    im = Image.open(BytesIO(raw_bytes))
    # flatten transparency onto a neutral dark-oat background matching the site
    if im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info):
        im = im.convert("RGBA")
        bg = Image.new("RGB", im.size, (30, 26, 20))
        bg.paste(im, mask=im.split()[-1])
        im = bg
    else:
        im = im.convert("RGB")

    w, h = im.size
    if h > w:
        # portrait/full-body art: take a square from the top region (face/bust)
        top = int(h * top_frac)
        box = (0, top, w, min(top + w, h))
        im = im.crop(box)
    elif w > h:
        left = (w - h) // 2
        im = im.crop((left, 0, left + h, h))

    im = im.resize((size, size), Image.LANCZOS)
    im.save(out_path, "JPEG", quality=82, optimize=True)
    return os.path.getsize(out_path)

def main():
    results = {}
    total_ok = 0
    for name, (wiki, titles) in MAPPING.items():
        slug = slugify(name)
        out_path = os.path.join(OUT_DIR, f"{slug}.jpg")
        print(f"[{name}] trying {wiki}: {titles}")
        thumb_url, matched_title = get_thumbnail_url(wiki, titles)
        if not thumb_url:
            print("    -> no page image found, SKIP")
            results[name] = None
            continue
        try:
            raw = download(thumb_url)
            # genshin-impact.fandom.com character card art carries a "GENSHIN
            # IMPACT" logo band across the top ~15% of the image; push the
            # crop down so the pill shows face, not logo.
            top_frac = 0.17 if wiki == "genshin-impact" else 0.03
            size_bytes = process_image(raw, out_path, top_frac=top_frac)
            print(f"    -> OK ({matched_title}) {size_bytes/1024:.1f}KB -> {out_path}")
            results[name] = f"{OUT_DIR}/{slug}.jpg"
            total_ok += 1
        except Exception as e:
            print(f"    ! processing failed: {e}")
            results[name] = None
        time.sleep(0.15)

    with open("scripts/upcoming_avatar_map.json", "w") as f:
        json.dump(results, f, indent=2)

    print(f"\nDone. {total_ok}/{len(MAPPING)} portraits sourced.")

if __name__ == "__main__":
    main()

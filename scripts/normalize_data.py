#!/usr/bin/env python3
"""
Normalize CKJV flat-verse JSON into book/chapter/verse hierarchy.
Output: data/ckjv.json
"""
import json
import re

RAW = "/home/node/bible-reader/data/ckjv_raw.json"
OUT = "/home/node/bible-reader/data/ckjv.json"

BOOK_NAMES_TC = {
    1: "創世記", 2: "出埃及記", 3: "利未記", 4: "民數記", 5: "申命記",
    6: "約書亞記", 7: "士師記", 8: "路得記", 9: "撒母耳記上", 10: "撒母耳記下",
    11: "列王紀上", 12: "列王紀下", 13: "歷代志上", 14: "歷代志下", 15: "以斯拉記",
    16: "尼希米記", 17: "以斯帖記", 18: "約伯記", 19: "詩篇", 20: "箴言",
    21: "傳道書", 22: "雅歌", 23: "以賽亞書", 24: "耶利米書", 25: "耶利米哀歌",
    26: "以西結書", 27: "但以理書", 28: "何西阿書", 29: "約珥書", 30: "阿摩司書",
    31: "俄巴底亞書", 32: "約拿書", 33: "彌迦書", 34: "那鴻書", 35: "哈巴谷書",
    36: "西番雅書", 37: "哈該書", 38: "撒迦利亞書", 39: "瑪拉基書",
    40: "馬太福音", 41: "馬可福音", 42: "路加福音", 43: "約翰福音", 44: "使徒行傳",
    45: "羅馬書", 46: "哥林多前書", 47: "哥林多後書", 48: "加拉太書",
    49: "以弗所書", 50: "腓立比書", 51: "歌羅西書",
    52: "帖撒羅尼迦前書", 53: "帖撒羅尼迦後書",
    54: "提摩太前書", 55: "提摩太後書", 56: "提多書", 57: "腓利門書",
    58: "希伯來書", 59: "雅各書", 60: "彼得前書", 61: "彼得後書",
    62: "約翰一書", 63: "約翰二書", 64: "約翰三書", 65: "猶大書", 66: "啟示錄",
}

BOOK_NAMES_EN = {
    1: "Genesis", 2: "Exodus", 3: "Leviticus", 4: "Numbers", 5: "Deuteronomy",
    6: "Joshua", 7: "Judges", 8: "Ruth", 9: "1 Samuel", 10: "2 Samuel",
    11: "1 Kings", 12: "2 Kings", 13: "1 Chronicles", 14: "2 Chronicles", 15: "Ezra",
    16: "Nehemiah", 17: "Esther", 18: "Job", 19: "Psalms", 20: "Proverbs",
    21: "Ecclesiastes", 22: "Song of Solomon", 23: "Isaiah", 24: "Jeremiah",
    25: "Lamentations", 26: "Ezekiel", 27: "Daniel", 28: "Hosea", 29: "Joel",
    30: "Amos", 31: "Obadiah", 32: "Jonah", 33: "Micah", 34: "Nahum",
    35: "Habakkuk", 36: "Zephaniah", 37: "Haggai", 38: "Zechariah", 39: "Malachi",
    40: "Matthew", 41: "Mark", 42: "Luke", 43: "John", 44: "Acts",
    45: "Romans", 46: "1 Corinthians", 47: "2 Corinthians", 48: "Galatians",
    49: "Ephesians", 50: "Philippians", 51: "Colossians",
    52: "1 Thessalonians", 53: "2 Thessalonians",
    54: "1 Timothy", 55: "2 Timothy", 56: "Titus", 57: "Philemon",
    58: "Hebrews", 59: "James", 60: "1 Peter", 61: "2 Peter",
    62: "1 John", 63: "2 John", 64: "3 John", 65: "Jude", 66: "Revelation",
}

TESTAMENT = {**{i: "舊約" for i in range(1, 40)}, **{i: "新約" for i in range(40, 67)}}


def clean_text(t: str) -> str:
    t = t.replace("¶ ", "").replace("¶", "")
    t = t.replace("　", "")
    return t.strip()


def normalize():
    with open(RAW, encoding="utf-8") as f:
        raw = json.load(f)

    verses = raw["verses"]

    # Group by book → chapter → verse
    books_map: dict[int, dict] = {}
    for v in verses:
        b = v["book"]
        c = v["chapter"]
        vn = v["verse"]
        text = clean_text(v["text"])

        if b not in books_map:
            books_map[b] = {"chapters": {}}
        if c not in books_map[b]["chapters"]:
            books_map[b]["chapters"][c] = []
        books_map[b]["chapters"][c].append({"number": vn, "text": text})

    books = []
    for b_id in sorted(books_map.keys()):
        chapters_raw = books_map[b_id]["chapters"]
        chapters = [
            {"number": ch_num, "verses": chapters_raw[ch_num]}
            for ch_num in sorted(chapters_raw.keys())
        ]
        books.append({
            "id": b_id,
            "name": BOOK_NAMES_TC.get(b_id, f"書卷{b_id}"),
            "nameEn": BOOK_NAMES_EN.get(b_id, ""),
            "testament": TESTAMENT.get(b_id, ""),
            "chapters": chapters,
        })

    result = {
        "name": "中文英王欽定本（上帝版）",
        "nameEn": "Chinese King James Version (Shang-Di)",
        "books": books,
    }

    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, separators=(",", ":"))

    total_verses = sum(
        len(ch["verses"]) for b in books for ch in b["chapters"]
    )
    print(f"Done! {len(books)} books, {total_verses} verses → {OUT}")
    print(f"Sample Gen 1:1 → {books[0]['chapters'][0]['verses'][0]}")


if __name__ == "__main__":
    normalize()

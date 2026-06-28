#!/usr/bin/env python3
"""
Fetch CKJV (Chinese King James Version - 上帝版繁體) from bolls.life Bible API.
API: https://bolls.life/api/bolls/get_books/{translation}/
"""
import json
import urllib.request
import time
import sys

TRANSLATION = "CKJUV"  # Chinese KJV Upper case version
BOOKS_API = f"https://bolls.life/api/bolls/get_books/{TRANSLATION}/"
CHAPTER_API = "https://bolls.life/api/bolls/get_chapter/{translation}/{book_id}/{chapter}/"
OUT_PATH = "/home/node/bible-reader/data/ckjv.json"


def fetch_json(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode('utf-8'))


def main():
    print("Fetching book list...")
    try:
        books_raw = fetch_json(BOOKS_API)
    except Exception as e:
        print(f"Failed to fetch books: {e}")
        print("Trying alternative translation code...")
        global TRANSLATION
        TRANSLATION = "CUVMPT"  # Chinese Union Version - Traditional (fallback)
        books_raw = fetch_json(f"https://bolls.life/api/bolls/get_books/{TRANSLATION}/")

    print(f"Got {len(books_raw)} books")

    books = []
    for book_info in books_raw:
        book_id = book_info['bookid']
        book_name = book_info['name']
        chapters_count = book_info['chapters']
        print(f"  [{book_id}] {book_name} ({chapters_count} chapters)")

        chapters = []
        for ch_num in range(1, chapters_count + 1):
            url = CHAPTER_API.format(translation=TRANSLATION, book_id=book_id, chapter=ch_num)
            try:
                verses_raw = fetch_json(url)
                verses = [
                    {'number': v['verse'], 'text': v['text']}
                    for v in verses_raw
                ]
                chapters.append({'number': ch_num, 'verses': verses})
            except Exception as e:
                print(f"    Error ch{ch_num}: {e}")
                chapters.append({'number': ch_num, 'verses': []})
            time.sleep(0.05)  # be polite to the API

        books.append({
            'id': book_id,
            'name': book_name,
            'chapters': chapters
        })

    result = {
        'name': '中文英王欽定本',
        'nameEn': 'Chinese King James Version',
        'translation': TRANSLATION,
        'books': books
    }

    with open(OUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print(f"\nDone! {len(books)} books → {OUT_PATH}")


if __name__ == '__main__':
    main()

#!/usr/bin/env python3
"""
Extract Book of Jasher from PDF into structured JSON.
The PDF embeds verse numbers inline within paragraphs (not line-starts).
Format: "1 text...  2 text...  3 text..."
"""
import re
import json
import urllib.request
import os

PDF_URL = "https://1802261014.rsc.cdn77.org/wp-content/uploads/%E9%9B%85%E7%85%9E%E7%8F%A5%E6%9B%B81%E8%87%B391%E7%AB%A0NEW.pdf"
PDF_PATH = "/home/node/bible-reader/data/jasher_raw.pdf"
OUT_PATH = "/home/node/bible-reader/data/jasher.json"

CHINESE_NUMS = {
    '一': 1, '二': 2, '三': 3, '四': 4, '五': 5,
    '六': 6, '七': 7, '八': 8, '九': 9, '十': 10,
    '十一': 11, '十二': 12, '十三': 13, '十四': 14, '十五': 15,
    '十六': 16, '十七': 17, '十八': 18, '十九': 19, '二十': 20,
    '二十一': 21, '二十二': 22, '二十三': 23, '二十四': 24, '二十五': 25,
    '二十六': 26, '二十七': 27, '二十八': 28, '二十九': 29, '三十': 30,
    '三十一': 31, '三十二': 32, '三十三': 33, '三十四': 34, '三十五': 35,
    '三十六': 36, '三十七': 37, '三十八': 38, '三十九': 39, '四十': 40,
    '四十一': 41, '四十二': 42, '四十三': 43, '四十四': 44, '四十五': 45,
    '四十六': 46, '四十七': 47, '四十八': 48, '四十九': 49, '五十': 50,
    '五十一': 51, '五十二': 52, '五十三': 53, '五十四': 54, '五十五': 55,
    '五十六': 56, '五十七': 57, '五十八': 58, '五十九': 59, '六十': 60,
    '六十一': 61, '六十二': 62, '六十三': 63, '六十四': 64, '六十五': 65,
    '六十六': 66, '六十七': 67, '六十八': 68, '六十九': 69, '七十': 70,
    '七十一': 71, '七十二': 72, '七十三': 73, '七十四': 74, '七十五': 75,
    '七十六': 76, '七十七': 77, '七十八': 78, '七十九': 79, '八十': 80,
    '八十一': 81, '八十二': 82, '八十三': 83, '八十四': 84, '八十五': 85,
    '八十六': 86, '八十七': 87, '八十八': 88, '八十九': 89, '九十': 90,
    '九十一': 91,
}


def download_pdf():
    if os.path.exists(PDF_PATH):
        print(f"PDF already exists: {PDF_PATH}")
        return
    print("Downloading PDF...")
    req = urllib.request.Request(PDF_URL, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as resp, open(PDF_PATH, 'wb') as f:
        f.write(resp.read())
    print(f"Downloaded to {PDF_PATH}")


def clean_line(line: str) -> str:
    # Remove page number patterns like "4/124", "5/124"
    line = re.sub(r'\b\d+/124\b', '', line)
    return line.strip()


def extract():
    import pdfplumber

    download_pdf()

    # 1. Extract all text, skipping cover/TOC pages (first 3 pages)
    all_lines = []
    with pdfplumber.open(PDF_PATH) as pdf:
        for page_idx, page in enumerate(pdf.pages):
            if page_idx < 3:
                continue  # skip cover + TOC pages
            text = page.extract_text() or ''
            for line in text.split('\n'):
                cleaned = clean_line(line)
                if cleaned:
                    all_lines.append(cleaned)

    # 2. Join into one big string with spaces
    full_text = ' '.join(all_lines)

    # 3. Split on chapter markers: 第X章
    # Pattern: 第[Chinese numeral]章
    chapter_re = re.compile(r'第([一二三四五六七八九十]+)章')
    chapter_splits = list(chapter_re.finditer(full_text))

    chapters = []
    for i, m in enumerate(chapter_splits):
        ch_num_str = m.group(1)
        ch_num = CHINESE_NUMS.get(ch_num_str, 0)
        if ch_num == 0:
            continue
        # Chapter text: from after "第X章" to next chapter marker (or end)
        start = m.end()
        end = chapter_splits[i + 1].start() if i + 1 < len(chapter_splits) else len(full_text)
        ch_text = full_text[start:end].strip()

        # 4. Split into verses using inline verse numbers
        # Handles both: "1 神說" (space) and "1那年" (no space) styles
        verse_re = re.compile(
            r'(?:(?<=[。！？"」』）])|(?<=\s)|(?:^))(\d{1,3})\s*(?=[一-鿿"「『（"])'
        )

        # Split on verse boundaries
        parts = verse_re.split(ch_text)
        # parts alternates: [text_before_v1, verse_num, verse_text, verse_num, verse_text, ...]
        # After split with capturing group: [pre, v_num, v_text, v_num, v_text, ...]

        verses = []
        # Find all verse starts
        matches = list(verse_re.finditer(ch_text))
        for j, vm in enumerate(matches):
            vnum = int(vm.group(1))
            v_start = vm.end()
            v_end = matches[j + 1].start() if j + 1 < len(matches) else len(ch_text)
            v_text = ch_text[v_start:v_end].strip()
            # Collapse whitespace, remove stray page numbers
            v_text = re.sub(r'\s*\d+/124\s*', ' ', v_text)
            v_text = re.sub(r'\s+', ' ', v_text).strip()
            if v_text:
                verses.append({'number': vnum, 'text': v_text})

        if verses:
            chapters.append({
                'number': ch_num,
                'title': f'第{ch_num_str}章',
                'verses': verses,
            })

    result = {
        'name': '雅煞珥書',
        'nameEn': 'Book of Jasher',
        'chapters': sorted(chapters, key=lambda c: c['number']),
    }

    with open(OUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print(f"Done! {len(chapters)} chapters extracted → {OUT_PATH}")
    if chapters:
        ch1 = chapters[0]
        print(f"Ch1 verses: {len(ch1['verses'])}")
        for v in ch1['verses'][:3]:
            print(f"  v{v['number']}: {v['text'][:50]}...")


if __name__ == '__main__':
    extract()

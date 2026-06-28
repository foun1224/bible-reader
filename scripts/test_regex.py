import re

# New regex: match verse numbers preceded by sentence-end, closing bracket, whitespace, or start of string
# Followed by a Chinese character
verse_re = re.compile(
    r'(?:(?<=[。！？"」』）])|(?<=\s)|(?:^))(\d{1,3})\s*(?=[一-鿿“「『（"])'
)

# Test chapter 15 style: no space after number
sample = '1那年迦南遍地有大饑荒，飢荒甚大，那地的百姓不能存留。2亞伯蘭因飢荒，帶著他家裡所有的人起身去到埃及。3他們來到密茲萊溪旁。'
matches = list(verse_re.finditer(sample))
print('Ch15 style matches:', [(m.group(1), m.start()) for m in matches])

# Test chapter 1 style: space after number
sample2 = '1 神說："要有光"，就有了光。2 神看光是好的。3 神稱光為晝。'
matches2 = list(verse_re.finditer(sample2))
print('Ch1 style matches:', [(m.group(1), m.start()) for m in matches2])

# Test with ages/years to ensure they don't match mid-sentence
sample3 = '亞伯蘭生在地上活到一百三十歲，又生了一個兒子。2耶和華命令他。'
matches3 = list(verse_re.finditer(sample3))
print('Age test matches:', [(m.group(1), m.start()) for m in matches3])

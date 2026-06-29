export interface ScriptureRef {
  display: string     // "約翰福音 6:67-71"
  chineseName: string // "約翰福音"
  chapter: number     // 6
}

export interface DevotionData {
  date: string        // "0630"
  scriptures: ScriptureRef[]
  observations: string[]
  responses: string[]
  prayer: string
}

const EN_TO_ZH: Record<string, string> = {
  Genesis: '創世記', Exodus: '出埃及記', Leviticus: '利未記', Numbers: '民數記',
  Deuteronomy: '申命記', Joshua: '約書亞記', Judges: '士師記', Ruth: '路得記',
  '1+Samuel': '撒母耳記上', '2+Samuel': '撒母耳記下',
  '1+Kings': '列王紀上', '2+Kings': '列王紀下',
  '1+Chronicles': '歷代志上', '2+Chronicles': '歷代志下',
  Ezra: '以斯拉記', Nehemiah: '尼希米記', Esther: '以斯帖記', Job: '約伯記',
  Psalms: '詩篇', Psalm: '詩篇', Proverbs: '箴言', Ecclesiastes: '傳道書',
  'Song+of+Solomon': '雅歌', Isaiah: '以賽亞書', Jeremiah: '耶利米書',
  Lamentations: '耶利米哀歌', Ezekiel: '以西結書', Daniel: '但以理書',
  Hosea: '何西阿書', Joel: '約珥書', Amos: '阿摩司書', Obadiah: '俄巴底亞書',
  Jonah: '約拿書', Micah: '彌迦書', Nahum: '那鴻書', Habakkuk: '哈巴谷書',
  Zephaniah: '西番雅書', Haggai: '哈該書', Zechariah: '撒迦利亞書', Malachi: '瑪拉基書',
  Matthew: '馬太福音', Mark: '馬可福音', Luke: '路加福音', John: '約翰福音',
  Acts: '使徒行傳', Romans: '羅馬書',
  '1+Corinthians': '哥林多前書', '2+Corinthians': '哥林多後書',
  Galatians: '加拉太書', Ephesians: '以弗所書', Philippians: '腓立比書',
  Colossians: '歌羅西書',
  '1+Thessalonians': '帖撒羅尼迦前書', '2+Thessalonians': '帖撒羅尼迦後書',
  '1+Timothy': '提摩太前書', '2+Timothy': '提摩太後書',
  Titus: '提多書', Philemon: '腓利門書', Hebrews: '希伯來書', James: '雅各書',
  '1+Peter': '彼得前書', '2+Peter': '彼得後書',
  '1+John': '約翰一書', '2+John': '約翰二書', '3+John': '約翰三書',
  Jude: '猶大書', Revelation: '啟示錄',
}

function parseBibleGatewayRef(href: string): ScriptureRef | null {
  try {
    const searchMatch = href.match(/[?&]search=([^&]+)/)
    if (!searchMatch) return null
    const raw = searchMatch[1] // e.g. "John+6%3A67-71" or "Matthew+16%3A1-12"
    const decoded = decodeURIComponent(raw) // "John 6:67-71"
    const spaceIdx = decoded.lastIndexOf(' ')
    if (spaceIdx === -1) return null
    const bookRaw = decoded.slice(0, spaceIdx)       // "John" or "1 Corinthians"
    const refPart = decoded.slice(spaceIdx + 1)       // "6:67-71"
    const chapter = parseInt(refPart.split(':')[0])
    if (isNaN(chapter)) return null

    // Try matching the book key (encoded with +)
    const bookKey = raw.split('%')[0].split(':')[0].split('+').slice(0, -1).join('+')
    const chineseName = EN_TO_ZH[bookKey] ?? EN_TO_ZH[bookRaw.replace(/ /g, '+')] ?? null
    if (!chineseName) return null

    const versePart = refPart.includes(':') ? ':' + refPart.split(':')[1] : ''
    return { display: `${chineseName} ${chapter}${versePart}`, chineseName, chapter }
  } catch {
    return null
  }
}

function extractListItems(sectionHtml: string): string[] {
  const items: string[] = []
  const re = /<li[^>]*>([\s\S]*?)<\/li>/gi
  let m
  while ((m = re.exec(sectionHtml)) !== null) {
    const text = m[1].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').trim()
    if (text) items.push(text)
  }
  return items
}

function extractText(sectionHtml: string): string {
  return sectionHtml.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').trim()
}

function sliceSection(html: string, fromMarker: string, toMarker?: string): string {
  const fromIdx = html.indexOf(fromMarker)
  if (fromIdx === -1) return ''
  const start = fromIdx + fromMarker.length
  const toIdx = toMarker ? html.indexOf(toMarker, start) : html.length
  return html.slice(start, toIdx === -1 ? undefined : toIdx)
}

export function todayMmdd(): string {
  const now = new Date()
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  return `${mm}${dd}`
}

export async function fetchDevotion(mmdd: string): Promise<DevotionData> {
  const targetUrl = `https://letsfollowjesus.org/main/daily/${mmdd}.html`
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`
  const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(12000) })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const { contents } = await res.json()
  if (!contents) throw new Error('empty response')
  return parseHtml(mmdd, contents as string)
}

function parseHtml(date: string, html: string): DevotionData {
  // Extract all biblegateway links for scriptures
  const linkRe = /href="([^"]*biblegateway[^"]*)"/gi
  const scriptures: ScriptureRef[] = []
  const seen = new Set<string>()
  let m
  while ((m = linkRe.exec(html)) !== null) {
    const ref = parseBibleGatewayRef(m[1])
    if (ref) {
      const key = `${ref.chineseName}-${ref.chapter}`
      if (!seen.has(key)) { seen.add(key); scriptures.push(ref) }
    }
  }

  // Slice HTML into sections using image marker names
  const obsHtml = sliceSection(html, 'button-verse-meditation', 'button-verse-response')
  const respHtml = sliceSection(html, 'button-verse-response', 'button-verse-light')
  const prayHtml = sliceSection(html, 'button-pray', 'button-supplement')

  const observations = extractListItems(obsHtml)
  const responses = extractListItems(respHtml)
  const prayer = extractText(prayHtml).split('\n').map(l => l.trim()).filter(Boolean).slice(0, 5).join('\n')

  return { date, scriptures, observations, responses, prayer }
}

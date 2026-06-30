// scripts/scrape-book-backgrounds.mjs
// Scrapes book introduction text from https://a2z.fhl.net/bible/
// and saves to public/book-backgrounds.json keyed by CKJV Chinese book names.

import https from 'https'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import querystring from 'querystring'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Mapping from site's engs abbreviation -> CKJV Chinese book name
// Site uses different abbreviations than the template; verified from https://a2z.fhl.net/bible/
const NAME_MAP = {
  'Gen':    '創世記',
  'Ex':     '出埃及記',
  'Lev':    '利未記',
  'Num':    '民數記',
  'Deut':   '申命記',
  'Josh':   '約書亞記',
  'Judg':   '士師記',
  'Ruth':   '路得記',
  '1 Sam':  '撒母耳記上',
  '2 Sam':  '撒母耳記下',
  '1 Kin':  '列王紀上',
  '2 Kin':  '列王紀下',
  '1 Chr':  '歷代志上',
  '2 Chr':  '歷代志下',
  'Ezra':   '以斯拉記',
  'Neh':    '尼希米記',
  'Esth':   '以斯帖記',
  'Job':    '約伯記',
  'Ps':     '詩篇',
  'Prov':   '箴言',
  'Eccl':   '傳道書',
  'Song':   '雅歌',
  'Is':     '以賽亞書',
  'Jer':    '耶利米書',
  'Lam':    '耶利米哀歌',
  'Ezek':   '以西結書',
  'Dan':    '但以理書',
  'Hos':    '何西阿書',
  'Joel':   '約珥書',
  'Amos':   '阿摩司書',
  'Obad':   '俄巴底亞書',
  'Jon':    '約拿書',
  'Mic':    '彌迦書',
  'Nah':    '那鴻書',
  'Hab':    '哈巴谷書',
  'Zeph':   '西番雅書',
  'Hag':    '哈該書',
  'Zech':   '撒迦利亞書',
  'Mal':    '瑪拉基書',
  'Matt':   '馬太福音',
  'Mark':   '馬可福音',
  'Luke':   '路加福音',
  'John':   '約翰福音',
  'Acts':   '使徒行傳',
  'Rom':    '羅馬書',
  '1 Cor':  '哥林多前書',
  '2 Cor':  '哥林多後書',
  'Gal':    '加拉太書',
  'Eph':    '以弗所書',
  'Phil':   '腓立比書',   // CKJV uses 腓立比書
  'Col':    '歌羅西書',
  '1 Thess': '帖撒羅尼迦前書',
  '2 Thess': '帖撒羅尼迦後書',
  '1 Tim':  '提摩太前書',
  '2 Tim':  '提摩太後書',
  'Titus':  '提多書',
  'Philem': '腓利門書',
  'Heb':    '希伯來書',
  'James':  '雅各書',
  '1 Pet':  '彼得前書',
  '2 Pet':  '彼得後書',
  '1 John': '約翰一書',   // CKJV uses 約翰一書 (site has 約翰壹書)
  '2 John': '約翰二書',
  '3 John': '約翰三書',
  'Jude':   '猶大書',
  'Rev':    '啟示錄',
}

// All 66 books in canonical order (engs values from the site's select dropdown)
const BOOKS = [
  'Gen', 'Ex', 'Lev', 'Num', 'Deut', 'Josh', 'Judg', 'Ruth',
  '1 Sam', '2 Sam', '1 Kin', '2 Kin', '1 Chr', '2 Chr',
  'Ezra', 'Neh', 'Esth', 'Job', 'Ps', 'Prov', 'Eccl', 'Song',
  'Is', 'Jer', 'Lam', 'Ezek', 'Dan',
  'Hos', 'Joel', 'Amos', 'Obad', 'Jon', 'Mic', 'Nah', 'Hab', 'Zeph', 'Hag', 'Zech', 'Mal',
  'Matt', 'Mark', 'Luke', 'John', 'Acts',
  'Rom', '1 Cor', '2 Cor', 'Gal', 'Eph', 'Phil', 'Col',
  '1 Thess', '2 Thess', '1 Tim', '2 Tim', 'Titus', 'Philem',
  'Heb', 'James', '1 Pet', '2 Pet', '1 John', '2 John', '3 John', 'Jude', 'Rev',
]

function fetchPage(engs) {
  return new Promise((resolve, reject) => {
    const postData = querystring.stringify({ book: '3', engs })
    const options = {
      hostname: 'a2z.fhl.net',
      path: '/php/pcom.php',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'Mozilla/5.0 (compatible; Bible-Reader-Scraper/1.0)',
      },
    }
    const req = https.request(options, res => {
      const chunks = []
      res.on('data', c => chunks.push(c))
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')))
    })
    req.on('error', reject)
    req.write(postData)
    req.end()
  })
}

function extractIntro(html) {
  // The intro section is in the first <pre>...</pre> block of the body.
  // It contains the preamble (between /* ... */) and the background section.
  const bodyStart = html.indexOf('<body')
  if (bodyStart === -1) return ''
  const body = html.slice(bodyStart)

  const preStart = body.indexOf('<pre>')
  const preEnd = body.indexOf('</pre>')
  if (preStart === -1 || preEnd === -1) return ''

  let text = body.slice(preStart + 5, preEnd)

  // Strip any remaining HTML tags (e.g., <a href=...>)
  text = text.replace(/<[^>]+>/g, '')

  // Decode common HTML entities
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#\d+;/g, '')
    .replace(/&[a-z]+;/g, '')

  // Remove the author preamble block between /* ... */
  text = text.replace(/\/\*+[\s\S]*?\*+\//g, '')

  // Normalize whitespace: collapse runs of spaces/tabs but keep newlines
  text = text
    .split('\n')
    .map(line => line.replace(/[ \t]+/g, ' ').trimEnd())
    .join('\n')
    .trim()

  return text
}

async function main() {
  const result = {}
  let successCount = 0
  let failCount = 0

  for (const engs of BOOKS) {
    const name = NAME_MAP[engs]
    if (!name) {
      console.log(`Skip unknown engs: ${engs}`)
      continue
    }
    try {
      console.log(`Fetching ${name} (${engs})...`)
      const html = await fetchPage(engs)
      const intro = extractIntro(html)
      if (intro.length < 50) {
        console.warn(`  WARN: very short intro (${intro.length} chars) for ${name}`)
      } else {
        console.log(`  OK, ${intro.length} chars`)
      }
      result[name] = intro
      successCount++
    } catch (e) {
      console.error(`  FAIL ${engs}: ${e.message}`)
      failCount++
    }
    // 800ms polite delay between requests
    await new Promise(r => setTimeout(r, 800))
  }

  const outPath = path.join(__dirname, '../public/book-backgrounds.json')
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf-8')
  console.log(`\nDone: ${successCount} books saved, ${failCount} failed.`)
  console.log(`Output: ${outPath}`)
}

main().catch(e => {
  console.error('Fatal:', e)
  process.exit(1)
})

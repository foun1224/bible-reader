// Scrape book background introductions from a2z.fhl.net/bible/
// Usage: node scripts/scrape-book-intros.mjs [--test] [--all]
//   --test : run Gen + Matt + Rev only, print results
//   --all  : scrape all 66 books and write public/book-intros.json

import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import https from 'https'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = join(__dirname, '../public/book-intros.json')

const DELAY_MS = 600

// Chinese book names → a2z.fhl.net engs codes (verified from homepage links)
const BOOKS = [
  ['創世記',      'Gen'],
  ['出埃及記',    'Ex'],
  ['利未記',      'Lev'],
  ['民數記',      'Num'],
  ['申命記',      'Deut'],
  ['約書亞記',    'Josh'],
  ['士師記',      'Judg'],
  ['路得記',      'Ruth'],
  ['撒母耳記上',  '1 Sam'],
  ['撒母耳記下',  '2 Sam'],
  ['列王紀上',    '1 Kin'],
  ['列王紀下',    '2 Kin'],
  ['歷代志上',    '1 Chr'],
  ['歷代志下',    '2 Chr'],
  ['以斯拉記',    'Ezra'],
  ['尼希米記',    'Neh'],
  ['以斯帖記',    'Esth'],
  ['約伯記',      'Job'],
  ['詩篇',        'Ps'],
  ['箴言',        'Prov'],
  ['傳道書',      'Eccl'],
  ['雅歌',        'Song'],
  ['以賽亞書',    'Is'],
  ['耶利米書',    'Jer'],
  ['耶利米哀歌',  'Lam'],
  ['以西結書',    'Ezek'],
  ['但以理書',    'Dan'],
  ['何西阿書',    'Hos'],
  ['約珥書',      'Joel'],
  ['阿摩司書',    'Amos'],
  ['俄巴底亞書',  'Obad'],
  ['約拿書',      'Jon'],
  ['彌迦書',      'Mic'],
  ['那鴻書',      'Nah'],
  ['哈巴谷書',    'Hab'],
  ['西番雅書',    'Zeph'],
  ['哈該書',      'Hag'],
  ['撒迦利亞書',  'Zech'],
  ['瑪拉基書',    'Mal'],
  ['馬太福音',    'Matt'],
  ['馬可福音',    'Mark'],
  ['路加福音',    'Luke'],
  ['約翰福音',    'John'],
  ['使徒行傳',    'Acts'],
  ['羅馬書',      'Rom'],
  ['哥林多前書',  '1 Cor'],
  ['哥林多後書',  '2 Cor'],
  ['加拉太書',    'Gal'],
  ['以弗所書',    'Eph'],
  ['腓立比書',    'Phil'],
  ['歌羅西書',    'Col'],
  ['帖撒羅尼迦前書', '1 Thess'],
  ['帖撒羅尼迦後書', '2 Thess'],
  ['提摩太前書',  '1 Tim'],
  ['提摩太後書',  '2 Tim'],
  ['提多書',      'Titus'],
  ['腓利門書',    'Philem'],
  ['希伯來書',    'Heb'],
  ['雅各書',      'James'],
  ['彼得前書',    '1 Pet'],
  ['彼得後書',    '2 Pet'],
  ['約翰一書',    '1 John'],
  ['約翰二書',    '2 John'],
  ['約翰三書',    '3 John'],
  ['猶大書',      'Jude'],
  ['啟示錄',      'Rev'],
]

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

function fetchBook(engs) {
  return new Promise((resolve, reject) => {
    const url = `https://a2z.fhl.net/php/pcom.php?book=3&engs=${encodeURIComponent(engs)}`
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; bible-reader-bot/1.0)',
        'Accept-Charset': 'utf-8',
      },
      timeout: 15000,
    }, res => {
      const chunks = []
      res.on('data', c => chunks.push(c))
      res.on('end', () => {
        const buf = Buffer.concat(chunks)
        resolve(buf.toString('utf-8'))
      })
      res.on('error', reject)
    }).on('error', reject).on('timeout', function() { this.destroy(); reject(new Error('timeout')) })
  })
}

function normalizeIntroText(bookName, intro) {
  return intro
    .replace(new RegExp(`^${bookName}(研經資料|查經資料)\\s*`), '')
    .replace(/\s*經文：[\s\S]*$/, '')
    .replace(/\r/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/\s+(?=(零、|壹、|貳、|參、|肆、|伍、|陸、|柒、|捌、|玖、|拾、))/g, '\n\n')
    .replace(/\s+(?=([一二三四五六七八九十]+、))/g, '\n')
    .replace(/\s+(?=（[一二三四五六七八九十]+）)/g, '\n')
    .replace(/\s+(?=\d+\.)/g, '\n')
    .replace(/\s+(?=\(\d+\))/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function extractIntro(bookName, html) {
  const preMatch = html.match(/<pre>([\s\S]*?)<\/pre>/)
  if (!preMatch) return null
  let text = preMatch[1]

  // Strip HTML tags
  text = text.replace(/<[^>]+>/g, '')

  // Remove the author comment block /****...****/
  text = text.replace(/^[\s\S]*?\/\*+[\s\S]*?\*+\/\s*/m, '')

  // Some books (e.g. 約翰福音) put ☆參考資料 BEFORE 零、背景 —
  // detect this by checking if text starts with a reference marker.
  // If so, skip ahead to 零、背景 which is the actual intro content.
  if (/^[☆※]/.test(text.trimStart())) {
    const bgIdx = text.indexOf('零、背景')
    if (bgIdx !== -1) text = text.slice(bgIdx)
  }

  // Cut at end-of-intro markers
  const refMarkers = ['☆重要參考資料', '※重要參考資料', '☆參考資料', '※參考資料', '參考資料：']
  let cutAt = text.length
  for (const marker of refMarkers) {
    const idx = text.indexOf(marker)
    if (idx !== -1 && idx < cutAt) cutAt = idx
  }
  text = text.slice(0, cutAt)
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\n{4,}/g, '\n\n\n')
    .trim()

  return normalizeIntroText(bookName, text) || null
}

async function scrapeBook(name, engs) {
  try {
    const html = await fetchBook(engs)
    const intro = extractIntro(name, html)
    return intro
  } catch (e) {
    return null
  }
}

const isTest = process.argv.includes('--test')
const isAll  = process.argv.includes('--all')

if (!isTest && !isAll) {
  console.log('Pass --test (Gen/Matt/Rev) or --all (66 books)')
  process.exit(0)
}

const books = isTest ? BOOKS.filter(([, e]) => ['Gen', 'Matt', 'Rev'].includes(e)) : BOOKS

console.log(`Scraping ${books.length} books from a2z.fhl.net...`)

const result = {}
let ok = 0, fail = 0

for (let i = 0; i < books.length; i++) {
  const [name, engs] = books[i]
  const intro = await scrapeBook(name, engs)
  if (intro) {
    result[name] = intro
    ok++
    process.stdout.write(`[${i+1}/${books.length}] ${name} ✓ (${intro.length} chars)\n`)
  } else {
    fail++
    process.stdout.write(`[${i+1}/${books.length}] ${name} ✗\n`)
  }
  if (i < books.length - 1) await sleep(DELAY_MS)
}

if (isTest) {
  console.log('\n=== TEST RESULTS ===')
  for (const [name] of books) {
    const intro = result[name]
    if (intro) {
      console.log(`\n--- ${name} ---`)
      console.log(intro.slice(0, 400))
      console.log('...')
    } else {
      console.log(`\n--- ${name}: FAILED ---`)
    }
  }
} else {
  writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf-8')
  console.log(`\nWritten to ${outPath}`)
}

console.log(`\nDone: ${ok} ok, ${fail} failed`)

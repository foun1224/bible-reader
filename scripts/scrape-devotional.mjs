import * as cheerio from 'cheerio'
import { writeFileSync, readFileSync, existsSync } from 'fs'

const BASE = 'https://letsfollowjesus.org/main/daily/'
const DELAY = 500 // ms between requests to be polite

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

function pad(n) {
  return String(n).padStart(2, '0')
}

function textOf($, sel) {
  return $(sel).text().replace(/\s+/g, ' ').trim()
}

async function fetchDay(mmdd) {
  const url = `${BASE}${mmdd}.html`
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Bible Reader App; educational use)' },
      signal: AbortSignal.timeout(10000),
    })
    if (!res.ok) return null
    const html = await res.text()
    const $ = cheerio.load(html)

    // verse reference: <strong> inside #main_verse_title
    const ref = $('#main_verse_title strong').first().text().trim()
    if (!ref) return null

    // verse text
    const verseText = $('#main_verse_body').text().replace(/\s+/g, ' ').trim()

    // meditation questions (觀察默想)
    const meditation = []
    $('#meditation_body ol li').each((_, el) => {
      meditation.push($(el).text().replace(/\s+/g, ' ').trim())
    })

    // response questions (靈修回應)
    const responses = []
    $('#responses_body ol li').each((_, el) => {
      responses.push($(el).text().replace(/\s+/g, ' ').trim())
    })

    // scripture insight (經文亮光) - preserve paragraphs.
    // The body often opens with a bare text node (sometimes wrapping an inline
    // image) BEFORE the first <p>, so walking only <p> drops the lead paragraph.
    // Walk top-level nodes instead: non-<p> content accumulates into a buffer
    // that flushes as its own paragraph whenever a <p> (or the end) is reached.
    const hints = []
    let buffer = ''
    const flush = () => {
      const t = buffer.replace(/\s+/g, ' ').trim()
      if (t) hints.push(t)
      buffer = ''
    }
    $('#verse_hint_body').contents().each((_, node) => {
      if (node.type === 'comment') return
      if (node.type === 'tag' && node.name === 'p') {
        flush()
        const t = $(node).text().replace(/\s+/g, ' ').trim()
        if (t) hints.push(t)
      } else {
        buffer += $(node).text()
      }
    })
    flush()
    // fallback if the walk produced nothing
    if (hints.length === 0) {
      const t = $('#verse_hint_body').text().replace(/\s+/g, ' ').trim()
      if (t) hints.push(t)
    }

    // content images inside the insight body (e.g. maps), as absolute URLs
    const hintImages = []
    $('#verse_hint_body img').each((_, el) => {
      const src = $(el).attr('src')
      if (src) hintImages.push(new URL(src, url).href)
    })

    // prayer (禱告文)
    const prayer = $('#pray_body').text().replace(/\s+/g, ' ').trim()

    // page title (e.g. "6月29日 歸從誰呢")
    const titleEl = $('#top-verse td').eq(3).text().trim()
    const titleMatch = titleEl.match(/(\d+月\d+日.*?)$/)
    const title = titleMatch ? titleMatch[1].trim() : ''

    return { mmdd, ref, title, verseText, meditation, responses, hints, hintImages, prayer }
  } catch (e) {
    console.error(`  Error ${mmdd}: ${e.message}`)
    return null
  }
}

async function main() {
  // Merge into the existing plan: other scripts enrich this file with
  // relatedVerse / lights / hymn / messages / testimonies — a full overwrite
  // would wipe them. Base fields refresh; enrichment fields survive.
  const OUT = 'public/devotional-plan.json'
  const result = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf-8')) : {}
  let count = 0
  let failed = 0

  // Generate all MMDD from Jan to Dec
  const days = []
  const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  for (let m = 1; m <= 12; m++) {
    for (let d = 1; d <= daysInMonth[m - 1]; d++) {
      days.push(`${pad(m)}${pad(d)}`)
    }
  }

  console.log(`Scraping ${days.length} days...`)

  for (const mmdd of days) {
    process.stdout.write(`  ${mmdd}... `)
    const data = await fetchDay(mmdd)
    if (data) {
      result[mmdd] = { ...result[mmdd], ...data }
      console.log(`✓ ${data.ref}`)
      count++
    } else {
      console.log(`✗ (skipped)`)
      failed++
    }
    await sleep(DELAY)
  }

  writeFileSync(OUT, JSON.stringify(result, null, 2), 'utf-8')
  console.log(`\nDone: ${count} days saved, ${failed} failed.`)
  console.log(`Output: ${OUT}`)
}

main()

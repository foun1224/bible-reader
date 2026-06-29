import * as cheerio from 'cheerio'
import { writeFileSync } from 'fs'

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

    // scripture insight (經文亮光) - preserve paragraphs
    const hints = []
    $('#verse_hint_body p').each((_, el) => {
      const t = $(el).text().replace(/\s+/g, ' ').trim()
      if (t) hints.push(t)
    })
    // fallback if no <p> tags
    if (hints.length === 0) {
      const t = $('#verse_hint_body').text().replace(/\s+/g, ' ').trim()
      if (t) hints.push(t)
    }

    // prayer (禱告文)
    const prayer = $('#pray_body').text().replace(/\s+/g, ' ').trim()

    // page title (e.g. "6月29日 歸從誰呢")
    const titleEl = $('#top-verse td').eq(3).text().trim()
    const titleMatch = titleEl.match(/(\d+月\d+日.*?)$/)
    const title = titleMatch ? titleMatch[1].trim() : ''

    return { mmdd, ref, title, verseText, meditation, responses, hints, prayer }
  } catch (e) {
    console.error(`  Error ${mmdd}: ${e.message}`)
    return null
  }
}

async function main() {
  const result = {}
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
      result[mmdd] = data
      console.log(`✓ ${data.ref}`)
      count++
    } else {
      console.log(`✗ (skipped)`)
      failed++
    }
    await sleep(DELAY)
  }

  writeFileSync(
    'public/devotional-plan.json',
    JSON.stringify(result, null, 2),
    'utf-8'
  )
  console.log(`\nDone: ${count} days saved, ${failed} failed.`)
  console.log('Output: public/devotional-plan.json')
}

main()

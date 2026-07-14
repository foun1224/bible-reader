// Scrape 相關經文 from letsfollowjesus.org for all dates in devotional-plan.json
// Usage: node scripts/scrape-related-verse.mjs

import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const planPath = join(__dirname, '../public/devotional-plan.json')
const plan = JSON.parse(readFileSync(planPath, 'utf8'))

const DELAY_MS = 300
const BASE_URL = 'https://letsfollowjesus.org/main/daily'

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

function extractRelatedVerse(html) {
  // The site puts day-specific related verse(s) in <div id="other_verse_body">
  const start = html.indexOf('id="other_verse_body"')
  if (start < 0) return null
  const end = html.indexOf('</div><!--other_verse_body -->', start)
  if (end < 0) return null
  const body = html.slice(start, end)
  const text = body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  // Remove the leading id="..." artifact from the div
  const clean = text.replace(/^id="other_verse_body"\s*/, '').replace(/^>\s*/, '').trim()
  return clean.length > 0 ? clean : null
}

async function fetchRelatedVerse(mmdd) {
  const url = `${BASE_URL}/${mmdd}.html`
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; bible-reader-bot/1.0)' },
      signal: AbortSignal.timeout(10000),
    })
    if (!res.ok) return null
    const html = await res.text()
    return extractRelatedVerse(html)
  } catch {
    return null
  }
}

async function main() {
  const keys = Object.keys(plan)
  let updated = 0
  let failed = 0

  console.log(`Scraping ${keys.length} dates...`)

  for (let i = 0; i < keys.length; i++) {
    const mmdd = keys[i]
    if (plan[mmdd].relatedVerse) {
      process.stdout.write(`[${i+1}/${keys.length}] ${mmdd} skip (already has)\n`)
      continue
    }

    const verse = await fetchRelatedVerse(mmdd)
    if (verse) {
      plan[mmdd].relatedVerse = verse
      updated++
      process.stdout.write(`[${i+1}/${keys.length}] ${mmdd} ✓\n`)
    } else {
      failed++
      process.stdout.write(`[${i+1}/${keys.length}] ${mmdd} ✗\n`)
    }

    await sleep(DELAY_MS)
  }

  writeFileSync(planPath, JSON.stringify(plan, null, 2), 'utf8')
  console.log(`\nDone: ${updated} updated, ${failed} failed`)
}

main()

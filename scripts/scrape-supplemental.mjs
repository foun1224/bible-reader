// Scrape supplemental sections from letsfollowjesus.org
// Sections: SuppLight (讀經亮光), SuppHymn (詩歌欣賞), SuppMessage (補充信息), SuppTestimony (補充見證)
// Usage: node scripts/scrape-supplemental.mjs [--test] [--all]
//   --test : run 0628/0629/0630 only and print results
//   --all  : run all 365 days and write back to devotional-plan.json

import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const planPath = join(__dirname, '../public/devotional-plan.json')

const BASE_URL = 'https://letsfollowjesus.org/main/daily'
const ARTICLE_BASE = 'https://letsfollowjesus.org/main/daily/articles'
const DELAY_MS = 500

const isTest = process.argv.includes('--test')
const isAll = process.argv.includes('--all')

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

function stripTags(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function resolveDailyUrl(rawUrl) {
  if (!rawUrl || rawUrl === ".html") return ""
  if (rawUrl.startsWith("http")) return rawUrl
  if (rawUrl.startsWith("articles/")) {
    const articlePath = rawUrl.replace("articles/", "")
    const month = articlePath.slice(0, 2)
    return /^\d{2}$/.test(month)
      ? ARTICLE_BASE + "/" + month + "/" + articlePath
      : ARTICLE_BASE + "/" + articlePath
  }
  return BASE_URL + "/" + rawUrl
}

// Extract all rows with a given alt type, return [{title, excerpt, url}]
function extractSuppItems(html, altType) {
  const results = []
  let searchFrom = 0
  while (true) {
    const altIdx = html.indexOf(`alt="${altType}"`, searchFrom)
    if (altIdx < 0) break
    // Find the enclosing <tr>...</tr>
    const rowStart = html.lastIndexOf('<tr', altIdx)
    const rowEnd = html.indexOf('</tr>', altIdx)
    if (rowStart < 0 || rowEnd < 0) { searchFrom = altIdx + 1; continue }
    const row = html.slice(rowStart, rowEnd + 5)

    // Extract link: <a href="...">Title</a>
    const linkMatch = row.match(/<a\s+href="([^"]+)"[^>]*>([^<]+)<\/a>/)
    const title = linkMatch ? linkMatch[2].trim() : ''
    const rawUrl = linkMatch ? linkMatch[1].trim() : ''
    const url = resolveDailyUrl(rawUrl)

    // Extract excerpt: text after the </a> tag
    const afterLink = linkMatch ? row.slice(row.indexOf(linkMatch[0]) + linkMatch[0].length) : row
    const excerpt = stripTags(afterLink).replace(/^\s*/, '').replace(/\s*\.\.\.\s*$/, '').trim()

    if (title || excerpt) {
      const item = { title, excerpt }
      if (url) item.url = url
      results.push(item)
    }
    searchFrom = rowEnd + 5
  }
  return results.length > 0 ? results : undefined
}

// Extract hymn: { title, description }
// Row text pattern: "SongTitle 詞曲/info ——『lyrics...』 Description."
function extractHymn(html) {
  const altIdx = html.indexOf('alt="SuppHymn"')
  if (altIdx < 0) return undefined
  const rowStart = html.lastIndexOf('<tr', altIdx)
  const rowEnd = html.indexOf('</tr>', altIdx)
  if (rowStart < 0 || rowEnd < 0) return undefined
  const row = html.slice(rowStart, rowEnd + 5)

  // Get the td that contains the SuppHymn icon (second td in row)
  const iconPos = row.indexOf('alt="SuppHymn"')
  const tdStart = row.lastIndexOf('<td', iconPos)
  const tdEnd = row.indexOf('</td>', iconPos)
  const tdMatch = tdStart >= 0 && tdEnd >= 0
    ? [null, row.slice(tdStart, tdEnd + 5)]
    : null
  if (!tdMatch) return undefined
  const raw = stripTags(tdMatch[1])

  // Split on 『...』 to separate lyrics from description
  const lyricStart = raw.indexOf('『')
  const lyricEnd = raw.indexOf('』')

  let title = ''
  let description = ''

  if (lyricStart > 0 && lyricEnd > lyricStart) {
    // title = everything before 『, trimmed
    title = raw.slice(0, lyricStart).replace(/——\s*$/, '').trim()
    // description = everything after 』
    description = raw.slice(lyricEnd + 1).replace(/^[\s.…]*/, '').trim()
  } else {
    // Fallback: no lyric block found, use first sentence as title
    const parts = raw.split(/[。！？]/)
    title = parts[0].trim()
    description = parts.slice(1).join('。').trim()
  }

  if (!title) return undefined
  return { title, description }
}

async function scrapeDay(mmdd) {
  const url = `${BASE_URL}/${mmdd}.html`
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; bible-reader-bot/1.0)' },
      signal: AbortSignal.timeout(10000),
    })
    if (!res.ok) return null
    const html = await res.text()

    return {
      lights:      extractSuppItems(html, 'SuppLight'),
      hymn:        extractHymn(html),
      messages:    extractSuppItems(html, 'SuppMessage'),
      testimonies: extractSuppItems(html, 'SuppTestimony'),
    }
  } catch {
    return null
  }
}

async function main() {
  const plan = JSON.parse(readFileSync(planPath, 'utf8'))
  const testDates = ['0628', '0629', '0630']
  const allDates = Object.keys(plan)
  const dates = isTest ? testDates : allDates

  if (!isTest && !isAll) {
    console.log('Pass --test (3 days) or --all (365 days)')
    process.exit(0)
  }

  console.log(`Scraping ${dates.length} dates...`)

  let updated = 0, failed = 0

  for (let i = 0; i < dates.length; i++) {
    const mmdd = dates[i]
    const result = await scrapeDay(mmdd)
    if (!result) {
      failed++
      process.stdout.write(`[${i+1}/${dates.length}] ${mmdd} ✗\n`)
    } else {
      if (result.lights)      plan[mmdd].lights      = result.lights
      if (result.hymn)        plan[mmdd].hymn        = result.hymn
      if (result.messages)    plan[mmdd].messages    = result.messages
      if (result.testimonies) plan[mmdd].testimonies = result.testimonies
      updated++
      process.stdout.write(`[${i+1}/${dates.length}] ${mmdd} ✓ L:${result.lights?.length??0} H:${result.hymn?1:0} M:${result.messages?.length??0} T:${result.testimonies?.length??0}\n`)
    }
    if (i < dates.length - 1) await sleep(DELAY_MS)
  }

  if (isTest) {
    console.log('\n=== TEST RESULTS ===')
    for (const mmdd of testDates) {
      const d = plan[mmdd]
      console.log(`\n--- ${mmdd} ---`)
      if (d.lights) d.lights.forEach(l => console.log('LIGHT:', l.title, '|', l.excerpt.slice(0,80), '| url:', l.url?.slice(-40)))
      if (d.hymn) console.log('HYMN:', d.hymn.title, '|', d.hymn.description.slice(0,80))
      if (d.messages) d.messages.forEach(m => console.log('MSG:', m.title, '|', m.excerpt.slice(0,80)))
      if (d.testimonies) d.testimonies.forEach(t => console.log('TEST:', t.title, '|', t.excerpt.slice(0,80)))
    }
  }

  writeFileSync(planPath, JSON.stringify(plan, null, 2), 'utf8')
  console.log(`\nDone: ${updated} updated, ${failed} failed`)
}

main()

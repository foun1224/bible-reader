// Validates the canonical scripture-reference grammar in src/lib/scriptureRef.ts
// against every citation in public/devotional-plan.json. Fails (exit 1) if any
// parenthesized group that begins with a book name is not fully recognized —
// run this whenever the pattern or the devotional data changes.
import { readFileSync } from 'fs'

// Single source of truth: pull the pattern out of the TS module.
const libSource = readFileSync('src/lib/scriptureRef.ts', 'utf-8')
const patternMatch = libSource.match(/VERSE_REF_SOURCE = '((?:[^'\\]|\\.)*)'/)
if (!patternMatch) {
  console.error('Could not extract VERSE_REF_SOURCE from src/lib/scriptureRef.ts')
  process.exit(1)
}
const VERSE_REF_SOURCE = patternMatch[1].replace(/\\\\/g, '\\')

const plan = JSON.parse(readFileSync('public/devotional-plan.json', 'utf-8'))
const ckjv = JSON.parse(readFileSync('public/data/ckjv.json', 'utf-8'))
const bookNames = ckjv.books.map(b => b.name)
const alternation = [...bookNames]
  .sort((a, b) => b.length - a.length)
  .map(n => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  .join('|')

const fullCitation = new RegExp(`^(${alternation})\\s*(${VERSE_REF_SOURCE})\\s*$`)

let total = 0
const misses = []
for (const [mmdd, day] of Object.entries(plan)) {
  for (const field of ['relatedVerse']) {
    const raw = day[field]
    if (!raw) continue
    for (const m of raw.matchAll(/[（(]([^（()）]*)[）)]/g)) {
      const inner = m[1].trim()
      if (!bookNames.some(n => inner.startsWith(n))) continue
      total++
      if (!fullCitation.test(inner)) misses.push({ mmdd, field, inner })
    }
  }
}

console.log(`citations checked: ${total}`)
if (misses.length > 0) {
  console.log(`UNRECOGNIZED: ${misses.length}`)
  for (const miss of misses.slice(0, 30)) console.log(` ${miss.mmdd} ${miss.field}: (${miss.inner})`)
  process.exit(1)
}
console.log('coverage: 100%')

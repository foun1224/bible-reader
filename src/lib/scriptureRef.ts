// Canonical grammar for Chinese scripture references as they appear in this
// app's data sources. Derived from a full-year inventory of every citation in
// public/devotional-plan.json (153 distinct shapes), which must all stay
// covered. Documented forms:
//
//   詩篇23                whole chapter (no colon)
//   歌羅西書2:9-10        chapter:verse-range, half- or full-width colon
//   以西結書34:1-6, 11-16 verse lists mixing ranges（separators: , 、）
//   約拿書2:1-3:10        cross-chapter range
//   猶大書1-25            single-chapter book, bare verse range
//   瑪拉基書3:10上        half-verse marker（上/下）
//
// The reference is a digit run joined by colons / dashes / commas with
// optional spaces, ending in an optional 上/下. Validate changes with:
//   node scripts/validate-scripture-refs.mjs
export const VERSE_REF_SOURCE = '\\d+(?:\\s*[:：\\-–—,、]\\s*\\d+)*\\s*[上下]?'

export function escapeForRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Longest-first so 約翰一書 wins over 約翰福音-style prefix overlaps.
export function buildBookAlternation(bookNames: string[]): string {
  return [...bookNames]
    .sort((a, b) => b.length - a.length)
    .map(escapeForRegex)
    .join('|')
}

// Parenthesized trailing citations, e.g. 「……直到永遠。（詩篇23）」
export function buildCitationRegex(bookNames: string[]): RegExp {
  return new RegExp(
    `[（(]\\s*(${buildBookAlternation(bookNames)})\\s*(${VERSE_REF_SOURCE})\\s*[）)]`,
    'g',
  )
}

export interface ScriptureCitation {
  book: string
  /** Normalized: full-width colon → half-width, whitespace collapsed */
  reference: string
  index: number
  length: number
}

export function findCitations(raw: string, bookNames: string[]): ScriptureCitation[] {
  if (bookNames.length === 0) return []
  const citations: ScriptureCitation[] = []
  for (const match of raw.matchAll(buildCitationRegex(bookNames))) {
    citations.push({
      book: match[1],
      reference: match[2].replace(/：/g, ':').replace(/\s+/g, ' ').trim(),
      index: match.index ?? 0,
      length: match[0].length,
    })
  }
  return citations
}

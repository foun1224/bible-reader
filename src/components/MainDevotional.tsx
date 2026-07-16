import { useEffect, useRef, useState } from 'react'
import type { BibleData, Book, Chapter } from '../types'

interface SuppItem {
  title: string
  excerpt: string
  url?: string
}

interface DevotionalDay {
  ref: string
  title: string
  verseText: string
  meditation: string[]
  responses: string[]
  hints: string[]
  hintImages?: string[]
  prayer: string
  relatedVerse?: string
  lights?: SuppItem[]
  hymn?: { title: string; description: string }
  messages?: SuppItem[]
  testimonies?: SuppItem[]
}

type DevotionalPlan = Record<string, DevotionalDay>

type DevHighlightColor = 'important' | 'comfort' | 'question' | 'prayer'

interface DevotionalHighlight {
  mmdd: string
  verseRef: string
  color: DevHighlightColor
  verseText: string
}

const DEV_COLOR_BG: Record<DevHighlightColor, string> = {
  important: 'bg-amber-200/70 dark:bg-amber-300/25',
  comfort:   'bg-green-200/70 dark:bg-green-400/25',
  question:  'bg-blue-200/70 dark:bg-blue-400/25',
  prayer:    'bg-red-200/70 dark:bg-red-400/25',
}

const DEV_COLOR_DOT: Record<DevHighlightColor, string> = {
  important: 'bg-amber-300',
  comfort:   'bg-green-400',
  question:  'bg-blue-400',
  prayer:    'bg-red-400',
}

const DEV_COLOR_LABEL: Record<DevHighlightColor, string> = {
  important: '重要',
  comfort:   '安慰',
  question:  '疑問',
  prayer:    '禱告',
}

const HL_COLORS: DevHighlightColor[] = ['important', 'comfort', 'question', 'prayer']

const HL_STORE_KEY = 'devotional-highlights'

function loadHighlights(): DevotionalHighlight[] {
  try {
    const raw = localStorage.getItem(HL_STORE_KEY)
    return raw ? (JSON.parse(raw) as DevotionalHighlight[]) : []
  } catch {
    return []
  }
}

function saveHighlights(hs: DevotionalHighlight[]) {
  try { localStorage.setItem(HL_STORE_KEY, JSON.stringify(hs)) } catch { /* ignore */ }
}

function todayMMDD(): string {
  const d = new Date()
  return `${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
}

function shiftMMDD(mmdd: string, delta: number): string {
  const m = parseInt(mmdd.slice(0, 2), 10)
  const d = parseInt(mmdd.slice(2, 4), 10)
  const date = new Date(2024, m - 1, d)
  date.setDate(date.getDate() + delta)
  return `${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`
}

function parseChapterFromRef(ref: string): number {
  const match = ref.match(/(\d+)\s*[:.：]/)
  return match ? parseInt(match[1], 10) : 1
}

function findBookByRef(ref: string, books: Book[]): Book | null {
  const sorted = [...books].sort((a, b) => b.name.length - a.name.length)
  for (const book of sorted) if (ref.includes(book.name)) return book
  return null
}

interface ParsedVersePart {
  num: string
  text: string
  book?: string
  reference?: string
}

// Split a single-book passage into verse parts. Prefix text is preserved as an unnumbered part.
function parseVerseSequence(raw: string): ParsedVersePart[] {
  const parts = raw.split(/(?<!\d)(\d+(?::\d+)?)\s+(?=[一-鿿（【])/)
  const result: ParsedVersePart[] = []
  const prefix = parts[0]?.trim()
  if (prefix) result.push({ num: '', text: prefix })
  for (let i = 1; i < parts.length; i += 2) {
    result.push({ num: parts[i], text: parts[i + 1]?.trim() ?? '' })
  }
  return result.length > 0 ? result : [{ num: '', text: raw }]
}

// Book labels in Gospel harmonies must be separated before verse splitting;
// otherwise the next book name becomes the previous verse's trailing text.
function parseVerseText(raw: string, books: Book[] = []): ParsedVersePart[] {
  const names = [...books]
    .sort((a, b) => b.name.length - a.name.length)
    .map(book => book.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  if (names.length === 0) return parseVerseSequence(raw)

  const bookPattern = new RegExp(`(${names.join('|')})(?=\\s*\\d+\\s*[:：])`, 'g')
  const markers = [...raw.matchAll(bookPattern)]
  if (markers.length === 0) return parseVerseSequence(raw)

  const result: ParsedVersePart[] = []
  const prefix = raw.slice(0, markers[0].index).trim()
  if (prefix) result.push(...parseVerseSequence(prefix))

  markers.forEach((marker, index) => {
    const book = marker[1]
    const contentStart = (marker.index ?? 0) + marker[0].length
    const contentEnd = markers[index + 1]?.index ?? raw.length
    result.push({ book, num: '', text: '' })
    result.push(...parseVerseSequence(raw.slice(contentStart, contentEnd).trim()))
  })

  return result
}

// Related passages store each reference after its text, for example
// "15 ... 24 ...（約翰福音14:15, 23-24）". Move that citation ahead of
// the passage so it cannot be mistaken for verse text or the next book.
function parseRelatedVerseText(raw: string, books: Book[] = []): ParsedVersePart[] {
  const names = [...books]
    .sort((a, b) => b.name.length - a.name.length)
    .map(book => book.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  if (names.length === 0) return parseVerseText(raw, books)

  const citationPattern = new RegExp(
    `[（(]\\s*(${names.join('|')})\\s*(\\d+\\s*[:：][^）)]*)[）)]`,
    'g',
  )
  const citations = [...raw.matchAll(citationPattern)]
  if (citations.length === 0) return parseVerseText(raw, books)

  const result: ParsedVersePart[] = []
  let passageStart = 0
  for (const citation of citations) {
    const passage = raw.slice(passageStart, citation.index).trim()
    result.push({
      book: citation[1],
      reference: citation[2].replace(/：/g, ':'),
      num: '',
      text: '',
    })
    if (passage) result.push(...parseVerseSequence(passage))
    passageStart = (citation.index ?? 0) + citation[0].length
  }

  const trailing = raw.slice(passageStart).trim()
  if (trailing) result.push(...parseVerseText(trailing, books))
  return result
}

function SuppLink({ item, tag }: { item: { title: string; excerpt: string; url?: string }; tag: string }) {
  const inner = (
    <div className="flex gap-2 items-start">
      <span className="shrink-0 mt-0.5 text-[10px] font-semibold tracking-wide text-stone-300 dark:text-[#6B6460] uppercase pt-0.5">{tag}</span>
      <div>
        <span className="text-sm text-stone-500 dark:text-[#A09890]">{item.title}</span>
        {item.excerpt && (
          <p className="text-xs leading-6 text-stone-400 dark:text-[#6B6460] line-clamp-2">{item.excerpt}</p>
        )}
      </div>
    </div>
  )
  return item.url
    ? <a href={item.url} target="_blank" rel="noopener noreferrer" className="block hover:opacity-70 transition-opacity">{inner}</a>
    : <div>{inner}</div>
}

function Section({ title, children, muted = false }: {
  title: string
  children: React.ReactNode
  muted?: boolean
}) {
  return (
    <section className="border-t border-stone-200/70 dark:border-[#2E3240] pt-5">
      <h3 className="mb-3 text-xs font-semibold tracking-[0.18em] text-stone-400 dark:text-[#A09890] uppercase">{title}</h3>
      <div className={muted ? 'text-stone-500 dark:text-[#A09890]' : 'text-stone-600 dark:text-[#D4CEC4]'}>
        {children}
      </div>
    </section>
  )
}

const DEVOTIONAL_NOTE_KEY = (mmdd: string) => `devotional-note-${mmdd}`

function DevotionalReflection({ mmdd }: { mmdd: string }) {
  const [draft, setDraft] = useState(() => {
    try { return localStorage.getItem(DEVOTIONAL_NOTE_KEY(mmdd)) ?? '' } catch { return '' }
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    try { setDraft(localStorage.getItem(DEVOTIONAL_NOTE_KEY(mmdd)) ?? '') } catch { setDraft('') }
    setSaved(false)
  }, [mmdd])

  function save() {
    try {
      if (draft.trim()) localStorage.setItem(DEVOTIONAL_NOTE_KEY(mmdd), draft)
      else localStorage.removeItem(DEVOTIONAL_NOTE_KEY(mmdd))
    } catch { /* ignore */ }
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  return (
    <Section title="默想筆記">
      <textarea
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onKeyDown={e => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') save() }}
        placeholder="記錄今天的感動、領受、或禱告…"
        rows={4}
        className="w-full resize-none rounded-md border border-stone-200 dark:border-[#2E3240] bg-transparent px-3 py-2 text-sm leading-7 text-stone-600 dark:text-[#D4CEC4] placeholder:text-stone-300 dark:placeholder:text-[#6B6460] focus:outline-none focus:border-[#4F7358] dark:focus:border-[#7AAF87] transition-colors"
      />
      <div className="mt-2 flex items-center justify-end gap-3">
        {saved && <span className="text-xs text-[#4F7358] dark:text-[#7AAF87]">已儲存</span>}
        <button
          onClick={save}
          className="rounded-md border border-[#4F7358] dark:border-[#7AAF87] px-3 py-1.5 text-xs font-medium text-[#4F7358] dark:text-[#7AAF87] hover:bg-[#4F7358]/10 dark:hover:bg-[#7AAF87]/10 transition-colors"
        >
          儲存
        </button>
      </div>
    </Section>
  )
}

export default function MainDevotional({ ckjv, onNavigate, fontSize, verseNumStyle, lineSpacing }: {
  ckjv: BibleData | null
  onNavigate: (book: Book, chapter: Chapter) => void
  fontSize: string
  verseNumStyle: 'show' | 'fade' | 'hide'
  lineSpacing: 'comfortable' | 'loose'
}) {
  const [plan, setPlan] = useState<DevotionalPlan | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [mmdd, setMmdd] = useState(todayMMDD)
  const todayKey = todayMMDD()

  const [highlights, setHighlights] = useState<DevotionalHighlight[]>(loadHighlights)
  const [picker, setPicker] = useState<{ verseRef: string; text: string } | null>(null)
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (plan) return
    setLoading(true)
    setError(false)
    fetch(`${import.meta.env.BASE_URL}devotional-plan.json`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((data: DevotionalPlan) => { setPlan(data); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [plan])

  const day = plan?.[mmdd]

  const todayHighlights = highlights.filter(h => h.mmdd === mmdd)

  function getVerseHL(verseRef: string): DevHighlightColor | null {
    return highlights.find(h => h.mmdd === mmdd && h.verseRef === verseRef)?.color ?? null
  }

  function startLongPress(verseRef: string, text: string) {
    if (longPressTimer.current) clearTimeout(longPressTimer.current)
    longPressTimer.current = setTimeout(() => {
      setPicker({ verseRef, text })
    }, 500)
  }

  function cancelLongPress() {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
  }

  function applyHighlight(color: DevHighlightColor) {
    if (!picker) return
    const newHL: DevotionalHighlight = { mmdd, verseRef: picker.verseRef, color, verseText: picker.text }
    const updated = [
      ...highlights.filter(h => !(h.mmdd === mmdd && h.verseRef === picker.verseRef)),
      newHL,
    ]
    setHighlights(updated)
    saveHighlights(updated)
    setPicker(null)
  }

  function removeHighlight(verseRef: string) {
    const updated = highlights.filter(h => !(h.mmdd === mmdd && h.verseRef === verseRef))
    setHighlights(updated)
    saveHighlights(updated)
  }

  function handleNavigate() {
    if (!day || !ckjv) return
    const book = findBookByRef(day.ref, ckjv.books)
    if (!book) return
    const chapter = book.chapters.find(c => c.number === parseChapterFromRef(day.ref))
    if (!chapter) return
    onNavigate(book, chapter)
  }

  return (
    <>
      <main className="flex-1 min-h-0 overflow-y-auto px-5 pb-24 pt-8 sm:px-8 sm:pb-12">
        <div className="mx-auto w-full max-w-3xl">
          <div className="mb-8 flex items-center justify-between gap-3">
            <button
              onClick={() => setMmdd(shiftMMDD(mmdd, -1))}
              className="h-9 w-9 rounded-full border border-stone-200 dark:border-[#2E3240] text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#22242C] transition-colors"
              aria-label="前一天"
            >
              ←
            </button>
            <div className="text-center">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-stone-300 dark:text-[#6B6460] uppercase">靈修</p>
              <p className="mt-1 text-sm text-stone-500 dark:text-[#E4DDD0]">
                {mmdd.slice(0, 2)}月{mmdd.slice(2, 4)}日
                {mmdd === todayKey && (
                  <span className="ml-2 rounded-full bg-[#4F7358]/10 px-2 py-0.5 text-[10px] text-[#4F7358] dark:bg-[#7AAF87]/10 dark:text-[#7AAF87]">今天</span>
                )}
              </p>
            </div>
            <button
              onClick={() => setMmdd(shiftMMDD(mmdd, 1))}
              className="h-9 w-9 rounded-full border border-stone-200 dark:border-[#2E3240] text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#22242C] transition-colors"
              aria-label="後一天"
            >
              →
            </button>
          </div>

          {loading && (
            <div className="flex h-40 items-center justify-center text-sm text-stone-300 dark:text-[#6B6460]">
              <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-stone-200 border-t-[#4F7358]" />
              載入靈修內容…
            </div>
          )}

          {error && (
            <p className="py-16 text-center text-sm text-stone-300 dark:text-[#6B6460]">無法載入靈修資料</p>
          )}

          {plan && !day && (
            <p className="py-16 text-center text-sm text-stone-300 dark:text-[#6B6460]">此日期暫無資料</p>
          )}

          {day && (
            <article key={mmdd} className="space-y-7">
              <header className="space-y-4">
                <p className="text-xs font-medium tracking-[0.18em] text-[#4F7358] dark:text-[#7AAF87] uppercase">{day.title}</p>
                <div>
                  <h1 className="text-2xl font-semibold leading-tight text-stone-700 dark:text-[#E4DDD0] sm:text-3xl">{day.ref}</h1>
                  {day.verseText && (
                    <div className="mt-4 border-l-2 border-[#4F7358]/60 pl-4 space-y-1">
                      {parseVerseText(day.verseText, ckjv?.books ?? []).map(({ num, text, book }, i) => {
                        if (book) {
                          return (
                            <h2
                              key={`${book}-${i}`}
                              className="pb-1 pt-5 text-sm font-semibold tracking-[0.08em] text-[#4F7358] first:pt-1 dark:text-[#8FC79D]"
                            >
                              {book}
                            </h2>
                          )
                        }
                        const hl = getVerseHL(num)
                        return (
                          <p
                            key={i}
                            onPointerDown={() => startLongPress(num, text)}
                            onPointerUp={cancelLongPress}
                            onPointerLeave={cancelLongPress}
                            className={`${fontSize} text-stone-700 dark:text-[#E4DDD0] select-none cursor-default rounded px-1 -mx-1 transition-colors ${hl ? DEV_COLOR_BG[hl] : ''}`}
                            style={{ lineHeight: lineSpacing === 'loose' ? '2.4' : '1.9' }}
                          >
                            {num && (
                              <sup
                                className={`text-[#4F7358] dark:text-[#7AAF87] select-none mr-0.5 transition-opacity duration-150 ${
                                  verseNumStyle === 'hide' ? 'opacity-0'
                                  : verseNumStyle === 'fade' ? 'opacity-20'
                                  : 'opacity-60'
                                }`}
                                style={{ fontSize: '9px', fontWeight: 400 }}
                              >
                                {num}
                              </sup>
                            )}
                            {text}
                          </p>
                        )
                      })}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {ckjv && (
                    <button
                      onClick={handleNavigate}
                      className="rounded-md border border-[#4F7358] px-3 py-2 text-xs font-medium text-[#4F7358] transition-colors hover:bg-[#4F7358]/10 dark:border-[#7AAF87] dark:text-[#7AAF87] dark:hover:bg-[#7AAF87]/10"
                    >
                      閱讀原文
                    </button>
                  )}
                  <a
                    href={`https://letsfollowjesus.org/main/daily/${mmdd}.html`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-stone-300 px-3 py-2 text-xs text-stone-400 transition-colors hover:bg-stone-100 dark:border-[#3A3C42] dark:text-[#A09890] dark:hover:bg-[#22242C]"
                  >
                    完整靈修 ↗
                  </a>
                </div>
              </header>

              {day.relatedVerse && (
                <Section title="相關經文" muted>
                  <div className="border-l border-stone-200 dark:border-[#2E3240] pl-4 space-y-1">
                    {parseRelatedVerseText(day.relatedVerse, ckjv?.books ?? []).map(({ num, text, book, reference }, i) => book ? (
                      <h3 key={`${book}-${i}`} className="pb-1 pt-4 text-xs font-semibold tracking-[0.08em] text-[#4F7358] first:pt-0 dark:text-[#8FC79D]">
                        {book}<span className="ml-1.5 font-normal tracking-normal text-stone-400 dark:text-[#817B75]">{reference}</span>
                      </h3>
                    ) : (
                      <p key={`${num}-${i}`} className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">
                        {num && (
                          <sup
                            className={`text-[#4F7358] dark:text-[#7AAF87] select-none mr-0.5 transition-opacity duration-150 ${
                              verseNumStyle === 'hide' ? 'opacity-0'
                              : verseNumStyle === 'fade' ? 'opacity-20'
                              : 'opacity-60'
                            }`}
                            style={{ fontSize: '9px', fontWeight: 400 }}
                          >
                            {num}
                          </sup>
                        )}
                        {text}
                      </p>
                    ))}
                  </div>
                </Section>
              )}

              {day.meditation.length > 0 && (
                <Section title="觀察默想">
                  <ol className="space-y-3">
                    {day.meditation.map((q, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-7 sm:text-base">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#4F7358]/10 text-xs font-semibold text-[#4F7358] dark:bg-[#7AAF87]/10 dark:text-[#7AAF87]">{i + 1}</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ol>
                </Section>
              )}

              {day.responses.length > 0 && (
                <Section title="靈修回應">
                  <ol className="space-y-3">
                    {day.responses.map((q, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-7 sm:text-base">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#4F7358]/10 text-xs font-semibold text-[#4F7358] dark:bg-[#7AAF87]/10 dark:text-[#7AAF87]">{i + 1}</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ol>
                </Section>
              )}

              {day.hints.length > 0 && (
                <Section title="經文亮光" muted>
                  {day.hintImages && day.hintImages.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-3">
                      {day.hintImages.map(src => (
                        <img
                          key={src}
                          src={src}
                          alt="經文亮光插圖"
                          loading="lazy"
                          className="max-h-72 w-auto max-w-full rounded-lg border border-stone-200 dark:border-[#2E3240]"
                        />
                      ))}
                    </div>
                  )}
                  <div className="space-y-3 text-sm leading-7 sm:text-base">
                    {day.hints.map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                </Section>
              )}

              {day.prayer && (
                <Section title="禱告文">
                  <p className="rounded-md bg-[#4F7358]/10 px-4 py-5 text-base italic leading-8 text-stone-600 dark:bg-[#7AAF87]/8 dark:text-[#D4CEC4]">
                    {day.prayer}
                  </p>
                </Section>
              )}

              {day.hymn && (
                <Section title="詩歌欣賞" muted>
                  <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">
                    {day.hymn.title}
                  </p>
                  {day.hymn.description && (
                    <p className="mt-1 text-sm leading-7 text-stone-400 dark:text-[#6B6460]">
                      {day.hymn.description}
                    </p>
                  )}
                </Section>
              )}

              {(day.lights?.length || day.messages?.length || day.testimonies?.length) ? (
                <Section title="延伸閱讀" muted>
                  <div className="space-y-2">
                    {day.lights?.map((item, i) => (
                      <SuppLink key={'l'+i} item={item} tag="亮光" />
                    ))}
                    {day.messages?.map((item, i) => (
                      <SuppLink key={'m'+i} item={item} tag="信息" />
                    ))}
                    {day.testimonies?.map((item, i) => (
                      <SuppLink key={'t'+i} item={item} tag="見證" />
                    ))}
                  </div>
                </Section>
              ) : null}

              {todayHighlights.length > 0 && (
                <Section title="本日劃線">
                  <div className="space-y-3">
                    {todayHighlights.map(h => (
                      <div key={h.verseRef} className="flex items-start gap-2">
                        <span className={`mt-1.5 shrink-0 w-2.5 h-2.5 rounded-full ${DEV_COLOR_DOT[h.color]}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] text-stone-400 dark:text-[#6B6460] mb-0.5">{h.verseRef} 節・{DEV_COLOR_LABEL[h.color]}</p>
                          <p className="text-sm leading-6 text-stone-600 dark:text-[#D4CEC4] line-clamp-2">{h.verseText}</p>
                        </div>
                        <button
                          onClick={() => removeHighlight(h.verseRef)}
                          aria-label="移除劃線"
                          className="shrink-0 mt-1 text-stone-300 dark:text-[#6B6460] hover:text-stone-500 dark:hover:text-[#A09890] transition-colors text-xs leading-none"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              <DevotionalReflection mmdd={mmdd} />

              <footer className="pt-2 text-center">
                <a
                  href="https://letsfollowjesus.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-stone-300 transition-colors hover:text-stone-400 dark:text-[#6B6460] dark:hover:text-[#A09890]"
                >
                  內容來源：跟隨耶穌 letsfollowjesus.org
                </a>
              </footer>
            </article>
          )}
        </div>
      </main>

      {/* Long-press highlight color picker */}
      {picker && (
        <div
          className="fixed inset-0 z-50"
          onPointerDown={() => setPicker(null)}
        >
          <div
            className="fixed bottom-0 left-0 right-0 rounded-t-2xl bg-white dark:bg-[#22242C] border-t border-stone-200 dark:border-[#2E3240] px-6 pt-5 pb-10 shadow-2xl"
            onPointerDown={e => e.stopPropagation()}
          >
            <p className="mb-1 text-[11px] font-semibold tracking-[0.18em] text-stone-300 dark:text-[#6B6460] uppercase text-center">標記經文</p>
            <p className="mb-5 text-xs text-stone-500 dark:text-[#A09890] text-center line-clamp-1">{picker.text}</p>
            <div className="flex justify-center gap-6">
              {HL_COLORS.map(color => (
                <button
                  key={color}
                  onClick={() => applyHighlight(color)}
                  className="flex flex-col items-center gap-2 group"
                >
                  <span className={`w-10 h-10 rounded-full ${DEV_COLOR_DOT[color]} group-hover:scale-110 transition-transform`} />
                  <span className="text-xs text-stone-500 dark:text-[#A09890]">{DEV_COLOR_LABEL[color]}</span>
                </button>
              ))}
            </div>
            {getVerseHL(picker.verseRef) && (
              <div className="mt-5 flex justify-center">
                <button
                  onClick={() => { removeHighlight(picker.verseRef); setPicker(null) }}
                  className="text-xs text-stone-400 dark:text-[#6B6460] hover:text-stone-600 dark:hover:text-[#A09890] transition-colors"
                >
                  移除劃線
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

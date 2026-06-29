import { useEffect, useState } from 'react'
import type { BibleData, Book, Chapter } from '../types'

interface DevotionalDay {
  ref: string
  title: string
  verseText: string
  meditation: string[]
  responses: string[]
  hints: string[]
  prayer: string
}

type DevotionalPlan = Record<string, DevotionalDay>

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

function Section({ title, children, muted = false }: {
  title: string
  children: React.ReactNode
  muted?: boolean
}) {
  return (
    <section className="border-t border-stone-200/70 dark:border-[#2E3240] pt-5">
      <h3 className="mb-3 text-xs font-semibold tracking-[0.18em] text-stone-400 dark:text-[#A09890] uppercase">{title}</h3>
      <div className={muted ? 'text-stone-400 dark:text-[#A09890]' : 'text-stone-600 dark:text-[#D4CEC4]'}>
        {children}
      </div>
    </section>
  )
}

export default function MainDevotional({ ckjv, onNavigate }: {
  ckjv: BibleData | null
  onNavigate: (book: Book, chapter: Chapter) => void
}) {
  const [plan, setPlan] = useState<DevotionalPlan | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [mmdd, setMmdd] = useState(todayMMDD)
  const todayKey = todayMMDD()

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

  function handleNavigate() {
    if (!day || !ckjv) return
    const book = findBookByRef(day.ref, ckjv.books)
    if (!book) return
    const chapter = book.chapters.find(c => c.number === parseChapterFromRef(day.ref))
    if (!chapter) return
    onNavigate(book, chapter)
  }

  return (
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
            <p className="text-[11px] font-semibold tracking-[0.2em] text-stone-300 dark:text-[#6B6460] uppercase">領受</p>
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
            載入領受內容…
          </div>
        )}

        {error && (
          <p className="py-16 text-center text-sm text-stone-300 dark:text-[#6B6460]">無法載入靈修資料</p>
        )}

        {plan && !day && (
          <p className="py-16 text-center text-sm text-stone-300 dark:text-[#6B6460]">此日期暫無資料</p>
        )}

        {day && (
          <article className="space-y-7">
            <header className="space-y-4">
              <p className="text-xs font-medium tracking-[0.18em] text-[#4F7358] dark:text-[#7AAF87] uppercase">{day.title}</p>
              <div>
                <h1 className="text-2xl font-semibold leading-tight text-stone-700 dark:text-[#E4DDD0] sm:text-3xl">{day.ref}</h1>
                {day.verseText && (
                  <p className="mt-4 border-l-2 border-[#4F7358]/40 pl-4 text-base leading-8 text-stone-500 dark:text-[#D4CEC4] sm:text-lg">
                    {day.verseText}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {ckjv && (
                  <button
                    onClick={handleNavigate}
                    className="rounded-md border border-[#4F7358] px-3 py-2 text-xs font-medium text-[#4F7358] transition-colors hover:bg-[#4F7358]/10 dark:border-[#7AAF87] dark:text-[#7AAF87] dark:hover:bg-[#7AAF87]/10"
                  >
                    打開相關經文
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
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-stone-200 text-xs font-semibold text-stone-500 dark:bg-[#2E3240] dark:text-[#A09890]">{i + 1}</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ol>
              </Section>
            )}

            {day.hints.length > 0 && (
              <Section title="經文亮光" muted>
                <div className="space-y-3 text-sm leading-7 sm:text-base">
                  {day.hints.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </Section>
            )}

            {day.prayer && (
              <Section title="禱告文">
                <p className="rounded-md bg-[#4F7358]/5 px-4 py-4 text-sm italic leading-7 text-stone-600 dark:bg-[#7AAF87]/5 dark:text-[#D4CEC4] sm:text-base">
                  {day.prayer}
                </p>
              </Section>
            )}

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
  )
}

import { useState, useEffect } from 'react'
import type { BibleData, Book, Chapter } from '../types'

interface DevotionalDay {
  mmdd: string
  ref: string
  title: string
  verseText: string
  meditation: string[]
  responses: string[]
  hints: string[]
  prayer: string
}

type DevotionalPlan = Record<string, DevotionalDay>

interface Props {
  isOpen: boolean
  onClose: () => void
  ckjv: BibleData | null
  onNavigate: (book: Book, chapter: Chapter) => void
}

function todayMMDD(): string {
  const d = new Date()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${m}${day}`
}

function prevMMDD(mmdd: string): string {
  const m = parseInt(mmdd.slice(0, 2))
  const d = parseInt(mmdd.slice(2, 4))
  const date = new Date(2024, m - 1, d)
  date.setDate(date.getDate() - 1)
  return `${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`
}

function nextMMDD(mmdd: string): string {
  const m = parseInt(mmdd.slice(0, 2))
  const d = parseInt(mmdd.slice(2, 4))
  const date = new Date(2024, m - 1, d)
  date.setDate(date.getDate() + 1)
  return `${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`
}

function parseChapterFromRef(ref: string): number {
  const match = ref.match(/(\d+)\s*[:.：]/)
  return match ? parseInt(match[1]) : 1
}

function findBookByRef(ref: string, books: Book[]): Book | null {
  const sorted = [...books].sort((a, b) => b.name.length - a.name.length)
  for (const book of sorted) {
    if (ref.includes(book.name)) return book
  }
  return null
}

function Section({ title, children, defaultOpen = true }: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-stone-200 dark:border-[#2E3240] last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left text-xs font-semibold text-stone-600 dark:text-[#E4DDD0] uppercase tracking-widest hover:bg-stone-100 dark:hover:bg-[#2E3240] transition-colors"
      >
        <span>{title}</span>
        <span className={`text-[10px] ml-2 transition-transform duration-200 inline-block ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      <div className={`overflow-hidden transition-all duration-200 ${open ? 'max-h-[2000px]' : 'max-h-0'}`}>
        <div className="px-4 pb-4">{children}</div>
      </div>
    </div>
  )
}

export default function DailyDevotional({ isOpen, onClose, ckjv, onNavigate }: Props) {
  const [plan, setPlan] = useState<DevotionalPlan | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [mmdd, setMmdd] = useState(todayMMDD)

  useEffect(() => {
    if (!isOpen || plan) return
    setLoading(true)
    setError(false)
    fetch(`${import.meta.env.BASE_URL}devotional-plan.json`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((data: DevotionalPlan) => { setPlan(data); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [isOpen])

  const today = todayMMDD()
  const day = plan?.[mmdd]

  function handleNavigate() {
    if (!day || !ckjv) return
    const book = findBookByRef(day.ref, ckjv.books)
    if (!book) return
    const chNum = parseChapterFromRef(day.ref)
    const chapter = book.chapters.find(c => c.number === chNum)
    if (!chapter) return
    onNavigate(book, chapter)
    onClose()
  }

  return (
    <>
      {/* Backdrop — mobile only */}
      <div
        className={`fixed inset-0 z-30 bg-black/20 dark:bg-black/40 transition-opacity duration-200 md:hidden
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 z-40 h-full flex flex-col
          bg-stone-50 dark:bg-[#22242C]
          border-l border-stone-200 dark:border-[#2E3240]
          shadow-xl transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ width: 'min(100vw, min(420px, 90vw))' }}
      >
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-stone-200 dark:border-[#2E3240]">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-stone-600 dark:text-[#E4DDD0]">今日靈修</span>
            {mmdd === today && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#4F7358]/10 dark:bg-[#7AAF87]/10 text-[#4F7358] dark:text-[#7AAF87] font-medium">今天</span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#2E3240] transition-colors"
            aria-label="關閉"
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Date nav */}
        <div className="shrink-0 flex items-center justify-between px-4 py-2 border-b border-stone-200 dark:border-[#2E3240]">
          <button
            onClick={() => setMmdd(prevMMDD(mmdd))}
            className="p-1.5 rounded text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#2E3240] hover:text-stone-600 dark:hover:text-[#E4DDD0] active:scale-95 transition-all duration-150"
          >
            ←
          </button>
          <span className="text-xs text-stone-400 dark:text-[#A09890]">
            {mmdd.slice(0, 2)}月{mmdd.slice(2, 4)}日
          </span>
          <button
            onClick={() => setMmdd(nextMMDD(mmdd))}
            className="p-1.5 rounded text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#2E3240] hover:text-stone-600 dark:hover:text-[#E4DDD0] active:scale-95 transition-all duration-150"
          >
            →
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {loading && (
            <div className="flex flex-col items-center justify-center h-40 gap-3 px-4 text-sm text-stone-400 dark:text-[#A09890]">
              <div className="w-5 h-5 border-2 border-stone-200 dark:border-[#2E3240] border-t-[#4F7358] dark:border-t-[#7AAF87] rounded-full animate-spin" />
              <span>載入今日靈修中…</span>
            </div>
          )}
          {error && (
            <div className="flex flex-col items-center justify-center h-40 gap-3 px-4 text-center text-stone-400 dark:text-[#A09890]">
              <span className="text-xl">⚠️</span>
              <div>
                <p className="text-sm font-medium">無法載入靈修資料</p>
                <p className="text-xs mt-1 text-stone-300 dark:text-[#6B6460]">請檢查網路連線或稍後重試</p>
              </div>
            </div>
          )}
          {plan && !day && (
            <div className="flex flex-col items-center justify-center h-40 gap-2 px-4 text-center text-stone-400 dark:text-[#A09890]">
              <span className="text-xl">📖</span>
              <span className="text-sm">此日期暫無靈修資料</span>
            </div>
          )}
          {day && (
            <>
              {/* Verse reference + jump */}
              <div className="px-4 py-4 border-b border-stone-200 dark:border-[#2E3240]">
                <div className="text-[10px] font-semibold text-stone-300 dark:text-[#6B6460] mb-1">{day.title}</div>
                <div className="text-lg font-semibold text-stone-700 dark:text-[#F5F2EC] mb-3">{day.ref}</div>
                {day.verseText && (
                  <p className="text-sm text-stone-500 dark:text-[#D4CEC4] leading-relaxed mb-3 italic">
                    {day.verseText}
                  </p>
                )}
                <div className="flex gap-2">
                  {ckjv && (
                    <button
                      onClick={handleNavigate}
                      className="flex-1 py-1.5 text-xs rounded border border-[#4F7358] dark:border-[#7AAF87] text-[#4F7358] dark:text-[#7AAF87] hover:bg-[#4F7358]/15 dark:hover:bg-[#7AAF87]/15 hover:border-[#3D5845] dark:hover:border-[#5D8C70] transition-all duration-150 font-medium"
                    >
                      在讀經器打開 →
                    </button>
                  )}
                  <a
                    href={`https://letsfollowjesus.org/main/daily/${mmdd}.html`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-1.5 text-xs rounded border border-stone-300 dark:border-[#3A3C42] text-stone-500 dark:text-[#D4CEC4] bg-stone-50 dark:bg-[#1A1C22] hover:bg-stone-100 dark:hover:bg-[#252A34] transition-all duration-150 text-center"
                  >
                    完整靈修 ↗
                  </a>
                </div>
              </div>

              {/* Meditation questions */}
              {day.meditation.length > 0 && (
                <Section title="觀察默想">
                  <ol className="space-y-2.5 list-none">
                    {day.meditation.map((q, i) => (
                      <li key={i} className="flex gap-2 text-sm text-stone-500 dark:text-[#D4CEC4] leading-relaxed">
                        <span className="shrink-0 text-[#4F7358] dark:text-[#7AAF87] font-semibold text-xs mt-0.5">{i + 1}.</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ol>
                </Section>
              )}

              {/* Response questions */}
              {day.responses.length > 0 && (
                <Section title="靈修回應">
                  <ol className="space-y-2.5 list-none">
                    {day.responses.map((q, i) => (
                      <li key={i} className="flex gap-2 text-sm text-stone-500 dark:text-[#D4CEC4] leading-relaxed">
                        <span className="shrink-0 text-[#4F7358] dark:text-[#7AAF87] font-semibold text-xs mt-0.5">{i + 1}.</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ol>
                </Section>
              )}

              {/* Scripture insight */}
              {day.hints.length > 0 && (
                <Section title="經文亮光" defaultOpen={false}>
                  <div className="space-y-3">
                    {day.hints.map((p, i) => (
                      <p key={i} className="text-sm text-stone-500 dark:text-[#D4CEC4] leading-relaxed">{p}</p>
                    ))}
                  </div>
                </Section>
              )}

              {/* Prayer */}
              {day.prayer && (
                <Section title="禱告文">
                  <div className="px-3 py-2 rounded bg-[#4F7358]/5 dark:bg-[#7AAF87]/5 border-l-2 border-[#4F7358] dark:border-[#7AAF87]">
                    <p className="text-sm text-stone-500 dark:text-[#D4CEC4] leading-relaxed italic">{day.prayer}</p>
                  </div>
                </Section>
              )}

              {/* Attribution */}
              <div className="px-4 py-3 text-center border-t border-stone-100 dark:border-[#1A1C22]">
                <a
                  href="https://letsfollowjesus.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-stone-400 dark:text-[#6B6460] hover:text-stone-600 dark:hover:text-[#A09890] transition-colors"
                >
                  內容來源：跟隨耶穌 letsfollowjesus.org
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

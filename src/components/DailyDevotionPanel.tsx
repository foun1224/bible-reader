import { useState, useEffect } from 'react'
import type { BibleData, Book } from '../types'

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
  onJumpTo: (sourceId: 'ckjv' | 'jasher', bookId: number | undefined, chapter: number) => void
}

function todayMmdd(): string {
  const d = new Date()
  return `${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
}

function shiftMmdd(mmdd: string, delta: number): string {
  const m = parseInt(mmdd.slice(0, 2))
  const d = parseInt(mmdd.slice(2, 4))
  const date = new Date(2024, m - 1, d)
  date.setDate(date.getDate() + delta)
  return `${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`
}

function findBookByRef(ref: string, books: Book[]): Book | null {
  const sorted = [...books].sort((a, b) => b.name.length - a.name.length)
  for (const book of sorted) {
    if (ref.includes(book.name)) return book
  }
  return null
}

function parseChapterFromRef(ref: string): number {
  const m = ref.match(/(\d+)\s*[:.：章篇]/)
  return m ? parseInt(m[1]) : 1
}

function Section({
  title, isOpen, onToggle, children,
}: {
  title: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode
}) {
  return (
    <div className="border-b border-stone-100 dark:border-[#2E3240] last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-stone-50 dark:hover:bg-[#17191E] transition-colors"
      >
        <span className="text-xs font-medium text-stone-400 dark:text-[#A09890] uppercase tracking-widest">{title}</span>
        <span className="text-stone-300 dark:text-[#A09890] text-[10px]">{isOpen ? '▾' : '▸'}</span>
      </button>
      {isOpen && <div className="px-5 pb-4">{children}</div>}
    </div>
  )
}

export default function DailyDevotionPanel({ isOpen, onClose, ckjv, onJumpTo }: Props) {
  const [plan, setPlan] = useState<DevotionalPlan | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [mmdd, setMmdd] = useState(todayMmdd)
  const [openSection, setOpenSection] = useState<string | null>('meditation')

  useEffect(() => {
    if (!isOpen || plan) return
    setLoading(true)
    setError(false)
    fetch(`${import.meta.env.BASE_URL}devotional-plan.json`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((data: DevotionalPlan) => { setPlan(data); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [isOpen])

  // Reset to today when panel reopens
  useEffect(() => {
    if (isOpen) setMmdd(todayMmdd())
  }, [isOpen])

  const today = todayMmdd()
  const day = plan?.[mmdd]

  function handleJump() {
    if (!day || !ckjv) return
    const book = findBookByRef(day.ref, ckjv.books)
    if (!book) return
    const chapter = parseChapterFromRef(day.ref)
    onJumpTo('ckjv', book.id as number, chapter)
    onClose()
  }

  const toggle = (key: string) => setOpenSection(s => s === key ? null : key)

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />}

      <div
        className={`fixed top-0 right-0 z-50 h-full flex flex-col bg-stone-50 dark:bg-[#22242C] border-l border-stone-200 dark:border-[#2E3240] transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ width: 'min(100vw, 400px)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-200 dark:border-[#2E3240] shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-stone-500 dark:text-[#E4DDD0]">今日靈修</span>
            {mmdd === today && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-sage/10 dark:bg-sage-dark/10 text-sage dark:text-sage-dark font-medium">今天</span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#2E3240] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Date navigation */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-stone-200 dark:border-[#2E3240] shrink-0">
          <button
            onClick={() => setMmdd(d => shiftMmdd(d, -1))}
            className="p-1.5 rounded text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#2E3240] transition-colors text-sm"
          >←</button>
          <span className="text-xs text-stone-400 dark:text-[#A09890]">
            {parseInt(mmdd.slice(0, 2))} 月 {parseInt(mmdd.slice(2, 4))} 日
          </span>
          <button
            onClick={() => setMmdd(d => shiftMmdd(d, 1))}
            className="p-1.5 rounded text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#2E3240] transition-colors text-sm"
          >→</button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {loading && (
            <div className="flex items-center justify-center h-40 text-sm text-stone-300 dark:text-[#A09890]">
              載入中…
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center h-40 text-sm text-stone-300 dark:text-[#A09890] px-6 text-center">
              無法載入靈修資料
            </div>
          )}

          {plan && !day && !loading && (
            <div className="flex items-center justify-center h-40 text-sm text-stone-300 dark:text-[#A09890]">
              此日期無靈修資料
            </div>
          )}

          {day && (
            <div className="py-2">
              {/* Reference + verse text */}
              <div className="px-5 py-4 border-b border-stone-100 dark:border-[#2E3240]">
                <p className="text-[10px] font-medium text-stone-300 dark:text-[#A09890] uppercase tracking-widest mb-1">{day.title}</p>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-base font-semibold text-stone-500 dark:text-[#E4DDD0]">{day.ref}</p>
                  {ckjv && (
                    <button
                      onClick={handleJump}
                      className="shrink-0 ml-3 px-2.5 py-1 text-xs rounded border border-sage/40 dark:border-sage-dark/40 text-sage dark:text-sage-dark hover:bg-sage/10 dark:hover:bg-sage-dark/10 transition-colors"
                    >
                      在讀經器開 →
                    </button>
                  )}
                </div>
                {day.verseText && (
                  <p className="text-sm text-stone-400 dark:text-[#A09890] leading-relaxed italic border-l-2 border-sage/30 dark:border-sage-dark/30 pl-3">
                    {day.verseText.length > 300 ? day.verseText.slice(0, 300) + '…' : day.verseText}
                  </p>
                )}
              </div>

              {/* Meditation */}
              {day.meditation.length > 0 && (
                <Section title={`觀察默想（${day.meditation.length}題）`} isOpen={openSection === 'meditation'} onToggle={() => toggle('meditation')}>
                  <ol className="list-none space-y-3">
                    {day.meditation.map((q, i) => (
                      <li key={i} className="flex gap-2.5 text-sm text-stone-500 dark:text-[#E4DDD0] leading-relaxed">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-sage/15 dark:bg-sage-dark/15 text-sage dark:text-sage-dark text-[10px] font-medium flex items-center justify-center mt-0.5">{i + 1}</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ol>
                </Section>
              )}

              {/* Responses */}
              {day.responses.length > 0 && (
                <Section title={`靈修回應（${day.responses.length}題）`} isOpen={openSection === 'responses'} onToggle={() => toggle('responses')}>
                  <ol className="list-none space-y-3">
                    {day.responses.map((q, i) => (
                      <li key={i} className="flex gap-2.5 text-sm text-stone-500 dark:text-[#E4DDD0] leading-relaxed">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-celebration/15 dark:bg-celebration-dark/15 text-celebration dark:text-celebration-dark text-[10px] font-medium flex items-center justify-center mt-0.5">{i + 1}</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ol>
                </Section>
              )}

              {/* Scripture insights */}
              {day.hints.length > 0 && (
                <Section title="經文亮光" isOpen={openSection === 'hints'} onToggle={() => toggle('hints')}>
                  <div className="space-y-3">
                    {day.hints.map((p, i) => (
                      <p key={i} className="text-sm text-stone-500 dark:text-[#E4DDD0] leading-relaxed">{p}</p>
                    ))}
                  </div>
                </Section>
              )}

              {/* Prayer */}
              {day.prayer && (
                <Section title="禱告" isOpen={openSection === 'prayer'} onToggle={() => toggle('prayer')}>
                  <p className="text-sm text-stone-500 dark:text-[#E4DDD0] leading-relaxed italic whitespace-pre-line">{day.prayer}</p>
                </Section>
              )}

              {/* Source */}
              <div className="px-5 py-4 mt-1">
                <a
                  href={`https://letsfollowjesus.org/main/daily/${mmdd}.html`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-stone-300 dark:text-[#A09890] hover:text-sage dark:hover:text-sage-dark transition-colors"
                >
                  在原站查看完整內容 →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

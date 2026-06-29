import { useState, useEffect } from 'react'
import type { BibleData, Book, Chapter, Highlight, ReflectionNote, HighlightColor } from '../types'

const REFLECTION_KEY = 'bible-reader-reflections'

const COLOR_DOT: Record<HighlightColor, string> = {
  important: 'bg-amber-400',
  comfort:   'bg-green-400',
  question:  'bg-blue-400',
  prayer:    'bg-red-400',
}

const COLOR_LABEL: Record<HighlightColor, string> = {
  important: '重要',
  comfort:   '安慰',
  question:  '疑問',
  prayer:    '禱告',
}

// ── Devotional types & helpers ──────────────────────────────
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

function todayMMDD(): string {
  const d = new Date()
  return `${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
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

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('zh-TW', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function DevotionalSection({ title, children, defaultOpen = true }: {
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

// ── Props ────────────────────────────────────────────────────
interface Props {
  isOpen: boolean
  onClose: () => void
  // For 領受 tab
  ckjv: BibleData | null
  onNavigate: (book: Book, chapter: Chapter) => void
  // For 默想 tab
  currentSource: 'ckjv' | 'jasher'
  currentBookId: number | undefined
  currentChapter: number
  currentChapterLabel: string
  // For 筆記 tab
  highlights: Highlight[]
  onJumpTo: (sourceId: 'ckjv' | 'jasher', bookId: number | undefined, chapter: number) => void
  // Reading settings (controlled from parent, toggled in panel)
  verseNumStyle: 'show' | 'fade' | 'hide'
  onVerseNumStyle: (v: 'show' | 'fade' | 'hide') => void
  lineSpacing: 'comfortable' | 'loose'
  onLineSpacing: (v: 'comfortable' | 'loose') => void
}

// ── Component ────────────────────────────────────────────────
export default function ReflectionPanel({
  isOpen, onClose,
  ckjv, onNavigate,
  currentSource, currentBookId, currentChapter, currentChapterLabel,
  highlights, onJumpTo,
  verseNumStyle, onVerseNumStyle, lineSpacing, onLineSpacing,
}: Props) {
  type Tab = '領受' | '默想' | '筆記'
  const [tab, setTab] = useState<Tab>('領受')

  // ── 領受 tab state ────────────────────────────────────────
  const [devotionalPlan, setDevotionalPlan] = useState<DevotionalPlan | null>(null)
  const [devotionalLoading, setDevotionalLoading] = useState(false)
  const [devotionalError, setDevotionalError] = useState(false)
  const [mmdd, setMmdd] = useState(todayMMDD)
  const todayKey = todayMMDD()

  useEffect(() => {
    if (!isOpen || devotionalPlan) return
    setDevotionalLoading(true)
    setDevotionalError(false)
    fetch(`${import.meta.env.BASE_URL}devotional-plan.json`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((data: DevotionalPlan) => { setDevotionalPlan(data); setDevotionalLoading(false) })
      .catch(() => { setDevotionalError(true); setDevotionalLoading(false) })
  }, [isOpen])

  function handleNavigate(day: DevotionalDay) {
    if (!ckjv) return
    const book = findBookByRef(day.ref, ckjv.books)
    if (!book) return
    const chNum = parseChapterFromRef(day.ref)
    const chapter = book.chapters.find(c => c.number === chNum)
    if (!chapter) return
    onNavigate(book, chapter)
    onClose()
  }

  // ── 默想 tab state ────────────────────────────────────────
  const [reflections, setReflections] = useState<ReflectionNote[]>(() => {
    try { return JSON.parse(localStorage.getItem(REFLECTION_KEY) || '[]') }
    catch { return [] }
  })

  const currentKey = `${currentSource}-${currentBookId ?? 'j'}-${currentChapter}`
  const currentReflection = reflections.find(
    r => r.sourceId === currentSource && r.bookId === currentBookId && r.chapter === currentChapter
  )
  const [draftContent, setDraftContent] = useState(currentReflection?.content ?? '')

  useEffect(() => {
    const r = reflections.find(
      r => r.sourceId === currentSource && r.bookId === currentBookId && r.chapter === currentChapter
    )
    setDraftContent(r?.content ?? '')
  }, [currentKey])

  function saveReflection() {
    const note: ReflectionNote = {
      sourceId: currentSource,
      bookId: currentBookId,
      chapter: currentChapter,
      content: draftContent,
      updatedAt: new Date().toISOString(),
    }
    setReflections(prev => {
      const filtered = prev.filter(
        r => !(r.sourceId === currentSource && r.bookId === currentBookId && r.chapter === currentChapter)
      )
      const next = draftContent.trim() ? [...filtered, note] : filtered
      localStorage.setItem(REFLECTION_KEY, JSON.stringify(next))
      return next
    })
  }

  // ── 筆記 tab: sorted highlights ───────────────────────────
  const sortedHighlights = [...highlights].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  const day = devotionalPlan?.[mmdd]

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
      )}
      <div
        className={`fixed top-0 right-0 z-50 h-full flex flex-col bg-stone-50 dark:bg-[#22242C] border-l border-stone-200 dark:border-[#2E3240] shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ width: 'min(100vw, 420px)' }}
      >
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-stone-200 dark:border-[#2E3240]">
          <span className="text-sm font-semibold text-stone-600 dark:text-[#E4DDD0]">反思</span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#2E3240] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="shrink-0 flex border-b border-stone-200 dark:border-[#2E3240]">
          {(['領受', '默想', '筆記'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 text-xs font-medium transition-colors
                ${tab === t
                  ? 'text-[#4F7358] dark:text-[#7AAF87] border-b-2 border-[#4F7358] dark:border-[#7AAF87]'
                  : 'text-stone-400 dark:text-[#6B6460] hover:text-stone-500 dark:hover:text-[#A09890]'
                }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 overflow-y-auto">

          {/* ── 領受 tab ── */}
          {tab === '領受' && (
            <>
              {/* Date nav */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-stone-200 dark:border-[#2E3240] shrink-0">
                <button
                  onClick={() => setMmdd(prevMMDD(mmdd))}
                  className="p-1.5 rounded text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#2E3240] active:scale-95 transition-all"
                >←</button>
                <span className="text-xs text-stone-400 dark:text-[#A09890]">
                  {mmdd.slice(0, 2)}月{mmdd.slice(2, 4)}日
                  {mmdd === todayKey && (
                    <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded bg-[#4F7358]/10 dark:bg-[#7AAF87]/10 text-[#4F7358] dark:text-[#7AAF87]">今天</span>
                  )}
                </span>
                <button
                  onClick={() => setMmdd(nextMMDD(mmdd))}
                  className="p-1.5 rounded text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#2E3240] active:scale-95 transition-all"
                >→</button>
              </div>

              {devotionalLoading && (
                <div className="flex items-center justify-center h-32 text-stone-300 dark:text-[#6B6460] text-sm">
                  <div className="w-4 h-4 border-2 border-stone-200 dark:border-[#2E3240] border-t-[#4F7358] dark:border-t-[#7AAF87] rounded-full animate-spin mr-2" />
                  載入中…
                </div>
              )}
              {devotionalError && (
                <div className="flex flex-col items-center justify-center h-32 text-stone-300 dark:text-[#6B6460] text-sm gap-1">
                  <span>⚠️</span>
                  <span>無法載入靈修資料</span>
                </div>
              )}
              {devotionalPlan && !day && (
                <div className="flex items-center justify-center h-32 text-stone-300 dark:text-[#6B6460] text-sm">
                  此日期暫無靈修資料
                </div>
              )}
              {day && (
                <>
                  <div className="px-4 py-4 border-b border-stone-200 dark:border-[#2E3240]">
                    <div className="text-[10px] font-semibold text-stone-300 dark:text-[#6B6460] mb-1">{day.title}</div>
                    <div className="text-lg font-semibold text-stone-700 dark:text-[#F5F2EC] mb-3">{day.ref}</div>
                    {day.verseText && (
                      <p className="text-sm text-stone-500 dark:text-[#D4CEC4] leading-relaxed mb-3 italic">{day.verseText}</p>
                    )}
                    <div className="flex gap-2">
                      {ckjv && (
                        <button
                          onClick={() => handleNavigate(day)}
                          className="flex-1 py-1.5 text-xs rounded border border-[#4F7358] dark:border-[#7AAF87] text-[#4F7358] dark:text-[#7AAF87] hover:bg-[#4F7358]/10 dark:hover:bg-[#7AAF87]/10 transition-colors font-medium"
                        >
                          在讀經器打開 →
                        </button>
                      )}
                      <a
                        href={`https://letsfollowjesus.org/main/daily/${mmdd}.html`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-1.5 text-xs rounded border border-stone-300 dark:border-[#3A3C42] text-stone-500 dark:text-[#D4CEC4] hover:bg-stone-100 dark:hover:bg-[#252A34] transition-colors text-center"
                      >
                        完整靈修 ↗
                      </a>
                    </div>
                  </div>

                  {day.meditation.length > 0 && (
                    <DevotionalSection title="觀察默想">
                      <ol className="space-y-2.5 list-none">
                        {day.meditation.map((q, i) => (
                          <li key={i} className="flex gap-2 text-sm text-stone-500 dark:text-[#D4CEC4] leading-relaxed">
                            <span className="shrink-0 text-[#4F7358] dark:text-[#7AAF87] font-semibold text-xs mt-0.5">{i + 1}.</span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ol>
                    </DevotionalSection>
                  )}
                  {day.responses.length > 0 && (
                    <DevotionalSection title="靈修回應">
                      <ol className="space-y-2.5 list-none">
                        {day.responses.map((q, i) => (
                          <li key={i} className="flex gap-2 text-sm text-stone-500 dark:text-[#D4CEC4] leading-relaxed">
                            <span className="shrink-0 text-[#4F7358] dark:text-[#7AAF87] font-semibold text-xs mt-0.5">{i + 1}.</span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ol>
                    </DevotionalSection>
                  )}
                  {day.hints.length > 0 && (
                    <DevotionalSection title="經文亮光" defaultOpen={false}>
                      <div className="space-y-3">
                        {day.hints.map((p, i) => (
                          <p key={i} className="text-sm text-stone-500 dark:text-[#D4CEC4] leading-relaxed">{p}</p>
                        ))}
                      </div>
                    </DevotionalSection>
                  )}
                  {day.prayer && (
                    <DevotionalSection title="禱告文">
                      <div className="px-3 py-2 rounded bg-[#4F7358]/5 dark:bg-[#7AAF87]/5 border-l-2 border-[#4F7358] dark:border-[#7AAF87]">
                        <p className="text-sm text-stone-500 dark:text-[#D4CEC4] leading-relaxed italic">{day.prayer}</p>
                      </div>
                    </DevotionalSection>
                  )}
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
            </>
          )}

          {/* ── 默想 tab ── */}
          {tab === '默想' && (
            <div className="px-5 py-5 flex flex-col gap-4">
              <div>
                <p className="text-xs text-stone-400 dark:text-[#A09890] mb-1">當前章節</p>
                <p className="text-sm font-medium text-stone-600 dark:text-[#E4DDD0]">{currentChapterLabel}</p>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-stone-400 dark:text-[#A09890]">我的默想</label>
                <textarea
                  rows={8}
                  value={draftContent}
                  onChange={e => setDraftContent(e.target.value)}
                  placeholder="這段經文對我說了什麼？我有什麼感動或疑問？"
                  className="w-full rounded-lg border border-stone-200 dark:border-[#2E3240] bg-white dark:bg-[#17191E] text-stone-500 dark:text-[#E4DDD0] text-sm px-3 py-2.5 resize-none focus:outline-none focus:ring-1 focus:ring-stone-300 dark:focus:ring-[#4F7358] placeholder-stone-300 dark:placeholder-[#6B6460] leading-relaxed"
                />
                <button
                  onClick={saveReflection}
                  className="self-end px-4 py-1.5 text-xs rounded bg-[#4F7358] dark:bg-[#7AAF87] text-white dark:text-[#17191E] font-medium hover:opacity-90 transition-opacity"
                >
                  儲存
                </button>
              </div>

              {/* Reading settings */}
              <div className="border-t border-stone-100 dark:border-[#2E3240] pt-4 space-y-3">
                <p className="text-xs font-medium text-stone-400 dark:text-[#A09890] uppercase tracking-wide">閱讀設定</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-500 dark:text-[#E4DDD0]">節碼顯示</span>
                  <div className="flex rounded border border-stone-200 dark:border-[#2E3240] overflow-hidden">
                    {(['show', 'fade', 'hide'] as const).map((v, i) => (
                      <button
                        key={v}
                        onClick={() => onVerseNumStyle(v)}
                        className={`px-2 py-1 text-[10px] transition-colors ${verseNumStyle === v ? 'bg-stone-200 dark:bg-[#2E3240] text-stone-600 dark:text-[#E4DDD0]' : 'text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#22242C]'}`}
                      >
                        {['顯示', '淡化', '隱藏'][i]}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-500 dark:text-[#E4DDD0]">行距</span>
                  <div className="flex rounded border border-stone-200 dark:border-[#2E3240] overflow-hidden">
                    {(['comfortable', 'loose'] as const).map((v, i) => (
                      <button
                        key={v}
                        onClick={() => onLineSpacing(v)}
                        className={`px-2 py-1 text-[10px] transition-colors ${lineSpacing === v ? 'bg-stone-200 dark:bg-[#2E3240] text-stone-600 dark:text-[#E4DDD0]' : 'text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#22242C]'}`}
                      >
                        {['舒適', '寬鬆'][i]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── 筆記 tab ── */}
          {tab === '筆記' && (
            <div className="px-4 py-4 space-y-3">
              {sortedHighlights.length === 0 ? (
                <p className="text-center text-sm text-stone-300 dark:text-[#6B6460] py-12">尚無劃線記錄</p>
              ) : (
                sortedHighlights.map(h => {
                  const bookName =
                    h.sourceId === 'jasher'
                      ? '雅煞珥書'
                      : ckjv?.books.find(b => b.id === h.bookId)?.name ?? '未知'
                  const preview = h.highlightText.slice(0, 60) + (h.highlightText.length > 60 ? '…' : '')

                  return (
                    <div
                      key={h.id}
                      className="rounded-xl border border-stone-200 dark:border-[#2E3240] bg-white dark:bg-[#17191E] px-4 py-3 space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`w-3 h-3 rounded-full shrink-0 ${COLOR_DOT[h.color]}`} title={COLOR_LABEL[h.color]} />
                          <span className="text-xs text-stone-500 dark:text-[#E4DDD0] truncate">
                            {bookName} · {h.chapter}:{h.verse}
                          </span>
                        </div>
                        <button
                          onClick={() => { onJumpTo(h.sourceId, h.bookId, h.chapter); onClose() }}
                          className="shrink-0 text-xs text-[#4F7358] dark:text-[#7AAF87] hover:underline whitespace-nowrap"
                        >
                          跳到 →
                        </button>
                      </div>
                      <p className="text-xs text-stone-400 dark:text-[#A09890] leading-relaxed">「{preview}」</p>
                      {h.note && <p className="text-xs text-stone-500 dark:text-[#E4DDD0] leading-relaxed">{h.note}</p>}
                      <p className="text-[10px] text-stone-300 dark:text-[#6B6460]">{formatDate(h.createdAt)}</p>
                    </div>
                  )
                })
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

import { useState, useEffect, useRef } from 'react'
import type {
  BibleData, JasherData, Book, Chapter, CompletionRecord,
  Highlight, HighlightColor, ReflectionNote,
} from '../types'

type SidebarTab = '經文' | '領受'

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

// ── Devotional helpers ────────────────────────────────────────────────────────
interface DevotionalDay {
  ref: string; title: string; verseText: string
  meditation: string[]; responses: string[]; hints: string[]; prayer: string
}
type DevotionalPlan = Record<string, DevotionalDay>

function todayMMDD(): string {
  const d = new Date()
  return `${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
}

function shiftMMDD(mmdd: string, delta: number): string {
  const m = parseInt(mmdd.slice(0, 2)), d = parseInt(mmdd.slice(2, 4))
  const date = new Date(2024, m - 1, d)
  date.setDate(date.getDate() + delta)
  return `${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`
}

function parseChapterFromRef(ref: string): number {
  const match = ref.match(/(\d+)\s*[:.：]/)
  return match ? parseInt(match[1]) : 1
}

function findBookByRef(ref: string, books: Book[]): Book | null {
  const sorted = [...books].sort((a, b) => b.name.length - a.name.length)
  for (const book of sorted) if (ref.includes(book.name)) return book
  return null
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('zh-TW', {
    month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
  })
}

// ── Props ─────────────────────────────────────────────────────────────────────
interface Props {
  ckjv: BibleData | null
  jasher: JasherData | null
  source: 'ckjv' | 'jasher'
  activeBook: Book | null
  activeChapter: Chapter | null
  onSelectCkjvChapter: (book: Book, chapter: Chapter) => void
  onSelectJasherChapter: (chapter: Chapter) => void
  isOpen: boolean
  onClose: () => void
  completions: CompletionRecord[]
  highlights: Highlight[]
  onJumpTo: (sourceId: 'ckjv' | 'jasher', bookId: number | undefined, chapter: number) => void
  currentSource: 'ckjv' | 'jasher'
  currentBookId: number | undefined
  currentChapter: number
  currentChapterLabel: string
  onNavigate: (book: Book, chapter: Chapter) => void
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Sidebar({
  ckjv, jasher, source, activeBook, activeChapter,
  onSelectCkjvChapter, onSelectJasherChapter,
  isOpen, onClose, completions,
  highlights, onJumpTo,
  currentSource, currentBookId, currentChapter, currentChapterLabel,
  onNavigate,
}: Props) {
  const [tab, setTab] = useState<SidebarTab>('經文')
  const [expandedBook, setExpandedBook] = useState<number | string | null>(activeBook?.id ?? null)
  const [showJasher, setShowJasher] = useState(source === 'jasher')
  const [oldExpanded, setOldExpanded] = useState(true)
  const [newExpanded, setNewExpanded] = useState(true)

  useEffect(() => {
    if (activeBook?.id != null) setExpandedBook(activeBook.id)
  }, [activeBook?.id])

  const oldTestament = ckjv?.books.filter(b => b.testament === '舊約') ?? []
  const newTestament = ckjv?.books.filter(b => b.testament === '新約') ?? []

  const isCkjvCompleted = (book: Book, chNum: number) =>
    completions.some(r => r.sourceId === 'ckjv' && r.bookId === (book.id as number) && r.chapter === chNum)
  const isJasherCompleted = (chNum: number) =>
    completions.some(r => r.sourceId === 'jasher' && r.chapter === chNum)

  const tabBar = (
    <div className="shrink-0 flex border-b border-stone-200 dark:border-[#2E3240]">
      {(['經文', '領受'] as SidebarTab[]).map(t => (
        <button
          key={t}
          onClick={() => setTab(t)}
          className={`flex-1 py-2.5 text-xs font-medium tracking-wide transition-colors
            ${tab === t
              ? 'text-[#4F7358] dark:text-[#7AAF87] border-b-2 border-[#4F7358] dark:border-[#7AAF87] -mb-px'
              : 'text-stone-400 dark:text-[#6B6460] hover:text-stone-500 dark:hover:text-[#A09890]'
            }`}
        >
          {t}
        </button>
      ))}
    </div>
  )

  const tabContent = (
    <div className="flex-1 min-h-0 overflow-hidden">
      {tab === '經文' && (
        <ScriptureContent
          oldTestament={oldTestament}
          newTestament={newTestament}
          oldExpanded={oldExpanded}
          setOldExpanded={setOldExpanded}
          newExpanded={newExpanded}
          setNewExpanded={setNewExpanded}
          jasher={jasher}
          source={source}
          activeBook={activeBook}
          activeChapter={activeChapter}
          showJasher={showJasher}
          setShowJasher={setShowJasher}
          expandedBook={expandedBook}
          setExpandedBook={setExpandedBook}
          isCkjvCompleted={isCkjvCompleted}
          isJasherCompleted={isJasherCompleted}
          onSelectCkjvChapter={onSelectCkjvChapter}
          onSelectJasherChapter={onSelectJasherChapter}
          highlights={highlights}
          onJumpTo={onJumpTo}
          onClose={onClose}
          currentSource={currentSource}
          currentBookId={currentBookId}
          currentChapter={currentChapter}
          currentChapterLabel={currentChapterLabel}
        />
      )}
      {tab === '領受' && (
        <DevotionalTab ckjv={ckjv} onNavigate={onNavigate} />
      )}
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden sm:flex w-72 shrink-0 flex-col border-r border-stone-200 dark:border-[#2E3240] bg-stone-100 dark:bg-[#22242C] overflow-hidden">
        {tabBar}
        {tabContent}
      </div>

      {/* Mobile sidebar overlay */}
      <div
        className={`sm:hidden fixed top-0 left-0 z-30 h-dvh w-[85vw] max-w-xs flex flex-col
          border-r border-stone-200 dark:border-[#2E3240] bg-stone-100 dark:bg-[#22242C]
          transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-3 py-2 border-b border-stone-200 dark:border-[#2E3240] shrink-0">
          <span className="text-[10px] font-medium text-stone-400 dark:text-[#A09890] uppercase tracking-widest">聖經閱讀器</span>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-stone-300 dark:text-[#6B6460] hover:bg-stone-200 dark:hover:bg-[#2E3240] transition-colors"
            aria-label="關閉目錄"
          >
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        {tabBar}
        {tabContent}
      </div>
    </>
  )
}

// ── Collapsible section (shared) ──────────────────────────────────────────────
function Collapsible({ title, children, defaultOpen = true, badge }: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  badge?: string
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-t border-stone-200 dark:border-[#2E3240]">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-stone-200 dark:hover:bg-[#2E3240] transition-colors"
      >
        <span className="flex items-center gap-2">
          <span className="text-[10px] font-semibold text-stone-400 dark:text-[#A09890] uppercase tracking-widest">{title}</span>
          {badge && (
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-stone-200 dark:bg-[#2E3240] text-stone-400 dark:text-[#6B6460]">{badge}</span>
          )}
        </span>
        <span className={`text-[9px] text-stone-300 dark:text-[#6B6460] transition-transform duration-200 inline-block ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      <div className={`overflow-hidden transition-all duration-200 ${open ? 'max-h-[2000px]' : 'max-h-0'}`}>
        {children}
      </div>
    </div>
  )
}

// ── 本章 meditation sub-section ───────────────────────────────────────────────
function ChapterMeditation({ currentSource, currentBookId, currentChapter }: {
  currentSource: 'ckjv' | 'jasher'
  currentBookId: number | undefined
  currentChapter: number
}) {
  const chapterKey = `${currentSource}-${currentBookId ?? 'j'}-${currentChapter}`
  const [reflections, setReflections] = useState<ReflectionNote[]>(() => {
    try { return JSON.parse(localStorage.getItem(REFLECTION_KEY) || '[]') }
    catch { return [] }
  })
  const [draft, setDraft] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const r = reflections.find(
      r => r.sourceId === currentSource && r.bookId === currentBookId && r.chapter === currentChapter
    )
    setDraft(r?.content ?? '')
    setSaved(false)
  }, [chapterKey])

  function save() {
    const note: ReflectionNote = {
      sourceId: currentSource,
      bookId: currentBookId,
      chapter: currentChapter,
      content: draft,
      updatedAt: new Date().toISOString(),
    }
    setReflections(prev => {
      const filtered = prev.filter(
        r => !(r.sourceId === currentSource && r.bookId === currentBookId && r.chapter === currentChapter)
      )
      const next = draft.trim() ? [...filtered, note] : filtered
      localStorage.setItem(REFLECTION_KEY, JSON.stringify(next))
      return next
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  return (
    <div className="px-3 pb-3 flex flex-col gap-2">
      <textarea
        rows={5}
        value={draft}
        onChange={e => { setDraft(e.target.value); setSaved(false) }}
        placeholder={`讀完這章，你注意到什麼？有什麼觸動你？`}
        className="w-full rounded border border-stone-200 dark:border-[#2E3240] bg-white dark:bg-[#17191E] text-stone-500 dark:text-[#E4DDD0] text-xs px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-[#4F7358] dark:focus:ring-[#7AAF87] placeholder-stone-300 dark:placeholder-[#6B6460] leading-relaxed"
      />
      <div className="flex justify-end">
        <button
          onClick={save}
          className={`px-3 py-1 text-xs rounded transition-all ${
            saved
              ? 'text-[#4F7358] dark:text-[#7AAF87]'
              : 'text-stone-400 dark:text-[#A09890] hover:text-stone-600 dark:hover:text-[#E4DDD0]'
          }`}
        >
          {saved ? '已儲存' : '儲存'}
        </button>
      </div>
    </div>
  )
}

// ── 本章 highlights sub-section ───────────────────────────────────────────────
function ChapterHighlights({ highlights, ckjv, onJumpTo, onClose, currentSource, currentBookId, currentChapter }: {
  highlights: Highlight[]
  ckjv: BibleData | null
  onJumpTo: (sourceId: 'ckjv' | 'jasher', bookId: number | undefined, chapter: number) => void
  onClose: () => void
  currentSource: 'ckjv' | 'jasher'
  currentBookId: number | undefined
  currentChapter: number
}) {
  const chapterHighlights = highlights.filter(h =>
    h.sourceId === currentSource &&
    h.bookId === currentBookId &&
    h.chapter === currentChapter
  ).sort((a, b) => a.verse - b.verse)

  if (chapterHighlights.length === 0) {
    return (
      <p className="px-3 pb-3 text-xs text-stone-300 dark:text-[#6B6460]">本章尚無劃線</p>
    )
  }

  return (
    <div className="px-3 pb-3 space-y-2">
      {chapterHighlights.map(h => (
        <div key={h.id} className="space-y-0.5">
          <div className="flex items-start gap-1.5">
            <span className={`w-2 h-2 rounded-full shrink-0 mt-0.5 ${COLOR_DOT[h.color]}`} title={COLOR_LABEL[h.color]} />
            <p className="text-xs text-stone-500 dark:text-[#D4CEC4] leading-relaxed flex-1">
              <span className="text-[10px] text-stone-300 dark:text-[#6B6460] mr-1">節 {h.verse}</span>
              {h.highlightText}
            </p>
          </div>
          {h.note && (
            <p className="text-[10px] text-stone-400 dark:text-[#A09890] leading-relaxed ml-3.5 pl-0.5 border-l border-stone-200 dark:border-[#2E3240]">
              {h.note}
            </p>
          )}
        </div>
      ))}
      <button
        onClick={() => { onJumpTo(currentSource, currentBookId, currentChapter); onClose() }}
        className="text-[10px] text-[#4F7358] dark:text-[#7AAF87] hover:underline"
      >
        跳到本章 →
      </button>
    </div>
  )
}

// ── 全部劃線 sub-section ──────────────────────────────────────────────────────
function AllHighlights({ highlights, ckjv, onJumpTo, onClose }: {
  highlights: Highlight[]
  ckjv: BibleData | null
  onJumpTo: (sourceId: 'ckjv' | 'jasher', bookId: number | undefined, chapter: number) => void
  onClose: () => void
}) {
  const sorted = [...highlights].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  if (sorted.length === 0) {
    return (
      <p className="px-3 pb-3 text-xs text-stone-300 dark:text-[#6B6460]">尚無劃線記錄</p>
    )
  }

  return (
    <div className="px-3 pb-3 space-y-2">
      {sorted.map(h => {
        const bookName = h.sourceId === 'jasher'
          ? '雅煞珥書'
          : ckjv?.books.find(b => b.id === h.bookId)?.name ?? '未知'
        return (
          <div key={h.id} className="space-y-0.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className={`w-2 h-2 rounded-full shrink-0 ${COLOR_DOT[h.color]}`} title={COLOR_LABEL[h.color]} />
                <span className="text-[10px] text-stone-400 dark:text-[#A09890] truncate">
                  {bookName} {h.chapter}:{h.verse}
                </span>
              </div>
              <button
                onClick={() => { onJumpTo(h.sourceId, h.bookId, h.chapter); onClose() }}
                className="shrink-0 text-[10px] text-[#4F7358] dark:text-[#7AAF87] hover:underline"
              >
                跳到 →
              </button>
            </div>
            <p className="text-[10px] text-stone-400 dark:text-[#A09890] leading-relaxed ml-3.5">
              {h.highlightText.slice(0, 60)}{h.highlightText.length > 60 ? '…' : ''}
            </p>
            {h.note && (
              <p className="text-[10px] text-stone-500 dark:text-[#D4CEC4] leading-relaxed ml-3.5">
                {h.note}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── 經文 tab ──────────────────────────────────────────────────────────────────
interface ScriptureProps {
  oldTestament: Book[]
  newTestament: Book[]
  oldExpanded: boolean
  setOldExpanded: (v: boolean) => void
  newExpanded: boolean
  setNewExpanded: (v: boolean) => void
  jasher: JasherData | null
  source: 'ckjv' | 'jasher'
  activeBook: Book | null
  activeChapter: Chapter | null
  showJasher: boolean
  setShowJasher: (v: boolean) => void
  expandedBook: number | string | null
  setExpandedBook: (v: number | string | null) => void
  isCkjvCompleted: (book: Book, chNum: number) => boolean
  isJasherCompleted: (chNum: number) => boolean
  onSelectCkjvChapter: (book: Book, chapter: Chapter) => void
  onSelectJasherChapter: (chapter: Chapter) => void
  highlights: Highlight[]
  onJumpTo: (sourceId: 'ckjv' | 'jasher', bookId: number | undefined, chapter: number) => void
  onClose: () => void
  currentSource: 'ckjv' | 'jasher'
  currentBookId: number | undefined
  currentChapter: number
  currentChapterLabel: string
}

function ScriptureContent({
  oldTestament, newTestament,
  oldExpanded, setOldExpanded,
  newExpanded, setNewExpanded,
  jasher, source, activeBook, activeChapter,
  showJasher, setShowJasher, expandedBook, setExpandedBook,
  isCkjvCompleted, isJasherCompleted,
  onSelectCkjvChapter, onSelectJasherChapter,
  highlights, onJumpTo, onClose,
  currentSource, currentBookId, currentChapter, currentChapterLabel,
}: ScriptureProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const q = searchQuery.trim().toLowerCase()
  const filteredOld = q ? oldTestament.filter(b => b.name.toLowerCase().includes(q)) : oldTestament
  const filteredNew = q ? newTestament.filter(b => b.name.toLowerCase().includes(q)) : newTestament
  const allFiltered = [...filteredOld, ...filteredNew]

  useEffect(() => {
    if (q && allFiltered.length === 1) setExpandedBook(allFiltered[0].id)
  }, [q, allFiltered.length])

  useEffect(() => {
    if (!expandedBook || !scrollRef.current) return
    const el = scrollRef.current.querySelector(`[data-book-id="${expandedBook}"]`)
    if (el) el.scrollIntoView({ block: 'nearest' })
  }, [expandedBook])

  const chapterHighlightCount = highlights.filter(h =>
    h.sourceId === currentSource &&
    h.bookId === currentBookId &&
    h.chapter === currentChapter
  ).length

  const renderBook = (book: Book) => {
    const isExpanded = expandedBook === book.id
    const isActive = source === 'ckjv' && activeBook?.id === book.id

    return (
      <div key={book.id} data-book-id={book.id}>
        <button
          onClick={() => {
            setExpandedBook(isExpanded ? null : book.id)
            setShowJasher(false)
          }}
          title={book.name}
          className={`w-full text-left px-3 py-1.5 text-sm rounded transition-colors
            ${isActive
              ? 'bg-stone-200 dark:bg-[#2E3240] text-sage dark:text-sage-dark font-medium'
              : 'text-stone-400 dark:text-[#A09890] hover:bg-stone-200 dark:hover:bg-[#2E3240]'
            }`}
        >
          <span className="flex items-center gap-1.5">
            <span className="text-[10px] opacity-50">{isExpanded ? '▾' : '▸'}</span>
            <span className="truncate">{book.name}</span>
          </span>
        </button>
        {isExpanded && (
          <div className="flex flex-wrap gap-1 px-3 py-1 pb-2">
            {book.chapters.map(ch => {
              const completed = isCkjvCompleted(book, ch.number)
              const active = source === 'ckjv' && activeBook?.id === book.id && activeChapter?.number === ch.number
              return (
                <button
                  key={ch.number}
                  onClick={() => onSelectCkjvChapter(book, ch)}
                  className={`flex items-center justify-center w-8 h-8 rounded text-xs transition-colors
                    ${active
                      ? 'bg-sage text-white dark:bg-sage-dark dark:text-[#17191E]'
                      : 'bg-stone-200 dark:bg-[#2E3240] hover:bg-stone-300 dark:hover:bg-[#3A3C42] ' +
                        (completed ? 'text-stone-300 dark:text-[#4A4840]' : 'text-stone-500 dark:text-[#A09890]')
                    }`}
                >
                  {ch.number}
                </button>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Search */}
      <div className="px-3 py-2 shrink-0">
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="搜尋書卷…"
          className="w-full px-2.5 py-1.5 text-xs rounded border border-stone-200 dark:border-[#2E3240] bg-stone-50 dark:bg-[#17191E] text-stone-500 dark:text-[#E4DDD0] placeholder-stone-300 dark:placeholder-[#2E3240] focus:outline-none focus:border-[#4F7358] dark:focus:border-[#7AAF87] transition-colors"
        />
      </div>

      {/* Scrollable content */}
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto">
        {/* 目前位置 */}
        {currentChapterLabel && (
          <div className="px-3 py-2">
            <p className="text-[9px] text-stone-300 dark:text-[#6B6460] uppercase tracking-widest mb-0.5">目前</p>
            <p className="text-xs font-medium text-stone-500 dark:text-[#E4DDD0]">{currentChapterLabel}</p>
          </div>
        )}

        {/* 書卷 */}
        <div className="py-1">
          {filteredOld.length > 0 && (
            <>
              <button
                onClick={() => setOldExpanded(!oldExpanded)}
                className="w-full flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-semibold text-stone-300 dark:text-[#6B6460] hover:text-stone-400 dark:hover:text-[#A09890] uppercase tracking-widest transition-colors"
              >
                <span>{oldExpanded ? '▾' : '▸'}</span>舊約
              </button>
              {oldExpanded && <div className="pb-1">{filteredOld.map(renderBook)}</div>}
            </>
          )}
          {filteredNew.length > 0 && (
            <>
              <button
                onClick={() => setNewExpanded(!newExpanded)}
                className="w-full flex items-center gap-1.5 px-3 py-1.5 mt-1 text-[9px] font-semibold text-stone-300 dark:text-[#6B6460] hover:text-stone-400 dark:hover:text-[#A09890] uppercase tracking-widest transition-colors"
              >
                <span>{newExpanded ? '▾' : '▸'}</span>新約
              </button>
              {newExpanded && <div className="pb-1">{filteredNew.map(renderBook)}</div>}
            </>
          )}
          {jasher && (
            <div className="mt-1">
              <button
                onClick={() => setShowJasher(!showJasher)}
                className={`w-full flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-widest transition-colors
                  ${source === 'jasher'
                    ? 'text-[#4F7358] dark:text-[#7AAF87]'
                    : 'text-stone-300 dark:text-[#6B6460] hover:text-stone-400 dark:hover:text-[#A09890]'
                  }`}
              >
                <span>{showJasher ? '▾' : '▸'}</span>次經 · 雅煞珥書
              </button>
              {showJasher && (
                <div className="flex flex-wrap gap-1 px-3 pb-2 pt-1">
                  {jasher.chapters.map(ch => {
                    const completed = isJasherCompleted(ch.number)
                    const active = source === 'jasher' && activeChapter?.number === ch.number
                    return (
                      <button
                        key={ch.number}
                        onClick={() => onSelectJasherChapter(ch)}
                        className={`flex items-center justify-center w-8 h-8 rounded text-xs transition-colors
                          ${active
                            ? 'bg-sage text-white dark:bg-sage-dark dark:text-[#17191E]'
                            : 'bg-stone-200 dark:bg-[#2E3240] hover:bg-stone-300 dark:hover:bg-[#3A3C42] ' +
                              (completed ? 'text-stone-300 dark:text-[#4A4840]' : 'text-stone-500 dark:text-[#A09890]')
                          }`}
                      >
                        {ch.number}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 本章 */}
        {currentChapter > 0 && (
          <div className="mt-2">
            <Collapsible
              title="我的默想"
              defaultOpen={true}
            >
              <ChapterMeditation
                currentSource={currentSource}
                currentBookId={currentBookId}
                currentChapter={currentChapter}
              />
            </Collapsible>
            <Collapsible
              title="本章劃線"
              defaultOpen={true}
              badge={chapterHighlightCount > 0 ? String(chapterHighlightCount) : undefined}
            >
              <ChapterHighlights
                highlights={highlights}
                ckjv={null}
                onJumpTo={onJumpTo}
                onClose={onClose}
                currentSource={currentSource}
                currentBookId={currentBookId}
                currentChapter={currentChapter}
              />
            </Collapsible>
            {highlights.length > 0 && (
              <Collapsible title="全部劃線" defaultOpen={false} badge={String(highlights.length)}>
                <AllHighlights
                  highlights={highlights}
                  ckjv={null}
                  onJumpTo={onJumpTo}
                  onClose={onClose}
                />
              </Collapsible>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ── 領受 tab ──────────────────────────────────────────────────────────────────
function DevotionalCollapsible({ title, children, defaultOpen = true }: {
  title: string; children: React.ReactNode; defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-stone-200 dark:border-[#2E3240] last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-stone-200 dark:hover:bg-[#2E3240] transition-colors"
      >
        <span className="text-[10px] font-semibold text-stone-500 dark:text-[#E4DDD0] uppercase tracking-widest">{title}</span>
        <span className={`text-[9px] text-stone-300 dark:text-[#6B6460] ml-2 transition-transform duration-200 inline-block ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      <div className={`overflow-hidden transition-all duration-200 ${open ? 'max-h-[2000px]' : 'max-h-0'}`}>
        <div className="px-3 pb-3">{children}</div>
      </div>
    </div>
  )
}

function DevotionalTab({ ckjv, onNavigate }: { ckjv: BibleData | null; onNavigate: (book: Book, ch: Chapter) => void }) {
  const [plan, setPlan] = useState<DevotionalPlan | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [mmdd, setMmdd] = useState(todayMMDD)
  const todayKey = todayMMDD()

  useEffect(() => {
    if (plan) return
    setLoading(true); setError(false)
    fetch(`${import.meta.env.BASE_URL}devotional-plan.json`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((data: DevotionalPlan) => { setPlan(data); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  const day = plan?.[mmdd]

  function handleNavigate() {
    if (!day || !ckjv) return
    const book = findBookByRef(day.ref, ckjv.books)
    if (!book) return
    const ch = book.chapters.find(c => c.number === parseChapterFromRef(day.ref))
    if (!ch) return
    onNavigate(book, ch)
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Date nav */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-stone-200 dark:border-[#2E3240] shrink-0">
        <button
          onClick={() => setMmdd(shiftMMDD(mmdd, -1))}
          className="p-1 rounded text-stone-400 dark:text-[#A09890] hover:bg-stone-200 dark:hover:bg-[#2E3240] transition-colors"
        >←</button>
        <span className="text-xs text-stone-400 dark:text-[#A09890]">
          {mmdd.slice(0, 2)}月{mmdd.slice(2, 4)}日
          {mmdd === todayKey && (
            <span className="ml-1 text-[10px] px-1 py-0.5 rounded bg-[#4F7358]/10 dark:bg-[#7AAF87]/10 text-[#4F7358] dark:text-[#7AAF87]">今天</span>
          )}
        </span>
        <button
          onClick={() => setMmdd(shiftMMDD(mmdd, 1))}
          className="p-1 rounded text-stone-400 dark:text-[#A09890] hover:bg-stone-200 dark:hover:bg-[#2E3240] transition-colors"
        >→</button>
      </div>

      {loading && (
        <div className="flex items-center justify-center h-24 text-xs text-stone-300 dark:text-[#6B6460]">
          <div className="w-4 h-4 border-2 border-stone-200 border-t-[#4F7358] rounded-full animate-spin mr-2" />
          載入中…
        </div>
      )}
      {error && (
        <p className="text-center text-xs text-stone-300 dark:text-[#6B6460] py-8">無法載入靈修資料</p>
      )}
      {plan && !day && (
        <p className="text-center text-xs text-stone-300 dark:text-[#6B6460] py-8">此日期暫無資料</p>
      )}

      {day && (
        <>
          <div className="px-3 py-3 border-b border-stone-200 dark:border-[#2E3240]">
            <p className="text-[10px] text-stone-300 dark:text-[#6B6460] mb-1">{day.title}</p>
            <p className="text-sm font-semibold text-stone-600 dark:text-[#E4DDD0] mb-2">{day.ref}</p>
            {day.verseText && (
              <p className="text-xs text-stone-400 dark:text-[#A09890] leading-relaxed mb-3 italic">{day.verseText}</p>
            )}
            <div className="flex gap-2">
              {ckjv && (
                <button
                  onClick={handleNavigate}
                  className="flex-1 py-1.5 text-[10px] rounded border border-[#4F7358] dark:border-[#7AAF87] text-[#4F7358] dark:text-[#7AAF87] hover:bg-[#4F7358]/10 dark:hover:bg-[#7AAF87]/10 transition-colors font-medium"
                >
                  在讀經器打開 →
                </button>
              )}
              <a
                href={`https://letsfollowjesus.org/main/daily/${mmdd}.html`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-1.5 text-[10px] rounded border border-stone-300 dark:border-[#3A3C42] text-stone-400 dark:text-[#A09890] hover:bg-stone-200 dark:hover:bg-[#2E3240] transition-colors text-center"
              >
                完整靈修 ↗
              </a>
            </div>
          </div>

          {day.meditation.length > 0 && (
            <DevotionalCollapsible title="觀察默想">
              <ol className="space-y-2 list-none">
                {day.meditation.map((q, i) => (
                  <li key={i} className="flex gap-1.5 text-xs text-stone-500 dark:text-[#D4CEC4] leading-relaxed">
                    <span className="shrink-0 text-[#4F7358] dark:text-[#7AAF87] font-semibold">{i + 1}.</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ol>
            </DevotionalCollapsible>
          )}
          {day.responses.length > 0 && (
            <DevotionalCollapsible title="靈修回應">
              <ol className="space-y-2 list-none">
                {day.responses.map((q, i) => (
                  <li key={i} className="flex gap-1.5 text-xs text-stone-500 dark:text-[#D4CEC4] leading-relaxed">
                    <span className="shrink-0 text-[#4F7358] dark:text-[#7AAF87] font-semibold">{i + 1}.</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ol>
            </DevotionalCollapsible>
          )}
          {day.hints.length > 0 && (
            <DevotionalCollapsible title="經文亮光" defaultOpen={false}>
              <div className="space-y-2">
                {day.hints.map((p, i) => (
                  <p key={i} className="text-xs text-stone-500 dark:text-[#D4CEC4] leading-relaxed">{p}</p>
                ))}
              </div>
            </DevotionalCollapsible>
          )}
          {day.prayer && (
            <DevotionalCollapsible title="禱告文">
              <div className="px-2 py-2 rounded bg-[#4F7358]/5 dark:bg-[#7AAF87]/5 border-l-2 border-[#4F7358] dark:border-[#7AAF87]">
                <p className="text-xs text-stone-500 dark:text-[#D4CEC4] leading-relaxed italic">{day.prayer}</p>
              </div>
            </DevotionalCollapsible>
          )}

          <div className="px-3 py-2 text-center">
            <a
              href="https://letsfollowjesus.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-stone-300 dark:text-[#6B6460] hover:text-stone-400 dark:hover:text-[#A09890] transition-colors"
            >
              內容來源：跟隨耶穌 letsfollowjesus.org
            </a>
          </div>
        </>
      )}
    </div>
  )
}

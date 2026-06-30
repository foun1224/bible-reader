import { useState, useEffect, useRef } from 'react'
import type {
  BibleData, JasherData, Book, Chapter, CompletionRecord, Highlight, HighlightColor,
} from '../types'

const COLOR_DOT: Record<HighlightColor, string> = {
  important: 'bg-amber-400',
  comfort:   'bg-green-400',
  question:  'bg-blue-400',
  prayer:    'bg-red-400',
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
  currentChapterLabel: string
  highlights: Highlight[]
  onJumpTo: (sourceId: 'ckjv' | 'jasher', bookId: number | undefined, chapter: number) => void
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Sidebar({
  ckjv, jasher, source, activeBook, activeChapter,
  onSelectCkjvChapter, onSelectJasherChapter,
  isOpen, onClose, completions,
  currentChapterLabel,
  highlights, onJumpTo,
}: Props) {

  const [expandedBook, setExpandedBook] = useState<number | string | null>(activeBook?.id ?? null)
  const [showJasher, setShowJasher] = useState(source === 'jasher')
  const [oldExpanded, setOldExpanded] = useState(true)
  const [newExpanded, setNewExpanded] = useState(true)
  const [sidebarTab, setSidebarTab] = useState<'scripture' | 'revelation'>('scripture')

  useEffect(() => {
    if (activeBook?.id != null) setExpandedBook(activeBook.id)
  }, [activeBook?.id])

  const oldTestament = ckjv?.books.filter(b => b.testament === '舊約') ?? []
  const newTestament = ckjv?.books.filter(b => b.testament === '新約') ?? []

  const isCkjvCompleted = (book: Book, chNum: number) =>
    completions.some(r => r.sourceId === 'ckjv' && r.bookId === (book.id as number) && r.chapter === chNum)
  const isJasherCompleted = (chNum: number) =>
    completions.some(r => r.sourceId === 'jasher' && r.chapter === chNum)

  const NAV_ITEMS = [
    {
      id: 'scripture' as const,
      label: '經文',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
      ),
    },
    {
      id: 'revelation' as const,
      label: '領受',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9"/>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
        </svg>
      ),
    },
  ]

  const iconNav = (
    <div className="shrink-0 w-11 border-r border-stone-200 dark:border-[#2E3240] flex flex-col items-center pt-2 pb-2 gap-1">
      {NAV_ITEMS.map(({ id, label, icon }) => (
        <button
          key={id}
          title={label}
          onClick={() => setSidebarTab(id)}
          className={`w-9 h-9 flex flex-col items-center justify-center gap-0.5 rounded-md transition-colors
            ${sidebarTab === id
              ? 'bg-stone-200 dark:bg-[#2E3240] text-[#4F7358] dark:text-[#7AAF87]'
              : 'text-stone-300 dark:text-[#6B6460] hover:bg-stone-200 dark:hover:bg-[#2E3240] hover:text-stone-400 dark:hover:text-[#A09890]'
            }`}
        >
          {icon}
          <span className="text-[9px] font-semibold leading-none tracking-wide">{label}</span>
        </button>
      ))}
    </div>
  )

  const sidebarContent = (
    <div className="flex-1 min-h-0 overflow-hidden flex flex-row">
      {iconNav}
      <div className="flex-1 min-w-0 overflow-hidden">
        {sidebarTab === 'scripture' && (
          <ScriptureContent
            ckjv={ckjv}
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
            onClose={onClose}
            currentChapterLabel={currentChapterLabel}
          />
        )}
        {sidebarTab === 'revelation' && (
          <RevelationContent
            highlights={highlights}
            ckjv={ckjv}
            onJumpTo={onJumpTo}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden sm:flex w-72 shrink-0 flex-col border-r border-stone-200 dark:border-[#2E3240] bg-stone-100 dark:bg-[#22242C] overflow-hidden">
        <div className="shrink-0 border-b border-stone-200 dark:border-[#2E3240] px-3 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">你的人生</p>
        </div>
        {sidebarContent}
      </div>

      {/* Mobile sidebar overlay */}
      <div
        className={`sm:hidden fixed top-0 left-0 z-30 h-dvh w-[85vw] max-w-xs flex flex-col
          border-r border-stone-200 dark:border-[#2E3240] bg-stone-100 dark:bg-[#22242C]
          transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-3 py-3 border-b border-stone-200 dark:border-[#2E3240] shrink-0">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">你的人生</p>
            <p className="mt-1 text-base font-medium text-stone-600 dark:text-[#E4DDD0]">目錄</p>
          </div>
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
        {sidebarContent}
      </div>
    </>
  )
}

// ── 經文 tab ──────────────────────────────────────────────────────────────────
interface ScriptureProps {
  ckjv: BibleData | null
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
  onClose: () => void
  currentChapterLabel: string
}

function ScriptureContent({
  ckjv,
  oldTestament, newTestament,
  oldExpanded, setOldExpanded,
  newExpanded, setNewExpanded,
  jasher, source, activeBook, activeChapter,
  showJasher, setShowJasher, expandedBook, setExpandedBook,
  isCkjvCompleted, isJasherCompleted,
  onSelectCkjvChapter, onSelectJasherChapter,
  onClose,
  currentChapterLabel,
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
          className={`w-full text-left pl-6 pr-3 py-2.5 text-sm rounded-md transition-colors
            ${isActive
              ? 'bg-stone-200 dark:bg-[#2E3240] text-sage dark:text-sage-dark font-medium'
              : 'text-stone-400 dark:text-[#A09890] hover:bg-stone-200 dark:hover:bg-[#2E3240]'
            }`}
        >
          <span className="flex items-center gap-2">
            <span className="text-[10px] opacity-50">{isExpanded ? '▾' : '▸'}</span>
            <span className="truncate leading-5">{book.name}</span>
          </span>
        </button>
        {isExpanded && (
          <div className="flex flex-wrap gap-1 pl-6 pr-3 py-1 pb-2">
            {book.chapters.map(ch => {
              const completed = isCkjvCompleted(book, ch.number)
              const active = source === 'ckjv' && activeBook?.id === book.id && activeChapter?.number === ch.number
              return (
                <button
                  key={ch.number}
                  onClick={() => onSelectCkjvChapter(book, ch)}
                  className={`flex items-center justify-center w-9 h-9 rounded-md text-xs transition-colors
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
          className="w-full px-3 py-2 text-sm rounded border border-stone-200 dark:border-[#2E3240] bg-stone-50 dark:bg-[#17191E] text-stone-500 dark:text-[#E4DDD0] placeholder-stone-300 dark:placeholder-[#2E3240] focus:outline-none focus:border-[#4F7358] dark:focus:border-[#7AAF87] transition-colors"
        />
      </div>

      {/* Scrollable content */}
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto">
        {/* 目前位置 */}
        {currentChapterLabel && (
          <div className="px-3 py-2">
            <p className="text-[11px] font-semibold text-stone-300 dark:text-[#6B6460] uppercase tracking-widest mb-1">目前</p>
            <p className="text-sm font-medium text-stone-500 dark:text-[#E4DDD0]">{currentChapterLabel}</p>
          </div>
        )}

        {/* 書卷 */}
        <div className="py-1">
          {filteredOld.length > 0 && (
            <>
              <button
                onClick={() => setOldExpanded(!oldExpanded)}
                className="w-full flex items-center gap-1.5 px-3 py-2.5 text-[13px] font-semibold text-stone-300 dark:text-[#6B6460] hover:text-stone-400 dark:hover:text-[#A09890] uppercase tracking-widest transition-colors"
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
                className="w-full flex items-center gap-1.5 px-3 py-2.5 mt-1 text-[13px] font-semibold text-stone-300 dark:text-[#6B6460] hover:text-stone-400 dark:hover:text-[#A09890] uppercase tracking-widest transition-colors"
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
                className={`w-full flex items-center gap-1.5 px-3 py-2.5 text-[13px] font-semibold uppercase tracking-widest transition-colors
                  ${source === 'jasher'
                    ? 'text-[#4F7358] dark:text-[#7AAF87]'
                    : 'text-stone-300 dark:text-[#6B6460] hover:text-stone-400 dark:hover:text-[#A09890]'
                  }`}
              >
                <span>{showJasher ? '▾' : '▸'}</span>次經 · 雅煞珥書
              </button>
              {showJasher && (
                <div className="flex flex-wrap gap-1 pl-6 pr-3 pb-2 pt-1">
                  {jasher.chapters.map(ch => {
                    const completed = isJasherCompleted(ch.number)
                    const active = source === 'jasher' && activeChapter?.number === ch.number
                    return (
                      <button
                        key={ch.number}
                        onClick={() => onSelectJasherChapter(ch)}
                        className={`flex items-center justify-center w-9 h-9 rounded-md text-xs transition-colors
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
      </div>
    </div>
  )
}

// ── 領受 tab ──────────────────────────────────────────────────────────────────
interface RevelationProps {
  highlights: Highlight[]
  ckjv: BibleData | null
  onJumpTo: (sourceId: 'ckjv' | 'jasher', bookId: number | undefined, chapter: number) => void
  onClose: () => void
}

function RevelationContent({ highlights, ckjv, onJumpTo, onClose }: RevelationProps) {
  const sorted = [...highlights].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  if (sorted.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-xs text-stone-300 dark:text-[#6B6460]">尚無劃線記錄</p>
      </div>
    )
  }

  return (
    <div className="flex-1 min-h-0 overflow-y-auto py-3 px-3 space-y-2">
      {sorted.map(h => {
        const bookName =
          h.sourceId === 'jasher'
            ? '雅煞珥書'
            : ckjv?.books.find(b => b.id === h.bookId)?.name ?? '未知'
        const preview = h.highlightText.slice(0, 40) + (h.highlightText.length > 40 ? '…' : '')

        return (
          <button
            key={h.id}
            onClick={() => { onJumpTo(h.sourceId, h.bookId, h.chapter); onClose() }}
            className="w-full text-left rounded-lg border border-stone-200 dark:border-[#2E3240] bg-white dark:bg-[#17191E] px-3 py-2.5 space-y-1.5 hover:border-[#4F7358]/50 dark:hover:border-[#7AAF87]/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${COLOR_DOT[h.color]}`} />
              <span className="text-[11px] font-medium text-stone-400 dark:text-[#A09890] truncate">
                {bookName} {h.chapter}:{h.verse}
              </span>
            </div>
            <p className="text-xs text-stone-400 dark:text-[#6B6460] leading-relaxed">「{preview}」</p>
            {h.note && (
              <p className="text-xs text-stone-500 dark:text-[#A09890] leading-relaxed">{h.note}</p>
            )}
          </button>
        )
      })}
    </div>
  )
}

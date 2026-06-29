import { useState, useEffect } from 'react'
import type { BibleData, JasherData, Book, Chapter, CompletionRecord } from '../types'

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
  onOpenSearch: () => void
  onOpenNotes: () => void
  onOpenDevotion: () => void
}

export default function Sidebar({
  ckjv, jasher, source, activeBook, activeChapter,
  onSelectCkjvChapter, onSelectJasherChapter,
  isOpen, onClose, completions,
  onOpenSearch, onOpenNotes, onOpenDevotion,
}: Props) {
  const [expandedBook, setExpandedBook] = useState<number | string | null>(
    activeBook?.id ?? null
  )
  const [showJasher, setShowJasher] = useState(source === 'jasher')
  const [oldExpanded, setOldExpanded] = useState(true)
  const [newExpanded, setNewExpanded] = useState(true)

  // sync expandedBook when bookmark restores a different book
  useEffect(() => {
    if (activeBook?.id != null) setExpandedBook(activeBook.id)
  }, [activeBook?.id])

  const oldTestament = ckjv?.books.filter(b => b.testament === '舊約') ?? []
  const newTestament = ckjv?.books.filter(b => b.testament === '新約') ?? []

  // Helper: check if a ckjv chapter is completed
  const isCkjvCompleted = (book: Book, chNum: number) =>
    completions.some(r => r.sourceId === 'ckjv' && r.bookId === (book.id as number) && r.chapter === chNum)

  // Helper: check if a jasher chapter is completed
  const isJasherCompleted = (chNum: number) =>
    completions.some(r => r.sourceId === 'jasher' && r.chapter === chNum)

  const renderBook = (book: Book) => {
    const isExpanded = expandedBook === book.id
    const isActive = source === 'ckjv' && activeBook?.id === book.id

    // 功能 B：書卷完成進度
    const completedChapters = completions.filter(
      c => c.sourceId === 'ckjv' && c.bookId === (book.id as number)
    ).length
    const completedRatio = book.chapters.length > 0 ? completedChapters / book.chapters.length : 0
    const progressFull = completedRatio >= 0.8

    return (
      <div key={book.id}>
        <button
          onClick={() => {
            if (!isExpanded) {
              setExpandedBook(book.id)
              setShowJasher(false)
            } else {
              setExpandedBook(null)
            }
          }}
          title={book.name}
          className={`w-full text-left px-3 py-1.5 text-sm rounded transition-colors truncate
            ${isActive
              ? 'bg-stone-100 dark:bg-[#22242C] text-sage dark:text-sage-dark font-medium'
              : 'text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#22242C]'
            }`}
        >
          <span className="flex items-center gap-1.5">
            <span className="text-[10px] opacity-50">{isExpanded ? '▾' : '▸'}</span>
            <span className="truncate flex-shrink min-w-0">{book.name}</span>
            {/* 進度條 */}
            {completedRatio > 0 && (
              <span className="flex-1 min-w-0 ml-1">
                <span className="block w-full h-0.5 rounded-full bg-stone-200 dark:bg-[#2E3240] overflow-hidden">
                  <span
                    className={`block h-full rounded-full transition-all duration-500 ${
                      progressFull
                        ? 'bg-[#4F7358] dark:bg-[#7AAF87]'
                        : 'bg-[#4F7358]/80 dark:bg-[#7AAF87]/80'
                    }`}
                    style={{ width: `${Math.round(completedRatio * 100)}%` }}
                  />
                </span>
              </span>
            )}
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
                  className={`relative flex items-center justify-center w-8 h-8 rounded text-xs transition-colors
                    ${active
                      ? 'bg-sage text-white dark:bg-sage-dark dark:text-[#17191E]'
                      : completed
                      ? 'bg-stone-100 dark:bg-[#22242C] text-stone-400 dark:text-[#A09890] hover:bg-stone-200 dark:hover:bg-[#2E3240] ring-1 ring-stone-200/60 dark:ring-stone-600/30'
                      : 'bg-stone-100 dark:bg-[#22242C] text-stone-400 dark:text-[#A09890] hover:bg-stone-200 dark:hover:bg-[#2E3240]'
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

  const sidebarContent = (
    <SidebarContent
      oldTestament={oldTestament}
      newTestament={newTestament}
      oldExpanded={oldExpanded}
      setOldExpanded={setOldExpanded}
      newExpanded={newExpanded}
      setNewExpanded={setNewExpanded}
      renderBook={renderBook}
      jasher={jasher}
      source={source}
      activeChapter={activeChapter}
      showJasher={showJasher}
      setShowJasher={setShowJasher}
      setExpandedBook={setExpandedBook}
      onSelectJasherChapter={onSelectJasherChapter}
      isJasherCompleted={isJasherCompleted}
    />
  )

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden sm:flex w-56 shrink-0 flex-col border-r border-stone-200 dark:border-[#2E3240] bg-stone-100 dark:bg-[#22242C] overflow-hidden">
        {sidebarContent}
        {/* Desktop bottom tool row */}
        <div className="shrink-0 flex items-center border-t border-stone-200 dark:border-[#2E3240]">
          {[
            { label: '搜尋', icon: <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5"/><path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>, fn: onOpenSearch },
            { label: '筆記', icon: '📝', fn: onOpenNotes },
            { label: '靈修', icon: '🕊', fn: onOpenDevotion },
          ].map(({ label, icon, fn }) => (
            <button
              key={label}
              onClick={fn}
              title={label}
              className="flex-1 flex flex-col items-center gap-0.5 py-2.5 text-stone-400 dark:text-[#A09890] hover:bg-stone-200 dark:hover:bg-[#17191E] transition-colors"
            >
              <span className="text-sm leading-none">{icon}</span>
              <span className="text-[9px] leading-none">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      <div
        className={`sm:hidden fixed top-0 left-0 z-30 h-dvh w-64 flex flex-col
          border-r border-stone-200 dark:border-[#2E3240] bg-stone-100 dark:bg-[#22242C]
          transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Close button */}
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-stone-200 dark:border-[#2E3240] shrink-0">
          <span className="text-xs font-medium text-stone-400 dark:text-[#A09890] uppercase tracking-widest">目錄</span>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-stone-300 dark:text-[#2E3240] hover:bg-stone-200 dark:hover:bg-[#22242C] transition-colors"
            aria-label="關閉目錄"
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        {sidebarContent}
      </div>
    </>
  )
}

interface ContentProps {
  oldTestament: Book[]
  newTestament: Book[]
  oldExpanded: boolean
  setOldExpanded: (v: boolean) => void
  newExpanded: boolean
  setNewExpanded: (v: boolean) => void
  renderBook: (book: Book) => React.ReactNode
  jasher: JasherData | null
  source: 'ckjv' | 'jasher'
  activeChapter: Chapter | null
  showJasher: boolean
  setShowJasher: (v: boolean) => void
  setExpandedBook: (v: number | string | null) => void
  onSelectJasherChapter: (chapter: Chapter) => void
  isJasherCompleted: (chNum: number) => boolean
}

function SidebarContent({
  oldTestament, newTestament,
  oldExpanded, setOldExpanded,
  newExpanded, setNewExpanded,
  renderBook,
  jasher, source, activeChapter,
  showJasher, setShowJasher, setExpandedBook, onSelectJasherChapter,
  isJasherCompleted,
}: ContentProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const q = searchQuery.trim().toLowerCase()
  const filteredOld = q ? oldTestament.filter(b => b.name.toLowerCase().includes(q)) : oldTestament
  const filteredNew = q ? newTestament.filter(b => b.name.toLowerCase().includes(q)) : newTestament

  // Auto-expand single match
  const allFiltered = [...filteredOld, ...filteredNew]
  useEffect(() => {
    if (q && allFiltered.length === 1) {
      setExpandedBook(allFiltered[0].id)
    }
  }, [q, allFiltered.length])

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      {/* Search box */}
      <div className="px-3 py-2 shrink-0">
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="搜尋書卷…"
          className="w-full px-2.5 py-1.5 text-xs rounded border border-stone-200 dark:border-[#2E3240] bg-stone-50 dark:bg-[#17191E] text-stone-500 dark:text-[#E4DDD0] placeholder-stone-300 dark:placeholder-[#2E3240] focus:outline-none focus:border-sage dark:focus:border-sage-dark transition-colors"
        />
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto py-2">
        {/* 舊約 group header */}
        {filteredOld.length > 0 && (
          <>
            <button
              onClick={() => setOldExpanded(!oldExpanded)}
              className="w-full flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-300 dark:text-[#2E3240] hover:text-stone-400 dark:hover:text-[#A09890] uppercase tracking-widest transition-colors"
            >
              <span className="text-[9px]">{oldExpanded ? '▾' : '▸'}</span>
              舊約
            </button>
            {oldExpanded && (
              <div className="pb-1">
                {filteredOld.map(renderBook)}
              </div>
            )}
          </>
        )}

        {/* 新約 group header */}
        {filteredNew.length > 0 && (
          <>
            <button
              onClick={() => setNewExpanded(!newExpanded)}
              className="w-full flex items-center gap-1.5 px-3 py-1.5 mt-1 text-xs font-medium text-stone-300 dark:text-[#2E3240] hover:text-stone-400 dark:hover:text-[#A09890] uppercase tracking-widest transition-colors"
            >
              <span className="text-[9px]">{newExpanded ? '▾' : '▸'}</span>
              新約
            </button>
            {newExpanded && (
              <div className="pb-1">
                {filteredNew.map(renderBook)}
              </div>
            )}
          </>
        )}
      </div>

      {/* Jasher — pinned to bottom */}
      {jasher && (
        <div className="shrink-0 border-t border-stone-200 dark:border-[#2E3240] py-2">
          <button
            onClick={() => {
              if (!showJasher) {
                setShowJasher(true)
                setExpandedBook(null)
              } else {
                setShowJasher(false)
              }
            }}
            className={`w-full flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium uppercase tracking-widest transition-colors
              ${source === 'jasher'
                ? 'text-sage dark:text-sage-dark'
                : 'text-stone-300 dark:text-[#2E3240] hover:text-stone-400 dark:hover:text-[#A09890]'
              }`}
          >
            <span className="text-[9px]">{showJasher ? '▾' : '▸'}</span>
            次經 · 雅煞珥書
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
                    className={`relative flex items-center justify-center w-8 h-8 rounded text-xs transition-colors
                      ${active
                        ? 'bg-sage text-white dark:bg-sage-dark dark:text-[#17191E]'
                        : completed
                        ? 'bg-stone-100 dark:bg-[#22242C] text-stone-400 dark:text-[#A09890] hover:bg-stone-200 dark:hover:bg-[#2E3240] ring-1 ring-stone-200/60 dark:ring-stone-600/30'
                        : 'bg-stone-100 dark:bg-[#22242C] text-stone-400 dark:text-[#A09890] hover:bg-stone-200 dark:hover:bg-[#2E3240]'
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
  )
}

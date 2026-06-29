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
}

export default function Sidebar({
  ckjv, jasher, source, activeBook, activeChapter,
  onSelectCkjvChapter, onSelectJasherChapter,
  isOpen, onClose, completions,
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
              ? 'bg-parchment-100 dark:bg-[#2E261E] text-gold dark:text-gold-dark font-medium'
              : 'text-parchment-400 dark:text-[#A8906E] hover:bg-parchment-100 dark:hover:bg-[#2E261E]'
            }`}
        >
          <span className="flex items-center gap-1.5">
            <span className="text-[10px] opacity-50">{isExpanded ? '▾' : '▸'}</span>
            {book.name}
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
                      ? 'bg-gold text-white dark:bg-gold-dark dark:text-[#1A1410]'
                      : completed
                      ? 'bg-parchment-100 dark:bg-[#2E261E] text-parchment-400 dark:text-[#A8906E] hover:bg-parchment-200 dark:hover:bg-[#3A3028] ring-1 ring-green-400/60 dark:ring-green-500/40'
                      : 'bg-parchment-100 dark:bg-[#2E261E] text-parchment-400 dark:text-[#A8906E] hover:bg-parchment-200 dark:hover:bg-[#3A3028]'
                    }`}
                >
                  {ch.number}
                  {completed && !active && (
                    <span className="absolute bottom-0.5 right-0.5 text-[7px] text-green-500 dark:text-green-400 leading-none">✓</span>
                  )}
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
      <div className="hidden sm:flex w-56 shrink-0 flex-col border-r border-parchment-200 dark:border-[#3A3028] bg-parchment-100 dark:bg-[#221C17] overflow-hidden">
        {sidebarContent}
      </div>

      {/* Mobile sidebar overlay */}
      <div
        className={`sm:hidden fixed top-0 left-0 z-30 h-full w-64 flex flex-col
          border-r border-parchment-200 dark:border-[#3A3028] bg-parchment-100 dark:bg-[#221C17]
          transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Close button */}
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-parchment-200 dark:border-[#3A3028] shrink-0">
          <span className="text-xs font-medium text-parchment-400 dark:text-[#A8906E] uppercase tracking-widest">目錄</span>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-parchment-300 dark:text-[#3A3028] hover:bg-parchment-200 dark:hover:bg-[#2E261E] transition-colors"
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
    <div className="flex flex-col h-full overflow-hidden">
      {/* Search box */}
      <div className="px-3 py-2 shrink-0">
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="搜尋書卷…"
          className="w-full px-2.5 py-1.5 text-xs rounded border border-parchment-200 dark:border-[#3A3028] bg-parchment-50 dark:bg-[#1A1410] text-parchment-500 dark:text-[#EDE0C4] placeholder-parchment-300 dark:placeholder-[#3A3028] focus:outline-none focus:border-gold dark:focus:border-gold-dark transition-colors"
        />
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {/* 舊約 group header */}
        {filteredOld.length > 0 && (
          <>
            <button
              onClick={() => setOldExpanded(!oldExpanded)}
              className="w-full flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-parchment-300 dark:text-[#3A3028] hover:text-parchment-400 dark:hover:text-[#A8906E] uppercase tracking-widest transition-colors"
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
              className="w-full flex items-center gap-1.5 px-3 py-1.5 mt-1 text-xs font-medium text-parchment-300 dark:text-[#3A3028] hover:text-parchment-400 dark:hover:text-[#A8906E] uppercase tracking-widest transition-colors"
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
        <div className="shrink-0 border-t border-parchment-200 dark:border-[#3A3028] py-2">
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
                ? 'text-gold dark:text-gold-dark'
                : 'text-parchment-300 dark:text-[#3A3028] hover:text-parchment-400 dark:hover:text-[#A8906E]'
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
                        ? 'bg-gold text-white dark:bg-gold-dark dark:text-[#1A1410]'
                        : completed
                        ? 'bg-parchment-100 dark:bg-[#2E261E] text-parchment-400 dark:text-[#A8906E] hover:bg-parchment-200 dark:hover:bg-[#3A3028] ring-1 ring-green-400/60 dark:ring-green-500/40'
                        : 'bg-parchment-100 dark:bg-[#2E261E] text-parchment-400 dark:text-[#A8906E] hover:bg-parchment-200 dark:hover:bg-[#3A3028]'
                      }`}
                  >
                    {ch.number}
                    {completed && !active && (
                      <span className="absolute bottom-0.5 right-0.5 text-[7px] text-green-500 dark:text-green-400 leading-none">✓</span>
                    )}
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

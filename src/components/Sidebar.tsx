import { useState, useEffect } from 'react'
import type { BibleData, JasherData, Book, Chapter } from '../types'

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
}

export default function Sidebar({
  ckjv, jasher, source, activeBook, activeChapter,
  onSelectCkjvChapter, onSelectJasherChapter,
  isOpen, onClose,
}: Props) {
  const [expandedBook, setExpandedBook] = useState<number | string | null>(
    activeBook?.id ?? null
  )
  const [showJasher, setShowJasher] = useState(source === 'jasher')

  // P1-2: sync expandedBook when bookmark restores a different book
  useEffect(() => {
    if (activeBook?.id != null) setExpandedBook(activeBook.id)
  }, [activeBook?.id])
  const [search, setSearch] = useState('')

  const filteredBooks = ckjv?.books.filter(b =>
    b.name.includes(search) || b.nameEn?.toLowerCase().includes(search.toLowerCase())
  ) ?? []

  const oldTestament = filteredBooks.filter(b => b.testament === '舊約')
  const newTestament = filteredBooks.filter(b => b.testament === '新約')

  const renderBook = (book: Book) => {
    const isExpanded = expandedBook === book.id
    const isActive = source === 'ckjv' && activeBook?.id === book.id
    return (
      <div key={book.id}>
        <button
          onClick={() => {
            // P2-1: only toggle expand, do NOT auto-select chapter 1
            // P2-2: collapse Jasher when expanding a CKJV book
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
              ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 font-medium'
              : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700/50'
            }`}
        >
          {book.name}
        </button>
        {isExpanded && (
          <div className="flex flex-wrap gap-1 px-3 py-1 pb-2">
            {book.chapters.map(ch => (
              <button
                key={ch.number}
                onClick={() => onSelectCkjvChapter(book, ch)}
                /* min 44px touch target via padding; visual size via inner span */
                className={`flex items-center justify-center min-w-[44px] min-h-[44px] p-0.5 rounded transition-colors
                  ${source === 'ckjv' && activeBook?.id === book.id && activeChapter?.number === ch.number
                    ? 'bg-amber-500 text-white'
                    : 'bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-amber-200 dark:hover:bg-amber-800/50'
                  }`}
              >
                <span className="text-xs leading-none">{ch.number}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  // On desktop (sm+): always show as side panel (w-52, relative)
  // On mobile (<sm): show as fixed overlay from left when isOpen
  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden sm:flex w-52 shrink-0 flex-col border-r border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 overflow-hidden">
        <SidebarContent
          search={search}
          setSearch={setSearch}
          oldTestament={oldTestament}
          newTestament={newTestament}
          filteredBooks={filteredBooks}
          renderBook={renderBook}
          jasher={jasher}
          source={source}
          activeChapter={activeChapter}
          showJasher={showJasher}
          setShowJasher={setShowJasher}
          onSelectJasherChapter={onSelectJasherChapter}
        />
      </div>

      {/* Mobile sidebar overlay */}
      <div
        className={`sm:hidden fixed top-0 left-0 z-30 h-full w-64 flex flex-col
          border-r border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800
          transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Close button */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-stone-200 dark:border-stone-700 shrink-0">
          <span className="text-sm font-semibold text-stone-600 dark:text-stone-300">目錄</span>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700"
            aria-label="關閉目錄"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
            </svg>
          </button>
        </div>
        <SidebarContent
          search={search}
          setSearch={setSearch}
          oldTestament={oldTestament}
          newTestament={newTestament}
          filteredBooks={filteredBooks}
          renderBook={renderBook}
          jasher={jasher}
          source={source}
          activeChapter={activeChapter}
          showJasher={showJasher}
          setShowJasher={setShowJasher}
          onSelectJasherChapter={onSelectJasherChapter}
        />
      </div>
    </>
  )
}

/* Shared inner content to avoid duplicating JSX */
interface ContentProps {
  search: string
  setSearch: (v: string) => void
  oldTestament: Book[]
  newTestament: Book[]
  filteredBooks: Book[]
  renderBook: (book: Book) => React.ReactNode
  jasher: JasherData | null
  source: 'ckjv' | 'jasher'
  activeChapter: Chapter | null
  showJasher: boolean
  setShowJasher: (fn: (v: boolean) => boolean) => void
  onSelectJasherChapter: (chapter: Chapter) => void
}

function SidebarContent({
  search, setSearch,
  oldTestament, newTestament, filteredBooks,
  renderBook,
  jasher, source, activeChapter,
  showJasher, setShowJasher, onSelectJasherChapter,
}: ContentProps) {
  return (
    <>
      {/* Search */}
      <div className="p-2 border-b border-stone-200 dark:border-stone-700 shrink-0">
        <input
          type="text"
          placeholder="搜尋書卷…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-2 py-1 text-sm rounded border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-200 outline-none focus:border-amber-400"
        />
      </div>

      <div className="flex-1 overflow-y-auto py-1">
        {/* CKJV */}
        {!search && (
          <div className="px-3 py-1 text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider mt-1">
            舊約
          </div>
        )}
        {(search ? filteredBooks.filter(b => b.testament === '舊約') : oldTestament).map(renderBook)}

        {!search && (
          <div className="px-3 py-1 text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider mt-3">
            新約
          </div>
        )}
        {(search ? filteredBooks.filter(b => b.testament === '新約') : newTestament).map(renderBook)}

        {/* Jasher */}
        {jasher && (
          <>
            <div className="px-3 mt-3 mb-1">
              <button
                onClick={() => {
                  // P2-3: only toggle, do NOT auto-jump to chapter 1
                  // P2-2: collapse CKJV books when expanding Jasher
                  if (!showJasher) {
                    setShowJasher(true)
                    setExpandedBook(null)
                  } else {
                    setShowJasher(false)
                  }
                }}
                className={`w-full text-left text-xs font-semibold uppercase tracking-wider py-1
                  ${source === 'jasher' ? 'text-amber-600 dark:text-amber-400' : 'text-stone-400 dark:text-stone-500'}`}
              >
                次經 · 雅煞珥書 {showJasher ? '▾' : '▸'}
              </button>
            </div>
            {showJasher && (
              <div className="flex flex-wrap gap-1 px-3 pb-2">
                {jasher.chapters.map(ch => (
                  <button
                    key={ch.number}
                    onClick={() => onSelectJasherChapter(ch)}
                    className={`flex items-center justify-center min-w-[44px] min-h-[44px] p-0.5 rounded transition-colors
                      ${source === 'jasher' && activeChapter?.number === ch.number
                        ? 'bg-amber-500 text-white'
                        : 'bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-amber-200 dark:hover:bg-amber-800/50'
                      }`}
                  >
                    <span className="text-xs leading-none">{ch.number}</span>
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

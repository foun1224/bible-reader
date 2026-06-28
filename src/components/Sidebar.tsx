import { useState } from 'react'
import type { BibleData, JasherData, Book, Chapter } from '../types'

interface Props {
  ckjv: BibleData | null
  jasher: JasherData | null
  source: 'ckjv' | 'jasher'
  activeBook: Book | null
  activeChapter: Chapter | null
  onSelectCkjvChapter: (book: Book, chapter: Chapter) => void
  onSelectJasherChapter: (chapter: Chapter) => void
}

export default function Sidebar({
  ckjv, jasher, source, activeBook, activeChapter,
  onSelectCkjvChapter, onSelectJasherChapter,
}: Props) {
  const [expandedBook, setExpandedBook] = useState<number | string | null>(
    activeBook?.id ?? null
  )
  const [showJasher, setShowJasher] = useState(source === 'jasher')
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
            setExpandedBook(isExpanded ? null : book.id)
            if (!isExpanded) onSelectCkjvChapter(book, book.chapters[0])
          }}
          className={`w-full text-left px-3 py-1.5 text-sm rounded transition-colors
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
                className={`w-7 h-7 text-xs rounded transition-colors
                  ${source === 'ckjv' && activeBook?.id === book.id && activeChapter?.number === ch.number
                    ? 'bg-amber-500 text-white'
                    : 'bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-amber-200 dark:hover:bg-amber-800/50'
                  }`}
              >
                {ch.number}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="w-52 shrink-0 flex flex-col border-r border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 overflow-hidden">
      {/* Search */}
      <div className="p-2 border-b border-stone-200 dark:border-stone-700">
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
                  setShowJasher(s => !s)
                  if (!showJasher) onSelectJasherChapter(jasher.chapters[0])
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
                    className={`w-7 h-7 text-xs rounded transition-colors
                      ${source === 'jasher' && activeChapter?.number === ch.number
                        ? 'bg-amber-500 text-white'
                        : 'bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-amber-200 dark:hover:bg-amber-800/50'
                      }`}
                  >
                    {ch.number}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

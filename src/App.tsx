import { useState, useEffect, useCallback } from 'react'
import type { BibleData, JasherData, Book, Chapter, BookMark } from './types'
import Sidebar from './components/Sidebar'
import Reader from './components/Reader'

const FONT_SIZES = ['text-base', 'text-lg', 'text-xl'] as const
const BOOKMARK_KEY = 'bible-reader-bookmark'

function App() {
  const [dark, setDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches)
  const [fontSize, setFontSize] = useState(0)
  const [ckjv, setCkjv] = useState<BibleData | null>(null)
  const [jasher, setJasher] = useState<JasherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // source: 'ckjv' or 'jasher'
  const [source, setSource] = useState<'ckjv' | 'jasher'>('ckjv')
  const [activeBook, setActiveBook] = useState<Book | null>(null)
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null)

  useEffect(() => {
    const base = import.meta.env.BASE_URL
    Promise.all([
      fetch(`${base}data/ckjv.json`).then(r => r.json()),
      fetch(`${base}data/jasher.json`).then(r => r.json()).catch(() => null),
    ]).then(([c, j]) => {
      setCkjv(c)
      setJasher(j)
      // restore bookmark — attempt first, always fall back to Genesis 1
      let restored = false
      if (c && Array.isArray(c.books) && c.books.length > 0) {
        try {
          const bm: BookMark = JSON.parse(localStorage.getItem(BOOKMARK_KEY) || 'null')
          if (bm) {
            if (bm.sourceId === 'ckjv' && bm.bookId != null) {
              const book = c.books.find((b: Book) => b.id === bm.bookId)
              if (book && Array.isArray(book.chapters) && book.chapters.length > 0) {
                setSource('ckjv')
                setActiveBook(book)
                setActiveChapter(book.chapters[bm.chapter - 1] ?? book.chapters[0])
                restored = true
              }
            } else if (bm.sourceId === 'jasher' && j && Array.isArray(j.chapters) && j.chapters.length > 0) {
              setSource('jasher')
              setActiveChapter(j.chapters[bm.chapter - 1] ?? j.chapters[0])
              restored = true
            }
          }
        } catch { /* ignore */ }
        // fallback: always load Genesis 1 if bookmark restore failed
        if (!restored) {
          const gen = c.books[0]
          setActiveBook(gen)
          setActiveChapter(gen.chapters[0])
        }
      }
    }).finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const saveBookmark = useCallback((bm: BookMark) => {
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bm))
  }, [])

  const selectCkjvChapter = useCallback((book: Book, chapter: Chapter) => {
    setSource('ckjv')
    setActiveBook(book)
    setActiveChapter(chapter)
    saveBookmark({ sourceId: 'ckjv', bookId: book.id as number, chapter: chapter.number, verse: 1 })
    setSidebarOpen(false)
  }, [saveBookmark])

  const selectJasherChapter = useCallback((chapter: Chapter) => {
    setSource('jasher')
    setActiveBook(null)
    setActiveChapter(chapter)
    saveBookmark({ sourceId: 'jasher', chapter: chapter.number, verse: 1 })
    setSidebarOpen(false)
  }, [saveBookmark])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-stone-50 dark:bg-stone-900 text-stone-600 dark:text-stone-300">
        載入中…
      </div>
    )
  }

  return (
    <div className={`flex h-screen overflow-hidden bg-stone-50 dark:bg-stone-900 ${dark ? 'dark' : ''}`}>
      {/* Sidebar — desktop: always visible; mobile: overlay */}
      <Sidebar
        ckjv={ckjv}
        jasher={jasher}
        source={source}
        activeBook={activeBook}
        activeChapter={activeChapter}
        onSelectCkjvChapter={selectCkjvChapter}
        onSelectJasherChapter={selectJasherChapter}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setSidebarOpen(o => !o)}
              className="sm:hidden p-1.5 rounded text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700"
              aria-label="開啟目錄"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <rect y="3" width="20" height="2" rx="1"/>
                <rect y="9" width="20" height="2" rx="1"/>
                <rect y="15" width="20" height="2" rx="1"/>
              </svg>
            </button>
            <span className="text-base font-bold text-stone-700 dark:text-stone-200">
              {source === 'ckjv' && activeBook
                ? `${activeBook.name} ${activeChapter?.number} 章`
                : source === 'jasher' && activeChapter
                ? `雅煞珥書 ${activeChapter.number} 章`
                : ''}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFontSize(s => (s + 1) % 3)}
              className="px-2 py-1 text-xs rounded border border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700"
              title="切換字體大小"
            >
              字{fontSize === 0 ? '小' : fontSize === 1 ? '中' : '大'}
            </button>
            <button
              onClick={() => setDark(d => !d)}
              className="px-2 py-1 text-xs rounded border border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700"
            >
              {dark ? '☀️ 淺色' : '🌙 深色'}
            </button>
          </div>
        </div>

        {/* Reader */}
        <Reader chapter={activeChapter} fontSize={FONT_SIZES[fontSize]} />
      </div>
    </div>
  )
}

export default App

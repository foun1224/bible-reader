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

  // --- Chapter navigation logic ---
  const handlePrevChapter = useCallback(() => {
    if (source === 'jasher' && jasher && activeChapter) {
      const idx = jasher.chapters.findIndex(c => c.number === activeChapter.number)
      if (idx > 0) selectJasherChapter(jasher.chapters[idx - 1])
    } else if (source === 'ckjv' && ckjv && activeBook && activeChapter) {
      const chIdx = activeBook.chapters.findIndex(c => c.number === activeChapter.number)
      if (chIdx > 0) {
        selectCkjvChapter(activeBook, activeBook.chapters[chIdx - 1])
      } else {
        // go to previous book's last chapter
        const bIdx = ckjv.books.findIndex(b => b.id === activeBook.id)
        if (bIdx > 0) {
          const prevBook = ckjv.books[bIdx - 1]
          selectCkjvChapter(prevBook, prevBook.chapters[prevBook.chapters.length - 1])
        }
      }
    }
  }, [source, jasher, ckjv, activeBook, activeChapter, selectJasherChapter, selectCkjvChapter])

  const handleNextChapter = useCallback(() => {
    if (source === 'jasher' && jasher && activeChapter) {
      const idx = jasher.chapters.findIndex(c => c.number === activeChapter.number)
      if (idx < jasher.chapters.length - 1) selectJasherChapter(jasher.chapters[idx + 1])
    } else if (source === 'ckjv' && ckjv && activeBook && activeChapter) {
      const chIdx = activeBook.chapters.findIndex(c => c.number === activeChapter.number)
      if (chIdx < activeBook.chapters.length - 1) {
        selectCkjvChapter(activeBook, activeBook.chapters[chIdx + 1])
      } else {
        // go to next book's first chapter
        const bIdx = ckjv.books.findIndex(b => b.id === activeBook.id)
        if (bIdx < ckjv.books.length - 1) {
          const nextBook = ckjv.books[bIdx + 1]
          selectCkjvChapter(nextBook, nextBook.chapters[0])
        }
      }
    }
  }, [source, jasher, ckjv, activeBook, activeChapter, selectJasherChapter, selectCkjvChapter])

  const hasPrev = (() => {
    if (!activeChapter) return false
    if (source === 'jasher' && jasher) {
      const idx = jasher.chapters.findIndex(c => c.number === activeChapter.number)
      return idx > 0
    }
    if (source === 'ckjv' && ckjv && activeBook) {
      const chIdx = activeBook.chapters.findIndex(c => c.number === activeChapter.number)
      if (chIdx > 0) return true
      const bIdx = ckjv.books.findIndex(b => b.id === activeBook.id)
      return bIdx > 0
    }
    return false
  })()

  const hasNext = (() => {
    if (!activeChapter) return false
    if (source === 'jasher' && jasher) {
      const idx = jasher.chapters.findIndex(c => c.number === activeChapter.number)
      return idx < jasher.chapters.length - 1
    }
    if (source === 'ckjv' && ckjv && activeBook) {
      const chIdx = activeBook.chapters.findIndex(c => c.number === activeChapter.number)
      if (chIdx < activeBook.chapters.length - 1) return true
      const bIdx = ckjv.books.findIndex(b => b.id === activeBook.id)
      return bIdx < ckjv.books.length - 1
    }
    return false
  })()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-parchment-50 dark:bg-[#1A1410] text-parchment-400 dark:text-[#A8906E]">
        載入中…
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-parchment-50 dark:bg-[#1A1410]">
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
          className="fixed inset-0 z-20 bg-black/30 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Toolbar — light, non-intrusive */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-parchment-200 dark:border-[#3A3028] bg-parchment-50/80 dark:bg-[#1A1410]/80 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-3">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setSidebarOpen(o => !o)}
              className="sm:hidden p-1.5 rounded text-parchment-400 dark:text-[#A8906E] hover:bg-parchment-100 dark:hover:bg-[#2E261E] transition-colors"
              aria-label="開啟目錄"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                <rect y="3" width="20" height="2" rx="1"/>
                <rect y="9" width="20" height="2" rx="1"/>
                <rect y="15" width="20" height="2" rx="1"/>
              </svg>
            </button>
            <span className="text-sm font-medium text-parchment-500 dark:text-[#EDE0C4] tracking-wide">
              {source === 'ckjv' && activeBook
                ? `${activeBook.name} · 第 ${activeChapter?.number} 章`
                : source === 'jasher' && activeChapter
                ? `雅煞珥書 · 第 ${activeChapter.number} 章`
                : ''}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFontSize(s => (s + 1) % 3)}
              className="px-2.5 py-1 text-xs rounded border border-parchment-200 dark:border-[#3A3028] text-parchment-400 dark:text-[#A8906E] hover:bg-parchment-100 dark:hover:bg-[#2E261E] transition-colors"
              title="切換字體大小"
            >
              {fontSize === 0 ? 'A' : fontSize === 1 ? 'A+' : 'A++'}
            </button>
            <button
              onClick={() => setDark(d => !d)}
              className="px-2.5 py-1 text-xs rounded border border-parchment-200 dark:border-[#3A3028] text-parchment-400 dark:text-[#A8906E] hover:bg-parchment-100 dark:hover:bg-[#2E261E] transition-colors"
            >
              {dark ? '☀ 淺色' : '☽ 深色'}
            </button>
          </div>
        </div>

        {/* Reader */}
        <Reader
          chapter={activeChapter}
          fontSize={FONT_SIZES[fontSize]}
          onPrevChapter={handlePrevChapter}
          onNextChapter={handleNextChapter}
          hasPrev={hasPrev}
          hasNext={hasNext}
        />
      </div>
    </div>
  )
}

export default App

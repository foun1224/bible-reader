import { useState, useEffect, useCallback, useRef } from 'react'
import type { BibleData, JasherData, Book, Chapter, BookMark, CompletionRecord, StreakData, ReadingPlan, Achievement, Highlight, LegacyHighlightColor, HighlightColor } from './types'
import Sidebar from './components/Sidebar'
import Reader from './components/Reader'
import MainDevotional from './components/MainDevotional'
import MainBookBackground from './components/MainBookBackground'
import ReadingReview from './components/ReadingReview'
import CompletionBanner from './components/CompletionBanner'
import SearchModal from './components/SearchModal'
import MoreMenu from './components/MoreMenu'
import ChapterGrid from './components/ChapterGrid'
import BottomNav from './components/BottomNav'

const FONT_SIZES = ['text-lg', 'text-xl', 'text-2xl'] as const
const BOOKMARK_KEY = 'bible-reader-bookmark'
const COMPLETIONS_KEY = 'bible-reader-completions'
const STREAK_KEY = 'bible-reader-streak'
const PLAN_KEY = 'bible-reader-plan'
const ACHIEVEMENTS_KEY = 'bible-reader-achievements'
const HIGHLIGHTS_KEY = 'bible-reader-highlights'

function loadCompletions(): CompletionRecord[] {
  try {
    return JSON.parse(localStorage.getItem(COMPLETIONS_KEY) || '[]')
  } catch {
    return []
  }
}

function saveCompletions(records: CompletionRecord[]) {
  localStorage.setItem(COMPLETIONS_KEY, JSON.stringify(records))
}

function loadStreak(): StreakData {
  try {
    return JSON.parse(localStorage.getItem(STREAK_KEY) || 'null') ?? {
      lastReadDate: '',
      currentStreak: 0,
      longestStreak: 0,
    }
  } catch {
    return { lastReadDate: '', currentStreak: 0, longestStreak: 0 }
  }
}

function saveStreak(data: StreakData) {
  localStorage.setItem(STREAK_KEY, JSON.stringify(data))
}

/** Returns 'YYYY-MM-DD' in local time (sv-SE locale mimics ISO date format) */
function today(): string {
  return new Date().toLocaleDateString('sv-SE')
}

function updateStreak(prev: StreakData): StreakData {
  const todayStr = today()
  if (prev.lastReadDate === todayStr) return prev

  const offset = (days: number) => {
    const d = new Date()
    d.setDate(d.getDate() - days)
    return d.toLocaleDateString('sv-SE')
  }
  const yesterdayStr = offset(1)
  const twoDaysAgoStr = offset(2)

  let newStreak: number
  let gracePeriodUsed = prev.gracePeriodUsed ?? false

  if (prev.lastReadDate === yesterdayStr) {
    newStreak = prev.currentStreak + 1
  } else if (prev.lastReadDate === twoDaysAgoStr && !gracePeriodUsed) {
    // Streak Freeze：跳過一天，寬限一次延續連讀
    newStreak = prev.currentStreak + 1
    gracePeriodUsed = true
  } else {
    newStreak = 1
    gracePeriodUsed = false
  }

  const updated: StreakData = {
    lastReadDate: todayStr,
    currentStreak: newStreak,
    longestStreak: Math.max(prev.longestStreak, newStreak),
    gracePeriodUsed,
  }
  saveStreak(updated)
  return updated
}

function App() {
  const [dark, setDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches)
  const [fontSize, setFontSize] = useState(0)
  const [ckjv, setCkjv] = useState<BibleData | null>(null)
  const [jasher, setJasher] = useState<JasherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)

  const [source, setSource] = useState<'ckjv' | 'jasher'>('ckjv')
  const [activeBook, setActiveBook] = useState<Book | null>(null)
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null)
  const [mainView, setMainView] = useState<'scripture' | 'devotional' | 'book-background'>('scripture')
  const [bgBookName, setBgBookName] = useState<string | null>(null)

  const [completions, setCompletions] = useState<CompletionRecord[]>(() => loadCompletions())
  const [streak, setStreak] = useState<StreakData>(() => loadStreak())

  // Resume CTA: show on first load if bookmark exists
  const [showResumeCTA, setShowResumeCTA] = useState(false)

  // Stats dashboard
  const [statsDashboardOpen, setStatsDashboardOpen] = useState(false)

  // Reading plan
  const [readingPlan, setReadingPlan] = useState<ReadingPlan | null>(() => {
    try { return JSON.parse(localStorage.getItem(PLAN_KEY) || 'null') } catch { return null }
  })

  // Achievements — 保留資料但不顯示彈窗
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    try { return JSON.parse(localStorage.getItem(ACHIEVEMENTS_KEY) || '[]') } catch { return [] }
  })

  // CompletionBanner
  const [showBanner, setShowBanner] = useState(false)

  // Book complete toast
  const [bookCompleteMessage, setBookCompleteMessage] = useState<string | null>(null)

  // Scroll progress (lifted from Reader)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Immersive reading mode
  const [isImmersive, setIsImmersive] = useState(false)

  // Highlights — migrate legacy color names to semantic names on load
  const [highlights, setHighlights] = useState<Highlight[]>(() => {
    const LEGACY_COLOR_MAP: Record<LegacyHighlightColor, HighlightColor> = {
      yellow: 'important',
      green:  'comfort',
      blue:   'question',
      red:    'prayer',
    }
    try {
      const raw: Array<Highlight & { color: HighlightColor | LegacyHighlightColor }> =
        JSON.parse(localStorage.getItem(HIGHLIGHTS_KEY) || '[]')
      return raw.map(h => ({
        ...h,
        color: (LEGACY_COLOR_MAP as Record<string, HighlightColor>)[h.color] ?? h.color,
      })) as Highlight[]
    }
    catch { return [] }
  })

  // Reading settings popover (toolbar)
  const [settingsOpen, setSettingsOpen] = useState(false)

  // Search modal
  const [searchOpen, setSearchOpen] = useState(false)

  // More menu (Layer 2 features)
  const [moreOpen, setMoreOpen] = useState(false)

  // Chapter grid (mobile bottom nav tap)
  const [chapterGridOpen, setChapterGridOpen] = useState(false)

  // Reading settings
  const [verseNumStyle, setVerseNumStyle] = useState<'show' | 'fade' | 'hide'>('show')
  const [lineSpacing, setLineSpacing] = useState<'comfortable' | 'loose'>('comfortable')

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
                setShowResumeCTA(true)
              }
            } else if (bm.sourceId === 'jasher' && j && Array.isArray(j.chapters) && j.chapters.length > 0) {
              setSource('jasher')
              setActiveChapter(j.chapters[bm.chapter - 1] ?? j.chapters[0])
              restored = true
              setShowResumeCTA(true)
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

  // Record completion for the current chapter
  const recordCompletion = useCallback((
    src: 'ckjv' | 'jasher',
    chapter: Chapter,
    book?: Book | null
  ) => {
    // Update streak
    setStreak(prev => updateStreak(prev))

    setCompletions(prev => {
      const record: CompletionRecord = {
        sourceId: src,
        bookId: book?.id as number | undefined,
        bookName: book?.name,
        chapter: chapter.number,
        completedAt: new Date().toISOString(),
      }
      // Update existing or append
      const idx = prev.findIndex(
        r => r.sourceId === src &&
          r.chapter === chapter.number &&
          (src === 'jasher' ? true : r.bookId === (book?.id as number | undefined))
      )
      let next: CompletionRecord[]
      if (idx >= 0) {
        next = [...prev]
        next[idx] = record
      } else {
        next = [...prev, record]
      }
      saveCompletions(next)

      // Check book completion (CKJV only)
      if (src === 'ckjv' && book && ckjv) {
        const bookComps = next.filter(r => r.sourceId === 'ckjv' && r.bookId === (book.id as number))
        if (bookComps.length >= book.chapters.length) {
          // Was it just completed now? (prev didn't have enough)
          const prevBookComps = prev.filter(r => r.sourceId === 'ckjv' && r.bookId === (book.id as number))
          if (prevBookComps.length < book.chapters.length) {
            setBookCompleteMessage(`🎉 完成《${book.name}》！`)
            setTimeout(() => setBookCompleteMessage(null), 2000)
          }
        }
      }

      return next
    })
  }, [ckjv])

  const handleSetPlan = useCallback((plan: ReadingPlan) => {
    setReadingPlan(plan)
    localStorage.setItem(PLAN_KEY, JSON.stringify(plan))
  }, [])

  const handleClearPlan = useCallback(() => {
    setReadingPlan(null)
    localStorage.removeItem(PLAN_KEY)
  }, [])

  const saveHighlight = useCallback((h: Highlight) => {
    setHighlights(prev => {
      const filtered = prev.filter(x => !(x.sourceId === h.sourceId && x.bookId === h.bookId && x.chapter === h.chapter && x.verse === h.verse))
      const next = [...filtered, h]
      localStorage.setItem(HIGHLIGHTS_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const removeHighlight = useCallback((sourceId: string, bookId: number | undefined, chapter: number, verse: number) => {
    setHighlights(prev => {
      const next = prev.filter(x => !(x.sourceId === sourceId && x.bookId === bookId && x.chapter === chapter && x.verse === verse))
      localStorage.setItem(HIGHLIGHTS_KEY, JSON.stringify(next))
      return next
    })
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

  const selectBookBackground = useCallback((bookName: string) => {
    setBgBookName(bookName)
    setMainView('book-background')
  }, [])

  const handleJumpTo = useCallback((
    sourceId: 'ckjv' | 'jasher',
    bookId: number | undefined,
    chapter: number
  ) => {
    if (sourceId === 'jasher' && jasher) {
      const ch = jasher.chapters.find(c => c.number === chapter)
      if (ch) selectJasherChapter(ch)
    } else if (sourceId === 'ckjv' && ckjv && bookId != null) {
      const book = ckjv.books.find(b => b.id === bookId)
      if (book) {
        const ch = book.chapters.find(c => c.number === chapter)
        if (ch) selectCkjvChapter(book, ch)
      }
    }
  }, [ckjv, jasher, selectCkjvChapter, selectJasherChapter])

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
    // Record completion for current chapter before navigating
    if (activeChapter) {
      recordCompletion(source, activeChapter, activeBook)
    }
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
  }, [source, jasher, ckjv, activeBook, activeChapter, selectJasherChapter, selectCkjvChapter, recordCompletion])

  // Keyboard shortcuts: f/F = toggle immersive, ArrowLeft/Right = chapter nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (e.target instanceof HTMLElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return
        e.preventDefault()
        setSearchOpen(v => !v)
        return
      }
      if (e.target instanceof HTMLElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return
      if (e.key === 'f' || e.key === 'F') {
        setIsImmersive(v => !v)
      } else if (e.key === 'ArrowLeft') {
        handlePrevChapter()
      } else if (e.key === 'ArrowRight') {
        handleNextChapter()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handlePrevChapter, handleNextChapter])

  // When entering immersive mode, close sidebar
  useEffect(() => {
    if (isImmersive) {
      setSidebarOpen(false)
    }
  }, [isImmersive])

  // Check if current chapter is already completed
  const isCurrentCompleted = (() => {
    if (!activeChapter) return false
    return completions.some(
      r => r.sourceId === source &&
        r.chapter === activeChapter.number &&
        (source === 'jasher' ? true : r.bookId === (activeBook?.id as number | undefined))
    )
  })()

  const navigateNextChapter = useCallback(() => {
    if (source === 'jasher' && jasher && activeChapter) {
      const idx = jasher.chapters.findIndex(c => c.number === activeChapter.number)
      if (idx < jasher.chapters.length - 1) selectJasherChapter(jasher.chapters[idx + 1])
    } else if (source === 'ckjv' && ckjv && activeBook && activeChapter) {
      const chIdx = activeBook.chapters.findIndex(c => c.number === activeChapter.number)
      if (chIdx < activeBook.chapters.length - 1) {
        selectCkjvChapter(activeBook, activeBook.chapters[chIdx + 1])
      } else {
        const bIdx = ckjv.books.findIndex(b => b.id === activeBook.id)
        if (bIdx < ckjv.books.length - 1) {
          const nextBook = ckjv.books[bIdx + 1]
          selectCkjvChapter(nextBook, nextBook.chapters[0])
        }
      }
    }
  }, [source, jasher, ckjv, activeBook, activeChapter, selectJasherChapter, selectCkjvChapter])

  const handleMarkComplete = useCallback(() => {
    if (activeChapter && !isCurrentCompleted) {
      recordCompletion(source, activeChapter, activeBook)
      setShowBanner(true)
    }
  }, [source, activeChapter, activeBook, recordCompletion, isCurrentCompleted])

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

  // Format a completion record for display
  const formatCompletion = (r: CompletionRecord) => {
    const d = new Date(r.completedAt)
    const dateStr = `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
    const bookLabel = r.sourceId === 'jasher' ? '雅煞珥書' : (r.bookName ?? '未知')
    return { bookLabel, dateStr }
  }

  const sortedCompletions = [...completions].sort(
    (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  )

  // Streak display vars
  const todayStr = today()
  const hasReadToday = streak.lastReadDate === todayStr
  const showStreak = streak.currentStreak > 0
  const todayCount = completions.filter(r =>
    new Date(r.completedAt).toLocaleDateString('sv-SE') === todayStr
  ).length
  const planChaptersPerDay = readingPlan
    ? readingPlan.planId === 'yearly' ? Math.ceil(1189 / 365)
    : readingPlan.planId === 'nt90' ? Math.ceil(260 / 90)
    : (readingPlan.customChaptersPerDay ?? 3)
    : null

  // Bookmark for Resume CTA
  let bookmark: BookMark | null = null
  try {
    bookmark = JSON.parse(localStorage.getItem(BOOKMARK_KEY) || 'null')
  } catch { /* ignore */ }

  const resumeBookName =
    bookmark?.sourceId === 'ckjv'
      ? (ckjv?.books.find(b => b.id === bookmark!.bookId)?.name ?? '')
      : '雅煞珥書'
  const resumeChapter = bookmark?.chapter ?? 1

  // Hide resume CTA when already at bookmark position
  const isAtBookmark = bookmark
    ? source === bookmark.sourceId && activeChapter?.number === bookmark.chapter &&
      (bookmark.sourceId === 'jasher' || (activeBook?.id === bookmark.bookId))
    : false

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-stone-50 dark:bg-[#17191E] text-stone-400 dark:text-[#A09890]">
        載入中…
      </div>
    )
  }

  return (
    <div className="flex flex-col h-dvh overflow-hidden bg-stone-50 dark:bg-[#17191E]">
      {/* Book complete toast */}
      {bookCompleteMessage && (
        <div className="fixed bottom-6 right-6 z-[70] px-5 py-3 rounded-xl bg-[#C17D3A] dark:bg-[#D4935C] text-white dark:text-[#17191E] text-sm font-semibold shadow-2xl animate-pop-in pointer-events-none">
          {bookCompleteMessage}
        </div>
      )}

      {/* Reading Review */}
      <ReadingReview
        isOpen={statsDashboardOpen}
        onClose={() => setStatsDashboardOpen(false)}
        completions={completions}
        ckjv={ckjv}
        readingPlan={readingPlan}
        onSetPlan={handleSetPlan}
        onClearPlan={handleClearPlan}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        ckjv={ckjv}
        onJumpTo={handleJumpTo}
      />

      {/* Inner layout row */}
      <div className="flex flex-1 min-h-0 overflow-hidden">

      {/* Sidebar — desktop: always visible; mobile: overlay; hidden in devotional/immersive */}
      <div className={`flex h-full shrink-0 transition-all duration-300 ${
        mainView === 'devotional' ? 'hidden' : isImmersive ? 'sm:hidden' : ''
      }`}>
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
        completions={completions}
        currentChapterLabel={
          source === 'ckjv' && activeBook && activeChapter
            ? `${activeBook.name} · 第 ${activeChapter.number} 章`
            : activeChapter ? `雅煞珥書 · 第 ${activeChapter.number} 章` : ''
        }
        onSelectBookBackground={selectBookBackground}
      />
      </div>

      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* History panel overlay */}
      {historyOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setHistoryOpen(false)}
        />
      )}
      {historyOpen && (
        <div className="fixed top-12 right-2 z-50 w-80 max-h-[70vh] flex flex-col rounded-lg shadow-xl border border-stone-200 dark:border-[#2E3240] bg-stone-50 dark:bg-[#22242C] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-stone-200 dark:border-[#2E3240] shrink-0">
            <span className="text-sm font-medium text-stone-500 dark:text-[#E4DDD0]">已完成章節</span>
            <button
              onClick={() => setHistoryOpen(false)}
              className="p-1 rounded text-stone-300 dark:text-[#2E3240] hover:bg-stone-100 dark:hover:bg-[#22242C] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-2">
            {sortedCompletions.length === 0 ? (
              <p className="px-4 py-6 text-sm text-stone-300 dark:text-[#2E3240] text-center">尚無完成記錄</p>
            ) : (
              sortedCompletions.map((r, i) => {
                const { bookLabel, dateStr } = formatCompletion(r)
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-2 hover:bg-stone-100 dark:hover:bg-[#22242C] transition-colors"
                  >
                    <span className="text-sm text-stone-500 dark:text-[#E4DDD0]">
                      {bookLabel} · 第 {r.chapter} 章
                    </span>
                    <span className="text-xs text-stone-300 dark:text-[#6B6460] ml-2 shrink-0">{dateStr}</span>
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Toolbar */}
        <div className={`relative flex items-center justify-between px-4 py-1.5 border-b border-stone-200/60 dark:border-[#2E3240]/60 bg-stone-50/90 dark:bg-[#17191E]/90 backdrop-blur-sm shrink-0 transition-opacity duration-300 ${isImmersive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          {/* Center site title */}
          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none select-none leading-none">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-stone-500 dark:text-[#A09890]">你的人生</span>
            <span className="text-[10px] text-stone-300 dark:text-[#6B6460]" style={{ fontFamily: 'cursive', fontStyle: 'italic' }}>Your Life</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Hamburger — mobile only, scripture mode only */}
            {mainView === 'scripture' && (
              <button
                onClick={() => setSidebarOpen(o => !o)}
                className="sm:hidden w-9 h-9 inline-flex items-center justify-center rounded text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#22242C] transition-colors"
                aria-label="開啟目錄"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                  <rect y="3" width="20" height="2" rx="1"/>
                  <rect y="9" width="20" height="2" rx="1"/>
                  <rect y="15" width="20" height="2" rx="1"/>
                </svg>
              </button>
            )}

            {mainView === 'scripture' && (
              <span className="hidden sm:inline text-sm font-medium text-stone-500 dark:text-[#E4DDD0] tracking-wide">
                {source === 'ckjv' && activeBook
                  ? `${activeBook.name} · ${activeChapter?.number ?? ''}`
                  : source === 'jasher' && activeChapter
                  ? `雅煞珥書 · ${activeChapter.number}`
                  : ''}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            {mainView === 'scripture' && (
              <>
            {/* 搜尋 */}
            <button
              onClick={() => setSearchOpen(o => !o)}
              className="hidden sm:inline-flex h-8 items-center px-2.5 text-xs rounded border border-stone-200 dark:border-[#2E3240] text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#22242C] transition-colors"
              title="搜尋經文（/）"
            >
              <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ display: 'inline', verticalAlign: 'middle' }}>
                <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            {/* 沈浸模式 */}
            <button
              onClick={() => setIsImmersive(v => !v)}
              className="hidden sm:inline-flex h-8 items-center px-2.5 text-xs rounded border border-stone-200 dark:border-[#2E3240] text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#22242C] transition-colors"
              title="沈浸閱讀（F）"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle' }}>
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
            </button>
            {/* 閱讀設定 */}
            <button
              onClick={() => setSettingsOpen(o => !o)}
              className={`hidden sm:inline-flex h-8 items-center px-2.5 text-xs rounded border transition-colors ${
                settingsOpen
                  ? 'border-[#4F7358] dark:border-[#7AAF87] text-[#4F7358] dark:text-[#7AAF87] bg-stone-100 dark:bg-[#22242C]'
                  : 'border-stone-200 dark:border-[#2E3240] text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#22242C]'
              }`}
              title="閱讀設定"
            >
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ display: 'inline', verticalAlign: 'middle' }}>
                <circle cx="10" cy="10" r="3"/>
                <path d="M10 1v2M10 17v2M1 10h2M17 10h2M3.2 3.2l1.4 1.4M15.4 15.4l1.4 1.4M3.2 16.8l1.4-1.4M15.4 4.6l1.4-1.4"/>
              </svg>
            </button>
              </>
            )}
            {/* 更多 */}
            <button
              onClick={() => setMoreOpen(o => !o)}
              className="inline-flex h-9 items-center px-3 text-xs rounded border border-stone-200 dark:border-[#2E3240] text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#22242C] transition-colors"
              title="更多功能"
            >
              ⋯
            </button>
          </div>
          {/* G4: Scroll progress bar inside toolbar */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#4F7358] dark:bg-[#7AAF87] pointer-events-none transition-none"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

        {/* CompletionBanner (Tiny Habits) */}
        {mainView === 'scripture' && showBanner && activeChapter && (
          <CompletionBanner
            chapterLabel={
              source === 'ckjv' && activeBook
                ? `${activeBook.name} · 第 ${activeChapter.number} 章`
                : `雅煞珥書 · 第 ${activeChapter.number} 章`
            }
            bookName={
              source === 'ckjv' && activeBook &&
              activeBook.chapters[activeBook.chapters.length - 1].number === activeChapter.number
                ? activeBook.name
                : undefined
            }
            hasNext={hasNext}
            onContinue={() => { setShowBanner(false); navigateNextChapter() }}
            onDismiss={() => setShowBanner(false)}
          />
        )}

        {mainView === 'scripture' && (
          <>
            <Reader
              chapter={activeChapter}
              fontSize={FONT_SIZES[fontSize]}
              onPrevChapter={handlePrevChapter}
              onNextChapter={handleNextChapter}
              hasPrev={hasPrev}
              hasNext={hasNext}
              chapterTitle={
                source === 'ckjv' && activeBook
                  ? `${activeBook.name}·第${activeChapter?.number}章`
                  : source === 'jasher' && activeChapter
                  ? `雅煞珥·第${activeChapter.number}章`
                  : ''
              }
              bookName={
                source === 'ckjv' && activeBook
                  ? activeBook.name
                  : '雅煞珥書'
              }
              onMarkComplete={handleMarkComplete}
              isCompleted={isCurrentCompleted}
              showResumeCTA={showResumeCTA && !isAtBookmark}
              resumeBookName={resumeBookName}
              resumeChapter={resumeChapter}
              onDismissResumeCTA={() => setShowResumeCTA(false)}
              onScrollProgress={setScrollProgress}
              isImmersive={isImmersive}
              onToggleImmersive={() => setIsImmersive(v => !v)}
              onOpenChapterGrid={() => setChapterGridOpen(true)}
              highlights={highlights.filter(h =>
                h.sourceId === source &&
                h.bookId === (activeBook?.id as number | undefined) &&
                h.chapter === (activeChapter?.number ?? -1)
              )}
              onHighlight={saveHighlight}
              onRemoveHighlight={removeHighlight}
              currentSource={source}
              currentBookId={activeBook?.id as number | undefined}
              verseNumStyle={verseNumStyle}
              lineSpacing={lineSpacing}
            />
            {/* Mobile chapter nav — in-flow, above bottom nav */}
            {!isImmersive && (
              <div className="sm:hidden shrink-0 flex flex-col bg-stone-50/95 dark:bg-[#17191E]/95 backdrop-blur-sm border-t border-stone-200 dark:border-[#2E3240]">
                <div className="flex items-center">
                  <button
                    onClick={handlePrevChapter}
                    disabled={!hasPrev}
                    className={`flex items-center justify-center w-14 h-11 text-xl shrink-0 transition-colors
                      ${hasPrev ? 'text-stone-400 dark:text-[#A09890]' : 'text-stone-200 dark:text-[#2E3240]'}`}
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => setChapterGridOpen(true)}
                    className="flex-1 h-11 flex items-center justify-center text-sm text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#22242C] transition-colors"
                  >
                    {source === 'ckjv' && activeBook && activeChapter
                      ? `${activeBook.name} · 第 ${activeChapter.number} 章`
                      : activeChapter ? `雅煞珥 · 第 ${activeChapter.number} 章` : ''}
                  </button>
                  <button
                    onClick={handleNextChapter}
                    disabled={!hasNext}
                    className={`flex items-center justify-center w-14 h-11 text-xl shrink-0 transition-colors
                      ${hasNext ? 'text-stone-400 dark:text-[#A09890]' : 'text-stone-200 dark:text-[#2E3240]'}`}
                  >
                    ›
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {mainView === 'devotional' && (
          <MainDevotional
            ckjv={ckjv}
            onNavigate={(book, chapter) => {
              selectCkjvChapter(book, chapter)
              setMainView('scripture')
              setSidebarOpen(false)
            }}
          />
        )}

        {mainView === 'book-background' && bgBookName && (
          <MainBookBackground bookName={bgBookName} onBack={() => setMainView('scripture')} />
        )}
      </div>

      {/* More menu */}
      <MoreMenu
        isOpen={moreOpen}
        onClose={() => setMoreOpen(false)}
        onHistory={() => { setHistoryOpen(true); setMoreOpen(false) }}
        onStats={() => { setStatsDashboardOpen(true); setMoreOpen(false) }}
        onSearch={() => setSearchOpen(true)}
        onSettings={() => setSettingsOpen(true)}
        onToggleImmersive={() => setIsImmersive(v => !v)}
        showScriptureTools={mainView === 'scripture'}
      />

      {/* 閱讀設定 popover — fixed to avoid iOS touch-event clipping */}
      {settingsOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setSettingsOpen(false)} />
          <div className="fixed top-12 right-2 z-50 w-60 bg-stone-50 dark:bg-[#22242C] border border-stone-200 dark:border-[#2E3240] rounded-lg shadow-xl p-4 space-y-4">
            <div>
              <div className="text-[10px] font-semibold text-stone-400 dark:text-[#A09890] mb-2 uppercase tracking-widest">文字</div>
              <div className="flex gap-1">
                {(['小', '中', '大'] as const).map((label, i) => (
                  <button
                    key={i}
                    onClick={() => setFontSize(i)}
                    className={`flex-1 py-1 text-xs rounded border transition-colors ${
                      fontSize === i
                        ? 'border-[#4F7358] dark:border-[#7AAF87] text-[#4F7358] dark:text-[#7AAF87] bg-stone-100 dark:bg-[#17191E]'
                        : 'border-stone-200 dark:border-[#2E3240] text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#17191E]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-semibold text-stone-400 dark:text-[#A09890] mb-2 uppercase tracking-widest">主題</div>
              <div className="flex gap-1">
                {([['紙白', false], ['夜讀', true]] as [string, boolean][]).map(([label, isDark]) => (
                  <button
                    key={label}
                    onClick={() => setDark(isDark)}
                    className={`flex-1 py-1 text-xs rounded border transition-colors ${
                      dark === isDark
                        ? 'border-[#4F7358] dark:border-[#7AAF87] text-[#4F7358] dark:text-[#7AAF87] bg-stone-100 dark:bg-[#17191E]'
                        : 'border-stone-200 dark:border-[#2E3240] text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#17191E]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-semibold text-stone-400 dark:text-[#A09890] mb-2 uppercase tracking-widest">節號</div>
              <div className="flex gap-1">
                {(['show', 'fade', 'hide'] as const).map(v => (
                  <button
                    key={v}
                    onClick={() => setVerseNumStyle(v)}
                    className={`flex-1 py-1 text-xs rounded border transition-colors ${
                      verseNumStyle === v
                        ? 'border-[#4F7358] dark:border-[#7AAF87] text-[#4F7358] dark:text-[#7AAF87] bg-stone-100 dark:bg-[#17191E]'
                        : 'border-stone-200 dark:border-[#2E3240] text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#17191E]'
                    }`}
                  >
                    {{ show: '顯示', fade: '淡化', hide: '隱藏' }[v]}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-semibold text-stone-400 dark:text-[#A09890] mb-2 uppercase tracking-widest">行距</div>
              <div className="flex gap-1">
                {(['comfortable', 'loose'] as const).map(v => (
                  <button
                    key={v}
                    onClick={() => setLineSpacing(v)}
                    className={`flex-1 py-1 text-xs rounded border transition-colors ${
                      lineSpacing === v
                        ? 'border-[#4F7358] dark:border-[#7AAF87] text-[#4F7358] dark:text-[#7AAF87] bg-stone-100 dark:bg-[#17191E]'
                        : 'border-stone-200 dark:border-[#2E3240] text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#17191E]'
                    }`}
                  >
                    {{ comfortable: '舒適', loose: '寬鬆' }[v]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Chapter grid (mobile bottom nav tap) */}
      {mainView === 'scripture' && (
        <ChapterGrid
        isOpen={chapterGridOpen}
        onClose={() => setChapterGridOpen(false)}
        title={source === 'ckjv' && activeBook ? activeBook.name : '雅煞珥書'}
        chapters={
          source === 'ckjv' && activeBook
            ? activeBook.chapters
            : (jasher?.chapters ?? [])
        }
        activeChapterNum={activeChapter?.number ?? null}
        completedNums={new Set(
          completions
            .filter(r =>
              source === 'ckjv'
                ? r.sourceId === 'ckjv' && r.bookId === (activeBook?.id as number | undefined)
                : r.sourceId === 'jasher'
            )
            .map(r => r.chapter)
        )}
        onSelect={ch => {
          if (source === 'ckjv' && activeBook) selectCkjvChapter(activeBook, ch)
          else selectJasherChapter(ch)
        }}
        />
      )}

      </div> {/* end inner layout row */}

      {/* Bottom nav */}
      {!isImmersive && (
        <BottomNav
          mainView={mainView === 'book-background' ? 'scripture' : mainView}
          onMainViewChange={(view) => {
            setMainView(view)
            setSidebarOpen(false)
            setSettingsOpen(false)
            setSearchOpen(false)
            if (view === 'devotional') setChapterGridOpen(false)
          }}
        />
      )}
    </div>
  )
}

export default App

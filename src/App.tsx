import { useState, useEffect, useCallback } from 'react'
import type { BibleData, JasherData, Book, Chapter, BookMark, CompletionRecord, StreakData, ReadingPlan, Achievement, Highlight } from './types'
import Sidebar from './components/Sidebar'
import Reader from './components/Reader'
import StatsDashboard from './components/StatsDashboard'
import AchievementModal from './components/AchievementModal'

const FONT_SIZES = ['text-base', 'text-lg', 'text-xl'] as const
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
  if (prev.lastReadDate === todayStr) {
    // Already read today — no change
    return prev
  }

  // Calculate yesterday's date string
  const d = new Date()
  d.setDate(d.getDate() - 1)
  const yesterdayStr = d.toLocaleDateString('sv-SE')

  let newStreak: number
  if (prev.lastReadDate === yesterdayStr) {
    // Read yesterday → extend streak
    newStreak = prev.currentStreak + 1
  } else {
    // Gap → reset
    newStreak = 1
  }

  const updated: StreakData = {
    lastReadDate: todayStr,
    currentStreak: newStreak,
    longestStreak: Math.max(prev.longestStreak, newStreak),
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

  // Achievements
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    try { return JSON.parse(localStorage.getItem(ACHIEVEMENTS_KEY) || '[]') } catch { return [] }
  })
  const [achievementQueue, setAchievementQueue] = useState<string[]>([])

  // Completion overlay
  const [showCompletionOverlay, setShowCompletionOverlay] = useState(false)

  // Book complete toast
  const [bookCompleteMessage, setBookCompleteMessage] = useState<string | null>(null)

  // Scroll progress (lifted from Reader)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Immersive reading mode
  const [isImmersive, setIsImmersive] = useState(false)

  // Highlights
  const [highlights, setHighlights] = useState<Highlight[]>(() => {
    try { return JSON.parse(localStorage.getItem(HIGHLIGHTS_KEY) || '[]') }
    catch { return [] }
  })

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

  // Achievement check effect — runs whenever completions or streak changes
  useEffect(() => {
    if (completions.length === 0) return

    const unlockedIds = new Set(achievements.map(a => a.id))
    const newlyUnlocked: Achievement[] = []
    const now = new Date().toISOString()

    const check = (id: string, condition: boolean) => {
      if (condition && !unlockedIds.has(id)) {
        newlyUnlocked.push({ id, unlockedAt: now })
        unlockedIds.add(id)
      }
    }

    const ckjvCompletions = completions.filter(r => r.sourceId === 'ckjv')

    check('first_chapter', completions.length >= 1)

    const firstBookDone = ckjv?.books.some(book => {
      const bookComps = ckjvCompletions.filter(r => r.bookId === (book.id as number))
      return bookComps.length >= book.chapters.length
    }) ?? false
    check('first_book', firstBookDone)

    check('streak_7', streak.currentStreak >= 7)
    check('streak_30', streak.currentStreak >= 30)
    check('century', completions.length >= 100)

    const ntBooks = ckjv?.books.filter(b => b.testament === '新約') ?? []
    const ntDone = ntBooks.length > 0 && ntBooks.every(book => {
      const bookComps = ckjvCompletions.filter(r => r.bookId === (book.id as number))
      return bookComps.length >= book.chapters.length
    })
    check('nt_complete', ntDone)

    const otBooks = ckjv?.books.filter(b => b.testament === '舊約') ?? []
    const otDone = otBooks.length > 0 && otBooks.every(book => {
      const bookComps = ckjvCompletions.filter(r => r.bookId === (book.id as number))
      return bookComps.length >= book.chapters.length
    })
    check('ot_complete', otDone)

    if (newlyUnlocked.length > 0) {
      const next = [...achievements, ...newlyUnlocked]
      setAchievements(next)
      localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(next))
      setAchievementQueue(q => [...q, ...newlyUnlocked.map(a => a.id)])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completions, streak.currentStreak, ckjv])

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

  const handleMarkComplete = useCallback(() => {
    if (activeChapter && !isCurrentCompleted) {
      recordCompletion(source, activeChapter, activeBook)
      setShowCompletionOverlay(true)
      setTimeout(() => setShowCompletionOverlay(false), 2000)
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
    <div className="flex h-screen overflow-hidden bg-stone-50 dark:bg-[#17191E]">
      {/* Achievement Modal — queue-based */}
      {achievementQueue.length > 0 && (
        <AchievementModal
          achievementId={achievementQueue[0]}
          onClose={() => setAchievementQueue(q => q.slice(1))}
        />
      )}

      {/* Book complete toast */}
      {bookCompleteMessage && (
        <div className="fixed bottom-6 right-6 z-[70] px-5 py-3 rounded-xl bg-[#C17D3A] dark:bg-[#D4935C] text-white dark:text-[#17191E] text-sm font-semibold shadow-2xl animate-pop-in pointer-events-none">
          {bookCompleteMessage}
        </div>
      )}

      {/* Stats Dashboard */}
      <StatsDashboard
        isOpen={statsDashboardOpen}
        onClose={() => setStatsDashboardOpen(false)}
        streak={streak}
        completions={completions}
        ckjv={ckjv}
        achievements={achievements}
        readingPlan={readingPlan}
        onSetPlan={handleSetPlan}
        onClearPlan={handleClearPlan}
      />

      {/* Sidebar — desktop: always visible; mobile: overlay; hidden in immersive */}
      <div className={`transition-all duration-300 ${isImmersive ? 'sm:hidden' : ''}`}>
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
        <div className={`relative flex items-center justify-between px-4 py-2.5 border-b border-stone-200 dark:border-[#2E3240] bg-stone-50/80 dark:bg-[#17191E]/80 backdrop-blur-sm shrink-0 transition-opacity duration-300 ${isImmersive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="flex items-center gap-3">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setSidebarOpen(o => !o)}
              className="sm:hidden p-1.5 rounded text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#22242C] transition-colors"
              aria-label="開啟目錄"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                <rect y="3" width="20" height="2" rx="1"/>
                <rect y="9" width="20" height="2" rx="1"/>
                <rect y="15" width="20" height="2" rx="1"/>
              </svg>
            </button>

            {/* Streak counter */}
            {showStreak && (
              <span
                className={`text-sm font-medium select-none ${
                  hasReadToday
                    ? 'text-orange-500 drop-shadow-[0_0_6px_rgba(249,115,22,0.5)]'
                    : 'text-stone-300 dark:text-[#6B6460] animate-pulse'
                }`}
                title={hasReadToday ? `最長連續：${streak.longestStreak} 天` : '今天還沒讀，別讓它斷掉！'}
              >
                {hasReadToday ? '🔥' : '🕯'} {streak.currentStreak}天
              </span>
            )}

            <span className="text-sm font-medium text-stone-500 dark:text-[#E4DDD0] tracking-wide">
              {source === 'ckjv' && activeBook
                ? `${activeBook.name} · 第 ${activeChapter?.number} 章`
                : source === 'jasher' && activeChapter
                ? `雅煞珥書 · 第 ${activeChapter.number} 章`
                : ''}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* G1: Today's plan progress */}
            {readingPlan && (() => {
              const planChaptersPerDay =
                readingPlan.planId === 'yearly' ? Math.ceil(1189 / 365)
                : readingPlan.planId === 'nt90' ? Math.ceil(260 / 90)
                : (readingPlan.customChaptersPerDay ?? 3)
              const todayCount = completions.filter(r =>
                new Date(r.completedAt).toLocaleDateString('sv-SE') === todayStr
              ).length
              const done = todayCount >= planChaptersPerDay
              return (
                <span className={`text-xs select-none ${done ? 'text-green-500 dark:text-green-400' : 'text-stone-400 dark:text-[#A09890]'}`}>
                  {done
                    ? '✓ 今日達標'
                    : <><span className="text-[#4F7358] dark:text-[#7AAF87] font-medium">{todayCount}/{planChaptersPerDay}</span>章</>
                  }
                </span>
              )
            })()}
            {/* Stats Dashboard button */}
            <button
              onClick={() => setStatsDashboardOpen(o => !o)}
              className="px-2.5 py-1 text-xs rounded border border-stone-200 dark:border-[#2E3240] text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#22242C] transition-colors"
              title="閱讀統計"
            >
              📊
            </button>
            {/* History button */}
            <button
              onClick={() => setHistoryOpen(o => !o)}
              className="relative px-2.5 py-1 text-xs rounded border border-stone-200 dark:border-[#2E3240] text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#22242C] transition-colors"
              title="已讀記錄"
            >
              📖 已讀
              {completions.length > 0 && (
                <span className="ml-1 text-[10px] text-sage dark:text-sage-dark font-medium">
                  {completions.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setFontSize(s => (s + 1) % 3)}
              className="px-2.5 py-1 text-xs rounded border border-stone-200 dark:border-[#2E3240] text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#22242C] transition-colors"
              title="切換字體大小"
            >
              {fontSize === 0 ? 'A' : fontSize === 1 ? 'A+' : 'A++'}
            </button>
            <button
              onClick={() => setDark(d => !d)}
              className="px-2.5 py-1 text-xs rounded border border-stone-200 dark:border-[#2E3240] text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#22242C] transition-colors"
            >
              {dark ? '☀ 淺色' : '☽ 深色'}
            </button>
            {/* Immersive mode toggle */}
            <button
              onClick={() => setIsImmersive(v => !v)}
              className="px-2.5 py-1 text-xs rounded border border-stone-200 dark:border-[#2E3240] text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#22242C] transition-colors"
              title="沈浸閱讀模式（快捷鍵 F）"
              aria-label="進入沈浸閱讀模式"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle' }}>
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
            </button>
          </div>
          {/* G4: Scroll progress bar inside toolbar */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#4F7358] dark:bg-[#7AAF87] pointer-events-none transition-none"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

        {/* Reader */}
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
          onMarkComplete={handleMarkComplete}
          isCompleted={isCurrentCompleted}
          showResumeCTA={showResumeCTA && !isAtBookmark}
          resumeBookName={resumeBookName}
          resumeChapter={resumeChapter}
          onDismissResumeCTA={() => setShowResumeCTA(false)}
          showCompletionOverlay={showCompletionOverlay}
          onScrollProgress={setScrollProgress}
          isImmersive={isImmersive}
          onToggleImmersive={() => setIsImmersive(v => !v)}
          highlights={highlights.filter(h =>
            h.sourceId === source &&
            h.bookId === (activeBook?.id as number | undefined) &&
            h.chapter === (activeChapter?.number ?? -1)
          )}
          onHighlight={saveHighlight}
          onRemoveHighlight={removeHighlight}
          currentSource={source}
          currentBookId={activeBook?.id as number | undefined}
        />
      </div>
    </div>
  )
}

export default App

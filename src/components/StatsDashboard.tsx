import { useState } from 'react'
import type { StreakData, CompletionRecord, BibleData, ReadingPlan } from '../types'

interface Props {
  isOpen: boolean
  onClose: () => void
  streak: StreakData
  completions: CompletionRecord[]
  ckjv: BibleData | null
  readingPlan: ReadingPlan | null
  onSetPlan: (plan: ReadingPlan) => void
  onClearPlan: () => void
}

function today(): string {
  return new Date().toLocaleDateString('sv-SE')
}

// Build heatmap: 52 weeks × 7 days, oldest-week-first, each column = Sun..Sat
function buildHeatmap(completions: CompletionRecord[]): boolean[] {
  const readDays = new Set(
    completions.map(r => new Date(r.completedAt).toLocaleDateString('sv-SE'))
  )
  const totalDays = 364
  const cells: boolean[] = []
  const now = new Date()

  // Align to Saturday of the current week (so last column ends at current day's week)
  // We go back 363 days from today so that day index 0 is 363 days ago
  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const dateStr = d.toLocaleDateString('sv-SE')
    cells.push(readDays.has(dateStr))
  }
  return cells
}

export default function StatsDashboard({
  isOpen, onClose, streak, completions, ckjv, readingPlan, onSetPlan, onClearPlan,
}: Props) {
  const [customInput, setCustomInput] = useState<number>(3)
  const [showCustom, setShowCustom] = useState(false)
  const [choosingPlan, setChoosingPlan] = useState(false)
  const [showFullHeatmap, setShowFullHeatmap] = useState(false)

  // --- Computed stats ---
  const ckjvCompletions = completions.filter(r => r.sourceId === 'ckjv')

  const completedBooksCount = ckjv?.books.filter(book => {
    const bookComps = ckjvCompletions.filter(r => r.bookId === (book.id as number))
    return bookComps.length >= book.chapters.length
  }).length ?? 0

  // Reading plan stats
  const todayStr = today()
  const todayCount = completions.filter(r =>
    new Date(r.completedAt).toLocaleDateString('sv-SE') === todayStr
  ).length

  const planChaptersPerDay = readingPlan
    ? readingPlan.planId === 'yearly'   ? Math.ceil(1189 / 365)
    : readingPlan.planId === 'nt90'     ? Math.ceil(260 / 90)
    : (readingPlan.customChaptersPerDay ?? 3)
    : 3

  const planName = readingPlan
    ? readingPlan.planId === 'yearly' ? '一年讀完聖經'
    : readingPlan.planId === 'nt90'   ? '新約90天'
    : '自訂計劃'
    : ''

  // Heatmap
  const heatmap = buildHeatmap(completions) // 364 cells, oldest first

  // Chunk into columns of 7 (weeks)
  const weeks: boolean[][] = []
  for (let w = 0; w < 52; w++) {
    weeks.push(heatmap.slice(w * 7, w * 7 + 7))
  }

  // Book completion status per book
  const getBookStatus = (bookId: number, totalChapters: number): 'none' | 'partial' | 'done' => {
    const bc = ckjvCompletions.filter(r => r.bookId === bookId)
    if (bc.length === 0) return 'none'
    if (bc.length >= totalChapters) return 'done'
    return 'partial'
  }

  const handleSetPlan = (planId: 'yearly' | 'nt90' | 'custom') => {
    if (planId === 'custom') {
      setShowCustom(true)
      return
    }
    onSetPlan({ planId, startDate: todayStr })
    setChoosingPlan(false)
    setShowCustom(false)
  }

  const handleConfirmCustom = () => {
    onSetPlan({ planId: 'custom', startDate: todayStr, customChaptersPerDay: customInput })
    setChoosingPlan(false)
    setShowCustom(false)
  }

  const otBooks = ckjv?.books.filter(b => b.testament === '舊約') ?? []
  const ntBooks = ckjv?.books.filter(b => b.testament === '新約') ?? []

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full overflow-y-auto
          bg-stone-50 dark:bg-[#22242C]
          border-l border-stone-200 dark:border-[#2E3240]
          shadow-2xl
          transition-transform duration-300
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        style={{ width: 'min(100vw, 420px)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 dark:border-[#2E3240] sticky top-0 bg-stone-50 dark:bg-[#22242C] z-10">
          <h2 className="text-base font-semibold text-stone-500 dark:text-[#E4DDD0]">
            📊 閱讀統計
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-stone-300 dark:text-[#6B6460] hover:bg-stone-100 dark:hover:bg-[#22242C] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="px-5 py-4 space-y-6">
          {/* 1. Three-column summary */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: '連續天數', value: `${streak.currentStreak}`, unit: '天 🔥' },
              { label: '已讀章數', value: `${completions.length}`, unit: '章' },
              { label: '已完成書卷', value: `${completedBooksCount}`, unit: '本' },
            ].map(({ label, value, unit }) => (
              <div
                key={label}
                className="flex flex-col items-center rounded-lg p-3 bg-stone-100 dark:bg-[#22242C]"
              >
                <span className="text-xl font-bold text-[#C17D3A] dark:text-[#D4935C]">{value}</span>
                <span className="text-[10px] text-stone-300 dark:text-[#6B6460] mt-0.5">{unit}</span>
                <span className="text-[10px] text-stone-400 dark:text-[#A09890] mt-0.5">{label}</span>
              </div>
            ))}
          </div>

          {/* 2. Heatmap */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold text-stone-400 dark:text-[#A09890] uppercase tracking-wide">
                {showFullHeatmap ? '過去 52 週' : '最近 8 週'}
              </h3>
              <button
                onClick={() => setShowFullHeatmap(v => !v)}
                className="text-[10px] text-stone-300 dark:text-[#6B6460] hover:text-stone-400 dark:hover:text-[#A09890] transition-colors"
              >
                {showFullHeatmap ? '收合 ↑' : '全年 ↓'}
              </button>
            </div>
            <div className="flex gap-0.5 overflow-x-auto pb-1">
              {(showFullHeatmap ? weeks : weeks.slice(-8)).map((week, wi) => (
                <div key={wi} className="flex flex-col gap-0.5">
                  {week.map((active, di) => (
                    <div
                      key={di}
                      className={`w-2.5 h-2.5 rounded-sm ${
                        active
                          ? 'bg-[#4F7358] dark:bg-[#7AAF87]'
                          : 'bg-stone-200 dark:bg-[#2E3240]'
                      }`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* 3. Book grid */}
          {ckjv && (
            <div>
              <h3 className="text-xs font-semibold text-stone-400 dark:text-[#A09890] mb-2 uppercase tracking-wide">
                書卷進度
              </h3>
              {[
                { label: '舊約', books: otBooks },
                { label: '新約', books: ntBooks },
              ].map(({ label, books }) => (
                <div key={label} className="mb-3">
                  <div className="text-[10px] text-stone-300 dark:text-[#6B6460] mb-1.5">{label}</div>
                  <div className="flex flex-wrap gap-1">
                    {books.map(book => {
                      const status = getBookStatus(book.id as number, book.chapters.length)
                      const displayName = book.name.length > 4 ? book.name.slice(0, 4) : book.name
                      return (
                        <div
                          key={book.id}
                          className={`w-10 h-8 rounded text-[10px] flex items-center justify-center text-center leading-tight
                            ${status === 'done'
                              ? 'bg-[#4F7358] dark:bg-[#7AAF87] text-white dark:text-[#17191E]'
                              : status === 'partial'
                              ? 'border-2 border-[#4F7358] dark:border-[#7AAF87] text-stone-400 dark:text-[#A09890] bg-stone-100 dark:bg-[#22242C]'
                              : 'bg-stone-100 dark:bg-[#22242C] text-stone-300 dark:text-[#6B6460]'
                            }`}
                          title={book.name}
                        >
                          {displayName}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 4. Reading Plan */}
          <div>
            <h3 className="text-xs font-semibold text-stone-400 dark:text-[#A09890] mb-2 uppercase tracking-wide">
              我的計劃
            </h3>

            {(!readingPlan || choosingPlan) ? (
              <div className="space-y-2">
                <div className="flex gap-2 flex-wrap">
                  {[
                    { id: 'yearly' as const, label: '一年讀完聖經', sub: '約 3 章/天' },
                    { id: 'nt90'   as const, label: '新約90天',     sub: '約 3 章/天' },
                    { id: 'custom' as const, label: '自訂',          sub: '自訂章數' },
                  ].map(({ id, label, sub }) => (
                    <button
                      key={id}
                      onClick={() => handleSetPlan(id)}
                      className="flex flex-col items-start px-3 py-2 rounded-lg border border-stone-200 dark:border-[#2E3240] hover:border-[#4F7358] dark:hover:border-[#7AAF87] hover:bg-stone-100 dark:hover:bg-[#22242C] transition-colors text-left"
                    >
                      <span className="text-xs font-medium text-stone-500 dark:text-[#E4DDD0]">{label}</span>
                      <span className="text-[10px] text-stone-300 dark:text-[#6B6460]">{sub}</span>
                    </button>
                  ))}
                </div>
                {showCustom && (
                  <div className="flex items-center gap-2 mt-2">
                    <label className="text-xs text-stone-400 dark:text-[#A09890]">每天</label>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={customInput}
                      onChange={e => setCustomInput(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 px-2 py-1 text-xs rounded border border-stone-200 dark:border-[#2E3240] bg-stone-50 dark:bg-[#17191E] text-stone-500 dark:text-[#E4DDD0]"
                    />
                    <label className="text-xs text-stone-400 dark:text-[#A09890]">章</label>
                    <button
                      onClick={handleConfirmCustom}
                      className="px-3 py-1 text-xs rounded bg-[#4F7358] dark:bg-[#7AAF87] text-white dark:text-[#17191E] font-medium hover:opacity-90 transition-opacity"
                    >
                      確認
                    </button>
                  </div>
                )}
                {choosingPlan && readingPlan && (
                  <button
                    onClick={() => { setChoosingPlan(false); setShowCustom(false) }}
                    className="text-[10px] text-stone-300 dark:text-[#6B6460] underline"
                  >
                    取消
                  </button>
                )}
              </div>
            ) : (
              <div className="rounded-lg border border-stone-200 dark:border-[#2E3240] p-3 space-y-2">
                <div className="text-sm font-medium text-stone-500 dark:text-[#E4DDD0]">{planName}</div>
                <div className="flex justify-between text-xs text-stone-400 dark:text-[#A09890]">
                  <span>今日目標：{planChaptersPerDay} 章</span>
                  <span>今日完成：{todayCount} 章</span>
                </div>
                {/* Progress bar */}
                <div className="relative h-1.5 rounded-full bg-stone-200 dark:bg-[#2E3240] overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-[#4F7358] dark:bg-[#7AAF87] transition-all"
                    style={{ width: `${Math.min(100, (todayCount / planChaptersPerDay) * 100)}%` }}
                  />
                </div>
                <div className="text-[10px] text-stone-300 dark:text-[#6B6460]">
                  {todayCount} / {planChaptersPerDay} 章
                </div>
                <button
                  onClick={() => { setChoosingPlan(true); setShowCustom(false) }}
                  className="text-[10px] text-stone-300 dark:text-[#6B6460] underline"
                >
                  更改計劃
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  )
}

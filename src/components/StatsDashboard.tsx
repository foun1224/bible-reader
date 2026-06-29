import { useState } from 'react'
import type { StreakData, CompletionRecord, BibleData, Achievement, ReadingPlan } from '../types'

interface Props {
  isOpen: boolean
  onClose: () => void
  streak: StreakData
  completions: CompletionRecord[]
  ckjv: BibleData | null
  achievements: Achievement[]
  readingPlan: ReadingPlan | null
  onSetPlan: (plan: ReadingPlan) => void
  onClearPlan: () => void
}

const ACHIEVEMENT_META: { id: string; icon: string; name: string; desc: string }[] = [
  { id: 'first_chapter', icon: '🌱', name: '第一章',   desc: '讀完第一章' },
  { id: 'first_book',    icon: '📖', name: '第一本書', desc: '完成第一本書' },
  { id: 'streak_7',      icon: '🔥', name: '連續7天',  desc: '保持連續閱讀7天' },
  { id: 'streak_30',     icon: '💫', name: '連續30天', desc: '保持連續閱讀30天' },
  { id: 'nt_complete',   icon: '✨', name: '新約完成', desc: '完成整本新約' },
  { id: 'ot_complete',   icon: '🏆', name: '舊約完成', desc: '完成整本舊約' },
  { id: 'century',       icon: '💯', name: '百章勇士', desc: '讀完100章' },
]

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
  isOpen, onClose, streak, completions, ckjv, achievements, readingPlan, onSetPlan, onClearPlan,
}: Props) {
  const [customInput, setCustomInput] = useState<number>(3)
  const [showCustom, setShowCustom] = useState(false)
  const [choosingPlan, setChoosingPlan] = useState(false)

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

  const unlockedIds = new Set(achievements.map(a => a.id))
  const getUnlockedDate = (id: string): string | null => {
    const a = achievements.find(x => x.id === id)
    if (!a) return null
    return new Date(a.unlockedAt).toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' })
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
          bg-parchment-50 dark:bg-[#221C17]
          border-l border-parchment-200 dark:border-[#3A3028]
          shadow-2xl
          transition-transform duration-300
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        style={{ width: 'min(100vw, 420px)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-parchment-200 dark:border-[#3A3028] sticky top-0 bg-parchment-50 dark:bg-[#221C17] z-10">
          <h2 className="text-base font-semibold text-parchment-500 dark:text-[#EDE0C4]">
            📊 閱讀統計
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-parchment-300 dark:text-[#5A4838] hover:bg-parchment-100 dark:hover:bg-[#2E261E] transition-colors"
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
                className="flex flex-col items-center rounded-lg p-3 bg-parchment-100 dark:bg-[#2E261E]"
              >
                <span className="text-xl font-bold text-[#8B6418] dark:text-[#C9A84C]">{value}</span>
                <span className="text-[10px] text-parchment-300 dark:text-[#5A4838] mt-0.5">{unit}</span>
                <span className="text-[10px] text-parchment-400 dark:text-[#A8906E] mt-0.5">{label}</span>
              </div>
            ))}
          </div>

          {/* 2. Heatmap */}
          <div>
            <h3 className="text-xs font-semibold text-parchment-400 dark:text-[#A8906E] mb-2 uppercase tracking-wide">
              過去 52 週
            </h3>
            <div className="flex gap-0.5 overflow-x-auto pb-1">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-0.5">
                  {week.map((active, di) => (
                    <div
                      key={di}
                      className={`w-2.5 h-2.5 rounded-sm ${
                        active
                          ? 'bg-[#8B6418] dark:bg-[#C9A84C]'
                          : 'bg-parchment-200 dark:bg-[#3A3028]'
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
              <h3 className="text-xs font-semibold text-parchment-400 dark:text-[#A8906E] mb-2 uppercase tracking-wide">
                書卷進度
              </h3>
              {[
                { label: '舊約', books: otBooks },
                { label: '新約', books: ntBooks },
              ].map(({ label, books }) => (
                <div key={label} className="mb-3">
                  <div className="text-[10px] text-parchment-300 dark:text-[#5A4838] mb-1.5">{label}</div>
                  <div className="flex flex-wrap gap-1">
                    {books.map(book => {
                      const status = getBookStatus(book.id as number, book.chapters.length)
                      const displayName = book.name.length > 4 ? book.name.slice(0, 4) : book.name
                      return (
                        <div
                          key={book.id}
                          className={`w-10 h-8 rounded text-[10px] flex items-center justify-center text-center leading-tight
                            ${status === 'done'
                              ? 'bg-[#8B6418] dark:bg-[#C9A84C] text-white dark:text-[#1A1410]'
                              : status === 'partial'
                              ? 'border-2 border-[#8B6418] dark:border-[#C9A84C] text-parchment-400 dark:text-[#A8906E] bg-parchment-100 dark:bg-[#2E261E]'
                              : 'bg-parchment-100 dark:bg-[#2E261E] text-parchment-300 dark:text-[#5A4838]'
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
            <h3 className="text-xs font-semibold text-parchment-400 dark:text-[#A8906E] mb-2 uppercase tracking-wide">
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
                      className="flex flex-col items-start px-3 py-2 rounded-lg border border-parchment-200 dark:border-[#3A3028] hover:border-[#8B6418] dark:hover:border-[#C9A84C] hover:bg-parchment-100 dark:hover:bg-[#2E261E] transition-colors text-left"
                    >
                      <span className="text-xs font-medium text-parchment-500 dark:text-[#EDE0C4]">{label}</span>
                      <span className="text-[10px] text-parchment-300 dark:text-[#5A4838]">{sub}</span>
                    </button>
                  ))}
                </div>
                {showCustom && (
                  <div className="flex items-center gap-2 mt-2">
                    <label className="text-xs text-parchment-400 dark:text-[#A8906E]">每天</label>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={customInput}
                      onChange={e => setCustomInput(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 px-2 py-1 text-xs rounded border border-parchment-200 dark:border-[#3A3028] bg-parchment-50 dark:bg-[#1A1410] text-parchment-500 dark:text-[#EDE0C4]"
                    />
                    <label className="text-xs text-parchment-400 dark:text-[#A8906E]">章</label>
                    <button
                      onClick={handleConfirmCustom}
                      className="px-3 py-1 text-xs rounded bg-[#8B6418] dark:bg-[#C9A84C] text-white dark:text-[#1A1410] font-medium hover:opacity-90 transition-opacity"
                    >
                      確認
                    </button>
                  </div>
                )}
                {choosingPlan && readingPlan && (
                  <button
                    onClick={() => { setChoosingPlan(false); setShowCustom(false) }}
                    className="text-[10px] text-parchment-300 dark:text-[#5A4838] underline"
                  >
                    取消
                  </button>
                )}
              </div>
            ) : (
              <div className="rounded-lg border border-parchment-200 dark:border-[#3A3028] p-3 space-y-2">
                <div className="text-sm font-medium text-parchment-500 dark:text-[#EDE0C4]">{planName}</div>
                <div className="flex justify-between text-xs text-parchment-400 dark:text-[#A8906E]">
                  <span>今日目標：{planChaptersPerDay} 章</span>
                  <span>今日完成：{todayCount} 章</span>
                </div>
                {/* Progress bar */}
                <div className="relative h-1.5 rounded-full bg-parchment-200 dark:bg-[#3A3028] overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-[#8B6418] dark:bg-[#C9A84C] transition-all"
                    style={{ width: `${Math.min(100, (todayCount / planChaptersPerDay) * 100)}%` }}
                  />
                </div>
                <div className="text-[10px] text-parchment-300 dark:text-[#5A4838]">
                  {todayCount} / {planChaptersPerDay} 章
                </div>
                <button
                  onClick={() => { setChoosingPlan(true); setShowCustom(false) }}
                  className="text-[10px] text-parchment-300 dark:text-[#5A4838] underline"
                >
                  更改計劃
                </button>
              </div>
            )}
          </div>

          {/* 5. Achievements */}
          <div>
            <h3 className="text-xs font-semibold text-parchment-400 dark:text-[#A8906E] mb-2 uppercase tracking-wide">
              成就
            </h3>
            <div className="space-y-2">
              {ACHIEVEMENT_META.map(({ id, icon, name, desc }) => {
                const unlocked = unlockedIds.has(id)
                const date = getUnlockedDate(id)
                return (
                  <div
                    key={id}
                    className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-opacity
                      ${unlocked ? 'opacity-100' : 'opacity-40'}
                      bg-parchment-100 dark:bg-[#2E261E]
                    `}
                  >
                    <span className={`text-xl shrink-0 ${unlocked ? '' : 'grayscale'}`}>{icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-parchment-500 dark:text-[#EDE0C4]">{name}</div>
                      <div className="text-[10px] text-parchment-300 dark:text-[#5A4838]">{desc}</div>
                    </div>
                    {unlocked && date && (
                      <span className="text-[10px] text-[#8B6418] dark:text-[#C9A84C] shrink-0">{date}</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

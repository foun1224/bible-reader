import type { StreakData } from '../types'

interface Props {
  isOpen: boolean
  onClose: () => void
  streak: StreakData
  hasReadToday: boolean
  completionsCount: number
  onSearch: () => void
  onDevotion: () => void
  onNotes: () => void
  onHistory: () => void
  onStats: () => void
}

const menuItems = [
  { key: 'devotion', label: '今日靈修', badge: 'Beta', emoji: '🕊' },
  { key: 'search',   label: '搜尋經文', badge: null, emoji: '🔍' },
  { key: 'notes',    label: '我的筆記', badge: null, emoji: '📝' },
  { key: 'history',  label: '已讀記錄', badge: null, emoji: '📖' },
  { key: 'stats',    label: '閱讀統計 & 計劃', badge: null, emoji: '📊' },
] as const

type MenuKey = typeof menuItems[number]['key']

export default function MoreMenu({
  isOpen, onClose,
  streak, hasReadToday, completionsCount,
  onSearch, onDevotion, onNotes, onHistory, onStats,
}: Props) {
  const handlers: Record<MenuKey, () => void> = {
    search: onSearch,
    devotion: onDevotion,
    notes: onNotes,
    history: onHistory,
    stats: onStats,
  }

  function handle(key: MenuKey) {
    handlers[key]()
    onClose()
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/30" onClick={onClose} />}
      <div
        className={`fixed top-0 right-0 z-50 h-full flex flex-col w-56 bg-stone-50 dark:bg-[#22242C] border-l border-stone-200 dark:border-[#2E3240] shadow-xl transition-transform duration-250 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header: streak */}
        <div className="shrink-0 px-4 pt-5 pb-3 border-b border-stone-100 dark:border-[#2E3240]">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xl ${hasReadToday ? 'drop-shadow-[0_0_5px_rgba(249,115,22,0.5)]' : 'opacity-40'}`}>
              {hasReadToday ? '🔥' : '🕯'}
            </span>
            <span className="text-lg font-semibold text-stone-600 dark:text-[#E4DDD0]">
              {streak.currentStreak} <span className="text-xs font-normal text-stone-300 dark:text-[#6B6460]">天連續</span>
            </span>
          </div>
          <p className="text-[10px] text-stone-300 dark:text-[#6B6460]">
            {hasReadToday ? '今天已讀' : '今天還沒讀'} · 共完成 {completionsCount} 章
          </p>
        </div>

        {/* Feature list */}
        <nav className="flex-1 overflow-y-auto py-2">
          {menuItems.map(({ key, label, badge, emoji }) => (
            <button
              key={key}
              onClick={() => handle(key)}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-stone-500 dark:text-[#E4DDD0] hover:bg-stone-100 dark:hover:bg-[#17191E] transition-colors text-left"
            >
              <span className="w-5 text-center text-base shrink-0">{emoji}</span>
              <span className="flex-1">{label}</span>
              {badge && (
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-stone-200 dark:bg-[#2E3240] text-stone-400 dark:text-[#A09890] font-medium tracking-wide">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Close */}
        <button
          onClick={onClose}
          className="shrink-0 mx-4 my-3 py-2 text-xs text-stone-300 dark:text-[#6B6460] hover:text-stone-400 dark:hover:text-[#A09890] transition-colors"
        >
          關閉
        </button>
      </div>
    </>
  )
}

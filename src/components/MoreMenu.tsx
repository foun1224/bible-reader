interface Props {
  isOpen: boolean
  onClose: () => void
  onSearch: () => void
  onReflection: () => void
  onNotes: () => void
  onHistory: () => void
  onStats: () => void
}

const menuItems = [
  { key: 'search',     label: '搜尋經文',       emoji: '🔍' },
  { key: 'reflection', label: '反思面板',        emoji: '✍️' },
  { key: 'notes',      label: '我的筆記',        emoji: '📝' },
  { key: 'history',   label: '已讀記錄',        emoji: '📖' },
  { key: 'stats',     label: '閱讀回顧 & 計劃',  emoji: '📖' },
] as const

type MenuKey = typeof menuItems[number]['key']

export default function MoreMenu({
  isOpen, onClose,
  onSearch, onReflection, onNotes, onHistory, onStats,
}: Props) {
  const handlers: Record<MenuKey, () => void> = {
    search: onSearch,
    reflection: onReflection,
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
        {/* Feature list */}
        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map(({ key, label, emoji }) => (
            <button
              key={key}
              onClick={() => handle(key)}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-stone-500 dark:text-[#E4DDD0] hover:bg-stone-100 dark:hover:bg-[#17191E] transition-colors text-left"
            >
              <span className="w-5 text-center text-base shrink-0">{emoji}</span>
              <span className="flex-1">{label}</span>
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

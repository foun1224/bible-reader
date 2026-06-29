interface Props {
  isOpen: boolean
  onClose: () => void
  onHistory: () => void
  onStats: () => void
  onSearch?: () => void
  onSettings?: () => void
  onToggleImmersive?: () => void
  showScriptureTools?: boolean
}

export default function MoreMenu({
  isOpen,
  onClose,
  onHistory,
  onStats,
  onSearch,
  onSettings,
  onToggleImmersive,
  showScriptureTools = false,
}: Props) {
  const scriptureTools = [
    { label: '搜尋經文', icon: '⌕', fn: onSearch },
    { label: '閱讀設定', icon: '⚙', fn: onSettings },
    { label: '沉浸閱讀', icon: '□', fn: onToggleImmersive },
  ].filter(item => Boolean(item.fn))

  const reviewTools = [
    { label: '閱讀回顧', icon: '↺', fn: onStats },
    { label: '已讀記錄', icon: '☰', fn: onHistory },
  ]

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/30" onClick={onClose} />}
      <div
        className={`fixed top-0 right-0 z-50 h-full flex flex-col w-56 bg-stone-50 dark:bg-[#22242C] border-l border-stone-200 dark:border-[#2E3240] shadow-xl transition-transform duration-250 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <nav className="flex-1 overflow-y-auto pt-6 pb-2">
          {showScriptureTools && scriptureTools.length > 0 && (
            <div className="sm:hidden pb-2 mb-2 border-b border-stone-200 dark:border-[#2E3240]">
              <p className="px-4 pb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">經文工具</p>
              {scriptureTools.map(({ label, icon, fn }) => (
                <button
                  key={label}
                  onClick={() => { fn?.(); onClose() }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-stone-500 dark:text-[#E4DDD0] hover:bg-stone-100 dark:hover:bg-[#17191E] transition-colors text-left"
                >
                  <span className="w-5 text-center text-sm shrink-0 text-stone-300 dark:text-[#6B6460]">{icon}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          )}

          <div>
            <p className="px-4 pb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">回顧</p>
            {reviewTools.map(({ label, icon, fn }) => (
              <button
                key={label}
                onClick={() => { fn(); onClose() }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-stone-500 dark:text-[#E4DDD0] hover:bg-stone-100 dark:hover:bg-[#17191E] transition-colors text-left"
              >
                <span className="w-5 text-center text-sm shrink-0 text-stone-300 dark:text-[#6B6460]">{icon}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </nav>
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

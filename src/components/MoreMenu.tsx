type MenuIcon = 'search' | 'settings' | 'book' | 'history' | 'list' | 'library'

function MenuIconGlyph({ icon }: { icon: MenuIcon }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: '0 0 20 20',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  if (icon === 'search') return (
    <svg {...common}>
      <circle cx="8.5" cy="8.5" r="5.5" />
      <path d="M13 13l3.5 3.5" />
    </svg>
  )
  if (icon === 'settings') return (
    <svg {...common}>
      <circle cx="10" cy="10" r="3" />
      <path d="M10 1v2M10 17v2M1 10h2M17 10h2M3.2 3.2l1.4 1.4M15.4 15.4l1.4 1.4M3.2 16.8l1.4-1.4M15.4 4.6l1.4-1.4" />
    </svg>
  )
  if (icon === 'book') return (
    <svg {...common}>
      <path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H17" />
      <path d="M6.5 2H17v16H6.5A2.5 2.5 0 0 1 4 15.5v-11A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
  if (icon === 'library') return (
    <svg {...common}>
      <path d="M4 4.5h5.5v11H4zM10.5 4.5H16v11h-5.5z" />
      <path d="M6 7h1.5M12.5 7H14M6 10h1.5M12.5 10H14" />
    </svg>
  )
  if (icon === 'history') return (
    <svg {...common}>
      <path d="M4 6.5A7 7 0 1 1 3.5 11" />
      <path d="M4 3v3.5h3.5" />
      <path d="M10 6v4l2.5 1.5" />
    </svg>
  )
  return (
    <svg {...common}>
      <path d="M5 6h10M5 10h10M5 14h10" />
    </svg>
  )
}

interface Props {
  isOpen: boolean
  onClose: () => void
  onHistory: () => void
  onStats: () => void
  onSearch?: () => void
  onSettings?: () => void
  onToggleImmersive?: () => void
  onCurriculum?: () => void
  showScriptureTools?: boolean
  showReadingSettings?: boolean
}

export default function MoreMenu({
  isOpen,
  onClose,
  onHistory,
  onStats,
  onSearch,
  onSettings,
  onToggleImmersive,
  onCurriculum,
  showScriptureTools = false,
  showReadingSettings = false,
}: Props) {
  const scriptureTools = [
    { label: '搜尋經文', icon: 'search' as MenuIcon, fn: onSearch },
    { label: '閱讀設定', icon: 'settings' as MenuIcon, fn: onSettings },
    { label: '沉浸閱讀', icon: 'book' as MenuIcon, fn: onToggleImmersive },
  ].filter(item => Boolean(item.fn))

  const learningTools = [
    { label: '線上教材', icon: 'library' as MenuIcon, fn: onCurriculum },
  ].filter(item => Boolean(item.fn))

  const reviewTools = [
    { label: '閱讀回顧', icon: 'history' as MenuIcon, fn: onStats },
    { label: '已讀記錄', icon: 'list' as MenuIcon, fn: onHistory },
  ]

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/30" onClick={onClose} />}
      <div
        className={`fixed top-0 right-0 z-50 h-full flex flex-col w-56 bg-stone-50 dark:bg-[#22242C] border-l border-stone-200 dark:border-[#2E3240] shadow-xl transition-transform duration-250 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
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
                  <span className="w-5 shrink-0 text-stone-300 dark:text-[#6B6460]"><MenuIconGlyph icon={icon} /></span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          )}
          {!showScriptureTools && showReadingSettings && onSettings && (
            <div className="sm:hidden pb-2 mb-2 border-b border-stone-200 dark:border-[#2E3240]">
              <button
                onClick={() => { onSettings(); onClose() }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-stone-500 dark:text-[#E4DDD0] hover:bg-stone-100 dark:hover:bg-[#17191E] transition-colors text-left"
              >
                <span className="w-5 shrink-0 text-stone-300 dark:text-[#6B6460]"><MenuIconGlyph icon="settings" /></span>
                <span>閱讀設定</span>
              </button>
            </div>
          )}

          {learningTools.length > 0 && (
            <div className="pb-2 mb-2 border-b border-stone-200 dark:border-[#2E3240]">
              <p className="px-4 pb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">學習</p>
              {learningTools.map(({ label, icon, fn }) => (
                <button
                  key={label}
                  onClick={() => { fn?.(); onClose() }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-stone-500 dark:text-[#E4DDD0] hover:bg-stone-100 dark:hover:bg-[#17191E] transition-colors text-left"
                >
                  <span className="w-5 shrink-0 text-stone-300 dark:text-[#6B6460]"><MenuIconGlyph icon={icon} /></span>
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
                <span className="w-5 shrink-0 text-stone-300 dark:text-[#6B6460]"><MenuIconGlyph icon={icon} /></span>
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

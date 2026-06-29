interface Props {
  isOpen: boolean
  onClose: () => void
  onHistory: () => void
  onStats: () => void
}

export default function MoreMenu({ isOpen, onClose, onHistory, onStats }: Props) {
  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/30" onClick={onClose} />}
      <div
        className={`fixed top-0 right-0 z-50 h-full flex flex-col w-48 bg-stone-50 dark:bg-[#22242C] border-l border-stone-200 dark:border-[#2E3240] shadow-xl transition-transform duration-250 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <nav className="flex-1 overflow-y-auto pt-6 pb-2">
          {[
            { label: '閱讀回顧 & 計劃', emoji: '📖', fn: onStats },
            { label: '已讀記錄',         emoji: '📋', fn: onHistory },
          ].map(({ label, emoji, fn }) => (
            <button
              key={label}
              onClick={() => { fn(); onClose() }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-stone-500 dark:text-[#E4DDD0] hover:bg-stone-100 dark:hover:bg-[#17191E] transition-colors text-left"
            >
              <span className="w-5 text-center text-base shrink-0">{emoji}</span>
              <span>{label}</span>
            </button>
          ))}
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

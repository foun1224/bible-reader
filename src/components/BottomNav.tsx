interface Props {
  mainView: 'scripture' | 'devotional'
  onMainViewChange: (view: 'scripture' | 'devotional') => void
}

export default function BottomNav({ mainView, onMainViewChange }: Props) {
  return (
    <div
      className="shrink-0 flex border-t border-stone-200 dark:border-[#2E3240] bg-stone-50/95 dark:bg-[#17191E]/95 backdrop-blur-sm"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {(['scripture', 'devotional'] as const).map(view => (
        <button
          key={view}
          onClick={() => onMainViewChange(view)}
          className={`flex-1 py-3 text-sm font-medium transition-colors
            ${mainView === view
              ? 'text-[#4F7358] dark:text-[#7AAF87]'
              : 'text-stone-400 dark:text-[#6B6460] hover:text-stone-500 dark:hover:text-[#A09890]'
            }`}
        >
          {view === 'scripture' ? '經文' : '靈修'}
        </button>
      ))}
    </div>
  )
}

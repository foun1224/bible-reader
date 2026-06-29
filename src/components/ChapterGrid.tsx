import type { Chapter } from '../types'

interface Props {
  isOpen: boolean
  onClose: () => void
  title: string
  chapters: Chapter[]
  activeChapterNum: number | null
  completedNums: Set<number>
  onSelect: (ch: Chapter) => void
}

export default function ChapterGrid({ isOpen, onClose, title, chapters, activeChapterNum, completedNums, onSelect }: Props) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex flex-col justify-end sm:hidden" onClick={onClose}>
      <div
        className="bg-stone-50 dark:bg-[#22242C] rounded-t-2xl border-t border-stone-200 dark:border-[#2E3240] shadow-2xl"
        style={{ maxHeight: '60vh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Handle + title */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2 shrink-0">
          <p className="text-sm font-semibold text-stone-500 dark:text-[#E4DDD0]">{title}</p>
          <button
            onClick={onClose}
            className="text-stone-300 dark:text-[#6B6460] text-lg leading-none px-1"
          >
            ×
          </button>
        </div>

        {/* Chapter grid */}
        <div className="overflow-y-auto px-4 pb-6 pt-1">
          <div className="flex flex-wrap gap-2">
            {chapters.map(ch => {
              const active = ch.number === activeChapterNum
              const done = completedNums.has(ch.number)
              return (
                <button
                  key={ch.number}
                  onClick={() => { onSelect(ch); onClose() }}
                  className={`relative w-10 h-10 rounded-lg text-sm font-medium transition-colors
                    ${active
                      ? 'bg-sage dark:bg-sage-dark text-white dark:text-[#17191E]'
                      : done
                      ? 'bg-stone-100 dark:bg-[#2E3240] text-stone-400 dark:text-[#A09890] ring-1 ring-sage/40 dark:ring-sage-dark/40'
                      : 'bg-stone-100 dark:bg-[#2E3240] text-stone-400 dark:text-[#A09890] hover:bg-stone-200 dark:hover:bg-[#17191E]'
                    }`}
                >
                  {ch.number}
                  {done && !active && (
                    <span className="absolute bottom-0.5 right-0.5 text-[7px] text-sage dark:text-sage-dark leading-none">✓</span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

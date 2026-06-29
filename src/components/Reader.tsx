import { useEffect, useRef } from 'react'
import type { Chapter } from '../types'

interface Props {
  chapter: Chapter | null
  fontSize: string
  onPrevChapter: () => void
  onNextChapter: () => void
  hasPrev: boolean
  hasNext: boolean
}

export default function Reader({ chapter, fontSize, onPrevChapter, onNextChapter, hasPrev, hasNext }: Props) {
  const topRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    topRef.current?.parentElement?.scrollTo(0, 0)
  }, [chapter])

  if (!chapter) {
    return (
      <div className="flex-1 flex items-center justify-center text-parchment-300 dark:text-[#3A3028]">
        請從左側選擇書卷與章節
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-[680px] mx-auto px-10 pt-16 pb-24">
        <div ref={topRef} />
        <div
          className={`${fontSize} text-parchment-500 dark:text-[#EDE0C4]`}
          style={{ lineHeight: '2.1', letterSpacing: '0.02em' }}
        >
          {chapter.verses.map(v => (
            <p key={v.number} className="flex gap-3 group py-0.5">
              <span
                className="text-gold dark:text-gold-dark shrink-0 select-none mt-1"
                style={{ fontSize: '11px', fontWeight: 400, opacity: 0.5, minWidth: '2rem', textAlign: 'right', lineHeight: '2.1' }}
              >
                {v.number}
              </span>
              <span className="flex-1">{v.text}</span>
            </p>
          ))}
        </div>

        {/* Chapter navigation */}
        <div className="flex justify-between items-center mt-16 pt-6 border-t border-parchment-200 dark:border-[#3A3028]">
          <button
            onClick={onPrevChapter}
            disabled={!hasPrev}
            className={`flex items-center gap-1.5 px-4 py-2 rounded text-sm transition-colors
              ${hasPrev
                ? 'text-parchment-400 dark:text-[#A8906E] hover:bg-parchment-100 dark:hover:bg-[#2E261E] border border-parchment-200 dark:border-[#3A3028]'
                : 'text-parchment-200 dark:text-[#3A3028] cursor-not-allowed'
              }`}
          >
            <span>←</span>
            <span>上一章</span>
          </button>
          <button
            onClick={onNextChapter}
            disabled={!hasNext}
            className={`flex items-center gap-1.5 px-4 py-2 rounded text-sm transition-colors
              ${hasNext
                ? 'text-parchment-400 dark:text-[#A8906E] hover:bg-parchment-100 dark:hover:bg-[#2E261E] border border-parchment-200 dark:border-[#3A3028]'
                : 'text-parchment-200 dark:text-[#3A3028] cursor-not-allowed'
              }`}
          >
            <span>下一章</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

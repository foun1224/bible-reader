import { useEffect, useRef } from 'react'
import type { Chapter } from '../types'

interface Props {
  chapter: Chapter | null
  fontSize: string
  onPrevChapter: () => void
  onNextChapter: () => void
  hasPrev: boolean
  hasNext: boolean
  chapterTitle: string
}

export default function Reader({ chapter, fontSize, onPrevChapter, onNextChapter, hasPrev, hasNext, chapterTitle }: Props) {
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
    <div className="flex-1 overflow-y-auto relative">
      <div className="max-w-[680px] mx-auto px-10 pt-16 pb-32 sm:pb-24">
        <div ref={topRef} />
        <div
          className={`${fontSize} text-parchment-500 dark:text-[#EDE0C4]`}
          style={{ lineHeight: '2.1', letterSpacing: '0.02em' }}
        >
          {chapter.verses.map(v => (
            <p key={v.number} className="py-0.5 group">
              <sup
                className="text-gold dark:text-gold-dark select-none mr-0.5"
                style={{ fontSize: '9px', fontWeight: 400, opacity: 0.35, verticalAlign: 'super' }}
              >
                {v.number}
              </sup>
              {v.text}
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

      {/* Mobile bottom nav bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 bg-parchment-50/95 dark:bg-[#1A1410]/95 backdrop-blur-sm border-t border-parchment-200 dark:border-[#3A3028]">
        <button
          onClick={onPrevChapter}
          disabled={!hasPrev}
          className={`flex items-center gap-1 px-3 py-2 rounded text-sm transition-colors
            ${hasPrev
              ? 'text-parchment-400 dark:text-[#A8906E] hover:bg-parchment-100 dark:hover:bg-[#2E261E] border border-parchment-200 dark:border-[#3A3028]'
              : 'text-parchment-200 dark:text-[#3A3028] cursor-not-allowed'
            }`}
        >
          <span>←</span>
          <span>上一章</span>
        </button>
        <span className="text-xs text-parchment-400 dark:text-[#A8906E] font-medium">{chapterTitle}</span>
        <button
          onClick={onNextChapter}
          disabled={!hasNext}
          className={`flex items-center gap-1 px-3 py-2 rounded text-sm transition-colors
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
  )
}

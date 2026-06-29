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
  onMarkComplete: () => void
  isCompleted: boolean
  // Resume CTA
  showResumeCTA: boolean
  resumeBookName: string
  resumeChapter: number
  onDismissResumeCTA: () => void
  // Completion overlay
  showCompletionOverlay: boolean
  // Scroll progress callback (lifted to App)
  onScrollProgress: (v: number) => void
}

export default function Reader({
  chapter, fontSize, onPrevChapter, onNextChapter, hasPrev, hasNext, chapterTitle,
  onMarkComplete, isCompleted,
  showResumeCTA, resumeBookName, resumeChapter, onDismissResumeCTA,
  showCompletionOverlay, onScrollProgress,
}: Props) {
  const topRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Reset scroll and progress when chapter changes
  useEffect(() => {
    onScrollProgress(0)
    scrollRef.current?.scrollTo(0, 0)
  }, [chapter])

  // Track scroll progress — report to parent via callback
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el
      const max = scrollHeight - clientHeight
      onScrollProgress(max > 0 ? scrollTop / max : 0)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const handleResumeCTA = () => {
    onDismissResumeCTA()
    scrollRef.current?.scrollTo(0, 0)
  }

  if (!chapter) {
    return (
      <div className="flex-1 flex items-center justify-center text-parchment-300 dark:text-[#3A3028]">
        請從左側選擇書卷與章節
      </div>
    )
  }

  // Estimated reading time
  const totalChars = chapter.verses.reduce((sum, v) => sum + v.text.length, 0)
  const readingMins = Math.ceil(totalChars / 300)

  const completeBtn = (
    <button
      onClick={onMarkComplete}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-colors border
        ${isCompleted
          ? 'border-green-400/60 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 cursor-default'
          : 'border-parchment-200 dark:border-[#3A3028] text-parchment-400 dark:text-[#A8906E] hover:bg-parchment-100 dark:hover:bg-[#2E261E]'
        }`}
      title={isCompleted ? '已完成' : '標記本章為完成'}
      disabled={isCompleted}
    >
      <span>{isCompleted ? '✓' : '○'}</span>
      <span className="hidden sm:inline">{isCompleted ? '已完成' : '完成本章'}</span>
    </button>
  )

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto relative">
      {/* Completion full-screen overlay */}
      {showCompletionOverlay && (
        <div className="fixed inset-0 z-50 bg-black/60 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-8xl mb-4 animate-pop-in">✓</div>
          <div className="text-2xl font-bold text-white">{chapterTitle}</div>
          <div className="text-parchment-200 mt-2 text-sm">章節完成</div>
        </div>
      )}

      {/* Scroll progress bar moved to toolbar (App.tsx G4) */}

      <div className="max-w-[680px] mx-auto px-10 pt-8 pb-32 sm:pb-24">
        <div ref={topRef} />

        {/* Resume CTA */}
        {showResumeCTA && (
          <div className="mb-6 flex items-center justify-between rounded-lg border border-[#8B6418]/30 dark:border-[#C9A84C]/30 bg-[#8B6418]/10 dark:bg-[#C9A84C]/10 px-4 py-3">
            <div>
              <p className="text-xs font-medium text-parchment-300 dark:text-[#A8906E] mb-0.5">📖 繼續上次閱讀</p>
              <p className="text-sm text-parchment-500 dark:text-[#EDE0C4]">
                {resumeBookName} · 第 {resumeChapter} 章
              </p>
            </div>
            <button
              onClick={handleResumeCTA}
              className="ml-4 shrink-0 px-3 py-1.5 text-xs rounded border border-[#8B6418]/40 dark:border-[#C9A84C]/40 text-[#8B6418] dark:text-[#C9A84C] hover:bg-[#8B6418]/10 dark:hover:bg-[#C9A84C]/10 transition-colors font-medium"
            >
              繼續閱讀 →
            </button>
          </div>
        )}

        {/* Estimated reading time */}
        {(() => {
          return (
            <div className="text-xs text-parchment-300 dark:text-[#5A4838] mb-6 text-right">
              約 {readingMins} 分鐘
            </div>
          )
        })()}

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

        {/* Chapter navigation + complete button */}
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

          {/* Complete button — desktop center */}
          <div className="hidden sm:flex">
            {completeBtn}
          </div>

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

        {/* Complete button — mobile center */}
        {completeBtn}

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

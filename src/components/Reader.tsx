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
  // Immersive mode
  isImmersive: boolean
  onToggleImmersive: () => void
}

export default function Reader({
  chapter, fontSize, onPrevChapter, onNextChapter, hasPrev, hasNext, chapterTitle,
  onMarkComplete, isCompleted,
  showResumeCTA, resumeBookName, resumeChapter, onDismissResumeCTA,
  showCompletionOverlay, onScrollProgress,
  isImmersive, onToggleImmersive,
}: Props) {
  const topRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const touchStartY = useRef<number>(0)

  // Reset scroll and progress when chapter changes
  useEffect(() => {
    onScrollProgress(0)
    scrollRef.current?.scrollTo(0, 0)
  }, [chapter])

  // Scroll to top when entering immersive mode
  useEffect(() => {
    if (isImmersive) {
      scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [isImmersive])

  // Touch gesture: swipe up > 80px to exit immersive
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }
    const onTouchEnd = (e: TouchEvent) => {
      if (!isImmersive) return
      const deltaY = touchStartY.current - e.changedTouches[0].clientY
      if (deltaY > 80) {
        onToggleImmersive()
      }
    }
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [isImmersive, onToggleImmersive])

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
      <div className="flex-1 flex items-center justify-center text-stone-300 dark:text-[#2E3240]">
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
          : 'border-stone-200 dark:border-[#2E3240] text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#22242C]'
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
          <div className="text-stone-200 mt-2 text-sm">章節完成</div>
        </div>
      )}

      {/* Immersive exit button */}
      {isImmersive && (
        <button
          onClick={onToggleImmersive}
          className="fixed top-4 right-4 z-50 w-8 h-8 rounded-full flex items-center justify-center bg-stone-200/40 hover:bg-stone-200/80 dark:bg-stone-700/40 dark:hover:bg-stone-700/80 transition-colors text-stone-500 dark:text-stone-300"
          title="退出沈浸模式（快捷鍵 F）"
          aria-label="退出沈浸模式"
        >
          <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
            <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      )}

      {/* Scroll progress bar moved to toolbar (App.tsx G4) */}

      <div className={`mx-auto px-8 pt-16 pb-32 sm:pb-24 transition-all duration-300 ${isImmersive ? 'max-w-[720px] sm:px-16' : 'max-w-[680px] px-10 pt-8'}`}>
        <div ref={topRef} />

        {/* Immersive watermark */}
        {isImmersive && (
          <div className="text-center mb-8 select-none pointer-events-none">
            <span className="text-sm text-stone-400 dark:text-stone-500 opacity-10 tracking-widest">
              {chapterTitle}
            </span>
          </div>
        )}

        {/* Resume CTA */}
        {showResumeCTA && (
          <div className="mb-6 flex items-center justify-between rounded-lg border border-[#4F7358]/30 dark:border-[#7AAF87]/30 bg-[#4F7358]/10 dark:bg-[#7AAF87]/10 px-4 py-3">
            <div>
              <p className="text-xs font-medium text-stone-300 dark:text-[#A09890] mb-0.5">📖 繼續上次閱讀</p>
              <p className="text-sm text-stone-500 dark:text-[#E4DDD0]">
                {resumeBookName} · 第 {resumeChapter} 章
              </p>
            </div>
            <button
              onClick={handleResumeCTA}
              className="ml-4 shrink-0 px-3 py-1.5 text-xs rounded border border-[#4F7358]/40 dark:border-[#7AAF87]/40 text-[#4F7358] dark:text-[#7AAF87] hover:bg-[#4F7358]/10 dark:hover:bg-[#7AAF87]/10 transition-colors font-medium"
            >
              繼續閱讀 →
            </button>
          </div>
        )}

        {/* Estimated reading time */}
        {(() => {
          return (
            <div className="text-xs text-stone-300 dark:text-[#6B6460] mb-6 text-right">
              約 {readingMins} 分鐘
            </div>
          )
        })()}

        <div
          className={`${isImmersive ? 'text-xl leading-9' : fontSize} text-stone-500 dark:text-[#E4DDD0]`}
          style={{ letterSpacing: '0.02em', lineHeight: isImmersive ? undefined : '2.1' }}
        >
          {chapter.verses.map(v => (
            <p key={v.number} className="py-0.5 group">
              <sup
                className="text-sage dark:text-sage-dark select-none mr-0.5"
                style={{ fontSize: '9px', fontWeight: 400, opacity: 0.35, verticalAlign: 'super' }}
              >
                {v.number}
              </sup>
              {v.text}
            </p>
          ))}
        </div>

        {/* Chapter navigation + complete button */}
        <div className={`flex justify-between items-center mt-16 pt-6 border-t border-stone-200 dark:border-[#2E3240] ${isImmersive ? 'hidden' : ''}`}>
          <button
            onClick={onPrevChapter}
            disabled={!hasPrev}
            className={`flex items-center gap-1.5 px-4 py-2 rounded text-sm transition-colors
              ${hasPrev
                ? 'text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#22242C] border border-stone-200 dark:border-[#2E3240]'
                : 'text-stone-200 dark:text-[#2E3240] cursor-not-allowed'
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
                ? 'text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#22242C] border border-stone-200 dark:border-[#2E3240]'
                : 'text-stone-200 dark:text-[#2E3240] cursor-not-allowed'
              }`}
          >
            <span>下一章</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Mobile bottom nav bar */}
      <div className={`${isImmersive ? 'hidden' : 'sm:hidden'} fixed bottom-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 bg-stone-50/95 dark:bg-[#17191E]/95 backdrop-blur-sm border-t border-stone-200 dark:border-[#2E3240]`}>
        <button
          onClick={onPrevChapter}
          disabled={!hasPrev}
          className={`flex items-center gap-1 px-3 py-2 rounded text-sm transition-colors
            ${hasPrev
              ? 'text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#22242C] border border-stone-200 dark:border-[#2E3240]'
              : 'text-stone-200 dark:text-[#2E3240] cursor-not-allowed'
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
              ? 'text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#22242C] border border-stone-200 dark:border-[#2E3240]'
              : 'text-stone-200 dark:text-[#2E3240] cursor-not-allowed'
            }`}
        >
          <span>下一章</span>
          <span>→</span>
        </button>
      </div>
    </div>
  )
}

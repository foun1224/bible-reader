import { useEffect, useRef, useState } from 'react'
import type { Chapter, Highlight } from '../types'

type HighlightColor = 'yellow' | 'red' | 'green' | 'blue'

const COLOR_BG: Record<HighlightColor, string> = {
  yellow: 'bg-amber-50/90 dark:bg-amber-950/25',
  red: 'bg-red-50/80 dark:bg-red-950/20',
  green: 'bg-green-50/80 dark:bg-green-950/20',
  blue: 'bg-blue-50/80 dark:bg-blue-950/20',
}

const COLOR_DOT: Record<HighlightColor, string> = {
  yellow: 'text-amber-400',
  red: 'text-red-400',
  green: 'text-green-400',
  blue: 'text-blue-400',
}

const COLOR_SWATCH: Record<HighlightColor, string> = {
  yellow: 'bg-amber-300',
  red: 'bg-red-400',
  green: 'bg-green-400',
  blue: 'bg-blue-400',
}

interface Props {
  chapter: Chapter | null
  fontSize: string
  onPrevChapter: () => void
  onNextChapter: () => void
  hasPrev: boolean
  hasNext: boolean
  chapterTitle: string
  bookName: string
  onMarkComplete: () => void
  isCompleted: boolean
  // Resume CTA
  showResumeCTA: boolean
  resumeBookName: string
  resumeChapter: number
  onDismissResumeCTA: () => void
  // Scroll progress callback (lifted to App)
  onScrollProgress: (v: number) => void
  // Immersive mode
  isImmersive: boolean
  onToggleImmersive: () => void
  // Highlights
  highlights: Highlight[]
  onHighlight: (h: Highlight) => void
  onRemoveHighlight: (sourceId: string, bookId: number | undefined, chapter: number, verse: number) => void
  currentSource: 'ckjv' | 'jasher'
  currentBookId: number | undefined
}

interface PickerState {
  verse: number
  verseText: string
}

export default function Reader({
  chapter, fontSize, onPrevChapter, onNextChapter, hasPrev, hasNext, chapterTitle, bookName,
  onMarkComplete, isCompleted,
  showResumeCTA, resumeBookName, resumeChapter, onDismissResumeCTA,
  onScrollProgress,
  isImmersive, onToggleImmersive,
  highlights, onHighlight, onRemoveHighlight,
  currentSource, currentBookId,
}: Props) {
  const topRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const touchStartY = useRef<number>(0)
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [picker, setPicker] = useState<PickerState | null>(null)
  const [pickerColor, setPickerColor] = useState<HighlightColor>('yellow')
  const [pickerNote, setPickerNote] = useState('')
  const [copied, setCopied] = useState(false)

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

  const openPicker = (verseNumber: number, verseText: string) => {
    const existing = highlights.find(h => h.verse === verseNumber)
    setPickerColor(existing?.color ?? 'yellow')
    setPickerNote(existing?.note ?? '')
    setPicker({ verse: verseNumber, verseText })
  }

  const closePicker = () => {
    setPicker(null)
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
  }

  const handleSave = () => {
    if (!picker || !chapter) return
    const verseObj = chapter.verses.find(v => v.number === picker.verse)
    const h: Highlight = {
      id: `${currentSource}-${currentBookId ?? 'j'}-${chapter.number}-${picker.verse}-${Date.now()}`,
      sourceId: currentSource,
      bookId: currentBookId,
      chapter: chapter.number,
      verse: picker.verse,
      color: pickerColor,
      note: pickerNote,
      highlightText: verseObj?.text ?? '',
      createdAt: new Date().toISOString(),
    }
    onHighlight(h)
    closePicker()
  }

  const handleRemove = () => {
    if (!picker || !chapter) return
    onRemoveHighlight(currentSource, currentBookId, chapter.number, picker.verse)
    closePicker()
  }

  const getVerseShareText = () => {
    if (!picker || !chapter) return { title: '', text: '' }
    const label = currentSource === 'ckjv' ? '（CKJV）' : '（雅煞珥書）'
    const text = `「${picker.verseText}」\n${bookName} 第 ${chapter.number}章第 ${picker.verse}節${label}`
    const title = `${bookName} ${chapter.number}:${picker.verse}`
    return { title, text }
  }

  const handleCopy = () => {
    const { text } = getVerseShareText()
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1000)
    })
  }

  const handleShare = () => {
    const { title, text } = getVerseShareText()
    if (navigator.share) {
      navigator.share({ title, text })
    } else {
      handleCopy()
    }
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

  const existingHighlight = picker ? highlights.find(h => h.verse === picker.verse) : null

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto relative">
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

      {/* Highlight Picker Backdrop */}
      {picker && (
        <div
          className="fixed inset-0 z-30 bg-black/30"
          onClick={closePicker}
        />
      )}

      {/* Highlight Picker Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 bg-stone-50 dark:bg-[#22242C] rounded-t-2xl shadow-2xl transition-transform duration-300 ${picker ? 'translate-y-0' : 'translate-y-full'}`}
      >
        {picker && (
          <div className="px-5 pt-4 pb-8 max-w-lg mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-stone-500 dark:text-[#E4DDD0]">
                第 {picker.verse} 節
              </span>
              <button
                onClick={closePicker}
                className="p-1.5 rounded-full text-stone-400 hover:bg-stone-100 dark:hover:bg-[#2E3240] transition-colors"
                aria-label="關閉"
              >
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                  <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-stone-200 dark:border-[#2E3240] mb-3" />

            {/* Verse preview */}
            <p className="text-xs text-stone-400 dark:text-[#A09890] mb-4 line-clamp-2 leading-relaxed">
              「{picker.verseText.slice(0, 40)}{picker.verseText.length > 40 ? '…' : ''}」
            </p>

            {/* Color swatches + remove button */}
            <div className="flex items-center gap-3 mb-4">
              {(['yellow', 'red', 'green', 'blue'] as HighlightColor[]).map(c => (
                <button
                  key={c}
                  onClick={() => setPickerColor(c)}
                  className={`w-8 h-8 rounded-full ${COLOR_SWATCH[c]} transition-all ${pickerColor === c ? 'ring-2 ring-offset-2 ring-stone-400 dark:ring-stone-500 scale-110' : 'opacity-70 hover:opacity-100'}`}
                  aria-label={c}
                />
              ))}
              {existingHighlight && (
                <button
                  onClick={handleRemove}
                  className="ml-auto text-xs text-red-400 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 border border-red-200 dark:border-red-800/50 rounded px-2 py-1 transition-colors"
                >
                  移除劃線
                </button>
              )}
            </div>

            {/* Note textarea */}
            <label className="block text-xs text-stone-400 dark:text-[#A09890] mb-1.5">
              筆記（選填）
            </label>
            <textarea
              rows={3}
              value={pickerNote}
              onChange={e => setPickerNote(e.target.value)}
              placeholder="寫下你的感動..."
              className="w-full rounded-lg border border-stone-200 dark:border-[#2E3240] bg-white dark:bg-[#17191E] text-stone-500 dark:text-[#E4DDD0] text-sm px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-stone-300 dark:focus:ring-[#4F7358] placeholder-stone-300 dark:placeholder-[#6B6460]"
            />

            {/* Copy / Share / Save buttons */}
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={handleCopy}
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-stone-200 dark:border-[#2E3240] text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#2E3240] transition-colors"
              >
                {copied ? '✓ 已複製' : '複製經文'}
              </button>
              <button
                onClick={handleShare}
                className={`flex-1 px-3 py-2 text-sm rounded-lg border border-stone-200 dark:border-[#2E3240] text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#2E3240] transition-colors ${typeof navigator !== 'undefined' && !navigator.share ? 'hidden' : ''}`}
              >
                分享經文
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-3 py-2 text-sm rounded-lg bg-[#4F7358] dark:bg-[#7AAF87] text-white dark:text-[#17191E] font-medium hover:opacity-90 transition-opacity"
              >
                儲存
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Scroll progress bar moved to toolbar (App.tsx G4) */}

      <div className={`mx-auto px-6 pt-16 pb-32 sm:pb-24 transition-all duration-300 ${isImmersive ? 'max-w-[720px] sm:px-16' : 'max-w-[680px] sm:px-10 pt-8'}`}>
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
          style={{ letterSpacing: '0.02em', lineHeight: isImmersive ? undefined : '1.9' }}
        >
          {chapter.verses.map(v => {
            const hl = highlights.find(h => h.verse === v.number)
            return (
              <p
                key={v.number}
                className="py-0.5 group"
                onPointerDown={() => {
                  longPressTimer.current = setTimeout(() => openPicker(v.number, v.text), 500)
                }}
                onPointerUp={() => {
                  if (longPressTimer.current) {
                    clearTimeout(longPressTimer.current)
                    longPressTimer.current = null
                  }
                }}
                onPointerLeave={() => {
                  if (longPressTimer.current) {
                    clearTimeout(longPressTimer.current)
                    longPressTimer.current = null
                  }
                }}
              >
                <sup
                  className="text-sage dark:text-sage-dark select-none mr-0.5 opacity-35 group-hover:opacity-60 transition-opacity duration-150"
                  style={{ fontSize: '9px', fontWeight: 400, verticalAlign: 'super' }}
                >
                  {v.number}
                </sup>
                {hl && (
                  <span className={`mr-0.5 ${COLOR_DOT[hl.color]}`} title={hl.note || undefined}>•</span>
                )}
                {/* Bookmark icon tap target */}
                <button
                  onClick={e => { e.stopPropagation(); openPicker(v.number, v.text) }}
                  className="opacity-0 group-hover:opacity-40 hover:!opacity-100 focus:opacity-100 transition-opacity mr-1 align-middle text-stone-400 dark:text-[#A09890]"
                  style={{ fontSize: '10px', lineHeight: 1 }}
                  aria-label={`標記第 ${v.number} 節`}
                  tabIndex={-1}
                >
                  🔖
                </button>
                <span className={hl ? `rounded ${COLOR_BG[hl.color]}` : ''}>
                  {v.text}
                </span>
              </p>
            )
          })}
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

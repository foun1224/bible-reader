import { useState, useEffect } from 'react'

interface Props {
  chapterLabel: string
  bookName?: string
  hasNext: boolean
  onContinue: () => void
  onDismiss: () => void
}

export default function CompletionBanner({ chapterLabel, bookName, hasNext, onContinue, onDismiss }: Props) {
  const [phase, setPhase] = useState<'celebrate' | 'offer'>('celebrate')

  useEffect(() => {
    const t = setTimeout(() => setPhase('offer'), bookName ? 1800 : 1200)
    return () => clearTimeout(t)
  }, [bookName])

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
      <div className="relative mx-4 w-full max-w-sm rounded-2xl px-6 py-8 text-center shadow-2xl bg-stone-50 dark:bg-[#211D19] border border-stone-200 dark:border-[#3A332D]">
        {phase === 'celebrate' && (
          <div className="animate-fadeInScale">
            <div className="text-5xl mb-4 animate-bounceOnce">{bookName ? '🎉' : '✅'}</div>
            <p className="text-sm text-stone-300 dark:text-[#A09890] mb-1">{chapterLabel}</p>
            {bookName ? (
              <>
                <p className="text-xl font-semibold text-celebration dark:text-celebration-dark mb-1">{bookName} 讀完了！</p>
                <p className="text-sm text-stone-400 dark:text-[#A09890]">恭喜完成整卷書卷</p>
              </>
            ) : (
              <p className="text-xl font-semibold text-sage dark:text-sage-dark">章節完成！</p>
            )}
          </div>
        )}
        {phase === 'offer' && (
          <div className="animate-slideUp">
            <div className="text-4xl mb-4">{bookName ? '🎉' : '✅'}</div>
            <p className="text-sm text-stone-300 dark:text-[#A09890] mb-1">{chapterLabel}</p>
            <p className="text-base font-semibold text-stone-500 dark:text-[#EEE6DC] mb-6">
              {bookName ? `${bookName} 讀完了！` : '章節完成！'}
            </p>
            <div className="flex flex-col gap-2">
              {hasNext && (
                <button
                  onClick={onContinue}
                  className="w-full py-2.5 rounded-lg text-sm font-medium bg-sage dark:bg-sage-dark text-white dark:text-[#171411] hover:opacity-90 transition-opacity"
                >
                  繼續下一章 →
                </button>
              )}
              <button
                onClick={onDismiss}
                className="w-full py-2.5 rounded-lg text-sm text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#3A332D] transition-colors"
              >
                留在此章
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

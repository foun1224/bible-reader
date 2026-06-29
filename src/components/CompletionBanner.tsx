import { useState, useEffect, useRef } from 'react'

const CLOSING_VERSES = [
  { text: '你的話是我腳前的燈，是我路上的光。', ref: '詩篇 119:105' },
  { text: '你們尋求我，若專心尋求我，就必尋見。', ref: '耶利米書 29:13' },
  { text: '我靠著那加給我力量的，凡事都能做。', ref: '腓立比書 4:13' },
  { text: '凡事謝恩，因為這是神在基督耶穌裏向你們所定的旨意。', ref: '帖撒羅尼迦前書 5:18' },
  { text: '人活著不是單靠食物，乃是靠神口裏所出的一切話。', ref: '馬太福音 4:4' },
  { text: '你要用心保守，因為生命的泉源由此而出。', ref: '箴言 4:23' },
  { text: '凡你們做什麼，都要從心裏做，像是給主做的，不是給人做的。', ref: '歌羅西書 3:23' },
  { text: '我是葡萄樹，你們是枝子；常在我裏面的，我也常在他裏面，這人就多結果子。', ref: '約翰福音 15:5' },
  { text: '要思念那些真實的、可敬的、公義的、清潔的、可愛的事。', ref: '腓立比書 4:8' },
  { text: '愛是恆久忍耐，又有恩慈；愛是不嫉妒，不自誇，不張狂。', ref: '哥林多前書 13:4' },
  { text: '你要倚靠耶和華而行善，住在地上，以他的信實為糧。', ref: '詩篇 37:3' },
  { text: '你所積蓄的，心也在那裏。', ref: '馬太福音 6:21' },
]

interface Props {
  chapterLabel: string
  bookName?: string
  hasNext: boolean
  onContinue: () => void
  onDismiss: () => void
}

export default function CompletionBanner({ chapterLabel, bookName, hasNext, onContinue, onDismiss }: Props) {
  const [phase, setPhase] = useState<'celebrate' | 'offer'>('celebrate')
  const closingVerse = useRef(CLOSING_VERSES[Math.floor(Math.random() * CLOSING_VERSES.length)]).current

  useEffect(() => {
    const t = setTimeout(() => setPhase('offer'), bookName ? 1800 : 1200)
    return () => clearTimeout(t)
  }, [bookName])

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
      <div className="relative mx-4 w-full max-w-sm rounded-2xl px-6 py-8 text-center shadow-2xl bg-stone-50 dark:bg-[#22242C] border border-stone-200 dark:border-[#2E3240]">
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
            <p className="text-base font-semibold text-stone-500 dark:text-[#E4DDD0] mb-4">
              {bookName ? `${bookName} 讀完了！` : '章節完成！'}
            </p>
            <div className="mb-5 px-3 py-3 rounded-lg bg-amber-50/60 dark:bg-amber-950/20 border-l-2 border-amber-300 dark:border-amber-600 text-left">
              <p className="text-sm text-stone-500 dark:text-[#E4DDD0] leading-relaxed italic">「{closingVerse.text}」</p>
              <p className="text-xs text-stone-300 dark:text-[#6B6460] mt-1">— {closingVerse.ref}</p>
            </div>
            <div className="flex flex-col gap-2">
              {hasNext && (
                <button
                  onClick={onContinue}
                  className="w-full py-2.5 rounded-lg text-sm font-medium bg-sage dark:bg-sage-dark text-white dark:text-[#17191E] hover:opacity-90 transition-opacity"
                >
                  繼續下一章 →
                </button>
              )}
              <button
                onClick={onDismiss}
                className="w-full py-2.5 rounded-lg text-sm text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#2E3240] transition-colors"
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

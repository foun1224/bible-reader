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
  const [expanded, setExpanded] = useState(false)
  const [visible, setVisible] = useState(true)
  const closingVerse = useRef(CLOSING_VERSES[Math.floor(Math.random() * CLOSING_VERSES.length)]).current

  useEffect(() => {
    const t = setTimeout(() => setExpanded(true), 400)
    return () => clearTimeout(t)
  }, [])

  if (!visible) return null

  const dismiss = () => {
    setVisible(false)
    onDismiss()
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[80] sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-sm pointer-events-none px-0 sm:px-0">
      <div
        className={`pointer-events-auto mx-3 mb-3 sm:mx-0 sm:mb-0 rounded-2xl shadow-2xl border border-stone-200 dark:border-[#2E3240] bg-stone-50 dark:bg-[#22242C] overflow-hidden transition-all duration-500 ${expanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        {/* Top row */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="text-lg">{bookName ? '🎉' : '✅'}</span>
            <div>
              <p className="text-sm font-medium text-stone-600 dark:text-[#E4DDD0]">
                {bookName ? `${bookName} 讀完了！` : '已記錄'}
              </p>
              <p className="text-[11px] text-stone-300 dark:text-[#6B6460]">{chapterLabel}</p>
            </div>
          </div>
          <button
            onClick={dismiss}
            className="p-1.5 rounded-full text-stone-300 dark:text-[#6B6460] hover:bg-stone-100 dark:hover:bg-[#2E3240] transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Closing verse */}
        <div className="px-4 pb-3 border-t border-stone-100 dark:border-[#2E3240] pt-3">
          <p className="text-xs text-stone-400 dark:text-[#A09890] leading-relaxed italic">「{closingVerse.text}」</p>
          <p className="text-[10px] text-stone-300 dark:text-[#6B6460] mt-0.5">— {closingVerse.ref}</p>
        </div>

        {/* Actions */}
        {hasNext && (
          <div className="px-4 pb-4">
            <button
              onClick={() => { dismiss(); onContinue() }}
              className="w-full py-2 rounded-lg text-sm font-medium bg-sage dark:bg-sage-dark text-white dark:text-[#17191E] hover:opacity-90 transition-opacity"
            >
              繼續下一章 →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

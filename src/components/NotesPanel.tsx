import type { Highlight, BibleData } from '../types'

interface Props {
  isOpen: boolean
  onClose: () => void
  highlights: Highlight[]
  ckjv: BibleData | null
  onJumpTo: (sourceId: 'ckjv' | 'jasher', bookId: number | undefined, chapter: number) => void
}

const COLOR_DOT: Record<string, string> = {
  yellow: 'bg-yellow-400',
  red: 'bg-red-400',
  green: 'bg-green-400',
  blue: 'bg-blue-400',
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('zh-TW', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function NotesPanel({ isOpen, onClose, highlights, ckjv, onJumpTo }: Props) {
  const sorted = [...highlights].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <div
      className={`fixed top-0 right-0 z-50 h-full overflow-y-auto bg-stone-50 dark:bg-[#22242C] border-l border-stone-200 dark:border-[#2E3240] transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      style={{ width: 'min(100vw, 420px)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 dark:border-[#2E3240] sticky top-0 bg-stone-50 dark:bg-[#22242C] z-10">
        <span className="text-sm font-semibold text-stone-600 dark:text-[#E4DDD0]">📝 我的筆記</span>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#2E3240] transition-colors"
          aria-label="關閉"
        >
          <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
            <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="px-4 py-4 space-y-3">
        {sorted.length === 0 ? (
          <p className="text-center text-sm text-stone-300 dark:text-[#6B6460] py-12">尚無劃線記錄</p>
        ) : (
          sorted.map(h => {
            const bookName =
              h.sourceId === 'jasher'
                ? '雅煞珥書'
                : ckjv?.books.find(b => b.id === h.bookId)?.name ?? '未知'
            const preview = h.highlightText.slice(0, 50) + (h.highlightText.length > 50 ? '…' : '')

            return (
              <div
                key={h.id}
                className="rounded-xl border border-stone-200 dark:border-[#2E3240] bg-white dark:bg-[#17191E] px-4 py-3 space-y-1.5"
              >
                {/* Top row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`w-3 h-3 rounded-full shrink-0 ${COLOR_DOT[h.color]}`} />
                    <span className="text-xs text-stone-500 dark:text-[#E4DDD0] truncate">
                      {bookName} · 第 {h.chapter} 章第 {h.verse} 節
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      onJumpTo(h.sourceId, h.bookId, h.chapter)
                      onClose()
                    }}
                    className="shrink-0 text-xs text-[#4F7358] dark:text-[#7AAF87] hover:underline whitespace-nowrap"
                  >
                    跳到 →
                  </button>
                </div>

                {/* Verse preview */}
                <p className="text-xs text-stone-400 dark:text-[#A09890] leading-relaxed">
                  「{preview}」
                </p>

                {/* Note */}
                {h.note && (
                  <p className="text-xs text-stone-500 dark:text-[#E4DDD0] leading-relaxed">{h.note}</p>
                )}

                {/* Date */}
                <p className="text-[10px] text-stone-300 dark:text-[#6B6460]">{formatDate(h.createdAt)}</p>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

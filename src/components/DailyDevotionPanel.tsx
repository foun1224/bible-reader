import { useState, useEffect } from 'react'
import type { BibleData, Book } from '../types'
import { fetchDevotion, todayMmdd, type DevotionData } from '../lib/fetchDevotion'

interface Props {
  isOpen: boolean
  onClose: () => void
  ckjv: BibleData | null
  onJumpTo: (sourceId: 'ckjv' | 'jasher', bookId: number | undefined, chapter: number) => void
}

export default function DailyDevotionPanel({ isOpen, onClose, ckjv, onJumpTo }: Props) {
  const [devotion, setDevotion] = useState<DevotionData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [openSection, setOpenSection] = useState<'obs' | 'resp' | 'pray' | null>('obs')

  useEffect(() => {
    if (!isOpen || devotion) return
    setLoading(true)
    setError(null)
    fetchDevotion(todayMmdd())
      .then(data => setDevotion(data))
      .catch(() => setError('無法載入今日靈修，請稍後再試'))
      .finally(() => setLoading(false))
  }, [isOpen])

  const findBook = (chineseName: string): Book | undefined =>
    ckjv?.books.find(b => b.name === chineseName)

  const handleScripture = (chineseName: string, chapter: number) => {
    const book = findBook(chineseName)
    if (book) {
      onJumpTo('ckjv', book.id as number, chapter)
      onClose()
    }
  }

  const mm = todayMmdd().slice(0, 2)
  const dd = todayMmdd().slice(2, 4)
  const dateLabel = `${parseInt(mm)} 月 ${parseInt(dd)} 日`

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full flex flex-col bg-stone-50 dark:bg-[#22242C] border-l border-stone-200 dark:border-[#2E3240] transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ width: 'min(100vw, 400px)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 dark:border-[#2E3240] shrink-0">
          <div>
            <p className="text-xs text-stone-300 dark:text-[#A09890] mb-0.5">跟隨耶穌 · 每日靈修</p>
            <p className="text-sm font-semibold text-stone-500 dark:text-[#E4DDD0]">{dateLabel}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#2E3240] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {loading && (
            <div className="flex items-center justify-center h-40 text-stone-300 dark:text-[#A09890] text-sm">
              載入中…
            </div>
          )}

          {error && (
            <div className="px-5 py-8 text-center text-sm text-stone-400 dark:text-[#A09890]">
              <p className="mb-3">{error}</p>
              <button
                onClick={() => { setError(null); setDevotion(null); setLoading(true); fetchDevotion(todayMmdd()).then(setDevotion).catch(() => setError('無法載入今日靈修')).finally(() => setLoading(false)) }}
                className="px-3 py-1.5 text-xs rounded border border-stone-200 dark:border-[#2E3240] hover:bg-stone-100 dark:hover:bg-[#2E3240] transition-colors"
              >
                重試
              </button>
            </div>
          )}

          {devotion && !loading && (
            <div className="py-2">
              {/* Scripture refs */}
              {devotion.scriptures.length > 0 && (
                <div className="px-5 py-3 border-b border-stone-100 dark:border-[#2E3240]">
                  <p className="text-[10px] font-medium text-stone-300 dark:text-[#A09890] uppercase tracking-widest mb-2">今日經文</p>
                  <div className="flex flex-wrap gap-1.5">
                    {devotion.scriptures.map((ref, i) => {
                      const book = findBook(ref.chineseName)
                      const canJump = !!book
                      return (
                        <button
                          key={i}
                          onClick={() => canJump && handleScripture(ref.chineseName, ref.chapter)}
                          className={`px-2.5 py-1 rounded text-xs border transition-colors ${
                            canJump
                              ? 'border-sage/40 text-sage dark:text-sage-dark dark:border-sage-dark/40 hover:bg-sage/10 dark:hover:bg-sage-dark/10 cursor-pointer'
                              : 'border-stone-200 dark:border-[#2E3240] text-stone-300 dark:text-[#A09890] cursor-default'
                          }`}
                        >
                          {ref.display}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Observations */}
              {devotion.observations.length > 0 && (
                <Section
                  title={`觀察（${devotion.observations.length}題）`}
                  isOpen={openSection === 'obs'}
                  onToggle={() => setOpenSection(s => s === 'obs' ? null : 'obs')}
                >
                  <ol className="list-none space-y-3">
                    {devotion.observations.map((q, i) => (
                      <li key={i} className="flex gap-2.5 text-sm text-stone-500 dark:text-[#E4DDD0] leading-relaxed">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-sage/15 dark:bg-sage-dark/15 text-sage dark:text-sage-dark text-[10px] font-medium flex items-center justify-center mt-0.5">{i + 1}</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ol>
                </Section>
              )}

              {/* Responses */}
              {devotion.responses.length > 0 && (
                <Section
                  title={`回應（${devotion.responses.length}題）`}
                  isOpen={openSection === 'resp'}
                  onToggle={() => setOpenSection(s => s === 'resp' ? null : 'resp')}
                >
                  <ol className="list-none space-y-3">
                    {devotion.responses.map((q, i) => (
                      <li key={i} className="flex gap-2.5 text-sm text-stone-500 dark:text-[#E4DDD0] leading-relaxed">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-celebration/15 dark:bg-celebration-dark/15 text-celebration dark:text-celebration-dark text-[10px] font-medium flex items-center justify-center mt-0.5">{i + 1}</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ol>
                </Section>
              )}

              {/* Prayer */}
              {devotion.prayer && (
                <Section
                  title="禱告"
                  isOpen={openSection === 'pray'}
                  onToggle={() => setOpenSection(s => s === 'pray' ? null : 'pray')}
                >
                  <p className="text-sm text-stone-500 dark:text-[#E4DDD0] leading-relaxed whitespace-pre-line italic">
                    {devotion.prayer}
                  </p>
                </Section>
              )}

              {/* Source link */}
              <div className="px-5 py-4 mt-2">
                <a
                  href={`https://letsfollowjesus.org/main/daily/${devotion.date}.html`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-stone-300 dark:text-[#A09890] hover:text-sage dark:hover:text-sage-dark transition-colors"
                >
                  在原站查看完整內容 →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function Section({ title, isOpen, onToggle, children }: { title: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className="border-b border-stone-100 dark:border-[#2E3240]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-stone-50 dark:hover:bg-[#17191E] transition-colors"
      >
        <span className="text-xs font-medium text-stone-400 dark:text-[#A09890] uppercase tracking-widest">{title}</span>
        <span className="text-stone-300 dark:text-[#A09890] text-[10px]">{isOpen ? '▾' : '▸'}</span>
      </button>
      {isOpen && (
        <div className="px-5 pb-4">
          {children}
        </div>
      )}
    </div>
  )
}

import { useState } from 'react'
import { TIMELINE_PERIODS } from '../lib/timelinePeriods'
import { getDeepDive } from '../lib/timelineDeepDives'
import MainTimelineDeepDive from './MainTimelineDeepDive'
import type { BibleData, Book } from '../types'

export default function MainTimeline({ ckjv, onBack, onOpenBook }: {
  ckjv: BibleData | null
  onBack: () => void
  onOpenBook: (book: Book) => void
}) {
  const [openWorld, setOpenWorld] = useState<Record<string, boolean>>({})
  const [selectedPeriodId, setSelectedPeriodId] = useState<string | null>(null)
  const findBook = (name: string) => ckjv?.books.find(b => b.name === name)

  if (selectedPeriodId) {
    return (
      <MainTimelineDeepDive
        periodId={selectedPeriodId}
        onBack={() => setSelectedPeriodId(null)}
      />
    )
  }

  const toggleWorld = (id: string) => {
    setOpenWorld(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <main className="flex-1 min-h-0 overflow-y-auto px-5 pb-24 pt-8 sm:px-8 sm:pb-12">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-7 flex items-center gap-3">
          <button
            onClick={onBack}
            className="h-9 w-9 rounded-full border border-stone-200 text-stone-400 transition-colors hover:bg-stone-100 dark:border-[#2E3240] dark:text-[#A09890] dark:hover:bg-[#22242C]"
            aria-label="返回"
          >
            ←
          </button>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">聖經視覺導覽</p>
            <h1 className="text-lg font-semibold text-stone-700 dark:text-[#E4DDD0]">聖經時間軸</h1>
          </div>
        </div>

        <p className="mb-8 text-sm leading-8 text-stone-500 dark:text-[#A09890]">
          以十個歷史時期整理聖經敘事，幫助你先看見大脈絡，再回到對應書卷閱讀。
        </p>

        <div className="relative space-y-5 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-stone-200 dark:before:bg-[#2E3240]">
          {TIMELINE_PERIODS.map(period => (
            <section key={period.id} className="relative pl-8">
              <span
                className="absolute left-0 top-3 h-6 w-6 rounded-full border-4 border-stone-50 dark:border-[#17191E]"
                style={{ backgroundColor: period.accent }}
                aria-hidden="true"
              />
              <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-5 dark:border-[#2E3240] dark:bg-[#22242C]/40">
                <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-base font-semibold text-stone-700 dark:text-[#E4DDD0]">{period.name}</h2>
                  <span className="text-[11px] font-medium text-stone-300 dark:text-[#6B6460]">{period.dateRange}</span>
                </div>

                <p className="text-sm leading-8 text-stone-500 dark:text-[#A09890]">{period.summary}</p>

                <div className="mt-4">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">關鍵事件</p>
                  <ul className="space-y-1.5">
                    {period.keyEvents.map(event => (
                      <li key={event} className="flex gap-2 text-sm leading-7 text-stone-500 dark:text-[#A09890]">
                        <span className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: period.accent }} />
                        <span>{event}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {period.books.length > 0 && (
                  <div className="mt-4">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">相關書卷</p>
                    <div className="flex flex-wrap gap-1.5">
                      {period.books.map(bookName => {
                        const book = findBook(bookName)
                        return book ? (
                          <button
                            key={bookName}
                            onClick={() => onOpenBook(book)}
                            className="rounded-full border border-[#4F7358]/20 bg-[#4F7358]/5 px-3 py-1.5 text-xs font-medium text-[#4F7358] transition-colors hover:border-[#4F7358]/35 hover:bg-[#4F7358]/10 dark:border-[#7AAF87]/20 dark:bg-[#7AAF87]/5 dark:text-[#7AAF87] dark:hover:border-[#7AAF87]/35 dark:hover:bg-[#7AAF87]/10"
                          >
                            {bookName}
                          </button>
                        ) : (
                          <span key={bookName} className="rounded-full border border-stone-200 px-3 py-1.5 text-xs text-stone-300 dark:border-[#2E3240] dark:text-[#6B6460]">
                            {bookName}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                )}

                <div className="mt-5 border-t border-stone-200/70 pt-4 dark:border-[#2E3240]">
                  <button
                    onClick={() => setSelectedPeriodId(period.id)}
                    className={`w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                      getDeepDive(period.id)
                        ? 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-[#17191E] dark:text-[#D4CEC4] dark:hover:bg-[#22242C]'
                        : 'cursor-default text-stone-300 dark:text-[#4A4840]'
                    }`}
                    disabled={!getDeepDive(period.id)}
                  >
                    {getDeepDive(period.id) ? '深入理解這個時代 →' : '深入內容整備中'}
                  </button>
                </div>

                {period.worldContext && (
                  <div className="mt-5 border-t border-stone-200/70 pt-4 dark:border-[#2E3240]">
                    <button
                      onClick={() => toggleWorld(period.id)}
                      className="flex w-full items-center justify-between gap-3 text-left transition-colors hover:text-stone-500 dark:hover:text-[#A09890]"
                      aria-expanded={Boolean(openWorld[period.id])}
                    >
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">世界背景</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {period.worldContext.regions.map(region => (
                            <span key={region} className="rounded-full border border-stone-200 bg-stone-100/70 px-2.5 py-1 text-[11px] text-stone-400 dark:border-[#2E3240] dark:bg-[#17191E] dark:text-[#6B6460]">
                              {region}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="shrink-0 text-sm text-stone-300 dark:text-[#6B6460]">{openWorld[period.id] ? '收合' : '展開'}</span>
                    </button>

                    {openWorld[period.id] && (
                      <div className="mt-4 rounded-lg border border-stone-200/70 bg-stone-100/50 p-4 dark:border-[#2E3240] dark:bg-[#17191E]/60">
                        <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{period.worldContext.summary}</p>
                        <div className="mt-4 space-y-3">
                          {period.worldContext.events.map(event => (
                            <div key={`${event.date}-${event.title}`} className="border-l border-stone-300/70 pl-3 dark:border-[#4A4840]">
                              <p className="text-[11px] font-medium text-stone-300 dark:text-[#6B6460]">{event.date}</p>
                              <p className="mt-0.5 text-sm font-medium text-stone-600 dark:text-[#D4CEC4]">{event.title}</p>
                              <p className="mt-1 text-sm leading-7 text-stone-500 dark:text-[#A09890]">{event.note}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}

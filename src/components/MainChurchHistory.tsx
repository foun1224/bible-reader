import { Fragment } from 'react'
import { CHURCH_HISTORY_PERIODS } from '../lib/churchHistoryPeriods'

const STAGES = [
  { name: '信仰奠基', color: '#56705E' },
  { name: '制度成形', color: '#587184' },
  { name: '改革與重整', color: '#8A7048' },
  { name: '跨文化與全球化', color: '#52766F' },
]

export default function MainChurchHistory({ onBack, onOpenPeriod }: {
  onBack: () => void
  onOpenPeriod: (periodId: string) => void
}) {
  return (
    <main className="flex-1 min-h-0 overflow-y-auto px-5 pb-24 pt-8 sm:px-8 sm:pb-12">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-7 flex items-center gap-3">
          <button
            onClick={onBack}
            className="h-11 w-11 shrink-0 rounded-full border border-stone-300 text-stone-500 transition-colors hover:bg-stone-100 active:bg-stone-200 dark:border-[#3A3E4A] dark:text-[#B8B0A6] dark:hover:bg-[#22242C] dark:active:bg-[#2A2D36]"
            aria-label="返回"
          >
            ←
          </button>
          <div>
            <p className="text-xs font-semibold tracking-[0.08em] text-stone-500 dark:text-[#9B938B]">歷史與神學</p>
            <h1 className="text-lg font-semibold text-stone-700 dark:text-[#E4DDD0]">教會歷史</h1>
          </div>
        </div>

        <p className="mb-8 text-base leading-8 text-stone-600 dark:text-[#B8B0A6]">
          從使徒時代到今日，每個世紀的教會都在回應上一個時代留下的問題，也為下一個世代留下新的張力。跟著問題鏈，看見神學思想如何演進。
        </p>

        <div className="relative space-y-4 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-stone-200 dark:before:bg-[#2E3240]">
          {CHURCH_HISTORY_PERIODS.map((period, i) => {
            const stage = STAGES[Math.min(Math.floor(i / 2), STAGES.length - 1)]
            return (
              <Fragment key={period.periodId}>
                {i % 2 === 0 && (
                  <div className="relative pl-8">
                    <span
                      className="absolute left-[7px] top-1 h-2 w-2 rounded-full"
                      style={{ backgroundColor: stage.color }}
                      aria-hidden="true"
                    />
                    <p className="text-xs font-semibold tracking-[0.08em] text-stone-500 dark:text-[#9B938B]">{stage.name}</p>
                  </div>
                )}
              <section className="relative pl-8">
                <span
                  className="absolute left-0 top-3 h-6 w-6 rounded-full border-4 border-stone-50 dark:border-[#17191E]"
                  style={{ backgroundColor: stage.color }}
                  aria-hidden="true"
                />
                <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-5 dark:border-[#2E3240] dark:bg-[#22242C]/40">
                  <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="text-base font-semibold text-stone-700 dark:text-[#E4DDD0]">{period.title}</h2>
                    <span className="text-xs font-medium text-stone-500 dark:text-[#9B938B]">{period.dateRange}</span>
                  </div>

                  <p className="text-sm leading-7 text-stone-600 dark:text-[#B8B0A6]">{period.thesis}</p>

                  <div className="mt-4 rounded-lg border border-stone-200/70 bg-stone-100/50 p-3 dark:border-[#2E3240] dark:bg-[#17191E]/60">
                    <p className="mb-1 text-xs font-semibold text-stone-500 dark:text-[#9B938B]">這個時代要回答的問題</p>
                    <p className="text-sm leading-7 text-stone-600 dark:text-[#D4CEC4]">{period.theologicalQuestion}</p>
                  </div>

                  {period.keyFigures.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {period.keyFigures.map(fig => (
                        <span
                          key={fig.name}
                          className="rounded-full border border-stone-300 bg-stone-100/70 px-2.5 py-1 text-xs text-stone-500 dark:border-[#3A3E4A] dark:bg-[#17191E] dark:text-[#9B938B]"
                        >
                          {fig.name.split('（')[0]}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-4">
                    <button
                      onClick={() => onOpenPeriod(period.periodId)}
                      className="min-h-11 w-full rounded-lg border border-[#4F7358]/25 bg-[#4F7358]/5 px-4 py-3 text-left text-sm font-semibold text-[#4F7358] transition-colors hover:border-[#4F7358]/40 hover:bg-[#4F7358]/10 active:bg-[#4F7358]/15 dark:border-[#7AAF87]/25 dark:bg-[#7AAF87]/5 dark:text-[#8FC79D] dark:hover:border-[#7AAF87]/40 dark:hover:bg-[#7AAF87]/10 dark:active:bg-[#7AAF87]/15"
                    >
                      深入這個時代 →
                    </button>
                  </div>
                </div>
              </section>
              </Fragment>
            )
          })}
        </div>
      </div>
    </main>
  )
}

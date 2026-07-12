import { CHURCH_HISTORY_PERIODS } from '../lib/churchHistoryPeriods'

const ERA_ACCENTS = [
  '#7A6B8A', '#5E7A8A', '#6B8A6B', '#8A7A5E',
  '#8A5E5E', '#5E6B8A', '#7A8A5E', '#5E8A7A',
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
            className="h-9 w-9 rounded-full border border-stone-200 text-stone-400 transition-colors hover:bg-stone-100 dark:border-[#2E3240] dark:text-[#A09890] dark:hover:bg-[#22242C]"
            aria-label="返回"
          >
            ←
          </button>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">歷史與神學</p>
            <h1 className="text-lg font-semibold text-stone-700 dark:text-[#E4DDD0]">教會歷史</h1>
          </div>
        </div>

        <p className="mb-8 text-sm leading-8 text-stone-500 dark:text-[#A09890]">
          從使徒時代到今日，每個世紀的教會都在回應上一個時代留下的問題，也為下一個世代留下新的張力。跟著問題鏈，看見神學思想如何演進。
        </p>

        <div className="relative space-y-4 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-stone-200 dark:before:bg-[#2E3240]">
          {CHURCH_HISTORY_PERIODS.map((period, i) => {
            const accent = ERA_ACCENTS[i % ERA_ACCENTS.length]
            return (
              <section key={period.periodId} className="relative pl-8">
                <span
                  className="absolute left-0 top-3 h-6 w-6 rounded-full border-4 border-stone-50 dark:border-[#17191E]"
                  style={{ backgroundColor: accent }}
                  aria-hidden="true"
                />
                <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-5 dark:border-[#2E3240] dark:bg-[#22242C]/40">
                  <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="text-base font-semibold text-stone-700 dark:text-[#E4DDD0]">{period.title}</h2>
                    <span className="text-[11px] font-medium text-stone-300 dark:text-[#6B6460]">{period.dateRange}</span>
                  </div>

                  <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{period.thesis}</p>

                  <div className="mt-4 rounded-lg border border-stone-200/70 bg-stone-100/50 p-3 dark:border-[#2E3240] dark:bg-[#17191E]/60">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460] mb-1">這個時代要回答的問題</p>
                    <p className="text-sm leading-7 text-stone-600 dark:text-[#D4CEC4]">{period.theologicalQuestion}</p>
                  </div>

                  {period.keyFigures.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {period.keyFigures.map(fig => (
                        <span
                          key={fig.name}
                          className="rounded-full border border-stone-200 bg-stone-100/70 px-2.5 py-1 text-[11px] text-stone-400 dark:border-[#2E3240] dark:bg-[#17191E] dark:text-[#6B6460]"
                        >
                          {fig.name.split('（')[0]}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-4">
                    <button
                      onClick={() => onOpenPeriod(period.periodId)}
                      className="w-full rounded-lg border border-[#4F7358]/20 bg-[#4F7358]/5 px-4 py-3 text-left text-sm font-medium text-[#4F7358] transition-colors hover:border-[#4F7358]/35 hover:bg-[#4F7358]/10 dark:border-[#7AAF87]/20 dark:bg-[#7AAF87]/5 dark:text-[#7AAF87] dark:hover:border-[#7AAF87]/35 dark:hover:bg-[#7AAF87]/10"
                    >
                      深入這個時代 →
                    </button>
                  </div>
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </main>
  )
}

import { findChurchHistoryPeriod, CHURCH_HISTORY_PERIODS } from '../lib/churchHistoryPeriods'

function Section({ eyebrow, title, children }: {
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="border-t border-stone-200/70 dark:border-[#2E3240] pt-8 mt-8">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460] mb-1">{eyebrow}</p>
      <h2 className="text-base font-semibold text-stone-700 dark:text-[#E4DDD0] mb-4">{title}</h2>
      {children}
    </section>
  )
}

export default function MainChurchHistoryPeriod({ periodId, onBack }: {
  periodId: string
  onBack: () => void
}) {
  const period = findChurchHistoryPeriod(periodId)
  if (!period) return null

  const parentPeriod = period.inheritedFrom
    ? CHURCH_HISTORY_PERIODS.find(p => p.periodId === period.inheritedFrom)
    : null

  return (
    <main className="flex-1 min-h-0 overflow-y-auto px-5 pb-24 pt-8 sm:px-8 sm:pb-12">
      <div className="mx-auto w-full max-w-3xl">
        {/* Header */}
        <div className="mb-7 flex items-center gap-3">
          <button
            onClick={onBack}
            className="h-9 w-9 rounded-full border border-stone-200 text-stone-400 transition-colors hover:bg-stone-100 dark:border-[#2E3240] dark:text-[#A09890] dark:hover:bg-[#22242C]"
            aria-label="返回"
          >
            ←
          </button>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">{period.dateRange}</p>
            <h1 className="text-lg font-semibold text-stone-700 dark:text-[#E4DDD0]">{period.title}</h1>
          </div>
        </div>

        <p className="text-sm leading-8 text-stone-500 dark:text-[#A09890]">{period.thesis}</p>

        {/* Theological Question Chain */}
        <Section eyebrow="思想演進" title="這個時代的核心神學問題">
          {parentPeriod && (
            <div className="mb-3 flex items-start gap-2 text-xs text-stone-300 dark:text-[#6B6460]">
              <span className="mt-0.5 shrink-0">繼承自</span>
              <span className="font-medium">{parentPeriod.title}</span>
            </div>
          )}
          <div className="rounded-lg border border-stone-200 bg-stone-50/70 dark:border-[#2E3240] dark:bg-[#22242C]/45 divide-y divide-stone-200/70 dark:divide-[#2E3240]">
            <div className="p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460] mb-1">這個時代要回答的問題</p>
              <p className="text-sm leading-7 text-stone-600 dark:text-[#D4CEC4]">{period.theologicalQuestion}</p>
            </div>
            <div className="p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460] mb-1">這個時代的回應</p>
              <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{period.thisEraAnswer}</p>
            </div>
            <div className="p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460] mb-1">留給下一個時代的張力</p>
              <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{period.unresolvedTension}</p>
            </div>
          </div>
        </Section>

        {/* Learning Guide */}
        <Section eyebrow="學習導引" title="讀這個時代要知道的事">
          <div className="space-y-3">
            <div className="rounded-lg border border-stone-200 bg-stone-50/70 p-4 dark:border-[#2E3240] dark:bg-[#22242C]/45">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460] mb-1">為什麼重要</p>
              <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{period.insights.whyItMatters}</p>
            </div>
            <div className="rounded-lg border border-stone-200 bg-stone-50/70 p-4 dark:border-[#2E3240] dark:bg-[#22242C]/45">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460] mb-1">常見誤解</p>
              <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{period.insights.commonMisconception}</p>
            </div>
            <div className="rounded-lg border border-stone-200 bg-stone-50/70 p-4 dark:border-[#2E3240] dark:bg-[#22242C]/45">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460] mb-1">世界史對照</p>
              <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{period.worldHistoryParallel}</p>
            </div>
          </div>
        </Section>

        {/* Key Figures */}
        {period.keyFigures.length > 0 && (
          <Section eyebrow="人物" title="這個時代的關鍵人物">
            <div className="space-y-3">
              {period.keyFigures.map(fig => (
                <div key={fig.name} className="rounded-lg border border-stone-200 bg-stone-50/70 dark:border-[#2E3240] dark:bg-[#22242C]/45 p-4">
                  <p className="text-sm font-semibold text-stone-700 dark:text-[#E4DDD0]">{fig.name}</p>
                  <p className="mt-1 text-[11px] text-stone-400 dark:text-[#6B6460]">{fig.role}</p>
                  {fig.quote && (
                    <blockquote className="mt-3 border-l-2 border-stone-200 dark:border-[#2E3240] pl-3">
                      <p className="text-sm italic leading-7 text-stone-400 dark:text-[#A09890]">「{fig.quote}」</p>
                    </blockquote>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Primary Sources */}
        {period.sourceReading.length > 0 && (
          <Section eyebrow="一手史料" title="代表文獻細讀">
            <div className="space-y-4">
              {period.sourceReading.map(src => (
                <div key={src.title} className="rounded-lg border border-stone-200 bg-stone-50/70 dark:border-[#2E3240] dark:bg-[#22242C]/45 divide-y divide-stone-200/70 dark:divide-[#2E3240]">
                  <div className="p-4">
                    <p className="text-sm font-semibold text-stone-700 dark:text-[#E4DDD0]">{src.title}</p>
                    <p className="mt-0.5 text-[11px] text-stone-400 dark:text-[#6B6460]">{src.author}</p>
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460] mb-2">摘錄</p>
                    <blockquote className="border-l-2 border-[#4F7358]/30 pl-3 dark:border-[#7AAF87]/30">
                      <p className="text-sm leading-8 italic text-stone-500 dark:text-[#A09890]">{src.excerpt}</p>
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Today Reflection */}
        {period.todayReflection.length > 0 && (
          <Section eyebrow="今日連結" title="從那個時代到你的生活">
            <div className="space-y-3">
              {period.todayReflection.map((r, i) => (
                <div key={i} className="rounded-lg border border-[#4F7358]/20 bg-[#4F7358]/5 p-4 dark:border-[#7AAF87]/20 dark:bg-[#7AAF87]/5">
                  <p className="text-sm font-medium leading-7 text-stone-700 dark:text-[#E4DDD0]">{r.question}</p>
                  <p className="mt-2 text-sm leading-7 text-stone-500 dark:text-[#A09890]">{r.prompt}</p>
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>
    </main>
  )
}

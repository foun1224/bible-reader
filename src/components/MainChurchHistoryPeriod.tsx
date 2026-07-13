import { findChurchHistoryPeriod, CHURCH_HISTORY_PERIODS } from '../lib/churchHistoryPeriods'

function Section({ id, eyebrow, title, children }: {
  id?: string
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-6 border-t border-stone-200/70 pt-8 mt-8 dark:border-[#2E3240]">
      <p className="mb-1 text-xs font-semibold tracking-[0.08em] text-stone-500 dark:text-[#9B938B]">{eyebrow}</p>
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
            className="h-11 w-11 shrink-0 rounded-full border border-stone-300 text-stone-500 transition-colors hover:bg-stone-100 active:bg-stone-200 dark:border-[#3A3E4A] dark:text-[#B8B0A6] dark:hover:bg-[#22242C] dark:active:bg-[#2A2D36]"
            aria-label="返回"
          >
            ←
          </button>
          <div>
            <p className="text-xs font-semibold tracking-[0.08em] text-stone-500 dark:text-[#9B938B]">{period.dateRange}</p>
            <h1 className="text-lg font-semibold text-stone-700 dark:text-[#E4DDD0]">{period.title}</h1>
          </div>
        </div>

        <p className="text-base leading-8 text-stone-600 dark:text-[#B8B0A6]">{period.thesis}</p>

        <nav aria-label="本頁閱讀路徑" className="mt-6">
          <p className="mb-2 text-xs font-semibold text-stone-500 dark:text-[#9B938B]">閱讀路徑</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              ['#context', '時代背景'],
              ['#ideas', '思想與辨識'],
              ['#sources', '人物與史料'],
              ['#reflection', '今日反思'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="flex min-h-11 items-center justify-center rounded-lg border border-stone-300 bg-stone-50 px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 active:bg-stone-200 dark:border-[#3A3E4A] dark:bg-[#22242C]/45 dark:text-[#B8B0A6] dark:hover:bg-[#2A2D36]"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>

        {/* Geographic Context */}
        {period.geographicContext && (
          <section id="context" className="scroll-mt-6 mt-6">
            <figure className="overflow-hidden rounded-xl border border-stone-200 dark:border-[#2E3240]">
              <img
                src={period.geographicContext.imageUrl}
                alt={period.geographicContext.imageCaption}
                className="aspect-[16/9] w-full object-cover"
                loading="lazy"
              />
              <figcaption className="p-4 space-y-2">
                <p className="text-xs font-semibold text-stone-500 dark:text-[#9B938B]">地理與背景</p>
                <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{period.geographicContext.description}</p>
                <p className="text-xs text-stone-500 dark:text-[#9B938B]">{period.geographicContext.imageCaption}</p>
              </figcaption>
            </figure>
          </section>
        )}

        {/* Martyr Story */}
        {period.martyrStory && (
          <section className="mt-6 rounded-xl border border-red-900/20 bg-red-950/5 dark:border-red-900/30 dark:bg-red-950/10 overflow-hidden">
            <div className="px-5 pt-5 pb-1">
              <p className="mb-1 text-xs font-semibold text-red-700/80 dark:text-red-300/80">殉道見證</p>
              <p className="text-sm font-semibold text-stone-700 dark:text-[#E4DDD0]">{period.martyrStory.person}</p>
              <p className="mt-0.5 text-xs text-stone-500 dark:text-[#9B938B]">{period.martyrStory.year}</p>
            </div>
            <div className="px-5 pb-4 pt-3">
              <p className="text-sm leading-8 text-stone-500 dark:text-[#A09890]">{period.martyrStory.story}</p>
            </div>
            {period.martyrStory.quote && period.martyrStory.quote !== '（殉道記錄中無留存語句）' && period.martyrStory.quote !== '（無留存語句——他的見證在他的平靜中）' && (
              <div className="mx-5 mb-4 border-l-2 border-red-700/30 pl-4">
                <p className="text-sm italic leading-7 text-stone-400 dark:text-[#A09890]">「{period.martyrStory.quote}」</p>
              </div>
            )}
            <div className="border-t border-red-900/10 dark:border-red-900/20 mx-0 px-5 py-4">
              <p className="mb-1 text-xs font-semibold text-red-700/70 dark:text-red-300/70">為什麼這個故事值得記住</p>
              <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{period.martyrStory.significance}</p>
            </div>
          </section>
        )}

        {/* Political Context */}
        {period.politicalContext && (
          <section className="mt-6 overflow-hidden rounded-xl border border-stone-300/40 bg-stone-100/60 dark:border-[#3A3E4A] dark:bg-[#1C1F27]/60">
            <div className="px-5 pt-5 pb-3">
              <p className="mb-1 text-xs font-semibold text-stone-500 dark:text-[#9B938B]">政權背景</p>
              <p className="text-sm leading-8 text-stone-500 dark:text-[#A09890] whitespace-pre-line">{period.politicalContext}</p>
            </div>
          </section>
        )}

        {/* Theological Question Chain */}
        <Section id="ideas" eyebrow="思想演進" title="這個時代的核心神學問題">
          {parentPeriod && (
            <div className="mb-3 flex items-start gap-2 text-xs text-stone-500 dark:text-[#9B938B]">
              <span className="mt-0.5 shrink-0">繼承自</span>
              <span className="font-medium">{parentPeriod.title}</span>
            </div>
          )}
          <div className="rounded-lg border border-stone-200 bg-stone-50/70 dark:border-[#2E3240] dark:bg-[#22242C]/45 divide-y divide-stone-200/70 dark:divide-[#2E3240]">
            <div className="p-4">
              <p className="mb-1 text-xs font-semibold text-stone-500 dark:text-[#9B938B]">這個時代要回答的問題</p>
              <p className="text-sm leading-7 text-stone-600 dark:text-[#D4CEC4]">{period.theologicalQuestion}</p>
            </div>
            <div className="p-4">
              <p className="mb-1 text-xs font-semibold text-stone-500 dark:text-[#9B938B]">這個時代的回應</p>
              <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{period.thisEraAnswer}</p>
            </div>
            <div className="p-4">
              <p className="mb-1 text-xs font-semibold text-stone-500 dark:text-[#9B938B]">留給下一個時代的張力</p>
              <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{period.unresolvedTension}</p>
            </div>
          </div>
        </Section>

        {/* Learning Guide */}
        <Section eyebrow="學習導引" title="讀這個時代要知道的事">
          <div className="space-y-3">
            <div className="rounded-lg border border-stone-200 bg-stone-50/70 p-4 dark:border-[#2E3240] dark:bg-[#22242C]/45">
              <p className="mb-1 text-xs font-semibold text-stone-500 dark:text-[#9B938B]">為什麼重要</p>
              <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{period.insights.whyItMatters}</p>
            </div>
            <div className="rounded-lg border border-stone-200 bg-stone-50/70 p-4 dark:border-[#2E3240] dark:bg-[#22242C]/45">
              <p className="mb-1 text-xs font-semibold text-stone-500 dark:text-[#9B938B]">常見誤解</p>
              <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{period.insights.commonMisconception}</p>
            </div>
            <div className="rounded-lg border border-stone-200 bg-stone-50/70 p-4 dark:border-[#2E3240] dark:bg-[#22242C]/45">
              <p className="mb-1 text-xs font-semibold text-stone-500 dark:text-[#9B938B]">世界史對照</p>
              <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{period.worldHistoryParallel}</p>
            </div>
          </div>
        </Section>

        {/* Balanced Assessment */}
        <Section eyebrow="歷史辨識" title="成果、陰影與今日功課">
          <p className="mb-4 text-sm leading-7 text-stone-500 dark:text-[#A09890]">
            同一個時代往往同時孕育信仰成果與制度傷害。理解兩面，才能避免把歷史讀成英雄榜或黑歷史清單。
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-[#4F7358]/25 bg-[#4F7358]/5 p-4 dark:border-[#7AAF87]/25 dark:bg-[#7AAF87]/5">
              <p className="mb-1 text-xs font-semibold text-[#4F7358] dark:text-[#8FC79D]">帶來的建設</p>
              <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{period.eraAssessment.contribution}</p>
            </div>
            <div className="rounded-lg border border-[#8A7048]/25 bg-[#8A7048]/5 p-4 dark:border-[#C29B62]/25 dark:bg-[#C29B62]/5">
              <p className="mb-1 text-xs font-semibold text-[#7A603D] dark:text-[#D0AA70]">付出的代價</p>
              <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{period.eraAssessment.shadow}</p>
            </div>
          </div>
          <div className="mt-3 rounded-lg border border-stone-200 bg-stone-50/70 p-4 dark:border-[#2E3240] dark:bg-[#22242C]/45">
            <p className="mb-1 text-xs font-semibold text-stone-500 dark:text-[#9B938B]">留給今天的辨識問題</p>
            <p className="text-sm font-medium leading-7 text-stone-600 dark:text-[#D4CEC4]">{period.eraAssessment.discernment}</p>
          </div>
        </Section>

        {/* Key Figures */}
        {period.keyFigures.length > 0 && (
          <Section id="sources" eyebrow="人物" title="這個時代的關鍵人物">
            <div className="space-y-3">
              {period.keyFigures.map(fig => (
                <div key={fig.name} className="rounded-lg border border-stone-200 bg-stone-50/70 dark:border-[#2E3240] dark:bg-[#22242C]/45 p-4">
                  <p className="text-sm font-semibold text-stone-700 dark:text-[#E4DDD0]">{fig.name}</p>
                  <p className="mt-1 text-xs leading-5 text-stone-500 dark:text-[#9B938B]">{fig.role}</p>
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
                    <p className="mt-0.5 text-xs text-stone-500 dark:text-[#9B938B]">{src.author}</p>
                  </div>
                  <div className="p-4">
                    <p className="mb-2 text-xs font-semibold text-stone-500 dark:text-[#9B938B]">摘錄</p>
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
          <Section id="reflection" eyebrow="今日連結" title="從那個時代到你的生活">
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

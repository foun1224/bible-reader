import {
  findChurchMusicHistoryPeriod,
  CHURCH_MUSIC_HISTORY_PERIODS,
} from '../lib/churchMusicHistoryPeriods'

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

export default function MainChurchMusicHistoryPeriod({ periodId, onBack }: {
  periodId: string
  onBack: () => void
}) {
  const period = findChurchMusicHistoryPeriod(periodId)
  if (!period) return null

  const parentPeriod = period.inheritedFrom
    ? CHURCH_MUSIC_HISTORY_PERIODS.find(p => p.periodId === period.inheritedFrom)
    : null

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
            <p className="text-xs font-semibold tracking-[0.08em] text-stone-500 dark:text-[#9B938B]">{period.dateRange}</p>
            <h1 className="text-lg font-semibold text-stone-700 dark:text-[#E4DDD0]">{period.title}</h1>
          </div>
        </div>

        <p className="text-base leading-8 text-stone-600 dark:text-[#B8B0A6]">{period.thesis}</p>

        <nav aria-label="本頁閱讀路徑" className="mt-6">
          <p className="mb-2 text-xs font-semibold text-stone-500 dark:text-[#9B938B]">閱讀路徑</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {[
              ['#sound', '聲音肖像'],
              ['#ideas', '問題演進'],
              ['#assessment', '歷史辨識'],
              ['#sources', '人物作品'],
              ['#reflection', '今日反思'],
            ].map(([href, label], index) => (
              <a
                key={href}
                href={href}
                className={`flex min-h-11 items-center justify-center rounded-lg border border-stone-300 bg-stone-50 px-3 py-2 text-center text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 active:bg-stone-200 dark:border-[#3A3E4A] dark:bg-[#22242C]/45 dark:text-[#B8B0A6] dark:hover:bg-[#2A2D36] ${index === 4 ? 'col-span-2 sm:col-span-1' : ''}`}
              >
                {label}
              </a>
            ))}
          </div>
        </nav>

        <div id="sound" className="scroll-mt-6 mt-6">
          <section className="overflow-hidden rounded-xl border border-stone-200 bg-stone-50/70 dark:border-[#2E3240] dark:bg-[#22242C]/45">
            <div className="px-5 pt-5 pb-3">
              <p className="mb-1 text-xs font-semibold text-stone-500 dark:text-[#9B938B]">聲音肖像</p>
              <p className="text-sm leading-8 text-stone-500 dark:text-[#A09890]">{period.soundPortrait.description}</p>
            </div>
            {period.soundPortrait.forms.length > 0 && (
              <div className="border-t border-stone-200/70 px-5 py-4 dark:border-[#2E3240]">
                <p className="mb-2 text-xs font-semibold text-stone-500 dark:text-[#9B938B]">常見形式</p>
                <div className="flex flex-wrap gap-1.5">
                  {period.soundPortrait.forms.map(form => (
                    <span
                      key={form}
                      className="rounded-full border border-stone-300 bg-stone-100/70 px-2.5 py-1 text-xs text-stone-500 dark:border-[#3A3E4A] dark:bg-[#17191E] dark:text-[#9B938B]"
                    >
                      {form}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>

        <Section id="ideas" eyebrow="問題演進" title="這個時代的核心音樂問題">
          {parentPeriod && (
            <div className="mb-3 flex items-start gap-2 text-xs text-stone-500 dark:text-[#9B938B]">
              <span className="mt-0.5 shrink-0">繼承自</span>
              <span className="font-medium">{parentPeriod.title}</span>
            </div>
          )}
          <div className="rounded-lg border border-stone-200 bg-stone-50/70 dark:border-[#2E3240] dark:bg-[#22242C]/45 divide-y divide-stone-200/70 dark:divide-[#2E3240]">
            <div className="p-4">
              <p className="mb-1 text-xs font-semibold text-stone-500 dark:text-[#9B938B]">這個時代要回答的問題</p>
              <p className="text-sm leading-7 text-stone-600 dark:text-[#D4CEC4]">{period.musicalQuestion}</p>
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
              <p className="mb-1 text-xs font-semibold text-stone-500 dark:text-[#9B938B]">聖經連結</p>
              <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{period.insights.scriptureConnection}</p>
            </div>
          </div>
        </Section>

        <Section id="assessment" eyebrow="歷史辨識" title="一個時代的資產、陰影與今日功課">
          <p className="mb-4 text-sm leading-7 text-stone-500 dark:text-[#A09890]">
            同一套聲音傳統，往往同時造就敬虔，也帶來消費、排除或表演化。理解兩面，才能選歌而不只是追風。
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-[#4F7358]/25 bg-[#4F7358]/5 p-4 dark:border-[#7AAF87]/25 dark:bg-[#7AAF87]/5">
              <p className="mb-1 text-xs font-semibold text-[#4F7358] dark:text-[#8FC79D]">留下的資產</p>
              <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{period.eraAssessment.contribution}</p>
            </div>
            <div className="rounded-lg border border-[#B7792B]/25 bg-[#B7792B]/5 p-4 dark:border-[#E0B665]/25 dark:bg-[#E0B665]/5">
              <p className="mb-1 text-xs font-semibold text-[#74501F] dark:text-[#E0B665]">需要面對的陰影</p>
              <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{period.eraAssessment.shadow}</p>
            </div>
          </div>
          <div className="mt-3 rounded-lg border border-stone-200 bg-stone-50/70 p-4 dark:border-[#2E3240] dark:bg-[#22242C]/45">
            <p className="mb-1 text-xs font-semibold text-stone-500 dark:text-[#9B938B]">留給今天的辨識問題</p>
            <p className="text-sm font-medium leading-7 text-stone-600 dark:text-[#D4CEC4]">{period.eraAssessment.discernment}</p>
          </div>
        </Section>

        <div id="sources" className="scroll-mt-6">
        {period.keyFigures.length > 0 && (
          <Section eyebrow="人物" title="這個時代的關鍵人物">
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

        {period.representativeWorks.length > 0 && (
          <Section eyebrow="代表作品" title="值得細聽的聲音文本">
            <div className="space-y-4">
              {period.representativeWorks.map(work => (
                <div key={work.title} className="rounded-lg border border-stone-200 bg-stone-50/70 dark:border-[#2E3240] dark:bg-[#22242C]/45 divide-y divide-stone-200/70 dark:divide-[#2E3240]">
                  <div className="p-4">
                    <p className="text-sm font-semibold text-stone-700 dark:text-[#E4DDD0]">{work.title}</p>
                    <p className="mt-0.5 text-xs text-stone-500 dark:text-[#9B938B]">{work.composer}</p>
                  </div>
                  <div className="p-4">
                    <p className="mb-2 text-xs font-semibold text-stone-500 dark:text-[#9B938B]">為何重要</p>
                    <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{work.significance}</p>
                    {work.excerpt && (
                      <blockquote className="mt-3 border-l-2 border-[#4F7358]/30 pl-3 dark:border-[#7AAF87]/30">
                        <p className="text-sm leading-8 italic text-stone-500 dark:text-[#A09890]">{work.excerpt}</p>
                      </blockquote>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        <a
          href={period.source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex min-h-11 items-center justify-between rounded-lg border border-stone-300 px-4 py-3 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 active:bg-stone-200 dark:border-[#3A3E4A] dark:text-[#B8B0A6] dark:hover:bg-[#22242C]"
        >
          <span>{period.source.label}</span>
          <span aria-hidden="true">↗</span>
        </a>
        </div>

        {period.todayReflection.length > 0 && (
          <Section id="reflection" eyebrow="今日連結" title="從那個時代的歌聲到你的聚會">
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

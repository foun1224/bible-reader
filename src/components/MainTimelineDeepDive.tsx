import type { ReactNode } from 'react'
import { findTimelineDeepDive } from '../lib/timelineDeepDives'
import { TIMELINE_PERIODS } from '../lib/timelinePeriods'
import type { BibleData, Book } from '../types'

function Section({ eyebrow, title, children }: {
  eyebrow: string
  title: string
  children: ReactNode
}) {
  return (
    <section className="border-t border-stone-200/70 pt-6 dark:border-[#2E3240]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">{eyebrow}</p>
      <h2 className="mt-1 text-base font-semibold text-stone-700 dark:text-[#E4DDD0]">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

function TextBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-stone-200 bg-stone-50/70 p-4 dark:border-[#2E3240] dark:bg-[#22242C]/45">
      <h3 className="text-sm font-semibold text-stone-700 dark:text-[#E4DDD0]">{title}</h3>
      <p className="mt-2 text-sm leading-8 text-stone-500 dark:text-[#A09890]">{body}</p>
    </div>
  )
}


function InsightCard({ label, title, body }: { label: string; title: string; body: string }) {
  return (
    <div className="rounded-lg border border-stone-200 bg-stone-50/70 p-4 dark:border-[#2E3240] dark:bg-[#22242C]/45">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-300 dark:text-[#6B6460]">{label}</p>
      <h3 className="mt-1 text-sm font-semibold text-stone-700 dark:text-[#E4DDD0]">{title}</h3>
      <p className="mt-2 text-sm leading-8 text-stone-500 dark:text-[#A09890]">{body}</p>
    </div>
  )
}

export default function MainTimelineDeepDive({
  periodId,
  ckjv,
  onBack,
  onOpenBook,
}: {
  periodId: string
  ckjv: BibleData | null
  onBack: () => void
  onOpenBook: (book: Book, chapterNumber?: number) => void
}) {
  const deepDive = findTimelineDeepDive(periodId)
  const period = TIMELINE_PERIODS.find(item => item.id === periodId)
  const findBook = (name: string) => ckjv?.books.find(book => book.name === name)

  if (!deepDive || !period) {
    return (
      <main className="flex-1 min-h-0 overflow-y-auto px-5 pb-24 pt-8 sm:px-8 sm:pb-12">
        <div className="mx-auto w-full max-w-3xl">
          <button
            onClick={onBack}
            className="h-9 rounded-full border border-stone-200 px-4 text-sm text-stone-400 transition-colors hover:bg-stone-100 dark:border-[#2E3240] dark:text-[#A09890] dark:hover:bg-[#22242C]"
          >
            ← 返回時間軸
          </button>
          <p className="mt-8 text-sm leading-8 text-stone-500 dark:text-[#A09890]">這個時期的深入內容尚未完成。</p>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 min-h-0 overflow-y-auto px-5 pb-24 pt-8 sm:px-8 sm:pb-12">
      <article className="mx-auto w-full max-w-3xl space-y-8">
        <header>
          <button
            onClick={onBack}
            className="mb-6 h-9 rounded-full border border-stone-200 px-4 text-sm text-stone-400 transition-colors hover:bg-stone-100 dark:border-[#2E3240] dark:text-[#A09890] dark:hover:bg-[#22242C]"
          >
            ← 返回時間軸
          </button>
          <div className="flex items-center gap-3">
            <span className="h-9 w-1.5 rounded-full" style={{ backgroundColor: period.accent }} aria-hidden="true" />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">{period.dateRange}</p>
              <h1 className="text-xl font-semibold text-stone-800 dark:text-[#E4DDD0]">{deepDive.title}</h1>
            </div>
          </div>
          <p className="mt-5 text-sm leading-8 text-stone-500 dark:text-[#A09890]">{deepDive.thesis}</p>
        </header>


        <Section eyebrow="Learning Guide" title="進入這個時代前，先抓住三個重點">
          <div className="grid gap-3">
            <InsightCard
              label="Why it matters"
              title="為什麼這個時期重要"
              body={deepDive.insights.whyItMatters}
            />
            <InsightCard
              label="Common misconception"
              title="常見誤解"
              body={deepDive.insights.commonMisconception}
            />
            <InsightCard
              label="World history parallel"
              title="世界史對照"
              body={deepDive.insights.worldHistoryParallel}
            />
          </div>
        </Section>

        <Section eyebrow="World Context" title="世界背景：文化、人文與自然環境">
          <div className="grid gap-3">
            <TextBlock title={deepDive.world.culture.title} body={deepDive.world.culture.body} />
            <TextBlock title={deepDive.world.humanity.title} body={deepDive.world.humanity.body} />
            <TextBlock title={deepDive.world.environment.title} body={deepDive.world.environment.body} />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {deepDive.world.artifacts.map(asset => (
              <figure key={asset.sourceUrl} className="overflow-hidden rounded-lg border border-stone-200 bg-stone-50 dark:border-[#2E3240] dark:bg-[#22242C]/45">
                <img
                  src={asset.imageUrl}
                  alt={asset.title}
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
                <figcaption className="space-y-2 p-4">
                  <div>
                    <p className="text-sm font-semibold text-stone-700 dark:text-[#E4DDD0]">{asset.title}</p>
                    <p className="mt-1 text-xs leading-6 text-stone-400 dark:text-[#6B6460]">{asset.caption}</p>
                  </div>
                  <p className="text-xs leading-6 text-stone-500 dark:text-[#A09890]">教學用途：{asset.educationalUse}</p>
                  <a
                    href={asset.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex text-xs font-medium text-[#4F7358] dark:text-[#7AAF87]"
                  >
                    {asset.sourceName} · {asset.license} →
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>

        <Section eyebrow="Scripture" title="聖經相關書卷">
          <p className="text-sm leading-8 text-stone-500 dark:text-[#A09890]">{deepDive.scripture.overview}</p>
          <div className="mt-4 space-y-3">
            {deepDive.scripture.bookGuides.map(guide => {
              const book = findBook(guide.bookName)
              return (
                <div key={guide.bookName} className="rounded-lg border border-stone-200 bg-stone-50/70 p-4 dark:border-[#2E3240] dark:bg-[#22242C]/45">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-stone-700 dark:text-[#E4DDD0]">{guide.bookName}</h3>
                    {book && (
                      <button
                        onClick={() => onOpenBook(book, 1)}
                        className="rounded-full border border-[#4F7358]/25 px-3 py-1 text-xs font-medium text-[#4F7358] transition-colors hover:bg-[#4F7358]/10 dark:border-[#7AAF87]/25 dark:text-[#7AAF87] dark:hover:bg-[#7AAF87]/10"
                      >
                        開始讀第 1 章
                      </button>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-7 text-stone-500 dark:text-[#A09890]">{guide.role}</p>
                  <p className="mt-2 border-l-2 border-[#4F7358]/25 pl-3 text-sm leading-7 text-stone-500 dark:border-[#7AAF87]/25 dark:text-[#A09890]">
                    閱讀問題：{guide.readingQuestion}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="mt-5 rounded-lg border border-stone-200 bg-stone-100/50 p-4 dark:border-[#2E3240] dark:bg-[#17191E]/60">
            <h3 className="text-sm font-semibold text-stone-700 dark:text-[#E4DDD0]">建議閱讀路徑</h3>
            <div className="mt-3 space-y-3">
              {deepDive.scripture.readingPath.map(step => {
                const book = findBook(step.bookName)
                return (
                  <div key={`${step.bookName}-${step.chapter}`} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: period.accent }} aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <button
                        disabled={!book}
                        onClick={() => book && onOpenBook(book, step.chapter)}
                        className="text-left text-sm font-semibold text-stone-700 transition-colors enabled:hover:text-[#4F7358] disabled:text-stone-300 dark:text-[#E4DDD0] dark:enabled:hover:text-[#7AAF87] dark:disabled:text-[#6B6460]"
                      >
                        {step.label}：{step.bookName} {step.chapter}
                      </button>
                      <p className="mt-1 text-sm leading-7 text-stone-500 dark:text-[#A09890]">{step.purpose}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Section>

        <Section eyebrow="Reflection" title="信仰反思">
          <div className="rounded-lg border border-[#4F7358]/20 bg-[#4F7358]/5 p-4 dark:border-[#7AAF87]/20 dark:bg-[#7AAF87]/5">
            <h3 className="text-sm font-semibold text-[#4F7358] dark:text-[#7AAF87]">{deepDive.reflection.theme}</h3>
            <div className="mt-4 space-y-4">
              {deepDive.reflection.prompts.map(prompt => (
                <div key={prompt.question}>
                  <p className="text-sm leading-7 text-stone-700 dark:text-[#E4DDD0]">{prompt.question}</p>
                  <p className="mt-1 text-xs leading-6 text-stone-500 dark:text-[#A09890]">{prompt.hint}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 border-t border-[#4F7358]/15 pt-4 text-sm leading-8 text-stone-600 dark:border-[#7AAF87]/15 dark:text-[#D4CEC4]">{deepDive.reflection.prayer}</p>
          </div>
        </Section>

        <Section eyebrow="Sources" title="資料來源">
          <ul className="space-y-2">
            {deepDive.sources.map(source => (
              <li key={source.url} className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">
                <a href={source.url} target="_blank" rel="noreferrer" className="font-medium text-[#4F7358] dark:text-[#7AAF87]">
                  {source.title}
                </a>
                <span className="text-stone-300 dark:text-[#6B6460]"> · {source.sourceName}</span>
                <span> — {source.note}</span>
              </li>
            ))}
          </ul>
        </Section>
      </article>
    </main>
  )
}

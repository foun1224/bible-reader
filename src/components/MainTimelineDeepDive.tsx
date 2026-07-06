import type { ReactNode } from 'react'
import { findTimelineDeepDive } from '../lib/timelineDeepDives'
import { TIMELINE_PERIODS } from '../lib/timelinePeriods'
import type { BibleData, Book } from '../types'

function Section({ id, eyebrow, title, children }: {
  id?: string
  eyebrow: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-6 border-t border-stone-200/70 pt-6 dark:border-[#2E3240]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">{eyebrow}</p>
      <h2 className="mt-1 text-base font-semibold text-stone-700 dark:text-[#E4DDD0]">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

function CollapsibleSection({ id, eyebrow, title, children, defaultOpen = false }: {
  id: string
  eyebrow: string
  title: string
  children: ReactNode
  defaultOpen?: boolean
}) {
  return (
    <details
      id={id}
      open={defaultOpen}
      className="group scroll-mt-6 rounded-lg border border-stone-200 bg-stone-50/55 dark:border-[#2E3240] dark:bg-[#22242C]/35"
    >
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 [&::-webkit-details-marker]:hidden">
        <span>
          <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">{eyebrow}</span>
          <span className="mt-0.5 block text-base font-semibold text-stone-700 dark:text-[#E4DDD0]">{title}</span>
        </span>
        <span className="text-sm text-stone-300 transition-transform duration-150 group-open:rotate-180 dark:text-[#6B6460]" aria-hidden="true">⌄</span>
      </summary>
      <div className="border-t border-stone-200/70 px-4 pb-4 pt-4 dark:border-[#2E3240]">{children}</div>
    </details>
  )
}

function ReadingMap({ items }: { items: Array<{ id: string; label: string }> }) {
  return (
    <nav className="rounded-lg border border-stone-200 bg-stone-50/70 p-3 dark:border-[#2E3240] dark:bg-[#22242C]/45" aria-label="本頁學習路線">
      <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">Learning route</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((item, index) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="inline-flex min-h-8 items-center rounded-full border border-stone-200 bg-stone-50 px-3 text-xs font-medium text-stone-500 transition-colors hover:border-[#4F7358]/25 hover:text-[#4F7358] dark:border-[#2E3240] dark:bg-[#17191E] dark:text-[#A09890] dark:hover:border-[#7AAF87]/25 dark:hover:text-[#7AAF87]"
          >
            {index + 1}. {item.label}
          </a>
        ))}
      </div>
    </nav>
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

        <ReadingMap
          items={[
            { id: 'learning', label: '學習導引' },
            ...(deepDive.sourceReading ? [{ id: 'source-reading', label: '史料細讀' }] : []),
            { id: 'world-context', label: '世界背景' },
            { id: 'scripture-books', label: '書卷導讀' },
            ...(deepDive.scriptureDeepRead ? [{ id: 'deep-read', label: '經文慢讀' }] : []),
            { id: 'reflection', label: '信仰反思' },
            ...(deepDive.todayReflection ? [{ id: 'today-reflection', label: '今日連結' }] : []),
            { id: 'sources', label: '資料來源' },
          ]}
        />

        <Section id="learning" eyebrow="Learning Guide" title="進入這個時代前，先抓住三個重點">
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

        {deepDive.sourceReading && (
          <CollapsibleSection id="source-reading" eyebrow="Primary Source" title={`代表史料細讀：${deepDive.sourceReading.artifactName}`}>
            <div className="rounded-lg border border-stone-200 bg-stone-50/70 dark:border-[#2E3240] dark:bg-[#22242C]/45 divide-y divide-stone-200/70 dark:divide-[#2E3240]">
              <div className="p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460] mb-1">這份史料是什麼</p>
                <p className="text-sm leading-8 text-stone-500 dark:text-[#A09890]">{deepDive.sourceReading.whatItIs}</p>
              </div>
              <div className="p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460] mb-1">如何閱讀這份史料</p>
                <p className="text-sm leading-8 text-stone-500 dark:text-[#A09890]">{deepDive.sourceReading.howToRead}</p>
              </div>
              <div className="p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460] mb-1">它告訴我們什麼</p>
                <p className="text-sm leading-8 text-stone-500 dark:text-[#A09890]">{deepDive.sourceReading.whatItTells}</p>
              </div>
              <div className="p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4F7358] dark:text-[#7AAF87] mb-1">連結到聖經</p>
                <p className="text-sm leading-7 text-stone-600 dark:text-[#D4CEC4]">{deepDive.sourceReading.connectionToScripture}</p>
              </div>
            </div>
          </CollapsibleSection>
        )}

        <CollapsibleSection id="world-context" eyebrow="World Context" title="世界背景：文化、人文與自然環境">
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
        </CollapsibleSection>

        <CollapsibleSection id="scripture-books" eyebrow="Scripture" title="聖經相關書卷">
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
        </CollapsibleSection>

        {deepDive.scriptureDeepRead && (
          <CollapsibleSection id="deep-read" eyebrow="Deep Read" title={`關鍵經文慢讀：${deepDive.scriptureDeepRead.reference}`}>
            <div className="rounded-lg border border-stone-200 bg-stone-50/70 dark:border-[#2E3240] dark:bg-[#22242C]/45 divide-y divide-stone-200/70 dark:divide-[#2E3240]">
              <div className="p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460] mb-1">背景脈絡</p>
                <p className="text-sm leading-8 text-stone-500 dark:text-[#A09890]">{deepDive.scriptureDeepRead.context}</p>
              </div>
              <div className="p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460] mb-2">慢讀時要注意</p>
                <div className="space-y-3">
                  {deepDive.scriptureDeepRead.keyObservations.map((obs, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#4F7358]/50 dark:bg-[#7AAF87]/50" />
                      <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{obs}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4F7358] dark:text-[#7AAF87] mb-1">信仰問題</p>
                <p className="text-sm leading-7 text-stone-700 dark:text-[#E4DDD0]">{deepDive.scriptureDeepRead.faithQuestion}</p>
              </div>
            </div>
          </CollapsibleSection>
        )}

        <CollapsibleSection id="reflection" eyebrow="Reflection" title="信仰反思" defaultOpen>
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
        </CollapsibleSection>

        {deepDive.todayReflection && (
          <CollapsibleSection id="today-reflection" eyebrow="Today" title="今日連結：從那個時代到你的生活" defaultOpen>
            <div className="rounded-lg border border-[#4F7358]/20 bg-[#4F7358]/5 p-5 dark:border-[#7AAF87]/20 dark:bg-[#7AAF87]/5 space-y-4">
              <p className="text-sm leading-8 text-stone-600 dark:text-[#D4CEC4]">{deepDive.todayReflection.bridge}</p>
              <p className="border-t border-[#4F7358]/15 pt-4 dark:border-[#7AAF87]/15 text-sm leading-7 text-stone-700 dark:text-[#E4DDD0] font-medium">{deepDive.todayReflection.question}</p>
            </div>
          </CollapsibleSection>
        )}

        <CollapsibleSection id="sources" eyebrow="Sources" title="資料來源">
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
        </CollapsibleSection>
      </article>
    </main>
  )
}

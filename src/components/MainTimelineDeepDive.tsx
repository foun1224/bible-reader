import { useState } from 'react'
import { TIMELINE_PERIODS } from '../lib/timelinePeriods'
import { getDeepDive } from '../lib/timelineDeepDives'
import type { SourceAsset, DeepDiveBlock, BookGuide, ReflectionPrompt } from '../lib/timelineDeepDives'

type Tab = 'world' | 'scripture' | 'reflection'

function ImageCard({ asset }: { asset: SourceAsset }) {
  const [imgError, setImgError] = useState(false)
  if (imgError) return null
  return (
    <figure className="mt-5 overflow-hidden rounded-xl border border-stone-200 dark:border-[#2E3240]">
      <img
        src={asset.imageUrl}
        alt={asset.caption}
        onError={() => setImgError(true)}
        className="w-full object-cover"
        loading="lazy"
      />
      <figcaption className="bg-stone-100/70 px-4 py-3 dark:bg-[#17191E]/80">
        <p className="text-xs leading-6 text-stone-500 dark:text-[#A09890]">{asset.caption}</p>
        <a
          href={asset.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 block text-[11px] text-stone-300 underline decoration-stone-300/40 hover:text-stone-400 dark:text-[#6B6460] dark:hover:text-[#A09890]"
        >
          {asset.sourceName} · {asset.license}
        </a>
      </figcaption>
    </figure>
  )
}

function ContentBlock({ block }: { block: DeepDiveBlock }) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">
        {block.heading}
      </h3>
      <p className="mt-3 text-sm leading-8 text-stone-500 dark:text-[#A09890]">{block.content}</p>
      {block.image && <ImageCard asset={block.image} />}
    </div>
  )
}

function BookGuideCard({ guide }: { guide: BookGuide }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border border-stone-200 dark:border-[#2E3240]">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <div className="flex items-baseline gap-3">
          <span className="text-sm font-semibold text-stone-700 dark:text-[#E4DDD0]">{guide.bookName}</span>
          <span className="text-[11px] text-stone-300 dark:text-[#6B6460]">{guide.genre}</span>
        </div>
        <span className="shrink-0 text-xs text-stone-300 dark:text-[#6B6460]">{open ? '收合' : '展開'}</span>
      </button>
      {open && (
        <div className="border-t border-stone-200/70 px-5 py-4 dark:border-[#2E3240]">
          <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{guide.position}</p>
          {guide.keyPassage && (
            <blockquote className="mt-4 rounded-lg border-l-2 border-[#4F7358]/40 bg-[#4F7358]/5 py-3 pl-4 pr-3 dark:border-[#7AAF87]/30 dark:bg-[#7AAF87]/5">
              <p className="text-sm leading-7 text-stone-600 dark:text-[#D4CEC4]">「{guide.keyPassage.text}」</p>
              <cite className="mt-1 block text-[11px] font-semibold not-italic text-[#4F7358] dark:text-[#7AAF87]">
                {guide.keyPassage.reference}
              </cite>
            </blockquote>
          )}
          <div className="mt-4 rounded-lg bg-stone-100/60 px-4 py-3 dark:bg-[#17191E]/60">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-300 dark:text-[#6B6460]">閱讀問題</p>
            <p className="mt-2 text-sm leading-7 text-stone-500 dark:text-[#A09890]">{guide.readingQuestion}</p>
          </div>
        </div>
      )}
    </div>
  )
}

function ReflectionCard({ prompt, index }: { prompt: ReflectionPrompt; index: number }) {
  return (
    <div className="flex gap-4">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-stone-100 text-[11px] font-semibold text-stone-400 dark:bg-[#22242C] dark:text-[#6B6460]">
        {index + 1}
      </span>
      <p className="text-sm leading-8 text-stone-500 dark:text-[#A09890]">{prompt.question}</p>
    </div>
  )
}

export default function MainTimelineDeepDive({
  periodId,
  onBack,
}: {
  periodId: string
  onBack: () => void
}) {
  const [tab, setTab] = useState<Tab>('world')
  const period = TIMELINE_PERIODS.find(p => p.id === periodId)
  const data = getDeepDive(periodId)

  if (!period) return null

  const tabs: { key: Tab; label: string }[] = [
    { key: 'world', label: '世界文化背景' },
    { key: 'scripture', label: '聖經書卷' },
    { key: 'reflection', label: '信仰反思' },
  ]

  return (
    <main className="flex-1 min-h-0 overflow-y-auto px-5 pb-24 pt-8 sm:px-8 sm:pb-12">
      <div className="mx-auto w-full max-w-3xl">
        {/* Header */}
        <div className="mb-7 flex items-center gap-3">
          <button
            onClick={onBack}
            className="h-9 w-9 rounded-full border border-stone-200 text-stone-400 transition-colors hover:bg-stone-100 dark:border-[#2E3240] dark:text-[#A09890] dark:hover:bg-[#22242C]"
            aria-label="返回時間軸"
          >
            ←
          </button>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">
              聖經時間軸 · 深入理解
            </p>
            <h1 className="text-lg font-semibold text-stone-700 dark:text-[#E4DDD0]">{period.name}</h1>
          </div>
        </div>

        {/* Period intro */}
        <div className="mb-7 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: period.accent }}
          >
            {period.dateRange}
          </span>
        </div>

        {data ? (
          <>
            {/* Thesis */}
            <blockquote className="mb-8 rounded-xl border border-stone-200/70 bg-stone-50/60 px-5 py-4 dark:border-[#2E3240] dark:bg-[#22242C]/40">
              <p className="text-base font-medium leading-8 text-stone-600 dark:text-[#D4CEC4]">
                {data.thesis}
              </p>
            </blockquote>

            {/* Tab bar */}
            <div className="mb-7 flex rounded-xl border border-stone-200 bg-stone-100/50 p-1 dark:border-[#2E3240] dark:bg-[#17191E]/60">
              {tabs.map(t => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-colors ${
                    tab === t.key
                      ? 'bg-white text-stone-700 shadow-sm dark:bg-[#22242C] dark:text-[#E4DDD0]'
                      : 'text-stone-400 hover:text-stone-500 dark:text-[#6B6460] dark:hover:text-[#A09890]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* World tab */}
            {tab === 'world' && (
              <div className="space-y-8">
                <ContentBlock block={data.world.culture} />
                <div className="border-t border-stone-200/70 pt-8 dark:border-[#2E3240]">
                  <ContentBlock block={data.world.humanity} />
                </div>
                <div className="border-t border-stone-200/70 pt-8 dark:border-[#2E3240]">
                  <ContentBlock block={data.world.environment} />
                </div>
                {data.world.artifacts.length > 0 && (
                  <div className="border-t border-stone-200/70 pt-8 dark:border-[#2E3240]">
                    <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">
                      文物與史料
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {data.world.artifacts.map(a => (
                        <ImageCard key={a.title} asset={a} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Scripture tab */}
            {tab === 'scripture' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">
                    時代概覽
                  </h3>
                  <p className="mt-3 text-sm leading-8 text-stone-500 dark:text-[#A09890]">{data.scripture.overview}</p>
                </div>

                <div className="border-t border-stone-200/70 pt-8 dark:border-[#2E3240]">
                  <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">
                    書卷導讀
                  </h3>
                  <div className="space-y-3">
                    {data.scripture.bookGuides.map(guide => (
                      <BookGuideCard key={guide.bookName} guide={guide} />
                    ))}
                  </div>
                </div>

                <div className="border-t border-stone-200/70 pt-8 dark:border-[#2E3240]">
                  <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">
                    建議閱讀路徑
                  </h3>
                  <ol className="space-y-2">
                    {data.scripture.readingPath.map((step, i) => (
                      <li key={step.reference} className="flex items-start gap-4">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
                          style={{ backgroundColor: period.accent }}>
                          {i + 1}
                        </span>
                        <div>
                          <span className="text-sm font-medium text-stone-600 dark:text-[#D4CEC4]">{step.label}</span>
                          <span className="ml-2 text-[11px] font-semibold text-[#4F7358] dark:text-[#7AAF87]">{step.reference}</span>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            {/* Reflection tab */}
            {tab === 'reflection' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">
                    時代主題
                  </h3>
                  <p className="mt-3 text-base font-semibold text-stone-700 dark:text-[#E4DDD0]">{data.reflection.theme}</p>
                </div>

                <div className="border-t border-stone-200/70 pt-8 dark:border-[#2E3240]">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">
                    神在這時代如何工作
                  </h3>
                  <p className="mt-3 text-sm leading-8 text-stone-500 dark:text-[#A09890]">{data.reflection.godAtWork}</p>
                </div>

                <div className="border-t border-stone-200/70 pt-8 dark:border-[#2E3240]">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">
                    人的信仰模式
                  </h3>
                  <p className="mt-3 text-sm leading-8 text-stone-500 dark:text-[#A09890]">{data.reflection.humanPattern}</p>
                </div>

                <div className="border-t border-stone-200/70 pt-8 dark:border-[#2E3240]">
                  <h3 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">
                    默想問題
                  </h3>
                  <div className="space-y-6">
                    {data.reflection.prompts.map((prompt, i) => (
                      <ReflectionCard key={i} prompt={prompt} index={i} />
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-[#4F7358]/20 bg-[#4F7358]/5 px-5 py-5 dark:border-[#7AAF87]/15 dark:bg-[#7AAF87]/5">
                  <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4F7358] dark:text-[#7AAF87]">
                    禱告
                  </h3>
                  <p className="text-sm leading-8 text-stone-500 dark:text-[#A09890]">{data.reflection.prayer}</p>
                </div>
              </div>
            )}

            {/* Sources */}
            <div className="mt-12 border-t border-stone-200/70 pt-8 dark:border-[#2E3240]">
              <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">
                資料來源
              </h3>
              <ul className="space-y-2">
                {data.sources.map(src => (
                  <li key={src.url}>
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-stone-400 underline decoration-stone-300/40 hover:text-stone-500 dark:text-[#6B6460] dark:hover:text-[#A09890]"
                    >
                      {src.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          /* Coming soon state */
          <div className="rounded-xl border border-stone-200 bg-stone-50/60 px-8 py-16 text-center dark:border-[#2E3240] dark:bg-[#22242C]/40">
            <p className="text-sm font-medium text-stone-400 dark:text-[#6B6460]">{period.name}</p>
            <p className="mt-2 text-sm text-stone-300 dark:text-[#4A4840]">深入內容整備中，敬請期待</p>
          </div>
        )}
      </div>
    </main>
  )
}

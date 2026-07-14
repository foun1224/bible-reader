import { APOSTLES_CREED } from '../lib/apostlesCreed'

export default function MainApostlesCreed({ onBack, onOpenArticle }: {
  onBack: () => void
  onOpenArticle: (articleId: string) => void
}) {
  const { title, subtitle, fullText, introduction, sources, articles } = APOSTLES_CREED

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
            <h1 className="text-lg font-semibold text-stone-700 dark:text-[#E4DDD0]">{title}</h1>
          </div>
        </div>

        <p className="mb-2 text-sm font-medium text-stone-600 dark:text-[#D4CEC4]">{subtitle}</p>
        <p className="mb-6 text-base leading-8 text-stone-600 dark:text-[#B8B0A6]">
          {introduction.whatItIs}
        </p>

        <section className="mb-8 overflow-hidden rounded-xl border border-[#4F7358]/20 bg-[#4F7358]/5 dark:border-[#7AAF87]/20 dark:bg-[#7AAF87]/5">
          <div className="border-b border-[#4F7358]/15 px-5 py-3 dark:border-[#7AAF87]/15">
            <p className="text-xs font-semibold text-[#4F7358] dark:text-[#8FC79D]">全文 · 可慢讀出聲</p>
          </div>
          <ol className="space-y-3 px-5 py-5">
            {fullText.map((line, i) => (
              <li key={i} className="flex gap-3 text-sm leading-8 text-stone-700 dark:text-[#E4DDD0]">
                <span className="mt-0.5 w-5 shrink-0 text-xs font-semibold text-[#4F7358]/80 dark:text-[#8FC79D]/80">
                  {i + 1}
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ol>
        </section>

        <div className="mb-8 space-y-3">
          <div className="rounded-lg border border-stone-200 bg-stone-50/70 p-4 dark:border-[#2E3240] dark:bg-[#22242C]/45">
            <p className="mb-1 text-xs font-semibold text-stone-500 dark:text-[#9B938B]">為什麼重要</p>
            <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{introduction.whyItMatters}</p>
          </div>
          <div className="rounded-lg border border-stone-200 bg-stone-50/70 p-4 dark:border-[#2E3240] dark:bg-[#22242C]/45">
            <p className="mb-1 text-xs font-semibold text-stone-500 dark:text-[#9B938B]">如何閱讀</p>
            <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{introduction.howToRead}</p>
          </div>
          <div className="rounded-lg border border-stone-200 bg-stone-50/70 p-4 dark:border-[#2E3240] dark:bg-[#22242C]/45">
            <p className="mb-1 text-xs font-semibold text-stone-500 dark:text-[#9B938B]">形成背景</p>
            <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{introduction.originNote}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="mb-1 text-xs font-semibold tracking-[0.08em] text-stone-500 dark:text-[#9B938B]">逐條細讀</p>
          <h2 className="text-base font-semibold text-stone-700 dark:text-[#E4DDD0]">十二條宣信</h2>
        </div>

        <div className="space-y-3">
          {articles.map(article => (
            <button
              key={article.articleId}
              type="button"
              onClick={() => onOpenArticle(article.articleId)}
              className="w-full rounded-xl border border-stone-200 bg-stone-50/60 p-4 text-left transition-colors hover:border-[#4F7358]/30 hover:bg-[#4F7358]/5 active:bg-[#4F7358]/10 dark:border-[#2E3240] dark:bg-[#22242C]/40 dark:hover:border-[#7AAF87]/30 dark:hover:bg-[#7AAF87]/5"
            >
              <div className="mb-1 flex items-baseline justify-between gap-2">
                <p className="text-xs font-semibold text-[#4F7358] dark:text-[#8FC79D]">第 {article.number} 條</p>
                <span className="text-xs text-stone-400 dark:text-[#6B6460]">細讀 →</span>
              </div>
              <p className="text-sm font-semibold text-stone-700 dark:text-[#E4DDD0]">{article.title}</p>
              <p className="mt-1 text-sm leading-7 text-stone-500 dark:text-[#A09890]">{article.text}</p>
            </button>
          ))}
        </div>

        <section className="mt-8 border-t border-stone-200/70 pt-8 dark:border-[#2E3240]">
          <p className="mb-3 text-xs font-semibold tracking-[0.08em] text-stone-500 dark:text-[#9B938B]">參考資料</p>
          <div className="space-y-2">
            {sources.map(source => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center justify-between rounded-lg border border-stone-300 px-4 py-3 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 active:bg-stone-200 dark:border-[#3A3E4A] dark:text-[#B8B0A6] dark:hover:bg-[#22242C]"
              >
                <span>{source.label}</span>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

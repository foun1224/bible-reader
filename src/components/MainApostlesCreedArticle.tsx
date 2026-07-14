import { APOSTLES_CREED, findCreedArticle } from '../lib/apostlesCreed'

function Section({ id, eyebrow, title, children }: {
  id?: string
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-6 border-t border-stone-200/70 pt-8 mt-8 dark:border-[#2E3240]">
      <p className="mb-1 text-xs font-semibold tracking-[0.08em] text-stone-500 dark:text-[#9B938B]">{eyebrow}</p>
      <h2 className="mb-4 text-base font-semibold text-stone-700 dark:text-[#E4DDD0]">{title}</h2>
      {children}
    </section>
  )
}

export default function MainApostlesCreedArticle({ articleId, onBack, onOpenArticle }: {
  articleId: string
  onBack: () => void
  onOpenArticle?: (articleId: string) => void
}) {
  const article = findCreedArticle(articleId)
  if (!article) return null

  const articles = APOSTLES_CREED.articles
  const index = articles.findIndex(a => a.articleId === articleId)
  const prevArticle = index > 0 ? articles[index - 1] : null
  const nextArticle = index >= 0 && index < articles.length - 1 ? articles[index + 1] : null

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
            <p className="text-xs font-semibold tracking-[0.08em] text-stone-500 dark:text-[#9B938B]">
              使徒信經 · 第 {article.number} / {articles.length} 條
            </p>
            <h1 className="text-lg font-semibold text-stone-700 dark:text-[#E4DDD0]">{article.title}</h1>
          </div>
        </div>

        <div className="rounded-xl border border-[#4F7358]/20 bg-[#4F7358]/5 p-5 dark:border-[#7AAF87]/20 dark:bg-[#7AAF87]/5">
          <p className="text-base font-medium leading-8 text-stone-700 dark:text-[#E4DDD0]">{article.text}</p>
          {article.latin && (
            <p className="mt-3 border-t border-[#4F7358]/15 pt-3 text-sm italic leading-7 text-stone-500 dark:border-[#7AAF87]/15 dark:text-[#A09890]">
              {article.latin}
            </p>
          )}
        </div>

        <p className="mt-5 text-sm leading-8 text-stone-600 dark:text-[#B8B0A6]">{article.summary}</p>

        <nav aria-label="本頁閱讀路徑" className="mt-6">
          <p className="mb-2 text-xs font-semibold text-stone-500 dark:text-[#9B938B]">閱讀路徑</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              ['#meaning', '肯定與拒絕'],
              ['#history', '歷史背景'],
              ['#scripture', '經文依據'],
              ['#reflection', '今日功課'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="flex min-h-11 items-center justify-center rounded-lg border border-stone-300 bg-stone-50 px-3 py-2 text-center text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 active:bg-stone-200 dark:border-[#3A3E4A] dark:bg-[#22242C]/45 dark:text-[#B8B0A6] dark:hover:bg-[#2A2D36]"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>

        <Section id="meaning" eyebrow="宣信內涵" title="這條在肯定什麼、拒絕什麼">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-[#4F7358]/25 bg-[#4F7358]/5 p-4 dark:border-[#7AAF87]/25 dark:bg-[#7AAF87]/5">
              <p className="mb-1 text-xs font-semibold text-[#4F7358] dark:text-[#8FC79D]">肯定</p>
              <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{article.affirms}</p>
            </div>
            <div className="rounded-lg border border-[#B7792B]/25 bg-[#B7792B]/5 p-4 dark:border-[#E0B665]/25 dark:bg-[#E0B665]/5">
              <p className="mb-1 text-xs font-semibold text-[#74501F] dark:text-[#E0B665]">拒絕／邊界</p>
              <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{article.rejects}</p>
            </div>
          </div>
        </Section>

        <Section id="history" eyebrow="形成與誤解" title="歷史中的這一句">
          <div className="space-y-3">
            <div className="rounded-lg border border-stone-200 bg-stone-50/70 p-4 dark:border-[#2E3240] dark:bg-[#22242C]/45">
              <p className="mb-1 text-xs font-semibold text-stone-500 dark:text-[#9B938B]">歷史筆記</p>
              <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{article.historicalNote}</p>
            </div>
            <div className="rounded-lg border border-stone-200 bg-stone-50/70 p-4 dark:border-[#2E3240] dark:bg-[#22242C]/45">
              <p className="mb-1 text-xs font-semibold text-stone-500 dark:text-[#9B938B]">常見誤解</p>
              <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{article.commonMisconception}</p>
            </div>
          </div>
        </Section>

        <Section id="scripture" eyebrow="聖經" title="經文依據">
          <div className="space-y-3">
            {article.scriptures.map(s => (
              <div key={s.reference} className="rounded-lg border border-stone-200 bg-stone-50/70 p-4 dark:border-[#2E3240] dark:bg-[#22242C]/45">
                <p className="text-sm font-semibold text-[#4F7358] dark:text-[#8FC79D]">{s.reference}</p>
                <p className="mt-1 text-sm leading-7 text-stone-500 dark:text-[#A09890]">{s.note}</p>
              </div>
            ))}
          </div>
        </Section>

        {article.todayReflection.length > 0 && (
          <Section id="reflection" eyebrow="今日連結" title="把這條宣信帶進生活">
            <div className="space-y-3">
              {article.todayReflection.map((r, i) => (
                <div key={i} className="rounded-lg border border-[#4F7358]/20 bg-[#4F7358]/5 p-4 dark:border-[#7AAF87]/20 dark:bg-[#7AAF87]/5">
                  <p className="text-sm font-medium leading-7 text-stone-700 dark:text-[#E4DDD0]">{r.question}</p>
                  <p className="mt-2 text-sm leading-7 text-stone-500 dark:text-[#A09890]">{r.prompt}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Prev / Next article */}
        {onOpenArticle && (prevArticle || nextArticle) && (
          <nav aria-label="上下條導覽" className="mt-8 border-t border-stone-200/70 pt-6 dark:border-[#2E3240]">
            <div className="flex gap-2">
              {prevArticle ? (
                <button
                  onClick={() => onOpenArticle(prevArticle.articleId)}
                  className="flex min-h-11 flex-1 flex-col items-start justify-center rounded-lg border border-stone-300 bg-stone-50 px-4 py-3 text-left transition-colors hover:bg-stone-100 active:bg-stone-200 dark:border-[#3A3E4A] dark:bg-[#22242C]/45 dark:hover:bg-[#2A2D36]"
                >
                  <span className="text-xs text-stone-400 dark:text-[#9B938B]">← 上一條・第 {prevArticle.number} 條</span>
                  <span className="mt-0.5 text-sm font-medium text-stone-600 dark:text-[#B8B0A6]">{prevArticle.title}</span>
                </button>
              ) : (
                <div className="flex-1" />
              )}
              {nextArticle ? (
                <button
                  onClick={() => onOpenArticle(nextArticle.articleId)}
                  className="flex min-h-11 flex-1 flex-col items-end justify-center rounded-lg border border-stone-300 bg-stone-50 px-4 py-3 text-right transition-colors hover:bg-stone-100 active:bg-stone-200 dark:border-[#3A3E4A] dark:bg-[#22242C]/45 dark:hover:bg-[#2A2D36]"
                >
                  <span className="text-xs text-stone-400 dark:text-[#9B938B]">下一條・第 {nextArticle.number} 條 →</span>
                  <span className="mt-0.5 text-sm font-medium text-stone-600 dark:text-[#B8B0A6]">{nextArticle.title}</span>
                </button>
              ) : (
                <div className="flex-1" />
              )}
            </div>
          </nav>
        )}
      </div>
    </main>
  )
}

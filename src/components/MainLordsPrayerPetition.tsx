import { findPrayerPetition, LORDS_PRAYER } from '../lib/lordsPrayer'

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

const KIND_LABEL: Record<string, string> = {
  address: '稱呼',
  petition: '祈求',
  doxology: '頌讚',
}

export default function MainLordsPrayerPetition({ petitionId, onBack, onOpenPetition }: {
  petitionId: string
  onBack: () => void
  onOpenPetition: (petitionId: string) => void
}) {
  const petition = findPrayerPetition(petitionId)
  if (!petition) return null

  const index = LORDS_PRAYER.petitions.findIndex(p => p.petitionId === petitionId)
  const previous = LORDS_PRAYER.petitions[index - 1]
  const next = LORDS_PRAYER.petitions[index + 1]
  const total = LORDS_PRAYER.petitions.length

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
              主禱文 · {KIND_LABEL[petition.kind] ?? '段落'} {petition.number} / {total}
            </p>
            <h1 className="text-lg font-semibold text-stone-700 dark:text-[#E4DDD0]">{petition.title}</h1>
          </div>
        </div>

        <div className="rounded-xl border border-[#4F7358]/20 bg-[#4F7358]/5 p-5 dark:border-[#7AAF87]/20 dark:bg-[#7AAF87]/5">
          <p className="text-base font-medium leading-8 text-stone-700 dark:text-[#E4DDD0]">{petition.text}</p>
          {petition.latin && (
            <p className="mt-3 border-t border-[#4F7358]/15 pt-3 text-sm italic leading-7 text-stone-500 dark:border-[#7AAF87]/15 dark:text-[#A09890]">
              {petition.latin}
            </p>
          )}
        </div>

        <p className="mt-5 text-sm leading-8 text-stone-600 dark:text-[#B8B0A6]">{petition.summary}</p>

        <nav aria-label="本頁閱讀路徑" className="mt-6">
          <p className="mb-2 text-xs font-semibold text-stone-500 dark:text-[#9B938B]">閱讀路徑</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              ['#meaning', '教導與警戒'],
              ['#history', '背景與誤解'],
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

        <Section id="meaning" eyebrow="禱告內涵" title="這一句在教導什麼、警戒什麼">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-[#4F7358]/25 bg-[#4F7358]/5 p-4 dark:border-[#7AAF87]/25 dark:bg-[#7AAF87]/5">
              <p className="mb-1 text-xs font-semibold text-[#4F7358] dark:text-[#8FC79D]">教導</p>
              <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{petition.teaches}</p>
            </div>
            <div className="rounded-lg border border-[#B7792B]/25 bg-[#B7792B]/5 p-4 dark:border-[#E0B665]/25 dark:bg-[#E0B665]/5">
              <p className="mb-1 text-xs font-semibold text-[#74501F] dark:text-[#E0B665]">警戒／拒絕</p>
              <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{petition.praysAgainst}</p>
            </div>
          </div>
        </Section>

        <Section id="history" eyebrow="形成與誤解" title="歷史中的這一求">
          <div className="space-y-3">
            <div className="rounded-lg border border-stone-200 bg-stone-50/70 p-4 dark:border-[#2E3240] dark:bg-[#22242C]/45">
              <p className="mb-1 text-xs font-semibold text-stone-500 dark:text-[#9B938B]">歷史筆記</p>
              <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{petition.historicalNote}</p>
            </div>
            <div className="rounded-lg border border-stone-200 bg-stone-50/70 p-4 dark:border-[#2E3240] dark:bg-[#22242C]/45">
              <p className="mb-1 text-xs font-semibold text-stone-500 dark:text-[#9B938B]">常見誤解</p>
              <p className="text-sm leading-7 text-stone-500 dark:text-[#A09890]">{petition.commonMisconception}</p>
            </div>
          </div>
        </Section>

        <Section id="scripture" eyebrow="聖經" title="經文依據">
          <div className="space-y-3">
            {petition.scriptures.map(s => (
              <div key={s.reference} className="rounded-lg border border-stone-200 bg-stone-50/70 p-4 dark:border-[#2E3240] dark:bg-[#22242C]/45">
                <p className="text-sm font-semibold text-[#4F7358] dark:text-[#8FC79D]">{s.reference}</p>
                <p className="mt-1 text-sm leading-7 text-stone-500 dark:text-[#A09890]">{s.note}</p>
              </div>
            ))}
          </div>
        </Section>

        {petition.todayReflection.length > 0 && (
          <Section id="reflection" eyebrow="今日連結" title="把這一求帶進生活">
            <div className="space-y-3">
              {petition.todayReflection.map((r, i) => (
                <div key={i} className="rounded-lg border border-[#4F7358]/20 bg-[#4F7358]/5 p-4 dark:border-[#7AAF87]/20 dark:bg-[#7AAF87]/5">
                  <p className="text-sm font-medium leading-7 text-stone-700 dark:text-[#E4DDD0]">{r.question}</p>
                  <p className="mt-2 text-sm leading-7 text-stone-500 dark:text-[#A09890]">{r.prompt}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        <div className="mt-10 flex gap-3 border-t border-stone-200/70 pt-6 dark:border-[#2E3240]">
          <button
            type="button"
            disabled={!previous}
            onClick={() => previous && onOpenPetition(previous.petitionId)}
            className="flex min-h-11 flex-1 items-center justify-center rounded-lg border border-stone-300 px-3 text-sm font-medium text-stone-600 transition-colors enabled:hover:bg-stone-100 enabled:active:bg-stone-200 disabled:cursor-not-allowed disabled:opacity-40 dark:border-[#3A3E4A] dark:text-[#B8B0A6] dark:enabled:hover:bg-[#22242C]"
          >
            ← 上一句
          </button>
          <button
            type="button"
            disabled={!next}
            onClick={() => next && onOpenPetition(next.petitionId)}
            className="flex min-h-11 flex-1 items-center justify-center rounded-lg border border-stone-300 px-3 text-sm font-medium text-stone-600 transition-colors enabled:hover:bg-stone-100 enabled:active:bg-stone-200 disabled:cursor-not-allowed disabled:opacity-40 dark:border-[#3A3E4A] dark:text-[#B8B0A6] dark:enabled:hover:bg-[#22242C]"
          >
            下一句 →
          </button>
        </div>
      </div>
    </main>
  )
}

import { CURRICULUM_CATEGORIES } from '../lib/bookCourses'

export default function MainCurriculum({ onBack }: { onBack: () => void }) {
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">線上教材</p>
            <h1 className="text-lg font-semibold text-stone-700 dark:text-[#E4DDD0]">聖經教材導引</h1>
          </div>
        </div>

        <p className="mb-8 text-sm leading-8 text-stone-500 dark:text-[#A09890]">
          這裡收錄不限定單一書卷的課程：讀經方法、聖經導讀、神學主題與信仰生活。單卷教材仍放在各書卷展開後的「教材」入口。
        </p>

        <div className="space-y-8">
          {CURRICULUM_CATEGORIES.map(category => (
            <section key={category.id} className="border-t border-stone-200/70 pt-5 dark:border-[#2E3240]">
              <div className="mb-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">{category.eyebrow}</p>
                <h2 className="mt-1 text-base font-semibold text-stone-700 dark:text-[#E4DDD0]">{category.title}</h2>
                <p className="mt-1 text-sm leading-7 text-stone-400 dark:text-[#A09890]">{category.description}</p>
              </div>

              <div className="flex flex-col gap-2">
                {category.items.map(item => (
                  <a
                    key={item.url}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-stone-200 px-5 py-4 transition-colors hover:border-[#4F7358]/50 hover:bg-[#4F7358]/5 dark:border-[#2E3240] dark:hover:border-[#7AAF87]/40 dark:hover:bg-[#7AAF87]/5"
                  >
                    <div>
                      <p className="text-sm font-medium text-stone-600 transition-colors group-hover:text-[#4F7358] dark:text-[#D4CEC4] dark:group-hover:text-[#7AAF87]">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-[11px] text-stone-300 dark:text-[#6B6460]">{item.description}</p>
                    </div>
                    <span className="ml-3 shrink-0 text-sm text-stone-300 transition-colors group-hover:text-[#4F7358] dark:text-[#6B6460] dark:group-hover:text-[#7AAF87]">↗</span>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-8 text-[11px] text-stone-300 dark:text-[#6B6460]">
          課程來源：<a href="https://fungclass.fhl.net/smartphone.html" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-stone-400 dark:hover:text-[#A09890]">多媒體聖經學苑</a>
        </p>
      </div>
    </main>
  )
}

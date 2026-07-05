import { BOOK_COURSES } from '../lib/bookCourses'

export default function MainBookCourses({ bookName, onBack }: {
  bookName: string
  onBack: () => void
}) {
  const courses = BOOK_COURSES[bookName] ?? []

  return (
    <main className="flex-1 min-h-0 overflow-y-auto px-5 pb-24 pt-8 sm:px-8 sm:pb-12">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={onBack}
            className="h-9 w-9 rounded-full border border-stone-200 dark:border-[#2E3240] text-stone-400 dark:text-[#A09890] hover:bg-stone-100 dark:hover:bg-[#22242C] transition-colors"
            aria-label="返回"
          >
            ←
          </button>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] text-stone-300 dark:text-[#6B6460] uppercase">線上教材</p>
            <h1 className="text-lg font-semibold text-stone-700 dark:text-[#E4DDD0]">{bookName}</h1>
          </div>
        </div>

        {courses.length === 0 ? (
          <p className="py-16 text-center text-sm text-stone-300 dark:text-[#6B6460]">此書卷暫無對應線上教材</p>
        ) : (
          <div className="flex flex-col gap-3">
            {courses.map((c) => (
              <a
                key={c.url}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-stone-200 dark:border-[#2E3240] px-5 py-4 transition-colors hover:border-[#4F7358]/50 hover:bg-[#4F7358]/5 dark:hover:border-[#7AAF87]/40 dark:hover:bg-[#7AAF87]/5"
              >
                <div>
                  <p className="text-sm font-medium text-stone-600 dark:text-[#D4CEC4] group-hover:text-[#4F7358] dark:group-hover:text-[#7AAF87] transition-colors">
                    {c.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-stone-300 dark:text-[#6B6460]">
                    {c.instructor === '多媒體聖經學苑' ? c.instructor : `${c.instructor} · 多媒體聖經學苑`}
                  </p>
                </div>
                <span className="ml-3 shrink-0 text-stone-300 dark:text-[#6B6460] group-hover:text-[#4F7358] dark:group-hover:text-[#7AAF87] transition-colors">↗</span>
              </a>
            ))}
          </div>
        )}

        <p className="mt-8 text-[11px] text-stone-300 dark:text-[#6B6460]">
          課程來源：<a href="https://fungclass.fhl.net/smartphone.html" target="_blank" rel="noopener noreferrer" className="hover:text-stone-400 dark:hover:text-[#A09890] transition-colors">多媒體聖經學苑</a>
        </p>
      </div>
    </main>
  )
}

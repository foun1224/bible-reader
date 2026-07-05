import { TIMELINE_PERIODS, type TimelinePeriod } from '../lib/timelinePeriods'

function PeriodCard({ period, onSelectBook }: {
  period: TimelinePeriod
  onSelectBook: (bookName: string) => void
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-stone-200 dark:border-[#2E3240]">
      <div className="flex">
        <div className="w-1 shrink-0" style={{ backgroundColor: period.accent }} />
        <div className="flex-1 px-5 py-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">
            {period.dateRange}
          </p>
          <h2 className="mt-0.5 text-base font-semibold text-stone-700 dark:text-[#E4DDD0]">
            {period.name}
          </h2>

          <p className="mt-3 text-sm leading-7 text-stone-500 dark:text-[#A09890]">
            {period.summary}
          </p>

          <ul className="mt-3 space-y-1.5">
            {period.keyEvents.map((event) => (
              <li key={event} className="flex items-start gap-2 text-[12px] text-stone-400 dark:text-[#6B6460]">
                <span
                  className="mt-[6px] h-1 w-1 shrink-0 rounded-full"
                  style={{ backgroundColor: period.accent, opacity: 0.6 }}
                />
                {event}
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t border-stone-100 pt-3 dark:border-[#2E3240]">
            {period.books.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {period.books.map((bookName) => (
                  <button
                    key={bookName}
                    onClick={() => onSelectBook(bookName)}
                    className="rounded-md bg-stone-100 px-2.5 py-1 text-[11px] font-medium text-stone-400 transition-colors hover:bg-stone-200 hover:text-stone-700 dark:bg-[#17191E] dark:text-[#A09890] dark:hover:bg-[#22242C] dark:hover:text-[#E4DDD0]"
                  >
                    {bookName}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-stone-300 dark:text-[#6B6460]">
                此時期無正典書卷
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MainTimeline({ onBack, onSelectBook }: {
  onBack: () => void
  onSelectBook: (bookName: string) => void
}) {
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">探索</p>
            <h1 className="text-lg font-semibold text-stone-700 dark:text-[#E4DDD0]">聖經時間軸</h1>
          </div>
        </div>

        <p className="mb-8 text-sm leading-7 text-stone-500 dark:text-[#A09890]">
          從先祖時代到初期教會，橫跨約兩千年的救贖歷史。點選書卷名稱，可直接跳至該書第一章。
        </p>

        <div className="flex flex-col gap-4">
          {TIMELINE_PERIODS.map((period) => (
            <PeriodCard key={period.id} period={period} onSelectBook={onSelectBook} />
          ))}
        </div>

        <p className="mt-8 text-[11px] text-stone-300 dark:text-[#6B6460]">
          時期劃分參考 ESV Study Bible 聖經歷史時間軸，僅供導讀參考。
        </p>
      </div>
    </main>
  )
}

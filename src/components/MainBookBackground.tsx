import { useEffect, useState } from 'react'

export default function MainBookBackground({ bookName, onBack }: {
  bookName: string
  onBack: () => void
}) {
  const [text, setText] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}book-backgrounds.json`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((data: Record<string, string>) => setText(data[bookName] ?? null))
      .catch(() => setText(null))
  }, [bookName])

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
            <p className="text-[11px] font-semibold tracking-[0.18em] text-stone-300 dark:text-[#6B6460] uppercase">書卷背景</p>
            <h1 className="text-lg font-semibold text-stone-700 dark:text-[#E4DDD0]">{bookName}</h1>
          </div>
        </div>

        {text === null && (
          <p className="py-16 text-center text-sm text-stone-300 dark:text-[#6B6460]">載入中…</p>
        )}

        {text && (
          <div className="prose prose-stone dark:prose-invert max-w-none">
            <div className="text-sm leading-8 text-stone-600 dark:text-[#D4CEC4] whitespace-pre-wrap">
              {text}
            </div>
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-stone-200/70 dark:border-[#2E3240]">
          <a
            href="https://a2z.fhl.net/bible/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-stone-300 transition-colors hover:text-stone-400 dark:text-[#6B6460] dark:hover:text-[#A09890]"
          >
            資料來源：信望愛 a2z.fhl.net
          </a>
        </div>
      </div>
    </main>
  )
}

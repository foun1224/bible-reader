import { useEffect, useState } from 'react'
import type { Book } from '../types'

type BookIntros = Record<string, string>

export default function MainBookIntro({ book, onOpenChapter }: {
  book: Book
  onOpenChapter: () => void
}) {
  const [intros, setIntros] = useState<BookIntros | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (intros) return
    setLoading(true)
    setError(false)
    fetch(`${import.meta.env.BASE_URL}book-intros.json`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((data: BookIntros) => { setIntros(data); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [intros])

  const intro = intros?.[book.name]

  return (
    <main className="flex-1 min-h-0 overflow-y-auto px-5 pb-24 pt-8 sm:px-8 sm:pb-12">
      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-8 space-y-2">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#4F7358] dark:text-[#7AAF87] uppercase">書卷簡介</p>
          <h1 className="text-3xl font-semibold text-stone-700 dark:text-[#E4DDD0]">{book.name}</h1>
          <button
            onClick={onOpenChapter}
            className="mt-2 rounded-md border border-[#4F7358] px-3 py-2 text-xs font-medium text-[#4F7358] transition-colors hover:bg-[#4F7358]/10 dark:border-[#7AAF87] dark:text-[#7AAF87] dark:hover:bg-[#7AAF87]/10"
          >
            開始閱讀第 1 章 →
          </button>
        </header>

        {loading && (
          <div className="flex h-40 items-center justify-center text-sm text-stone-300 dark:text-[#6B6460]">
            <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-stone-200 border-t-[#4F7358]" />
            載入書卷資料…
          </div>
        )}

        {error && (
          <p className="py-16 text-center text-sm text-stone-300 dark:text-[#6B6460]">無法載入書卷簡介</p>
        )}

        {intros && !intro && !loading && (
          <p className="py-16 text-center text-sm text-stone-300 dark:text-[#6B6460]">此書卷暫無簡介資料</p>
        )}

        {intro && (
          <div className="border-t border-stone-200/70 dark:border-[#2E3240] pt-6">
            <pre className="whitespace-pre-wrap font-[inherit] text-sm leading-7 text-stone-600 dark:text-[#D4CEC4]">
              {intro}
            </pre>
            <p className="mt-8 text-[11px] text-stone-300 dark:text-[#6B6460]">
              資料來源：a2z.fhl.net
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

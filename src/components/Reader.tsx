import { useEffect, useRef } from 'react'
import type { Chapter } from '../types'

interface Props {
  chapter: Chapter | null
  fontSize: string
}

export default function Reader({ chapter, fontSize }: Props) {
  const topRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    topRef.current?.parentElement?.scrollTo(0, 0)
  }, [chapter])

  if (!chapter) {
    return (
      <div className="flex-1 flex items-center justify-center text-stone-400 dark:text-stone-500">
        請從左側選擇書卷與章節
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div ref={topRef} />
        <div className={`leading-loose ${fontSize} text-stone-800 dark:text-stone-200 space-y-0.5`}>
          {chapter.verses.map(v => (
            <p key={v.number} className="flex gap-2 hover:bg-amber-50 dark:hover:bg-amber-900/10 rounded px-1 -mx-1 transition-colors">
              <span className="text-amber-500 dark:text-amber-400 font-mono text-xs mt-1.5 shrink-0 w-8 text-right select-none">
                {v.number}
              </span>
              <span>{v.text}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

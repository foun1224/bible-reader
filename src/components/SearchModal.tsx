import { useState, useEffect, useRef, useMemo } from 'react'
import type { BibleData } from '../types'

interface SearchHit {
  bookName: string
  bookId: number
  chapter: number
  verse: number
  text: string
}

interface Props {
  isOpen: boolean
  onClose: () => void
  ckjv: BibleData | null
  onJumpTo: (sourceId: 'ckjv' | 'jasher', bookId: number | undefined, chapter: number) => void
}

function highlight(text: string, query: string): React.ReactNode {
  if (!query) return text
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'))
  return parts.map((p, i) =>
    p.toLowerCase() === query.toLowerCase()
      ? <mark key={i} className="bg-sage/30 dark:bg-sage-dark/30 text-inherit rounded-sm">{p}</mark>
      : p
  )
}

const MAX_RESULTS = 60

export default function SearchModal({ isOpen, onClose, ckjv, onJumpTo }: Props) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const hits = useMemo<SearchHit[]>(() => {
    const q = query.trim()
    if (!ckjv || q.length < 2) return []
    const results: SearchHit[] = []
    const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
    for (const book of ckjv.books) {
      for (const ch of book.chapters) {
        for (const v of ch.verses) {
          if (re.test(v.text)) {
            results.push({ bookName: book.name, bookId: book.id as number, chapter: ch.number, verse: v.number, text: v.text })
            if (results.length >= MAX_RESULTS) return results
          }
        }
      }
    }
    return results
  }, [query, ckjv])

  function handleJump(hit: SearchHit) {
    onJumpTo('ckjv', hit.bookId, hit.chapter)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center pt-[10vh] px-4 bg-black/50 backdrop-blur-[2px]" onClick={onClose}>
      <div
        className="w-full max-w-xl bg-stone-50 dark:bg-[#22242C] rounded-2xl shadow-2xl border border-stone-200 dark:border-[#2E3240] flex flex-col overflow-hidden"
        style={{ maxHeight: '70vh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-stone-200 dark:border-[#2E3240] shrink-0">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="text-stone-400 dark:text-[#A09890] shrink-0">
            <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="搜尋經文…"
            className="flex-1 text-sm bg-transparent text-stone-600 dark:text-[#E4DDD0] placeholder-stone-300 dark:placeholder-[#6B6460] outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-stone-300 dark:text-[#6B6460] hover:text-stone-400 dark:hover:text-[#A09890] text-lg leading-none">
              ×
            </button>
          )}
          <kbd className="hidden sm:inline text-[10px] px-1.5 py-0.5 rounded border border-stone-200 dark:border-[#2E3240] text-stone-300 dark:text-[#6B6460]">
            Esc
          </kbd>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto">
          {query.trim().length < 2 && (
            <p className="px-5 py-6 text-sm text-stone-300 dark:text-[#6B6460] text-center">
              輸入至少 2 個字開始搜尋
            </p>
          )}

          {query.trim().length >= 2 && hits.length === 0 && (
            <p className="px-5 py-6 text-sm text-stone-300 dark:text-[#6B6460] text-center">
              找不到符合「{query}」的經文
            </p>
          )}

          {hits.length > 0 && (
            <>
              <p className="px-4 pt-2.5 pb-1 text-[10px] text-stone-300 dark:text-[#6B6460] tracking-widest uppercase">
                {hits.length < MAX_RESULTS ? `${hits.length} 筆結果` : `前 ${MAX_RESULTS} 筆結果`}
              </p>
              <ul>
                {hits.map((h, i) => (
                  <li key={i}>
                    <button
                      onClick={() => handleJump(h)}
                      className="w-full text-left px-4 py-2.5 hover:bg-stone-100 dark:hover:bg-[#17191E] transition-colors group"
                    >
                      <span className="text-[10px] font-medium text-sage dark:text-sage-dark mr-2 shrink-0">
                        {h.bookName} {h.chapter}:{h.verse}
                      </span>
                      <span className="text-sm text-stone-500 dark:text-[#E4DDD0] leading-snug">
                        {highlight(h.text, query.trim())}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="h-2" />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

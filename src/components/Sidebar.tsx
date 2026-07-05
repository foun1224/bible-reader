import { useState, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import type {
  BibleData, JasherData, Book, Chapter, CompletionRecord,
} from '../types'

// ── Props ─────────────────────────────────────────────────────────────────────
interface Props {
  ckjv: BibleData | null
  jasher: JasherData | null
  source: 'ckjv' | 'jasher'
  activeBook: Book | null
  activeChapter: Chapter | null
  onSelectCkjvChapter: (book: Book, chapter: Chapter) => void
  onSelectJasherChapter: (chapter: Chapter) => void
  isOpen: boolean
  onClose: () => void
  completions: CompletionRecord[]
  currentChapterLabel: string
  onSelectBookBackground: (bookName: string) => void
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Sidebar({
  ckjv, jasher, source, activeBook, activeChapter,
  onSelectCkjvChapter, onSelectJasherChapter,
  isOpen, onClose, completions,
  currentChapterLabel,
  onSelectBookBackground,
}: Props) {

  const [expandedBook, setExpandedBook] = useState<number | string | null>(activeBook?.id ?? null)
  const [showJasher, setShowJasher] = useState(source === 'jasher')
  const [oldExpanded, setOldExpanded] = useState(true)
  const [newExpanded, setNewExpanded] = useState(true)

  useEffect(() => {
    if (activeBook?.id != null) setExpandedBook(activeBook.id)
  }, [activeBook?.id])

  const oldTestament = ckjv?.books.filter(b => b.testament === '舊約') ?? []
  const newTestament = ckjv?.books.filter(b => b.testament === '新約') ?? []

  const isCkjvCompleted = (book: Book, chNum: number) =>
    completions.some(r => r.sourceId === 'ckjv' && r.bookId === (book.id as number) && r.chapter === chNum)
  const isJasherCompleted = (chNum: number) =>
    completions.some(r => r.sourceId === 'jasher' && r.chapter === chNum)

  const sidebarContent = (
    <div className="flex-1 min-h-0 overflow-hidden">
      <ScriptureContent
        ckjv={ckjv}
        oldTestament={oldTestament}
        newTestament={newTestament}
        oldExpanded={oldExpanded}
        setOldExpanded={setOldExpanded}
        newExpanded={newExpanded}
        setNewExpanded={setNewExpanded}
        jasher={jasher}
        source={source}
        activeBook={activeBook}
        activeChapter={activeChapter}
        showJasher={showJasher}
        setShowJasher={setShowJasher}
        expandedBook={expandedBook}
        setExpandedBook={setExpandedBook}
        isCkjvCompleted={isCkjvCompleted}
        isJasherCompleted={isJasherCompleted}
        onSelectCkjvChapter={onSelectCkjvChapter}
        onSelectJasherChapter={onSelectJasherChapter}
        onClose={onClose}
        currentChapterLabel={currentChapterLabel}
        onSelectBookBackground={onSelectBookBackground}
      />
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden sm:flex w-72 shrink-0 flex-col border-r border-stone-200 dark:border-[#2E3240] bg-stone-100 dark:bg-[#22242C] overflow-hidden">
        <div className="shrink-0 border-b border-stone-200 dark:border-[#2E3240] px-3 py-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">你的人生</p>
            <p className="text-[10px] italic text-stone-300 dark:text-[#6B6460]">Your Life</p>
          </div>
        </div>
        {sidebarContent}
      </div>

      {/* Mobile sidebar overlay */}
      <div
        className={`sm:hidden fixed top-0 left-0 z-30 h-dvh w-[85vw] max-w-xs flex flex-col
          border-r border-stone-200 dark:border-[#2E3240] bg-stone-100 dark:bg-[#22242C]
          transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="flex items-center justify-between px-3 py-3 border-b border-stone-200 dark:border-[#2E3240] shrink-0">
          <div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">你的人生</p>
              <p className="text-[10px] italic text-stone-300 dark:text-[#6B6460]">Your Life</p>
            </div>
            <p className="mt-1 text-base font-medium text-stone-600 dark:text-[#E4DDD0]">目錄</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-stone-300 dark:text-[#6B6460] hover:bg-stone-200 dark:hover:bg-[#2E3240] transition-colors"
            aria-label="關閉目錄"
          >
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        {sidebarContent}
      </div>
    </>
  )
}

// ── 經文 tab ──────────────────────────────────────────────────────────────────
interface ScriptureProps {
  ckjv: BibleData | null
  oldTestament: Book[]
  newTestament: Book[]
  oldExpanded: boolean
  setOldExpanded: (v: boolean) => void
  newExpanded: boolean
  setNewExpanded: (v: boolean) => void
  jasher: JasherData | null
  source: 'ckjv' | 'jasher'
  activeBook: Book | null
  activeChapter: Chapter | null
  showJasher: boolean
  setShowJasher: (v: boolean) => void
  expandedBook: number | string | null
  setExpandedBook: (v: number | string | null) => void
  isCkjvCompleted: (book: Book, chNum: number) => boolean
  isJasherCompleted: (chNum: number) => boolean
  onSelectCkjvChapter: (book: Book, chapter: Chapter) => void
  onSelectJasherChapter: (chapter: Chapter) => void
  onClose: () => void
  currentChapterLabel: string
  onSelectBookBackground: (bookName: string) => void
}

function ScriptureContent({
  ckjv,
  oldTestament, newTestament,
  oldExpanded, setOldExpanded,
  newExpanded, setNewExpanded,
  jasher, source, activeBook, activeChapter,
  showJasher, setShowJasher, expandedBook, setExpandedBook,
  isCkjvCompleted, isJasherCompleted,
  onSelectCkjvChapter, onSelectJasherChapter,
  onClose,
  currentChapterLabel,
  onSelectBookBackground,
}: ScriptureProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const q = searchQuery.trim().toLowerCase()
  const filteredOld = q ? oldTestament.filter(b => b.name.toLowerCase().includes(q)) : oldTestament
  const filteredNew = q ? newTestament.filter(b => b.name.toLowerCase().includes(q)) : newTestament
  const allFiltered = [...filteredOld, ...filteredNew]

  useEffect(() => {
    if (q && allFiltered.length === 1) setExpandedBook(allFiltered[0].id)
  }, [q, allFiltered.length])

  useEffect(() => {
    if (!expandedBook || !scrollRef.current) return
    const el = scrollRef.current.querySelector(`[data-book-id="${expandedBook}"]`)
    if (el) el.scrollIntoView({ block: 'nearest' })
  }, [expandedBook])


  const BOOK_CATEGORY: Record<string, string> = {
    // 摩西五經
    '創世記': '摩西五經', '出埃及記': '摩西五經', '利未記': '摩西五經',
    '民數記': '摩西五經', '申命記': '摩西五經',
    // 歷史書 (OT)
    '約書亞記': '歷史書', '士師記': '歷史書', '路得記': '歷史書',
    '撒母耳記上': '歷史書', '撒母耳記下': '歷史書',
    '列王紀上': '歷史書', '列王紀下': '歷史書',
    '歷代志上': '歷史書', '歷代志下': '歷史書',
    '以斯拉記': '歷史書', '尼希米記': '歷史書', '以斯帖記': '歷史書',
    // 詩歌書
    '約伯記': '詩歌書', '詩篇': '詩歌書', '箴言': '詩歌書',
    '傳道書': '詩歌書', '雅歌': '詩歌書',
    // 大先知書
    '以賽亞書': '大先知書', '耶利米書': '大先知書', '耶利米哀歌': '大先知書',
    '以西結書': '大先知書', '但以理書': '大先知書',
    // 小先知書
    '何西阿書': '小先知書', '約珥書': '小先知書', '阿摩司書': '小先知書',
    '俄巴底亞書': '小先知書', '約拿書': '小先知書', '彌迦書': '小先知書',
    '那鴻書': '小先知書', '哈巴谷書': '小先知書', '西番雅書': '小先知書',
    '哈該書': '小先知書', '撒迦利亞書': '小先知書', '瑪拉基書': '小先知書',
    // 福音書
    '馬太福音': '福音書', '馬可福音': '福音書', '路加福音': '福音書', '約翰福音': '福音書',
    // 歷史書 (NT)
    '使徒行傳': '歷史書',
    // 保羅書信
    '羅馬書': '保羅書信', '哥林多前書': '保羅書信', '哥林多後書': '保羅書信',
    '加拉太書': '保羅書信', '以弗所書': '保羅書信', '腓立比書': '保羅書信',
    '歌羅西書': '保羅書信', '帖撒羅尼迦前書': '保羅書信', '帖撒羅尼迦後書': '保羅書信',
    '提摩太前書': '保羅書信', '提摩太後書': '保羅書信', '提多書': '保羅書信',
    '腓利門書': '保羅書信',
    // 普通書信
    '希伯來書': '普通書信', '雅各書': '普通書信',
    '彼得前書': '普通書信', '彼得後書': '普通書信',
    '約翰一書': '普通書信', '約翰二書': '普通書信', '約翰三書': '普通書信',
    '猶大書': '普通書信',
    // 啟示錄
    '啟示錄': '啟示錄',
  }

  function renderBookList(books: Book[]) {
    const items: ReactNode[] = []
    let lastCategory = ''
    for (const book of books) {
      const category = BOOK_CATEGORY[book.name] ?? ''
      if (!q && category && category !== lastCategory) {
        lastCategory = category
        items.push(
          <p key={`cat-${category}-${book.name}`} className="px-6 pt-3 pb-1 text-[10px] font-semibold tracking-[0.16em] text-stone-300 dark:text-[#4A4840] uppercase">
            {category}
          </p>
        )
      }
      const isExpanded = expandedBook === book.id
      const isActive = source === 'ckjv' && activeBook?.id === book.id
      items.push(
        <div key={book.id} data-book-id={book.id}>
          <button
            onClick={() => {
              setExpandedBook(isExpanded ? null : book.id)
              setShowJasher(false)
            }}
            title={book.name}
            className={`w-full text-left pl-6 pr-3 py-2.5 text-sm rounded-md transition-colors
              ${isActive
                ? 'bg-stone-200 dark:bg-[#2E3240] text-sage dark:text-sage-dark font-medium'
                : 'text-stone-400 dark:text-[#A09890] hover:bg-stone-200 dark:hover:bg-[#2E3240]'
              }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-[10px] opacity-50">{isExpanded ? '▾' : '▸'}</span>
              <span className="truncate leading-5">{book.name}</span>
            </span>
          </button>
          {isExpanded && (
            <div className="flex flex-wrap gap-1 pl-6 pr-3 py-1 pb-2">
              {/* 書卷背景 tile — same style as chapter tiles */}
              <button
                onClick={() => onSelectBookBackground(book.name)}
                className="flex items-center justify-center w-9 h-9 rounded-md text-[10px] font-medium transition-colors bg-stone-200 dark:bg-[#2E3240] hover:bg-stone-300 dark:hover:bg-[#3A3C42] text-[#4F7358] dark:text-[#7AAF87]"
              >
                簡介
              </button>
              {book.chapters.map(ch => {
                const completed = isCkjvCompleted(book, ch.number)
                const active = source === 'ckjv' && activeBook?.id === book.id && activeChapter?.number === ch.number
                return (
                  <button
                    key={ch.number}
                    onClick={() => onSelectCkjvChapter(book, ch)}
                    className={`flex items-center justify-center w-9 h-9 rounded-md text-xs transition-colors
                      ${active
                        ? 'bg-sage text-white dark:bg-sage-dark dark:text-[#17191E]'
                        : 'bg-stone-200 dark:bg-[#2E3240] hover:bg-stone-300 dark:hover:bg-[#3A3C42] ' +
                          (completed ? 'text-stone-300 dark:text-[#4A4840]' : 'text-stone-500 dark:text-[#A09890]')
                      }`}
                  >
                    {ch.number}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )
    }
    return <>{items}</>
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Search */}
      <div className="px-3 py-2 shrink-0">
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="搜尋書卷…"
          className="w-full px-3 py-2 text-sm rounded border border-stone-200 dark:border-[#2E3240] bg-stone-50 dark:bg-[#17191E] text-stone-500 dark:text-[#E4DDD0] placeholder-stone-300 dark:placeholder-[#2E3240] focus:outline-none focus:border-[#4F7358] dark:focus:border-[#7AAF87] transition-colors"
        />
      </div>

      {/* Scrollable content */}
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto">
        {/* 目前位置 */}
        {currentChapterLabel && (
          <div className="px-3 py-2">
            <p className="text-[11px] font-semibold text-stone-300 dark:text-[#6B6460] uppercase tracking-widest mb-1">目前</p>
            <p className="text-sm font-medium text-stone-500 dark:text-[#E4DDD0]">{currentChapterLabel}</p>
          </div>
        )}

        {/* 書卷 */}
        <div className="py-1">
          {filteredOld.length > 0 && (
            <>
              <button
                onClick={() => setOldExpanded(!oldExpanded)}
                className="w-full flex items-center gap-1.5 px-3 py-2.5 text-[13px] font-semibold text-stone-300 dark:text-[#6B6460] hover:text-stone-400 dark:hover:text-[#A09890] uppercase tracking-widest transition-colors"
              >
                <span>{oldExpanded ? '▾' : '▸'}</span>舊約
              </button>
              {oldExpanded && <div className="pb-1">{renderBookList(filteredOld)}</div>}
            </>
          )}
          {filteredNew.length > 0 && (
            <>
              <button
                onClick={() => setNewExpanded(!newExpanded)}
                className="w-full flex items-center gap-1.5 px-3 py-2.5 mt-1 text-[13px] font-semibold text-stone-300 dark:text-[#6B6460] hover:text-stone-400 dark:hover:text-[#A09890] uppercase tracking-widest transition-colors"
              >
                <span>{newExpanded ? '▾' : '▸'}</span>新約
              </button>
              {newExpanded && <div className="pb-1">{renderBookList(filteredNew)}</div>}
            </>
          )}
          {jasher && (
            <div className="mt-1">
              <button
                onClick={() => setShowJasher(!showJasher)}
                className={`w-full flex items-center gap-1.5 px-3 py-2.5 text-[13px] font-semibold uppercase tracking-widest transition-colors
                  ${source === 'jasher'
                    ? 'text-[#4F7358] dark:text-[#7AAF87]'
                    : 'text-stone-300 dark:text-[#6B6460] hover:text-stone-400 dark:hover:text-[#A09890]'
                  }`}
              >
                <span>{showJasher ? '▾' : '▸'}</span>次經 · 雅煞珥書
              </button>
              {showJasher && (
                <div className="flex flex-wrap gap-1 pl-6 pr-3 pb-2 pt-1">
                  {jasher.chapters.map(ch => {
                    const completed = isJasherCompleted(ch.number)
                    const active = source === 'jasher' && activeChapter?.number === ch.number
                    return (
                      <button
                        key={ch.number}
                        onClick={() => onSelectJasherChapter(ch)}
                        className={`flex items-center justify-center w-9 h-9 rounded-md text-xs transition-colors
                          ${active
                            ? 'bg-sage text-white dark:bg-sage-dark dark:text-[#17191E]'
                            : 'bg-stone-200 dark:bg-[#2E3240] hover:bg-stone-300 dark:hover:bg-[#3A3C42] ' +
                              (completed ? 'text-stone-300 dark:text-[#4A4840]' : 'text-stone-500 dark:text-[#A09890]')
                          }`}
                      >
                        {ch.number}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


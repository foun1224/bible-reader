import { useEffect, useState } from 'react'
import { BOOK_COURSES } from '../lib/bookCourses'

type BookIntros = Record<string, string>

const BOOK_ENGS: Record<string, string> = {
  '創世記': 'Gen',
  '出埃及記': 'Ex',
  '利未記': 'Lev',
  '民數記': 'Num',
  '申命記': 'Deut',
  '約書亞記': 'Josh',
  '士師記': 'Judg',
  '路得記': 'Ruth',
  '撒母耳記上': '1 Sam',
  '撒母耳記下': '2 Sam',
  '列王紀上': '1 Kin',
  '列王紀下': '2 Kin',
  '歷代志上': '1 Chr',
  '歷代志下': '2 Chr',
  '以斯拉記': 'Ezra',
  '尼希米記': 'Neh',
  '以斯帖記': 'Esth',
  '約伯記': 'Job',
  '詩篇': 'Ps',
  '箴言': 'Prov',
  '傳道書': 'Eccl',
  '雅歌': 'Song',
  '以賽亞書': 'Is',
  '耶利米書': 'Jer',
  '耶利米哀歌': 'Lam',
  '以西結書': 'Ezek',
  '但以理書': 'Dan',
  '何西阿書': 'Hos',
  '約珥書': 'Joel',
  '阿摩司書': 'Amos',
  '俄巴底亞書': 'Obad',
  '約拿書': 'Jon',
  '彌迦書': 'Mic',
  '那鴻書': 'Nah',
  '哈巴谷書': 'Hab',
  '西番雅書': 'Zeph',
  '哈該書': 'Hag',
  '撒迦利亞書': 'Zech',
  '瑪拉基書': 'Mal',
  '馬太福音': 'Matt',
  '馬可福音': 'Mark',
  '路加福音': 'Luke',
  '約翰福音': 'John',
  '使徒行傳': 'Acts',
  '羅馬書': 'Rom',
  '哥林多前書': '1 Cor',
  '哥林多後書': '2 Cor',
  '加拉太書': 'Gal',
  '以弗所書': 'Eph',
  '腓立比書': 'Phil',
  '歌羅西書': 'Col',
  '帖撒羅尼迦前書': '1 Thess',
  '帖撒羅尼迦後書': '2 Thess',
  '提摩太前書': '1 Tim',
  '提摩太後書': '2 Tim',
  '提多書': 'Titus',
  '腓利門書': 'Philem',
  '希伯來書': 'Heb',
  '雅各書': 'James',
  '彼得前書': '1 Pet',
  '彼得後書': '2 Pet',
  '約翰一書': '1 John',
  '約翰二書': '2 John',
  '約翰三書': '3 John',
  '猶大書': 'Jude',
  '啟示錄': 'Rev',
}

type IntroBlock =
  | { type: 'section'; text: string }
  | { type: 'subsection'; text: string }
  | { type: 'item'; text: string; level: 1 | 2 | 3 }
  | { type: 'paragraph'; text: string }

const introLineMarkerPattern = /^(零、|壹、|貳、|參、|肆、|伍、|陸、|柒、|捌、|玖、|拾、|[一二三四五六七八九十]+、|（[一二三四五六七八九十]+）|\d+\.|\(\d+\)|◎)/

function mergeContinuationLines(text: string) {
  const lines = text.split('\n').map(line => line.trim()).filter(Boolean)
  const merged: string[] = []
  for (const line of lines) {
    if (!merged.length || introLineMarkerPattern.test(line)) {
      merged.push(line)
    } else {
      merged[merged.length - 1] += ' ' + line
    }
  }
  return merged.join('\n')
}

function normalizeIntroText(bookName: string, intro: string) {
  const normalized = intro
    .replace(new RegExp(`^${bookName}(研經資料|查經資料)\\s*`), '')
    .replace(/\s*經文：[\s\S]*$/, '')
    .replace(/\r/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/\s+(?=(零、|壹、|貳、|參、|肆、|伍、|陸、|柒、|捌、|玖、|拾、))/g, '\n\n')
    .replace(/\s+(?=([一二三四五六七八九十]+、))/g, '\n')
    .replace(/\s+(?=（[一二三四五六七八九十]+）)/g, '\n')
    .replace(/\s+(?=\d+\.)/g, '\n')
    .replace(/\s+(?=\(\d+\))/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\s+(?=◎)/g, '\n')
    .trim()
  return mergeContinuationLines(normalized)
}

function parseIntroBlocks(bookName: string, intro: string): IntroBlock[] {
  const text = normalizeIntroText(bookName, intro)
  return text
    .split(/\n+/)
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      if (/^(零、|壹、|貳、|參、|肆、|伍、|陸、|柒、|捌、|玖、|拾、)/.test(line)) {
        return { type: 'section', text: line } as IntroBlock
      }
      if (/^[一二三四五六七八九十]+、/.test(line)) {
        return { type: 'subsection', text: line } as IntroBlock
      }
      if (/^（[一二三四五六七八九十]+）/.test(line)) {
        return { type: 'item', level: 1, text: line } as IntroBlock
      }
      if (/^\d+\./.test(line)) {
        return { type: 'item', level: 2, text: line } as IntroBlock
      }
      if (/^\(\d+\)/.test(line)) {
        return { type: 'item', level: 3, text: line } as IntroBlock
      }
      return { type: 'paragraph', text: line } as IntroBlock
    })
}

function IntroContent({ bookName, intro }: { bookName: string; intro: string }) {
  const blocks = parseIntroBlocks(bookName, intro)

  return (
    <div className="space-y-3">
      {blocks.map((block, index) => {
        if (block.type === 'section') {
          return (
            <h2
              key={index}
              className="pt-3 text-base font-semibold leading-8 text-stone-700 dark:text-[#E4DDD0]"
            >
              {block.text}
            </h2>
          )
        }

        if (block.type === 'subsection') {
          return (
            <h3
              key={index}
              className="pt-2 text-sm font-semibold leading-7 text-stone-600 dark:text-[#D4CEC4]"
            >
              {block.text}
            </h3>
          )
        }

        if (block.type === 'item') {
          const indent = block.level === 1 ? 'pl-4' : block.level === 2 ? 'pl-7' : 'pl-10'
          return (
            <p
              key={index}
              className={`${indent} text-sm leading-8 text-stone-500 dark:text-[#A09890]`}
            >
              {block.text}
            </p>
          )
        }

        return (
          <p key={index} className="text-sm leading-8 text-stone-500 dark:text-[#A09890]">
            {block.text}
          </p>
        )
      })}
    </div>
  )
}

function CourseLinks({ bookName }: { bookName: string }) {
  const courses = BOOK_COURSES[bookName]
  if (!courses || courses.length === 0) return null

  return (
    <section className="mt-8 border-t border-stone-200/70 dark:border-[#2E3240] pt-6">
      <p className="mb-3 text-[11px] font-semibold tracking-[0.18em] text-stone-300 dark:text-[#6B6460] uppercase">相關線上課程</p>
      <div className="flex flex-col gap-2">
        {courses.map((c) => (
          <a
            key={c.url}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-lg border border-stone-200 dark:border-[#2E3240] px-4 py-3 transition-colors hover:border-[#4F7358]/50 hover:bg-[#4F7358]/5 dark:hover:border-[#7AAF87]/40 dark:hover:bg-[#7AAF87]/5"
          >
            <div>
              <p className="text-sm font-medium text-stone-600 dark:text-[#D4CEC4] group-hover:text-[#4F7358] dark:group-hover:text-[#7AAF87] transition-colors">
                {c.title}
              </p>
              <p className="mt-0.5 text-[11px] text-stone-300 dark:text-[#6B6460]">
                {c.instructor === '多媒體聖經學苑' ? c.instructor : `${c.instructor} · 多媒體聖經學苑`}
              </p>
            </div>
            <span className="ml-3 shrink-0 text-stone-300 dark:text-[#6B6460] group-hover:text-[#4F7358] dark:group-hover:text-[#7AAF87] transition-colors text-sm">↗</span>
          </a>
        ))}
      </div>
    </section>
  )
}

function bookBackgroundUrl(bookName: string) {
  const engs = BOOK_ENGS[bookName]
  if (!engs) return 'https://a2z.fhl.net/bible/'
  const params = new URLSearchParams({ book: '3', engs })
  return 'https://a2z.fhl.net/php/pcom.php?' + params.toString()
}

export default function MainBookBackground({ bookName, onBack, onOpenFirstChapter }: {
  bookName: string
  onBack: () => void
  onOpenFirstChapter: () => void
}) {
  const [intros, setIntros] = useState<BookIntros | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const sourceUrl = bookBackgroundUrl(bookName)

  useEffect(() => {
    if (intros) return
    setLoading(true)
    setError(false)
    fetch(import.meta.env.BASE_URL + 'book-intros.json')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((data: BookIntros) => { setIntros(data); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [intros])

  const intro = intros?.[bookName]

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

        {loading && (
          <div className="flex h-40 items-center justify-center text-sm text-stone-300 dark:text-[#6B6460]">
            <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-stone-200 border-t-[#4F7358]" />
            載入書卷背景…
          </div>
        )}

        {error && (
          <p className="py-16 text-center text-sm text-stone-300 dark:text-[#6B6460]">無法載入書卷背景</p>
        )}

        {intros && !intro && !loading && (
          <p className="py-16 text-center text-sm text-stone-300 dark:text-[#6B6460]">此書卷暫無背景資料</p>
        )}

        {intro && (
          <section className="border-t border-stone-200/70 dark:border-[#2E3240] pt-6">
            <IntroContent bookName={bookName} intro={intro} />
          </section>
        )}

        <CourseLinks bookName={bookName} />

        <div className="mt-10 pt-6 border-t border-stone-200/70 dark:border-[#2E3240] flex flex-col gap-4">
          <button
            onClick={onOpenFirstChapter}
            className="self-start rounded-md border border-[#4F7358] px-4 py-2 text-sm font-medium text-[#4F7358] transition-colors hover:bg-[#4F7358]/10 dark:border-[#7AAF87] dark:text-[#7AAF87] dark:hover:bg-[#7AAF87]/10"
          >
            開始閱讀第 1 章 →
          </button>
          <a
            href={sourceUrl}
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

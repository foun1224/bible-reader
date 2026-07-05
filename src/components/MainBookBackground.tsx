import { useEffect, useState } from 'react'

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

interface CourseLink {
  title: string
  instructor: string
  url: string
  specific?: boolean
}

const FC = 'https://fungclass.fhl.net/'

const BOOK_COURSES: Record<string, CourseLink[]> = {
  '創世記':        [{ title: '摩西五經', instructor: '賴建國', url: FC + 'Moses/' }, { title: '創世記逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Gen/s.html', specific: true }],
  '出埃及記':      [{ title: '摩西五經', instructor: '賴建國', url: FC + 'Moses/' }, { title: '出埃及記逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Exodus/s.html', specific: true }],
  '利未記':        [{ title: '摩西五經', instructor: '賴建國', url: FC + 'Moses/' }, { title: '利未記逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'LEVI/s.html', specific: true }],
  '民數記':        [{ title: '摩西五經', instructor: '賴建國', url: FC + 'Moses/' }, { title: '民數記逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Numbers/s.html', specific: true }],
  '申命記':        [{ title: '摩西五經', instructor: '賴建國', url: FC + 'Moses/' }, { title: '申命記逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Deu/s.html', specific: true }],
  '約書亞記':      [{ title: '舊約歷史書', instructor: '吳獻章', url: FC + 'His/' }],
  '士師記':        [{ title: '舊約歷史書', instructor: '吳獻章', url: FC + 'His/' }, { title: '士師記逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Judges/s.html', specific: true }],
  '路得記':        [{ title: '舊約歷史書', instructor: '吳獻章', url: FC + 'His/' }],
  '撒母耳記上':    [{ title: '舊約歷史書', instructor: '吳獻章', url: FC + 'His/' }],
  '撒母耳記下':    [{ title: '舊約歷史書', instructor: '吳獻章', url: FC + 'His/' }],
  '列王紀上':      [{ title: '舊約歷史書', instructor: '吳獻章', url: FC + 'His/' }],
  '列王紀下':      [{ title: '舊約歷史書', instructor: '吳獻章', url: FC + 'His/' }],
  '歷代志上':      [{ title: '舊約歷史書', instructor: '吳獻章', url: FC + 'His/' }],
  '歷代志下':      [{ title: '舊約歷史書', instructor: '吳獻章', url: FC + 'His/' }],
  '以斯拉記':      [{ title: '舊約歷史書', instructor: '吳獻章', url: FC + 'His/' }],
  '尼希米記':      [{ title: '舊約歷史書', instructor: '吳獻章', url: FC + 'His/' }],
  '以斯帖記':      [{ title: '舊約歷史書', instructor: '吳獻章', url: FC + 'His/' }],
  '約伯記':        [{ title: '詩歌智慧書', instructor: '吳獻章', url: FC + 'Wise/' }, { title: '約伯記逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Job/', specific: true }],
  '詩篇':          [{ title: '詩歌智慧書', instructor: '吳獻章', url: FC + 'Wise/' }, { title: '詩篇逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Psalms/', specific: true }],
  '箴言':          [{ title: '詩歌智慧書', instructor: '吳獻章', url: FC + 'Wise/' }, { title: '箴言逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Prov/', specific: true }],
  '傳道書':        [{ title: '詩歌智慧書', instructor: '吳獻章', url: FC + 'Wise/' }],
  '雅歌':          [{ title: '詩歌智慧書', instructor: '吳獻章', url: FC + 'Wise/' }],
  '以賽亞書':      [{ title: '大先知書', instructor: '吳獻章', url: FC + 'Prophet/' }],
  '耶利米書':      [{ title: '大先知書', instructor: '吳獻章', url: FC + 'Prophet/' }, { title: '耶利米書逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Jere/', specific: true }],
  '耶利米哀歌':    [{ title: '大先知書', instructor: '吳獻章', url: FC + 'Prophet/' }],
  '以西結書':      [{ title: '大先知書', instructor: '吳獻章', url: FC + 'Prophet/' }],
  '但以理書':      [{ title: '大先知書', instructor: '吳獻章', url: FC + 'Prophet/' }],
  '何西阿書':      [{ title: '小先知書', instructor: '諸蔡筱楓', url: FC + 'Minor/' }],
  '約珥書':        [{ title: '小先知書', instructor: '諸蔡筱楓', url: FC + 'Minor/' }],
  '阿摩司書':      [{ title: '小先知書', instructor: '諸蔡筱楓', url: FC + 'Minor/' }],
  '俄巴底亞書':    [{ title: '小先知書', instructor: '諸蔡筱楓', url: FC + 'Minor/' }],
  '約拿書':        [{ title: '小先知書', instructor: '諸蔡筱楓', url: FC + 'Minor/' }],
  '彌迦書':        [{ title: '小先知書', instructor: '諸蔡筱楓', url: FC + 'Minor/' }],
  '那鴻書':        [{ title: '小先知書', instructor: '諸蔡筱楓', url: FC + 'Minor/' }],
  '哈巴谷書':      [{ title: '小先知書', instructor: '諸蔡筱楓', url: FC + 'Minor/' }],
  '西番雅書':      [{ title: '小先知書', instructor: '諸蔡筱楓', url: FC + 'Minor/' }],
  '哈該書':        [{ title: '小先知書', instructor: '諸蔡筱楓', url: FC + 'Minor/' }],
  '撒迦利亞書':    [{ title: '小先知書', instructor: '諸蔡筱楓', url: FC + 'Minor/' }],
  '瑪拉基書':      [{ title: '小先知書', instructor: '諸蔡筱楓', url: FC + 'Minor/' }],
  '馬太福音':      [{ title: '福音書', instructor: '劉幸枝博士', url: FC + 'Gospel/' }, { title: '馬太福音逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Mt/s.html', specific: true }],
  '馬可福音':      [{ title: '福音書', instructor: '劉幸枝博士', url: FC + 'Gospel/' }, { title: '馬可福音逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Mk/s.html', specific: true }],
  '路加福音':      [{ title: '福音書', instructor: '劉幸枝博士', url: FC + 'Gospel/' }, { title: '路加福音逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Luke/', specific: true }],
  '約翰福音':      [{ title: '福音書', instructor: '劉幸枝博士', url: FC + 'Gospel/' }, { title: '約翰福音逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'JOHN/', specific: true }],
  '使徒行傳':      [{ title: '使徒行傳逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Act/', specific: true }],
  '羅馬書':        [{ title: '保羅書信', instructor: '多媒體聖經學苑', url: FC + 'Paul/s.html' }, { title: '羅馬書逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Romans/', specific: true }],
  '哥林多前書':    [{ title: '保羅書信', instructor: '多媒體聖經學苑', url: FC + 'Paul/s.html' }, { title: '哥林多前書逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Co/', specific: true }],
  '哥林多後書':    [{ title: '保羅書信', instructor: '多媒體聖經學苑', url: FC + 'Paul/s.html' }, { title: '哥林多後書逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Co/', specific: true }],
  '加拉太書':      [{ title: '保羅書信', instructor: '多媒體聖經學苑', url: FC + 'Paul/s.html' }, { title: '加拉太書逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Gal/', specific: true }],
  '以弗所書':      [{ title: '保羅書信', instructor: '多媒體聖經學苑', url: FC + 'Paul/s.html' }, { title: '以弗所書逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Ephe/', specific: true }],
  '腓立比書':      [{ title: '保羅書信', instructor: '多媒體聖經學苑', url: FC + 'Paul/s.html' }, { title: '腓立比書逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Phil/', specific: true }],
  '歌羅西書':      [{ title: '保羅書信', instructor: '多媒體聖經學苑', url: FC + 'Paul/s.html' }, { title: '歌羅西書逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Col/', specific: true }],
  '帖撒羅尼迦前書':[{ title: '保羅書信', instructor: '多媒體聖經學苑', url: FC + 'Paul/s.html' }, { title: '帖撒羅尼迦書逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Thes/', specific: true }],
  '帖撒羅尼迦後書':[{ title: '保羅書信', instructor: '多媒體聖經學苑', url: FC + 'Paul/s.html' }, { title: '帖撒羅尼迦書逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Thes/', specific: true }],
  '提摩太前書':    [{ title: '保羅書信', instructor: '多媒體聖經學苑', url: FC + 'Paul/s.html' }, { title: '提摩太書逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Tim/', specific: true }],
  '提摩太後書':    [{ title: '保羅書信', instructor: '多媒體聖經學苑', url: FC + 'Paul/s.html' }, { title: '提摩太書逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Tim/', specific: true }],
  '提多書':        [{ title: '保羅書信', instructor: '多媒體聖經學苑', url: FC + 'Paul/s.html' }, { title: '提多書逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Tit/', specific: true }],
  '腓利門書':      [{ title: '保羅書信', instructor: '多媒體聖經學苑', url: FC + 'Paul/s.html' }],
  '希伯來書':      [{ title: '一般書信', instructor: '王良玉博士', url: FC + 'Letters/' }, { title: '希伯來書逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Heb/', specific: true }],
  '雅各書':        [{ title: '一般書信', instructor: '王良玉博士', url: FC + 'Letters/' }, { title: '雅各書逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Jas/', specific: true }],
  '彼得前書':      [{ title: '一般書信', instructor: '王良玉博士', url: FC + 'Letters/' }, { title: '彼得書信逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Peter/', specific: true }],
  '彼得後書':      [{ title: '一般書信', instructor: '王良玉博士', url: FC + 'Letters/' }, { title: '彼得書信逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Peter/', specific: true }],
  '約翰一書':      [{ title: '一般書信', instructor: '王良玉博士', url: FC + 'Letters/' }, { title: '約翰書信逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Jn123/', specific: true }],
  '約翰二書':      [{ title: '一般書信', instructor: '王良玉博士', url: FC + 'Letters/' }, { title: '約翰書信逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Jn123/', specific: true }],
  '約翰三書':      [{ title: '一般書信', instructor: '王良玉博士', url: FC + 'Letters/' }, { title: '約翰書信逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Jn123/', specific: true }],
  '猶大書':        [{ title: '一般書信', instructor: '王良玉博士', url: FC + 'Letters/' }],
  '啟示錄':        [{ title: '啟示錄逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Revelation/', specific: true }],
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

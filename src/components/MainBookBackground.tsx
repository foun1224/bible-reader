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

function bookBackgroundUrl(bookName: string) {
  const engs = BOOK_ENGS[bookName]
  if (!engs) return 'https://a2z.fhl.net/bible/'
  const params = new URLSearchParams({ book: '3', engs })
  return 'https://a2z.fhl.net/php/pcom.php?' + params.toString()
}

export default function MainBookBackground({ bookName, onBack }: {
  bookName: string
  onBack: () => void
}) {
  const sourceUrl = bookBackgroundUrl(bookName)

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

        <section className="rounded-lg border border-stone-200/80 dark:border-[#2E3240] bg-stone-100/60 dark:bg-[#22242C]/50 px-5 py-5">
          <p className="text-sm leading-7 text-stone-600 dark:text-[#D4CEC4]">
            書卷背景由信望愛聖經資源中心提供。為尊重原始內容授權，這裡不複製全文；請前往原站閱讀完整介紹、背景資料與參考書目。
          </p>
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center rounded-md border border-[#4F7358] px-4 py-2 text-sm font-medium text-[#4F7358] transition-colors hover:bg-[#4F7358]/10 dark:border-[#7AAF87] dark:text-[#7AAF87] dark:hover:bg-[#7AAF87]/10"
          >
            前往 FHL 查看完整書卷背景 ↗
          </a>
        </section>

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

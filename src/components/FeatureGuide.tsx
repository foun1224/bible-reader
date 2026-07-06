interface GuideItem {
  action: string
  result: string
}

interface GuideSection {
  title: string
  description: string
  items: GuideItem[]
}

const GUIDE_SECTIONS: GuideSection[] = [
  {
    title: '主要入口',
    description: '先掌握兩個主要模式，再進入其他學習內容。',
    items: [
      { action: '點底部「經文」', result: '回到聖經閱讀主畫面，左側目錄可選書卷與章節。' },
      { action: '點底部「靈修」', result: '開啟每日靈修頁，包含經文、相關經文、詩歌、延伸閱讀與默想筆記。' },
      { action: '點右上角「⋯」', result: '打開右側抽屜，進入搜尋、設定、線上教材、聖經時間軸、閱讀回顧與功能說明。' },
    ],
  },
  {
    title: '經文閱讀',
    description: '閱讀時盡量保持畫面安靜，需要工具時再打開。',
    items: [
      { action: '手機點左上角三條線', result: '打開書卷目錄；展開書卷後可選章節，也可點「簡介」看書卷背景。' },
      { action: '點底部章節名稱', result: '打開章節格，快速跳到同一本書的其他章。' },
      { action: '長按一節經文', result: '打開劃線選色，可標記重要、安慰、疑問或禱告。' },
      { action: '點右上角齒輪', result: '調整文字大小、主題、節號顯示、行距與預設頁面。' },
      { action: '點沉浸閱讀', result: '隱藏工具列與干擾，專注閱讀經文。' },
    ],
  },
  {
    title: '書卷背景與教材',
    description: '當你想理解一卷書的背景，可以從目錄與更多功能進入。',
    items: [
      { action: '在書卷目錄點「簡介」方塊', result: '主畫面顯示該書卷背景，包含歷史、作者、場景與開始閱讀入口。' },
      { action: '在書卷目錄點「教材」', result: '開啟該卷對應的線上課程連結。沒有對應書卷時，會提供總覽教材入口。' },
      { action: '在右側抽屜點「線上教材」', result: '進入完整教材導引頁，按主題與書卷瀏覽課程。' },
    ],
  },
  {
    title: '聖經時間軸',
    description: '時間軸是把聖經故事放回世界歷史中的學習模式。',
    items: [
      { action: '在右側抽屜點「聖經時間軸」', result: '進入 10 個時期的總覽卡片，快速掌握聖經歷史脈絡。' },
      { action: '點「深入理解這個時代」', result: '進入該時期 deep dive，包含學習導引、史料細讀、世界背景、經文慢讀與今日反思。' },
      { action: '點 deep dive 上方路線 chip', result: '跳到該區塊；長內容可展開或收合，依照當下精力選擇閱讀深度。' },
      { action: '點書卷 chip 或「開始讀第 1 章」', result: '回到經文閱讀器，直接打開對應書卷。' },
    ],
  },
  {
    title: '靈修與回顧',
    description: '靈修頁用來沉澱每日領受，回顧頁幫助你看見閱讀節奏。',
    items: [
      { action: '在靈修頁長按經文', result: '可像經文頁一樣劃線，並在本日劃線區回顧。' },
      { action: '在靈修頁寫默想筆記', result: '筆記會存在本機，依日期保存。' },
      { action: '在右側抽屜點「閱讀回顧」', result: '查看閱讀計畫、連讀狀態與完成概況。' },
      { action: '在右側抽屜點「已讀記錄」', result: '查看已標記完成的章節清單。' },
    ],
  },
]

export default function FeatureGuide({ isOpen, onClose }: {
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <>
      {isOpen && <div className="fixed inset-0 z-[75] bg-black/40" onClick={onClose} />}
      <aside
        className={`fixed top-0 right-0 z-[80] flex h-full w-full max-w-md flex-col border-l border-stone-200 bg-stone-50 shadow-2xl transition-transform duration-300 dark:border-[#2E3240] dark:bg-[#22242C] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
        aria-hidden={!isOpen}
      >
        <header className="shrink-0 border-b border-stone-200 px-5 py-4 dark:border-[#2E3240]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300 dark:text-[#6B6460]">Feature guide</p>
              <h2 className="mt-1 text-lg font-semibold text-stone-800 dark:text-[#E4DDD0]">功能說明</h2>
              <p className="mt-2 text-sm leading-7 text-stone-500 dark:text-[#A09890]">
                這份導引只會自動出現一次；之後可從右上角「⋯」再次打開。
              </p>
            </div>
            <button
              onClick={onClose}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-200 text-stone-400 transition-colors hover:bg-stone-100 dark:border-[#2E3240] dark:text-[#A09890] dark:hover:bg-[#17191E]"
              aria-label="關閉功能說明"
            >
              ×
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="space-y-4">
            {GUIDE_SECTIONS.map(section => (
              <section key={section.title} className="rounded-lg border border-stone-200 bg-stone-50/80 p-4 dark:border-[#2E3240] dark:bg-[#17191E]/45">
                <h3 className="text-sm font-semibold text-stone-700 dark:text-[#E4DDD0]">{section.title}</h3>
                <p className="mt-1 text-xs leading-6 text-stone-400 dark:text-[#A09890]">{section.description}</p>
                <div className="mt-3 divide-y divide-stone-200/70 dark:divide-[#2E3240]">
                  {section.items.map(item => (
                    <div key={item.action} className="py-3 first:pt-0 last:pb-0">
                      <p className="text-sm font-medium text-[#4F7358] dark:text-[#7AAF87]">{item.action}</p>
                      <p className="mt-1 text-sm leading-7 text-stone-500 dark:text-[#A09890]">{item.result}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        <footer className="shrink-0 border-t border-stone-200 p-4 dark:border-[#2E3240]">
          <button
            onClick={onClose}
            className="h-10 w-full rounded-lg bg-[#4F7358] text-sm font-semibold text-white transition-colors hover:bg-[#42664B] dark:bg-[#7AAF87] dark:text-[#17191E] dark:hover:bg-[#8CBD96]"
          >
            我知道了
          </button>
        </footer>
      </aside>
    </>
  )
}

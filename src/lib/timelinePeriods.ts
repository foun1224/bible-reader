export interface TimelinePeriod {
  id: string
  name: string
  dateRange: string
  /** CSS hex accent color for this period's visual theme */
  accent: string
  /** Story-style narrative summary (2-3 sentences, Chinese) */
  summary: string
  /** 3-5 key historical events */
  keyEvents: string[]
  /** Bible book names (must match app's Chinese book names) */
  books: string[]
  testament: 'old' | 'new' | 'intertestamental'
}

export const TIMELINE_PERIODS: TimelinePeriod[] = [
  {
    id: 'patriarchs',
    name: '創世與先祖',
    dateRange: '約 2000–1550 BC',
    accent: '#B45309',
    summary:
      '神創造天地，又揀選亞伯拉罕，呼召他踏上未知的旅程，以信心換取永恆的應許。從伊甸園到迦南地，先祖們在神的應許中跌跌撞撞地走著——這是信仰之路的起點。',
    keyEvents: [
      '神創造天地與人',
      '亞伯拉罕蒙召出吾珥',
      '以撒、雅各、十二支派',
      '約瑟被賣入埃及',
    ],
    books: ['創世記', '約伯記'],
    testament: 'old',
  },
  {
    id: 'exodus',
    name: '出埃及與曠野',
    dateRange: '約 1446–1406 BC',
    accent: '#C2410C',
    summary:
      '神聽見苦難中的哀嚎，差派摩西引領百姓出離奴役之地。十災震撼法老，紅海分開成路；然而曠野不只是地理上的旅程，更是一個民族學習信靠神的學校。',
    keyEvents: [
      '十災與逾越節',
      '紅海分開',
      '西奈山頒十誡',
      '建造會幕',
      '曠野漂流四十年',
    ],
    books: ['出埃及記', '利未記', '民數記', '申命記'],
    testament: 'old',
  },
  {
    id: 'conquest',
    name: '征服與士師',
    dateRange: '約 1406–1047 BC',
    accent: '#92400E',
    summary:
      '以色列人踏入應許之地，約書亞領軍所向無敵；然而定居後，他們一再轉離神，陷入壓迫、悔改、拯救的循環。神不斷差派士師，每一位都是那個時代脆弱人心的縮影。',
    keyEvents: [
      '約書亞帶領征服迦南',
      '抽籤分配各支派土地',
      '以色列人偏行己路',
      '眾士師輪番拯救百姓',
      '路得與波阿斯的故事',
    ],
    books: ['約書亞記', '士師記', '路得記'],
    testament: 'old',
  },
  {
    id: 'united-kingdom',
    name: '統一王國',
    dateRange: '約 1047–931 BC',
    accent: '#A16207',
    summary:
      '以色列迎來了最輝煌的世代——大衛的詩歌與征戰，所羅門的智慧與殿宇。詩篇在這時代被吟唱，箴言在這時代被傳授；但盛世之下，人心的驕傲悄悄埋下了分裂的種子。',
    keyEvents: [
      '撒母耳膏抹掃羅與大衛',
      '大衛遷都耶路撒冷',
      '所羅門建造聖殿',
      '智慧文學在宮廷中興起',
    ],
    books: ['撒母耳記上', '撒母耳記下', '詩篇', '箴言', '傳道書', '雅歌'],
    testament: 'old',
  },
  {
    id: 'divided-kingdom',
    name: '分裂王國與先知',
    dateRange: '約 931–587 BC',
    accent: '#1D4ED8',
    summary:
      '王國一分為二，南北走向不同命運。神興起先知，在城門口、在宮廷旁大聲呼喊；以賽亞看見受苦的僕人，耶利米在眼淚中書寫。這是審判的年代，也是最深切的盼望萌芽的年代。',
    keyEvents: [
      '王國分裂為南北二國',
      '亞述滅北國以色列（722 BC）',
      '先知書大量寫成',
      '巴比倫王尼布甲尼撒興起',
      '耶路撒冷陷落（587 BC）',
    ],
    books: [
      '列王紀上', '列王紀下', '歷代志上', '歷代志下',
      '以賽亞書', '耶利米書',
      '何西阿書', '約珥書', '阿摩司書', '俄巴底亞書', '約拿書',
      '彌迦書', '那鴻書', '哈巴谷書', '西番雅書',
    ],
    testament: 'old',
  },
  {
    id: 'exile',
    name: '被擄巴比倫',
    dateRange: '587–539 BC',
    accent: '#1E3A5F',
    summary:
      '聖殿化為廢墟，百姓被帶往異鄉。耶利米哀哭，以西結在迦巴魯河畔見異象，但以理在宮廷中仍然屈膝禱告。神沒有離去——祂與流亡者同在。',
    keyEvents: [
      '聖殿被毀、百姓被擄',
      '以西結見異象',
      '但以理在宮廷事奉',
      '波斯帝國興起（539 BC）',
    ],
    books: ['耶利米哀歌', '以西結書', '但以理書'],
    testament: 'old',
  },
  {
    id: 'return',
    name: '歸回與重建',
    dateRange: '539–400 BC',
    accent: '#0F766E',
    summary:
      '古列王頒令歸回，以斯拉帶著律法書歸來，尼希米帶著熱情重建城牆。廢墟中長出新芽；瑪拉基的最後話語如餘燼，等待那即將到來的「日頭」。',
    keyEvents: [
      '古列王頒歸回令（538 BC）',
      '聖殿重建完工（516 BC）',
      '以斯拉帶律法書歸回',
      '尼希米重建耶路撒冷城牆',
      '瑪拉基書寫成，舊約封卷',
    ],
    books: ['以斯拉記', '尼希米記', '以斯帖記', '哈該書', '撒迦利亞書', '瑪拉基書'],
    testament: 'old',
  },
  {
    id: 'intertestamental',
    name: '兩約之間',
    dateRange: '約 400–5 BC',
    accent: '#4B5563',
    summary:
      '舊約最後一個先知聲音消逝，天空靜默了四百年。亞歷山大大帝的鐵蹄踏遍大地，馬加比家族揭竿而起，羅馬帝國最終掌管這片土地。歷史正在為那至關緊要的時刻作準備。',
    keyEvents: [
      '亞歷山大大帝征服波斯（333 BC）',
      '七十士譯本（希臘文聖經）完成',
      '馬加比起義收復聖殿（165 BC）',
      '羅馬掌控猶地亞（63 BC）',
      '希律大帝重建聖殿',
    ],
    books: [],
    testament: 'intertestamental',
  },
  {
    id: 'jesus',
    name: '耶穌時代',
    dateRange: '約 5 BC–AD 30',
    accent: '#4F7358',
    summary:
      '道成了肉身，住在我們中間。四卷福音書以不同視角記錄了同一個奇蹟：神的兒子走在塵土中，觸摸痲瘋病人，向風浪說「住了罷」。十字架與復活，重新定義了歷史的中心點。',
    keyEvents: [
      '耶穌在伯利恆降生',
      '施洗約翰宣告預備道路',
      '登山寶訓與眾多神蹟',
      '棕枝主日進入耶路撒冷',
      '十字架受死與第三天復活',
    ],
    books: ['馬太福音', '馬可福音', '路加福音', '約翰福音'],
    testament: 'new',
  },
  {
    id: 'early-church',
    name: '初期教會',
    dateRange: 'AD 30–100',
    accent: '#3730A3',
    summary:
      '聖靈如風如火降臨，門徒從躲藏的樓房走向廣場。保羅在地中海沿岸建立教會，書信一封封飛向各地；約翰在拔摩島上看見終末的異象。福音的種子在帝國的土壤中迅速萌芽。',
    keyEvents: [
      '聖靈在五旬節降臨',
      '彼得與保羅的宣教旅程',
      '保羅書信廣傳各教會',
      '耶路撒冷聖殿再度被毀（AD 70）',
      '約翰在拔摩島寫啟示錄',
    ],
    books: [
      '使徒行傳',
      '羅馬書', '哥林多前書', '哥林多後書', '加拉太書', '以弗所書',
      '腓立比書', '歌羅西書', '帖撒羅尼迦前書', '帖撒羅尼迦後書',
      '提摩太前書', '提摩太後書', '提多書', '腓利門書',
      '希伯來書',
      '雅各書', '彼得前書', '彼得後書',
      '約翰一書', '約翰二書', '約翰三書', '猶大書',
      '啟示錄',
    ],
    testament: 'new',
  },
]

/** Reverse lookup: given a book name, return its period id */
export const BOOK_PERIOD_MAP: Record<string, string> = Object.fromEntries(
  TIMELINE_PERIODS.flatMap(p => p.books.map(b => [b, p.id]))
)

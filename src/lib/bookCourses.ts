export interface CourseLink {
  title: string
  instructor: string
  url: string
  specific?: boolean
}

const FC = 'https://fungclass.fhl.net/'

export interface CurriculumItem {
  title: string
  description: string
  url: string
}

export interface CurriculumCategory {
  id: string
  eyebrow: string
  title: string
  description: string
  items: CurriculumItem[]
}

export const CURRICULUM_CATEGORIES: CurriculumCategory[] = [
  {
    id: 'overview',
    eyebrow: 'Overview',
    title: '聖經導讀',
    description: '先建立整本聖經與各大文體的地圖，再進入單卷閱讀。',
    items: [
      { title: '摩西五經導讀', description: '創世記到申命記的律法與盟約脈絡', url: FC + 'Moses/' },
      { title: '歷史書導讀', description: '以色列歷史敘事與王國脈絡', url: FC + 'His/' },
      { title: '智慧書導讀', description: '詩篇、箴言、約伯記等智慧文學', url: FC + 'Wise/' },
      { title: '大先知書導讀', description: '先知書閱讀框架', url: FC + 'Prophet/' },
      { title: '小先知書導讀', description: '十二小先知的信息', url: FC + 'Minor/' },
      { title: '福音書導讀', description: '四福音的共同核心與差異', url: FC + 'Gospel/' },
      { title: '保羅書信導讀', description: '保羅書信的神學與教會處境', url: FC + 'Paul/s.html' },
      { title: '普通書信導讀', description: '非保羅書信的共同主題', url: FC + 'Letters/' },
    ],
  },
  {
    id: 'method',
    eyebrow: 'Method',
    title: '讀經與研經方法',
    description: '幫助使用者建立穩定、正確、可持續的讀經方式。',
    items: [
      { title: '讀經入門 / 樂在讀經', description: '建立穩定讀經習慣', url: FC + 'read/' },
      { title: '一本聖經 / 天下第一書', description: '認識聖經整體價值與架構', url: FC + 'One/' },
      { title: '釋經學 / 實用釋經學', description: '學習如何正確解釋經文', url: FC + 'Exe/' },
      { title: '聖經導覽 / 穿越聖經去旅行', description: '用導覽式方式理解聖經', url: FC + 'BibleTour/' },
      { title: '長樂集 / 諸長樂牧師講道紀念集', description: '講道與靈修材料', url: FC + 'CHANGLE/' },
    ],
  },
  {
    id: 'theology',
    eyebrow: 'Theology',
    title: '神學主題',
    description: '在讀經之外整理信仰框架，不插入經文主流程。',
    items: [
      { title: '系統神學 / 基督教神學', description: '建立整體信仰框架', url: FC + 'Theo/' },
      { title: '基督論', description: '理解基督身分與工作', url: FC + 'Christ/' },
      { title: '教會論 / 教會歷史', description: '理解教會本質與歷史', url: FC + 'Church/' },
      { title: '末世論 / 聖經對世界末日的預言', description: '查考末世主題', url: FC + 'Eschatology/' },
      { title: '倫理學 / 基督教倫理學', description: '把信仰應用到倫理判斷', url: FC + 'ETHICS/' },
      { title: '認識異端', description: '辨識異端與信仰偏差', url: FC + 'Heresy/' },
    ],
  },
  {
    id: 'practice',
    eyebrow: 'Practice',
    title: '信仰生活與服事',
    description: '把信仰落到家庭、教育、宣教與本土處境。',
    items: [
      { title: '婚姻家庭 / 基督化婚前教育', description: '婚前、婚姻與家庭關係學習', url: FC + 'Marriage/' },
      { title: '老人事工 / 成功的老化', description: '高齡、照顧與老人牧養', url: FC + 'Old/' },
      { title: '教育事工 / 樂在教學', description: '主日學、教學服事與教育工作', url: FC + 'EDU/' },
      { title: '宣教 / 普世宣教入門', description: '宣教使命與實務', url: FC + 'Missions/' },
      { title: '台灣民間信仰 / 臺灣民間宗教', description: '本土宗教處境與福音對話', url: FC + 'Folk/' },
    ],
  },
]


export const BOOK_COURSES: Record<string, CourseLink[]> = {
  '創世記':         [{ title: '摩西五經', instructor: '賴建國', url: FC + 'Moses/' }, { title: '創世記逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Gen/s.html', specific: true }],
  '出埃及記':       [{ title: '摩西五經', instructor: '賴建國', url: FC + 'Moses/' }, { title: '出埃及記逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Exodus/s.html', specific: true }],
  '利未記':         [{ title: '摩西五經', instructor: '賴建國', url: FC + 'Moses/' }, { title: '利未記逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'LEVI/s.html', specific: true }],
  '民數記':         [{ title: '摩西五經', instructor: '賴建國', url: FC + 'Moses/' }, { title: '民數記逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Numbers/s.html', specific: true }],
  '申命記':         [{ title: '摩西五經', instructor: '賴建國', url: FC + 'Moses/' }, { title: '申命記逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Deu/s.html', specific: true }],
  '約書亞記':       [{ title: '舊約歷史書', instructor: '吳獻章', url: FC + 'His/' }],
  '士師記':         [{ title: '舊約歷史書', instructor: '吳獻章', url: FC + 'His/' }, { title: '士師記逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Judges/s.html', specific: true }],
  '路得記':         [{ title: '舊約歷史書', instructor: '吳獻章', url: FC + 'His/' }],
  '撒母耳記上':     [{ title: '舊約歷史書', instructor: '吳獻章', url: FC + 'His/' }],
  '撒母耳記下':     [{ title: '舊約歷史書', instructor: '吳獻章', url: FC + 'His/' }],
  '列王紀上':       [{ title: '舊約歷史書', instructor: '吳獻章', url: FC + 'His/' }],
  '列王紀下':       [{ title: '舊約歷史書', instructor: '吳獻章', url: FC + 'His/' }],
  '歷代志上':       [{ title: '舊約歷史書', instructor: '吳獻章', url: FC + 'His/' }],
  '歷代志下':       [{ title: '舊約歷史書', instructor: '吳獻章', url: FC + 'His/' }],
  '以斯拉記':       [{ title: '舊約歷史書', instructor: '吳獻章', url: FC + 'His/' }],
  '尼希米記':       [{ title: '舊約歷史書', instructor: '吳獻章', url: FC + 'His/' }],
  '以斯帖記':       [{ title: '舊約歷史書', instructor: '吳獻章', url: FC + 'His/' }],
  '約伯記':         [{ title: '詩歌智慧書', instructor: '吳獻章', url: FC + 'Wise/' }, { title: '約伯記逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Job/', specific: true }],
  '詩篇':           [{ title: '詩歌智慧書', instructor: '吳獻章', url: FC + 'Wise/' }, { title: '詩篇逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Psalms/', specific: true }],
  '箴言':           [{ title: '詩歌智慧書', instructor: '吳獻章', url: FC + 'Wise/' }, { title: '箴言逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Prov/', specific: true }],
  '傳道書':         [{ title: '詩歌智慧書', instructor: '吳獻章', url: FC + 'Wise/' }],
  '雅歌':           [{ title: '詩歌智慧書', instructor: '吳獻章', url: FC + 'Wise/' }],
  '以賽亞書':       [{ title: '大先知書', instructor: '吳獻章', url: FC + 'Prophet/' }],
  '耶利米書':       [{ title: '大先知書', instructor: '吳獻章', url: FC + 'Prophet/' }, { title: '耶利米書逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Jere/', specific: true }],
  '耶利米哀歌':     [{ title: '大先知書', instructor: '吳獻章', url: FC + 'Prophet/' }],
  '以西結書':       [{ title: '大先知書', instructor: '吳獻章', url: FC + 'Prophet/' }],
  '但以理書':       [{ title: '大先知書', instructor: '吳獻章', url: FC + 'Prophet/' }],
  '何西阿書':       [{ title: '小先知書', instructor: '諸蔡筱楓', url: FC + 'Minor/' }],
  '約珥書':         [{ title: '小先知書', instructor: '諸蔡筱楓', url: FC + 'Minor/' }],
  '阿摩司書':       [{ title: '小先知書', instructor: '諸蔡筱楓', url: FC + 'Minor/' }],
  '俄巴底亞書':     [{ title: '小先知書', instructor: '諸蔡筱楓', url: FC + 'Minor/' }],
  '約拿書':         [{ title: '小先知書', instructor: '諸蔡筱楓', url: FC + 'Minor/' }],
  '彌迦書':         [{ title: '小先知書', instructor: '諸蔡筱楓', url: FC + 'Minor/' }],
  '那鴻書':         [{ title: '小先知書', instructor: '諸蔡筱楓', url: FC + 'Minor/' }],
  '哈巴谷書':       [{ title: '小先知書', instructor: '諸蔡筱楓', url: FC + 'Minor/' }],
  '西番雅書':       [{ title: '小先知書', instructor: '諸蔡筱楓', url: FC + 'Minor/' }],
  '哈該書':         [{ title: '小先知書', instructor: '諸蔡筱楓', url: FC + 'Minor/' }],
  '撒迦利亞書':     [{ title: '小先知書', instructor: '諸蔡筱楓', url: FC + 'Minor/' }],
  '瑪拉基書':       [{ title: '小先知書', instructor: '諸蔡筱楓', url: FC + 'Minor/' }],
  '馬太福音':       [{ title: '福音書', instructor: '劉幸枝博士', url: FC + 'Gospel/' }, { title: '馬太福音逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Mt/s.html', specific: true }],
  '馬可福音':       [{ title: '福音書', instructor: '劉幸枝博士', url: FC + 'Gospel/' }, { title: '馬可福音逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Mk/s.html', specific: true }],
  '路加福音':       [{ title: '福音書', instructor: '劉幸枝博士', url: FC + 'Gospel/' }, { title: '路加福音逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Luke/', specific: true }],
  '約翰福音':       [{ title: '福音書', instructor: '劉幸枝博士', url: FC + 'Gospel/' }, { title: '約翰福音逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'JOHN/', specific: true }],
  '使徒行傳':       [{ title: '使徒行傳逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Act/', specific: true }],
  '羅馬書':         [{ title: '保羅書信', instructor: '多媒體聖經學苑', url: FC + 'Paul/s.html' }, { title: '羅馬書逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Romans/', specific: true }],
  '哥林多前書':     [{ title: '保羅書信', instructor: '多媒體聖經學苑', url: FC + 'Paul/s.html' }, { title: '哥林多前書逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Co/', specific: true }],
  '哥林多後書':     [{ title: '保羅書信', instructor: '多媒體聖經學苑', url: FC + 'Paul/s.html' }, { title: '哥林多後書逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Co/', specific: true }],
  '加拉太書':       [{ title: '保羅書信', instructor: '多媒體聖經學苑', url: FC + 'Paul/s.html' }, { title: '加拉太書逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Gal/', specific: true }],
  '以弗所書':       [{ title: '保羅書信', instructor: '多媒體聖經學苑', url: FC + 'Paul/s.html' }, { title: '以弗所書逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Ephe/', specific: true }],
  '腓立比書':       [{ title: '保羅書信', instructor: '多媒體聖經學苑', url: FC + 'Paul/s.html' }, { title: '腓立比書逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Phil/', specific: true }],
  '歌羅西書':       [{ title: '保羅書信', instructor: '多媒體聖經學苑', url: FC + 'Paul/s.html' }, { title: '歌羅西書逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Col/', specific: true }],
  '帖撒羅尼迦前書': [{ title: '保羅書信', instructor: '多媒體聖經學苑', url: FC + 'Paul/s.html' }, { title: '帖撒羅尼迦書逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Thes/', specific: true }],
  '帖撒羅尼迦後書': [{ title: '保羅書信', instructor: '多媒體聖經學苑', url: FC + 'Paul/s.html' }, { title: '帖撒羅尼迦書逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Thes/', specific: true }],
  '提摩太前書':     [{ title: '保羅書信', instructor: '多媒體聖經學苑', url: FC + 'Paul/s.html' }, { title: '提摩太書逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Tim/', specific: true }],
  '提摩太後書':     [{ title: '保羅書信', instructor: '多媒體聖經學苑', url: FC + 'Paul/s.html' }, { title: '提摩太書逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Tim/', specific: true }],
  '提多書':         [{ title: '保羅書信', instructor: '多媒體聖經學苑', url: FC + 'Paul/s.html' }, { title: '提多書逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Tit/', specific: true }],
  '腓利門書':       [{ title: '保羅書信', instructor: '多媒體聖經學苑', url: FC + 'Paul/s.html' }],
  '希伯來書':       [{ title: '一般書信', instructor: '王良玉博士', url: FC + 'Letters/' }, { title: '希伯來書逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Heb/', specific: true }],
  '雅各書':         [{ title: '一般書信', instructor: '王良玉博士', url: FC + 'Letters/' }, { title: '雅各書逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Jas/', specific: true }],
  '彼得前書':       [{ title: '一般書信', instructor: '王良玉博士', url: FC + 'Letters/' }, { title: '彼得書信逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Peter/', specific: true }],
  '彼得後書':       [{ title: '一般書信', instructor: '王良玉博士', url: FC + 'Letters/' }, { title: '彼得書信逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Peter/', specific: true }],
  '約翰一書':       [{ title: '一般書信', instructor: '王良玉博士', url: FC + 'Letters/' }, { title: '約翰書信逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Jn123/', specific: true }],
  '約翰二書':       [{ title: '一般書信', instructor: '王良玉博士', url: FC + 'Letters/' }, { title: '約翰書信逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Jn123/', specific: true }],
  '約翰三書':       [{ title: '一般書信', instructor: '王良玉博士', url: FC + 'Letters/' }, { title: '約翰書信逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Jn123/', specific: true }],
  '猶大書':         [{ title: '一般書信', instructor: '王良玉博士', url: FC + 'Letters/' }],
  '啟示錄':         [{ title: '啟示錄逐章精讀', instructor: '多媒體聖經學苑', url: FC + 'Revelation/', specific: true }],
}

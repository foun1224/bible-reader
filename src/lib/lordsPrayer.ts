export interface PrayerScriptureLink {
  reference: string
  note: string
}

export interface PrayerPetition {
  petitionId: string
  number: number
  kind: 'address' | 'petition' | 'doxology'
  title: string
  text: string
  latin?: string
  summary: string
  teaches: string
  praysAgainst: string
  historicalNote: string
  commonMisconception: string
  scriptures: PrayerScriptureLink[]
  todayReflection: {
    question: string
    prompt: string
  }[]
}

export interface LordsPrayerData {
  title: string
  subtitle: string
  fullText: string[]
  introduction: {
    whatItIs: string
    whyItMatters: string
    howToPray: string
    originNote: string
  }
  sources: {
    label: string
    url: string
  }[]
  petitions: PrayerPetition[]
}

/**
 * 主禱文（馬太福音 6:9–13 傳統新教中文；含後世禮儀常用的頌讚句）。
 * 結構：稱呼 + 七求 + 頌讚（對齊路德小要理／大公教理傳統的七求骨架）。
 */
export const LORDS_PRAYER: LordsPrayerData = {
  title: '主禱文',
  subtitle: '耶穌親自教導的禱告骨架',
  fullText: [
    '我們在天上的父：',
    '願人都尊你的名為聖。',
    '願你的國降臨；',
    '願你的旨意行在地上，如同行在天上。',
    '我們日用的飲食，今日賜給我們。',
    '免我們的債，如同我們免了人的債。',
    '不叫我們遇見試探；',
    '救我們脫離兇惡。',
    '因為國度、權柄、榮耀，全是你的，直到永遠。阿們。',
  ],
  introduction: {
    whatItIs:
      '主禱文是耶穌回應「求主教導我們禱告」時給門徒的範本（太 6；路 11）。它不是魔法口訣，而是禱告的地圖：先對準父，再求祂的名、國、旨，然後才求飲食、赦免、保守與得勝。',
    whyItMatters:
      '當禱告變成願望清單或焦慮獨白時，主禱文把順序撥正——先神後我、先國度後需要、先赦免後保護。它也是普世教會共同的語言：不同宗派、語言與世紀，仍能用這段話一起開口。',
    howToPray:
      '可先整篇慢讀／默念，聽見節奏；再逐句進入「這一求教導什麼／警戒什麼／經文／今日功課」。也可把每一求擴寫成自己的話，但不要丢掉耶穌給的骨架。',
    originNote:
      '馬太與路加文本略有差異；「因為國度、權柄、榮耀……」這句頌讚在部分古抄本中較晚出現，卻成為西方禮儀與新教崇拜中極穩定的結語。研讀時以耶穌的教導為中心，同時尊重教會在崇拜中領受的傳統。',
  },
  sources: [
    {
      label: '聖經：馬太福音 6:5–15（和合本／公開經文對照）',
      url: 'https://www.biblegateway.com/passage/?search=Matthew+6%3A5-15&version=CUVMPT',
    },
    {
      label: '路德小要理：主禱文講解（公版傳統）',
      url: 'https://bookofconcord.org/small-catechism/the-lords-prayer/',
    },
  ],
  petitions: [
    {
      petitionId: 'address-father',
      number: 1,
      kind: 'address',
      title: '我們在天上的父',
      text: '我們在天上的父：',
      latin: 'Pater noster, qui es in caelis,',
      summary:
        '禱告的第一句先定位關係：我們不是對冷漠的力量喊話，而是對「父」說話；而且是「我們的」父——個人被納入群體。',
      teaches:
        '上帝願意被稱為父；禱告建立在兒女的膽量和敬畏上。「在天上」提醒祂的聖潔與主權，不被人間偶像綁架。',
      praysAgainst:
        '拒絕把上帝當成提款機、遙遠的命運，或只服務「我的」私欲的吉祥物。也拒絕用「天父」語言卻過著無群體的孤立信仰。',
      historicalNote:
        '耶穌用亞蘭文「阿爸」（Abba）稱呼神——在第一世紀猶太禱告傳統中，這樣的親暱極不尋常。初代教會珍視這個稱呼到一個地步：希臘文的新約書信仍保留亞蘭原文（羅 8:15、加 4:6「阿爸，父」）。教會在洗禮與崇拜中常用主禱文，作為共同身份的聲音記號。',
      commonMisconception:
        '「父」不是把上帝性別化或合理化人間壞父親的投影。聖經用父的語言，是為了啟示信實、供應與管教的愛，同時超越一切受造的父親。',
      scriptures: [
        { reference: '太 6:9', note: '耶穌把稱呼放在一切祈求之前。' },
        { reference: '羅 8:15', note: '聖靈使我們呼叫：阿爸！父！' },
        { reference: '弗 4:6', note: '一神，就是眾人的父。' },
      ],
      todayReflection: [
        {
          question: '你開口禱告時，第一個浮上來的比較像「購物清單」還是「對父說話」？',
          prompt: '今天先只重複「我們在天上的父」十次，再呈上祈求，觀察心態有何不同。',
        },
      ],
    },
    {
      petitionId: 'hallowed-name',
      number: 2,
      kind: 'petition',
      title: '願人都尊你的名為聖',
      text: '願人都尊你的名為聖。',
      latin: 'sanctificetur nomen tuum.',
      summary:
        '第一求不是求自己成功，而是求上帝的名在人中間被尊為聖——被正確認識、敬畏、傳揚。',
      teaches:
        '上帝的名代表祂的臨在與性情。我們求祂的名不被羞辱，也求自己的生活、言語、敬拜不把祂的名變得廉價。',
      praysAgainst:
        '拒絕把神的名掛在嘴邊卻用來操控、行銷或仇恨。也拒絕「只要內心敬虔、外在怎麼說都行」的分裂。',
      historicalNote:
        '路德解釋：上帝的名本是聖的；我們求的是它在我們中間也被尊為聖——藉真道與聖潔生活。猶太會堂古老的「卡迪什」（Kaddish）禱文同樣以「願祂的大名被尊為聖」開頭——耶穌把祂子民最古老的禱告心跳，放進了新的禱告。',
      commonMisconception:
        '這一求不是叫我們用敬虔語氣「幫上帝擦亮招牌」。重點是求上帝自己顯明祂的聖，並把我們從妄稱祂名的罪中拉出來。',
      scriptures: [
        { reference: '出 20:7', note: '不可妄稱耶和華你上帝的名。' },
        { reference: '結 36:22–23', note: '上帝為自己的聖名行事。' },
        { reference: '太 5:16', note: '好叫人看見你們的好行為，便將榮耀歸給你們在天上的父。' },
      ],
      todayReflection: [
        {
          question: '這一週，有哪句話或哪個決定可能讓人誤會你所信的上帝？',
          prompt: '選一件具體的事悔改，並用一句更真實的話重新述說上帝。',
        },
      ],
    },
    {
      petitionId: 'kingdom-come',
      number: 3,
      kind: 'petition',
      title: '願你的國降臨',
      text: '願你的國降臨；',
      latin: 'adveniat regnum tuum.',
      summary:
        '第二求把盼望指向上帝的統治：不是人建立烏托邦，而是求天父的國度突破進入此刻與終末。',
      teaches:
        '上帝的國在基督裡已經臨到，也尚待完全。禱告求福音廣傳、教會忠心、公義顯明，並渴慕主再來。',
      praysAgainst:
        '拒絕把國度等同於某政黨、某國族或某教會品牌的勝利。也拒絕「只要個人內心平安就好」而對不義冷感。',
      historicalNote:
        '在帝國陰影下，初代信徒求「你的國」是大膽的重新效忠。歷世教會在逼迫與安逸中都需重學這一句。',
      commonMisconception:
        '「國度降臨」不是保證我們的計畫順利。有時國度的推進看起來像十字架，而不是成功故事。',
      scriptures: [
        { reference: '可 1:15', note: '日期滿了，上帝的國近了。' },
        { reference: '太 6:33', note: '先求祂的國和祂的義。' },
        { reference: '啟 11:15', note: '世上的國成了我主和主基督的國。' },
      ],
      todayReflection: [
        {
          question: '你更常求「我的局面打開」，還是求「上帝的統治在這局面中被承認」？',
          prompt: '為一個你無法掌控的公共或家庭現場禱告「願你的國降臨」，連續三天。',
        },
      ],
    },
    {
      petitionId: 'will-be-done',
      number: 4,
      kind: 'petition',
      title: '願你的旨意行在地上',
      text: '願你的旨意行在地上，如同行在天上。',
      latin: 'fiat voluntas tua, sicut in caelo et in terra.',
      summary:
        '第三求把順服具體化：天上如何無阻地回應父，求地上（包括我）也如此。',
      teaches:
        '上帝的旨意是美善、可喜愛的；禱告不是把我們的意志強加給上帝，而是求被祂的旨意重塑，並勇敢行出來。',
      praysAgainst:
        '拒絕「只要結果對我有利就是神的旨意」。也拒絕宿命式的被動——把懶惰包裝成順服。',
      historicalNote:
        '耶穌在客西馬尼的禱告是這一求的極致示範：誠實傾訴，最終仍順服父。',
      commonMisconception:
        '有人把上帝的旨意縮成職業選擇的謎題。聖經中的旨意更常指向聖潔、愛人、信靠基督與承擔十架。',
      scriptures: [
        { reference: '太 26:39', note: '不要照我的意思，只要照你的意思。' },
        { reference: '羅 12:1–2', note: '察驗何為上帝的善良、純全、可喜悅的旨意。' },
        { reference: '約壹 2:17', note: '惟獨遵行上帝旨意的，是永遠常存。' },
      ],
      todayReflection: [
        {
          question: '目前你最難說「願你旨意成就」的是哪一件事？',
          prompt: '寫下你真正想要的結果，再寫一句把主導權交還父的禱告。',
        },
      ],
    },
    {
      petitionId: 'daily-bread',
      number: 5,
      kind: 'petition',
      title: '日用的飲食',
      text: '我們日用的飲食，今日賜給我們。',
      latin: 'panem nostrum cotidianum da nobis hodie.',
      summary:
        '第四求轉向需要：承認依賴，求今日夠用的供應——包括身體、工作、關係中的基本支持。',
      teaches:
        '物質需要可以坦然帶到父面前。同時求「今日」與「日用」，訓練我們離開囤積式的焦慮，也記得為鄰舍的飲食代求。',
      praysAgainst:
        '拒絕把安全感完全建立在庫存、績效或經濟地位上。也拒絕屬靈清高到不願承認自己有身體需要。',
      historicalNote:
        '「日用的」（epiousios）是個謎樣的希臘字，古希臘文獻中幾乎只在主禱文出現——可解「今日所需的」或「明日的、將來的」。教父因此讀出雙重意義：既是每天的麵包，也預表聖餐與終末筵席的糧。傳統解釋中「飲食」涵蓋一切維持生命所需；教父與改教家也提醒：我們為眾人求，不只為自己。',
      commonMisconception:
        '這一求不是成功神學的空白支票。耶穌教我們求日用，不是求成為最富有的人。',
      scriptures: [
        { reference: '出 16:4', note: '嗎哪按日賜下的功課。' },
        { reference: '箴 30:8–9', note: '使我也不貧窮也不富足，賜給我需用的飲食。' },
        { reference: '太 6:11, 25–34', note: '先求國度，也信父知道我們需用的。' },
      ],
      todayReflection: [
        {
          question: '你今天真正的「日用」缺什麼？是食物、休息、工作，還是被看見？',
          prompt: '列三項具體需要向父求，並分享一項給有需要的人。',
        },
      ],
    },
    {
      petitionId: 'forgive-debts',
      number: 6,
      kind: 'petition',
      title: '免我們的債',
      text: '免我們的債，如同我們免了人的債。',
      latin: 'et dimitte nobis debita nostra, sicut et nos dimittimus debitoribus nostris.',
      summary:
        '第五求把關係的破裂說成「債」：我們求被赦免，也被要求成為赦免人的人。',
      teaches:
        '赦罪是福音核心；禱告使我們活在蒙赦的身份裡。同時，拒絕赦免他人會暴露我們尚未真正領受恩典的深度。',
      praysAgainst:
        '拒絕廉價恩典（只要赦我、不必悔改），也拒絕拿「你要饒恕」當壓力話術，逼受害者噤聲、替加害者開脫。',
      historicalNote:
        '馬太用「債」、路加用「罪」，互為註解。主禱文後耶穌立刻強調饒恕（太 6:14–15），顯示這一句不是附屬。',
      commonMisconception:
        '饒恕不是否認傷害、也不是立刻恢復信任。饒恕是把報復權交還上帝，並願意走在和解可能的路上。',
      scriptures: [
        { reference: '太 6:12, 14–15', note: '赦免與被赦免的連結。' },
        { reference: '太 18:21–35', note: '惡僕的比喻：蒙大赦者怎能不赦人。' },
        { reference: '弗 4:32', note: '以基督饒恕你們的恩典去饒恕人。' },
      ],
      todayReflection: [
        {
          question: '你更難相信「我被赦免」，還是更難「去赦免」？',
          prompt: '寫下一人／一事：今天你能釋放的最小一步是什麼（禱告、邊界、或求助）。',
        },
      ],
    },
    {
      petitionId: 'lead-not-temptation',
      number: 7,
      kind: 'petition',
      title: '不叫我們遇見試探',
      text: '不叫我們遇見試探；',
      latin: 'et ne nos inducas in tentationem,',
      summary:
        '第六求承認我們會跌倒：求父不要讓我們被試探吞沒，保守我們離開自己扛不住的戰場。',
      teaches:
        '試探本身不是罪，屈服才是。這一求是謙卑：不自信滿滿，而求引導、躲避與力量。',
      praysAgainst:
        '拒絕屬靈逞強（「我不會跌倒」），也拒絕把一切誘惑都怪罪環境、自己毫無責任。',
      historicalNote:
        '希臘文可指試探或考驗，而雅各書 1:13 說「神不試探人」——教會歷來因此區分：神會「試驗」（為了煉淨，如亞伯拉罕），不會「試探」（為了使人跌倒，那是仇敵的事）。這一求的意思是：求神在允許試驗臨到時，不讓它變成我們承受不住的試探（林前 10:13 應許了這一點）。',
      commonMisconception:
        '「不叫我們遇見試探」不是求人生永遠舒適。更像求：不要被丟進會摧毀信心的試探網羅，並在考驗中不被丟棄。',
      scriptures: [
        { reference: '太 6:13', note: '主禱文原文的請求。' },
        { reference: '林前 10:13', note: '上帝是信實的，必不叫你們受試探過於所能受的。' },
        { reference: '太 26:41', note: '總要警醒禱告，免得入了迷惑。' },
      ],
      todayReflection: [
        {
          question: '你目前最危險的「可預測跌倒點」是什麼時間、什麼螢幕、什麼關係？',
          prompt: '為那一點設定具體躲避策略，並請一位肢體本週問你一次。',
        },
      ],
    },
    {
      petitionId: 'deliver-from-evil',
      number: 8,
      kind: 'petition',
      title: '救我們脫離兇惡',
      text: '救我們脫離兇惡。',
      latin: 'sed libera nos a malo.',
      summary:
        '第七求把視野擴大到邪惡的權勢與結果：求父拯救、釋放、保護，使我們不至被惡吞噬。',
      teaches:
        '邪惡是真實的——包括罪、魔鬼與敗壞的結構。教會求拯救，不是靠自己假裝強大。',
      praysAgainst:
        '拒絕天真的樂觀（世界自動會好）與驚恐的宿命（惡已贏）。也拒絕只趕鬼卻不悔改、不尋求公義。',
      historicalNote:
        '「兇惡」可譯為「惡者」。無論偏重邪惡本身或那惡者，教會都在求基督的得勝覆庇我們。',
      commonMisconception:
        '這一求不是把所有責任推給魔鬼。聖經同時談屬靈爭戰與人心的欲望；兩者都需要救恩與門徒操練。',
      scriptures: [
        { reference: '約 17:15', note: '不求你叫他們離開世界，只求你保守他們脫離那惡者。' },
        { reference: '弗 6:10–18', note: '靠主的大能剛強，穿戴上帝所賜的全副軍裝。' },
        { reference: '帖後 3:3', note: '主是信實的，要堅固你們，保護你們脫離惡者。' },
      ],
      todayReflection: [
        {
          question: '在你生命中，哪一種「惡」最需要被命名：私慾、關係暴力、結構不義，還是灰心？',
          prompt: '為這一點求拯救，並選一個具體的光的行動（認罪、求助、停止、報警、修復）。',
        },
      ],
    },
    {
      petitionId: 'doxology',
      number: 9,
      kind: 'doxology',
      title: '國度、權柄、榮耀',
      text: '因為國度、權柄、榮耀，全是你的，直到永遠。阿們。',
      latin: 'Quia tuum est regnum et potestas et gloria in saecula. Amen.',
      summary:
        '結語把一切祈求封回上帝的主權：求不是因我們配，乃因國度、權柄、榮耀屬祂。阿們——願這是真實。',
      teaches:
        '頌讚重申信心的基礎與終局。我們的需要被安放在更大的敘事裡：父作王，直到永遠。',
      praysAgainst:
        '拒絕以自我為中心的禱告句點。也拒絕把「阿們」變成習慣性尾音，而沒有信靠的印章。',
      historicalNote:
        '這句頌讚不見於最早的馬太抄本，多數學者認為是初代教會依禮儀習慣加上的（呼應代上 29:11 大衛的頌讚）。但它極早：第一世紀末的《十二使徒遺訓》已記載信徒每日三次用含頌讚的主禱文禱告。天主教彌撒中它由會眾在經文後另行頌唱，新教多直接連讀——形式不同，頌讚相同。',
      commonMisconception:
        '有人以為沒有這句就不算主禱文。耶穌在馬太的核心教導仍是前面的稱呼與祈求；頌讚是教會領受並加固的敬拜回應。',
      scriptures: [
        { reference: '代上 29:11', note: '耶和華啊，尊大、能力、榮耀、強勝、威嚴都是你的。' },
        { reference: '啟 5:12–13', note: '曾被殺的羔羊配得權柄、豐富、智慧、能力、尊貴、榮耀、頌讚。' },
        { reference: '林後 1:20', note: '上帝的應許在基督都是是的，所以藉著祂也都是阿們。' },
      ],
      todayReflection: [
        {
          question: '若國度、權柄、榮耀真的全是祂的，你今天最需要放下的「小小王權」是什麼？',
          prompt: '用主禱文全篇禱告一次，最後一句刻意放慢，作為當天的交託。',
        },
      ],
    },
  ],
}

export function findPrayerPetition(petitionId: string) {
  return LORDS_PRAYER.petitions.find(p => p.petitionId === petitionId)
}

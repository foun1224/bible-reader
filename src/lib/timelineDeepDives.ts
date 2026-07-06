export interface DeepDiveBlock {
  title: string
  body: string
}

export interface SourceAsset {
  title: string
  imageUrl: string
  sourceName: string
  sourceUrl: string
  license: string
  caption: string
  educationalUse: string
}

export interface BookGuide {
  bookName: string
  role: string
  readingQuestion: string
}

export interface ReadingStep {
  label: string
  bookName: string
  chapter: number
  purpose: string
}

export interface ReflectionPrompt {
  question: string
  hint: string
}

export interface SourceRef {
  title: string
  sourceName: string
  url: string
  note: string
}

export interface TimelineDeepDive {
  periodId: string
  title: string
  thesis: string
  world: {
    culture: DeepDiveBlock
    humanity: DeepDiveBlock
    environment: DeepDiveBlock
    artifacts: SourceAsset[]
  }
  scripture: {
    overview: string
    bookGuides: BookGuide[]
    readingPath: ReadingStep[]
  }
  reflection: {
    theme: string
    prompts: ReflectionPrompt[]
    prayer: string
  }
  sources: SourceRef[]
}

export const TIMELINE_DEEP_DIVES: TimelineDeepDive[] = [
  {
    periodId: 'patriarchs',
    title: '創世與先祖：在帝國邊緣學習信心',
    thesis:
      '先祖故事不是發生在空白地圖上，而是在河流文明、城邦秩序、家族遷徙與土地應許交會的世界裡。理解這個背景，能幫助我們看見亞伯拉罕的信心不是抽象觀念，而是在真實風險中的順服。',
    world: {
      culture: {
        title: '城市、法典與神明充滿生活',
        body:
          '先祖時代的古近東已經有成熟城市、文字、法典與神廟經濟。美索不達米亞的法律與契約文化顯示，人們高度重視土地、繼承、婚姻與家族名分。創世記中的約、長子名分、家族衝突與土地應許，都要放在這種社會秩序中閱讀。',
      },
      humanity: {
        title: '家族是人的安全網，也是衝突核心',
        body:
          '在沒有現代國家保障的世界，家族與宗族就是人的身份、財產與安全來源。因此亞伯拉罕離開本地、本族、父家，不只是搬家，而是離開原本的保護系統。雅各、以掃、約瑟與兄弟之間的故事，也反映家族權力與祝福傳承的張力。',
      },
      environment: {
        title: '肥沃月灣決定遷徙路線',
        body:
          '從兩河流域到迦南，再到埃及，先祖移動的路線大多沿著肥沃月灣。沙漠不是主要居住地，而是分隔文明的邊界；河流、牧草與糧食供應決定人能否生存。創世記多次出現饑荒，正提醒讀者：信心之旅常常被自然環境推動。',
      },
      artifacts: [
        {
          title: '肥沃月灣地圖',
          imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/F_Crescent.png',
          sourceName: 'Wikimedia Commons',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:F_Crescent.png',
          license: 'CC0 1.0',
          caption: '肥沃月灣連接尼羅河、迦南與兩河流域，是先祖故事的地理舞台。',
          educationalUse: '幫助讀者看見亞伯拉罕從吾珥到迦南、雅各家下埃及並非隨機移動，而是沿著古代可生存的交通與農牧帶。',
        },
      ],
    },
    scripture: {
      overview:
        '創世記把世界起源、人類破裂、揀選亞伯拉罕與以色列家族的形成串成一條線。約伯記則把先祖時代常見的義人受苦問題推到信仰核心：人是否只因祝福才敬畏神？',
      bookGuides: [
        {
          bookName: '創世記',
          role: '建立整本聖經的起點：創造、墮落、應許、家族與約。',
          readingQuestion: '神的應許如何穿過人的軟弱、欺騙、恐懼與家庭破裂，仍然向前推進？',
        },
        {
          bookName: '約伯記',
          role: '呈現古代智慧傳統中最深的問題：義人為何受苦。',
          readingQuestion: '當生命無法用因果報應解釋時，人如何在神面前保持誠實與敬畏？',
        },
      ],
      readingPath: [
        { label: '呼召的起點', bookName: '創世記', chapter: 12, purpose: '看亞伯拉罕如何離開熟悉世界，進入應許與未知。' },
        { label: '約的核心', bookName: '創世記', chapter: 15, purpose: '看神如何主動立約，承擔應許成就的重量。' },
        { label: '苦難與敬畏', bookName: '約伯記', chapter: 1, purpose: '看信心是否能超越得失交換。' },
      ],
    },
    reflection: {
      theme: '信心不是逃離世界，而是在真實世界中信靠神。',
      prompts: [
        {
          question: '我現在最依賴的「安全網」是什麼？如果神呼召我放下其中一部分，我最害怕失去什麼？',
          hint: '可以從身份、收入、人際關係、熟悉環境或自我掌控感開始想。',
        },
        {
          question: '先祖的信心常常不完整，卻仍被神帶著往前走。這如何修正我對「屬靈成熟」的想像？',
          hint: '留意亞伯拉罕、雅各、約瑟都不是一次就完全明白神。',
        },
      ],
      prayer:
        '主啊，求你讓我在真實的風險與不確定中學習信靠你。當我看不見全路時，仍願意抓住你的應許，走下一步。',
    },
    sources: [
      {
        title: 'File:F Crescent.png',
        sourceName: 'Wikimedia Commons',
        url: 'https://commons.wikimedia.org/wiki/File:F_Crescent.png',
        note: 'CC0 肥沃月灣地圖，用於先祖時期的地理脈絡。',
      },
      {
        title: 'Open Access at The Met',
        sourceName: 'The Metropolitan Museum of Art',
        url: 'https://www.metmuseum.org/hubs/open-access',
        note: '後續古近東與埃及器物圖像的主要公開資料來源。',
      },
    ],
  },
  {
    periodId: 'exodus',
    title: '出埃及與曠野：從奴役到成為盟約群體',
    thesis:
      '出埃及不只是逃離埃及，而是從帝國奴役中被神重新塑造成敬拜的群體。曠野的自然環境、埃及的王權文化與西奈之約，共同構成這段信仰教育。',
    world: {
      culture: {
        title: '埃及王權把秩序集中在法老身上',
        body:
          '埃及新王國強調法老的神聖權威、行政動員與大型工程。出埃及記中的奴役、建城、十災與法老剛硬，不只是個人衝突，而是神與帝國權力、眾神體系之間的對抗。',
      },
      humanity: {
        title: '奴役會塑造人的想像力',
        body:
          '以色列人出了埃及，心卻常常想回埃及。這顯示奴役不只控制身體，也會塑造人的慾望與恐懼。曠野抱怨、金牛犢、對食物與安全的焦慮，都說明自由需要重新學習。',
      },
      environment: {
        title: '曠野是缺乏之地，也是信靠的學校',
        body:
          '西奈與曠野地帶乾燥、缺水、路線艱難。正因如此，嗎哪、水、雲柱火柱不只是神蹟，也是每日依靠的訓練。環境把人帶到極限，使他們看見自己真正信靠的是埃及的穩定，還是神的同在。',
      },
      artifacts: [
        {
          title: '吉薩獅身人面像與埃及王權景觀',
          imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Great_Sphinx_of_Giza_-_20080716a.jpg',
          sourceName: 'Wikimedia Commons',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:Great_Sphinx_of_Giza_-_20080716a.jpg',
          license: 'CC BY-SA 3.0 / GFDL',
          caption: '埃及宏大的王權建築與宗教景觀，幫助讀者理解出埃及敘事中法老權力的重量。',
          educationalUse: '不是用來證明出埃及事件，而是用來建立埃及帝國文化、王權與宗教象徵的背景感。',
        },
      ],
    },
    scripture: {
      overview:
        '出埃及記、利未記、民數記、申命記共同描述神如何拯救、立約、教導並塑造祂的百姓。這四卷書不是零散律法，而是一條從奴役到敬拜、從混亂到盟約身份的路。',
      bookGuides: [
        {
          bookName: '出埃及記',
          role: '描述拯救、逾越節、西奈立約與會幕。',
          readingQuestion: '神拯救百姓的目的，是讓他們自由做自己，還是自由敬拜並歸屬於神？',
        },
        {
          bookName: '利未記',
          role: '說明聖潔、獻祭與神同在中生活的秩序。',
          readingQuestion: '如果神真的住在百姓中間，人的日常生活需要怎樣被重新安排？',
        },
        {
          bookName: '民數記',
          role: '記錄曠野中的失敗、抱怨與神持續的帶領。',
          readingQuestion: '人在自由路上為什麼仍會懷念奴役？',
        },
        {
          bookName: '申命記',
          role: '摩西在進入應許地前重新講述律法與盟約。',
          readingQuestion: '記念過去如何幫助下一代在新的土地上忠心？',
        },
      ],
      readingPath: [
        { label: '苦難中的呼求', bookName: '出埃及記', chapter: 2, purpose: '看神如何聽見、記念、看顧百姓。' },
        { label: '逾越節與拯救', bookName: '出埃及記', chapter: 12, purpose: '看救贖如何成為群體記憶。' },
        { label: '曠野試煉', bookName: '民數記', chapter: 14, purpose: '看恐懼如何使人拒絕應許。' },
        { label: '重新選擇愛神', bookName: '申命記', chapter: 6, purpose: '看律法如何指向全人愛神。' },
      ],
    },
    reflection: {
      theme: '真正的自由，是從恐懼轉向敬拜。',
      prompts: [
        {
          question: '我已經離開某些「埃及」，但心裡仍懷念哪些舊有的安全感？',
          hint: '可以想想自己在壓力下最容易退回的習慣、控制方式或依賴。',
        },
        {
          question: '曠野中的缺乏，正在暴露我對神哪一方面的不信任？',
          hint: '不要急著把缺乏視為失敗；它也可能是神重新訓練信靠的地方。',
        },
      ],
      prayer:
        '主啊，求你把我從外在的轄制和內心的奴役中釋放出來。讓我在缺乏中學習信靠，在自由中學習敬拜。',
    },
    sources: [
      {
        title: 'File:Great Sphinx of Giza - 20080716a.jpg',
        sourceName: 'Wikimedia Commons',
        url: 'https://commons.wikimedia.org/wiki/File:Great_Sphinx_of_Giza_-_20080716a.jpg',
        note: '用於建立埃及王權與宗教景觀的背景感。',
      },
      {
        title: 'Open Access at The Met',
        sourceName: 'The Metropolitan Museum of Art',
        url: 'https://www.metmuseum.org/hubs/open-access',
        note: '後續可替換或補充埃及新王國器物與浮雕圖像。',
      },
    ],
  },
  {
    periodId: 'exile',
    title: '被擄巴比倫：失去聖殿後仍學習忠心',
    thesis:
      '被擄不是聖經故事的中斷，而是信仰被迫離開熟悉形式後的深層考驗。當土地、王權與聖殿都失去，神的百姓必須重新學習：神的同在不被地理限制，信仰也不只存在於順境。',
    world: {
      culture: {
        title: '巴比倫用帝國文化重塑被征服者',
        body:
          '尼布甲尼撒時代的巴比倫是高度組織化的帝國中心，城牆、神廟、行政系統與宮廷教育共同塑造權力秩序。被擄者被帶入這套文化中，不只是被迫遷移，也被迫面對語言、名字、飲食、官僚體制與偶像崇拜的同化壓力。',
      },
      humanity: {
        title: '流亡使人失去外在身份，也暴露內在信仰',
        body:
          '對猶大人而言，耶路撒冷、聖殿、王室與土地都是身份核心。被擄讓這些外在標記同時崩塌，也逼問一個更深的問題：如果我不能再靠地方、制度與傳統證明自己屬於神，我還能如何忠心？但以理、以西結與哀歌都在回答這個問題。',
      },
      environment: {
        title: '從山城耶路撒冷到河網平原巴比倫',
        body:
          '耶路撒冷位於山地，防衛與敬拜都圍繞聖殿山；巴比倫則坐落在幼發拉底河流域，以灌溉、運河與城市工程支撐帝國生活。空間的改變也改變了信仰經驗：詩篇說「在巴比倫河邊」，流亡者在陌生河岸記念錫安，學習在異地向神呼求。',
      },
      artifacts: [
        {
          title: '居魯士圓柱',
          imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Cyrus_Cylinder.jpg',
          sourceName: 'Wikimedia Commons / British Museum',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:Cyrus_Cylinder.jpg',
          license: 'CC BY-SA 4.0',
          caption: '居魯士圓柱記錄波斯王居魯士征服巴比倫後的王權宣告與宗教恢復政策。',
          educationalUse: '用來說明被擄末期的帝國更替，以及以斯拉記中「歸回」政策的古近東背景。它不是直接提到猶大人的證據，卻能幫助讀者理解波斯對被遷徙群體與神廟的治理方式。',
        },
      ],
    },
    scripture: {
      overview:
        '耶利米哀歌、以西結書與但以理書從不同角度描述被擄信仰：哀歌允許人在廢墟中哀哭；以西結宣告神的榮耀仍臨到流亡之地；但以理示範在帝國中心仍不被帝國吞沒。',
      bookGuides: [
        {
          bookName: '耶利米哀歌',
          role: '以詩歌形式面對耶路撒冷被毀後的痛苦、羞辱與盼望。',
          readingQuestion: '真正的信心是否允許人誠實哀哭，而不是急著把痛苦包裝成答案？',
        },
        {
          bookName: '以西結書',
          role: '在被擄群體中宣告審判、神的榮耀離開與重新恢復的異象。',
          readingQuestion: '當熟悉的敬拜中心崩塌，神如何讓人重新認識祂的同在？',
        },
        {
          bookName: '但以理書',
          role: '呈現信徒在外邦宮廷中如何保持智慧、忠心與盼望。',
          readingQuestion: '在強勢文化中，哪些地方需要適應，哪些地方不能妥協？',
        },
      ],
      readingPath: [
        { label: '廢墟中的哀哭', bookName: '耶利米哀歌', chapter: 3, purpose: '看哀傷如何與「你的誠實極其廣大」並存。' },
        { label: '異鄉中的呼召', bookName: '以西結書', chapter: 1, purpose: '看神的榮耀如何在巴比倫河邊臨到先知。' },
        { label: '不被同化的開始', bookName: '但以理書', chapter: 1, purpose: '看但以理如何在宮廷教育中設定忠心的界線。' },
        { label: '帝國與敬拜的衝突', bookName: '但以理書', chapter: 3, purpose: '看敬拜如何成為面對權力時最深的抵抗。' },
      ],
    },
    reflection: {
      theme: '當熟悉的支撐被拿走，信仰才顯出真正的根。',
      prompts: [
        {
          question: '如果我失去某個讓我覺得「神與我同在」的外在記號，我還能怎樣認出神的同在？',
          hint: '可以想想教會、服事角色、人際肯定、穩定生活或某段屬靈經驗。',
        },
        {
          question: '我現在身處的文化，在哪些地方正在改變我的名字、慾望與忠誠？',
          hint: '但以理不是拒絕所有學習，而是在最核心的敬拜與身份上不妥協。',
        },
        {
          question: '我是否允許自己在神面前哀哭？還是我只允許自己講「正確答案」？',
          hint: '哀歌提醒我們，成熟信仰不是沒有眼淚，而是把眼淚帶到神面前。',
        },
      ],
      prayer:
        '主啊，當我失去熟悉的依靠時，求你教我在異地仍認出你的同在。使我有誠實哀哭的勇氣，也有在帝國中不妥協的忠心。',
    },
    sources: [
      {
        title: 'The Cyrus Cylinder',
        sourceName: 'British Museum',
        url: 'https://www.britishmuseum.org/collection/object/W_1880-0617-1941',
        note: '物件頁說明居魯士圓柱的日期、內容、出土地與詮釋限制。',
      },
      {
        title: 'File:Cyrus Cylinder.jpg',
        sourceName: 'Wikimedia Commons',
        url: 'https://commons.wikimedia.org/wiki/File:Cyrus_Cylinder.jpg',
        note: 'CC BY-SA 4.0 圖片，用於被擄巴比倫與波斯歸回背景。',
      },
    ],
  },

]

export function findTimelineDeepDive(periodId: string) {
  return TIMELINE_DEEP_DIVES.find(item => item.periodId === periodId)
}

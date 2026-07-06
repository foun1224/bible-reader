// 時間軸深度學習內容
// 每個 periodId 對應 timelinePeriods.ts 的 id
// Phase 1：patriarchs + exodus（示範時期，Sean 確認品質後再擴充）

export interface SourceAsset {
  title: string
  imageUrl: string
  sourceName: string
  sourceUrl: string
  license: string
  caption: string
  educationalUse: string
}

export interface DeepDiveBlock {
  heading: string
  content: string
  image?: SourceAsset
}

export interface BookGuide {
  bookName: string
  genre: string
  position: string
  readingQuestion: string
  keyPassage?: {
    reference: string
    text: string
  }
}

export interface ReadingStep {
  label: string
  reference: string
}

export interface ReflectionPrompt {
  question: string
}

export interface SourceRef {
  label: string
  url: string
  type: 'museum' | 'academic' | 'encyclopedia' | 'image'
}

export interface TimelineDeepDive {
  periodId: string
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
    godAtWork: string
    humanPattern: string
    prompts: ReflectionPrompt[]
    prayer: string
  }
  sources: SourceRef[]
}

export const TIMELINE_DEEP_DIVES: TimelineDeepDive[] = [
  {
    periodId: 'patriarchs',
    thesis: '神在萬族中揀選一人，以信心為起點，開始了救贖歷史的第一章。',

    world: {
      culture: {
        heading: '文化背景',
        content:
          '約公元前二千年的美索不達米亞是人類最早的城市文明之一。烏爾城（今伊拉克南部）擁有精緻的神廟、市場與書記系統，楔形文字記錄著商業合約、神話詩歌與法律條文。漢摩拉比法典（約 1754 BC）將 282 條法律刻在高達 2.25 公尺的閃長岩石柱上，是亞伯拉罕時代人們所熟悉的法律世界。迦南地則是小城邦林立的過渡地帶，每座城都有自己的守護神明；多神信仰是整個文化的背景雜音，而神呼召亞伯拉罕信靠一位看不見的神，在當時是前所未有的選擇。',
        image: {
          title: '漢摩拉比法典石柱',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/P1050763_Louvre_code_Hammurabi_face_rwk.JPG/480px-P1050763_Louvre_code_Hammurabi_face_rwk.JPG',
          sourceName: 'Wikimedia Commons',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:P1050763_Louvre_code_Hammurabi_face_rwk.JPG',
          license: 'CC BY 2.5',
          caption: '漢摩拉比法典（約 1754 BC），現藏法國羅浮宮。這根 2.25 公尺高的閃長岩石柱刻有 282 條法律，是亞伯拉罕時代美索不達米亞法律文化的代表。',
          educationalUse: '展示先祖時期的法律文化背景，幫助讀者理解亞伯拉罕所在世界的制度與秩序。',
        },
      },
      humanity: {
        heading: '人文變遷',
        content:
          '先祖時代的近東是一個流動性極高的世界——游牧部落、商旅、移民工、傭兵在不同帝國之間遷移。亞伯拉罕從「吾珥」出發，穿越哈蘭、進入迦南，這樣的遷徙在當時並非罕見，而是生存常態。家族單位是最基本的社會結構，族長掌握法律、祭祀、土地與婚姻的決定權。約瑟被賣為奴的故事，也反映了古代近東活躍的人口買賣現象——埃及文獻中就有外邦人被賣入埃及的記錄，與創世記的描述高度吻合。',
      },
      environment: {
        heading: '自然環境',
        content:
          '美索不達米亞的「肥沃月彎」依靠幼發拉底河與底格里斯河定期泛濫帶來的淤泥維持農業。但迦南地的農業則依賴降雨，春雨（前雨）與秋雨（後雨）決定農作豐歉，使「雨水」在整本舊約中成為神恩典的核心意象。西奈半島的乾旱與迦南地的豐饒形成強烈對比，也成為後來「曠野與應許地」主題的地理根基。先祖們的遷徙路線跟著水源與牧草走，地理環境塑造了他們的信仰語言。',
        image: {
          title: '古代近東地圖（約公元前 1450 BC）',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Ancient_Egypt_and_Mesopotamia_c._1450_BC.png/600px-Ancient_Egypt_and_Mesopotamia_c._1450_BC.png',
          sourceName: 'Wikimedia Commons',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ancient_Egypt_and_Mesopotamia_c._1450_BC.png',
          license: 'Public Domain',
          caption: '公元前 1450 年的古代近東，呈現埃及與美索不達米亞之間的地緣關係，迦南地夾在兩大文明的交界處。',
          educationalUse: '幫助讀者建立亞伯拉罕遷徙路線的地理概念，理解聖地的地緣政治位置。',
        },
      },
      artifacts: [
        {
          title: '烏爾 Ziggurat 重建模型',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Ziggurat_of_Ur_001.jpg/480px-Ziggurat_of_Ur_001.jpg',
          sourceName: 'Wikimedia Commons',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ziggurat_of_Ur_001.jpg',
          license: 'Public Domain',
          caption: '烏爾城的 Ziggurat（神廟台塔）重建照片，亞伯拉罕的故鄉烏爾是蘇美文明的核心城市之一。',
          educationalUse: '提供先祖時期的城市文明視覺印象，對照亞伯拉罕「離開城市」進入游牧信仰旅程的意涵。',
        },
      ],
    },

    scripture: {
      overview:
        '創世記是整本聖經的序言，也是人類信仰故事的基礎框架：神如何創造、人如何失落、神又如何開始進入歷史，以一個家族承載整個人類的救贖應許。約伯記則在這個時期提出了最深的問題——苦難如何與一位公義的神並存。這兩卷書合起來，為整本聖經奠定了「神的主權」與「人的掙扎」這兩個基本張力。',
      bookGuides: [
        {
          bookName: '創世記',
          genre: '歷史敘事 / 家族傳記',
          position: '從創造到約瑟，構建了「神—人—應許」的基本敘事張力，是整本聖經故事的起點。',
          readingQuestion: '神對亞伯拉罕的應許在哪些時刻看似不可能實現？這些時刻裡，人的選擇與神的介入如何交織？',
          keyPassage: {
            reference: '創 12:1-3',
            text: '耶和華對亞伯蘭說：「你要離開本地、本族、父家，往我所要指示你的地去。我必叫你成為大國，我必賜福給你，叫你的名為大，你也要叫別人得福。』',
          },
        },
        {
          bookName: '約伯記',
          genre: '智慧文學 / 詩歌與散文',
          position: '設定在先祖時代氛圍的智慧書，探問苦難與神的公義，是聖經中最深刻的神學對話之一。',
          readingQuestion: '約伯的朋友都說「受苦是因為犯罪」，但神說他們說得不對。這對你如何理解苦難有什麼衝擊？',
          keyPassage: {
            reference: '伯 19:25',
            text: '我知道我的救贖主活著，末了必站立在地上。',
          },
        },
      ],
      readingPath: [
        { label: '創造與起源', reference: '創 1–3' },
        { label: '亞伯拉罕的信心旅程', reference: '創 12, 15, 17, 22' },
        { label: '雅各的掙扎', reference: '創 32–33' },
        { label: '約瑟的生命弧線', reference: '創 37, 39–41, 45' },
        { label: '苦難中的神', reference: '伯 1–2, 38–42' },
      ],
    },

    reflection: {
      theme: '揀選之恩：神的計畫從一個人的信心開始',
      godAtWork:
        '這個時代最引人注目的，不是神展現了多少能力，而是祂選擇了多少脆弱的人。亞伯拉罕是說謊的人（他兩次謊稱撒拉是妹妹），雅各是騙子，約瑟被親兄弟出賣。神的計畫沒有等人完美才啟動，而是在人的不完全中持續推進——這是先祖時期給所有後代最深刻的安慰。',
      humanPattern:
        '先祖們共同展示了一個信仰模式：蒙召、順從、等待、軟弱、再次被扶起、繼續前行。沒有人是一次就走得筆直的。信心不是無所懷疑，而是在懷疑中仍然繼續走。亞伯拉罕等了 25 年才等到以撒；雅各在雅博渡口摔跤才得祝福；約瑟在監獄裡等了兩年無人記念。等待是先祖信仰的基本節奏。',
      prompts: [
        {
          question: '神呼召亞伯拉罕「離開」一切熟悉的環境。你的生命中，有什麼是神可能正在呼召你放下的？你的猶豫在哪裡？',
        },
        {
          question: '約伯在最深的痛苦中仍然說「我知道我的救贖主活著」。你的信心所立足的基礎是什麼？在最黑暗的時刻，這個基礎是否仍然穩固？',
        },
        {
          question: '神選擇了雅各這個騙子來延續應許。這對你如何看待神使用不完美的人，有什麼提醒？',
        },
      ],
      prayer:
        '神啊，你是那位看見每一個人的神——不是我表現最好的那一刻，而是我最掙扎、最不像樣的時候。你揀選亞伯拉罕，你也揀選了我。求你教導我像先祖們那樣，在不確定中仍然前行，在等待中仍然信靠。阿們。',
    },

    sources: [
      { label: 'The Met Open Access：古代近東藝術館藏', url: 'https://www.metmuseum.org/departments/ancient-near-eastern-art', type: 'museum' },
      { label: 'Wikimedia Commons：漢摩拉比法典', url: 'https://commons.wikimedia.org/wiki/Code_of_Hammurabi', type: 'image' },
      { label: 'ORACC：楔形文字資料庫', url: 'https://oracc.museum.upenn.edu/', type: 'academic' },
      { label: 'Bible Odyssey / SBL：Who Was Abraham?', url: 'https://www.bibleodyssey.org/people/main-articles/abraham', type: 'academic' },
      { label: 'World History Encyclopedia：Hammurabi', url: 'https://www.worldhistory.org/Hammurabi/', type: 'encyclopedia' },
    ],
  },

  {
    periodId: 'exodus',
    thesis: '神以十災震撼帝國，以嗎哪養活百姓，以律法建立民族——出埃及不只是一次解放，而是神如何成為一個民族的根基。',

    world: {
      culture: {
        heading: '文化背景',
        content:
          '約公元前 1500 至 1200 年的埃及正處於新王國全盛時期，是人類歷史上組織最嚴密的帝國之一。法老被尊為現世之神——太陽神的化身——神廟、方尖碑與金字塔是帝國神聖權威的建築語言。卡納克神廟的銘文驕傲地記錄了法老的勝利，從不提及失敗；這也可以解釋為何埃及史料中幾乎沒有直接提及出埃及的記錄。摩西在法老宮廷中長大（出 2:10），他熟悉這個帝國的語言、文化與權力結構，這使他成為一個「局內人的局外人」，在神的呼召中承擔了歷史性的角色。',
        image: {
          title: '卡納克神廟拉美西斯二世浮雕',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Karnak_Ramses_II_01.JPG/480px-Karnak_Ramses_II_01.JPG',
          sourceName: 'Wikimedia Commons',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:Karnak_Ramses_II_01.JPG',
          license: 'CC BY-SA 3.0',
          caption: '埃及卡納克神廟的法老浮雕，新王國時期的神廟建築宣揚法老的神聖地位，是以色列人所面對的帝國視覺文化。',
          educationalUse: '幫助讀者感受以色列人所在的埃及帝國文化氛圍，對照神透過十災挑戰埃及每一位神明的神學意涵。',
        },
      },
      humanity: {
        heading: '人文變遷',
        content:
          '以色列人在埃及的身份從「約瑟的家族」（賓客）轉變為「奴隸」，是古代常見的政治翻轉。在出埃及的敘事中，以色列人從法律上是帝國財產，但在神的眼中，他們是「我的兒子、我的長子」（出 4:22）。曠野中的 40 年是一段劇烈的身份重塑過程——奴隸的思維不能直接進入應許地，需要在艱難中學習效忠一位看不見的神，而不是依賴帝國的糧倉。一整個世代在曠野中消逝，進入應許地的是在曠野中出生的第二代，他們沒有記憶中的埃及可以「回去」。',
      },
      environment: {
        heading: '自然環境',
        content:
          '出埃及的路線穿越迥異的地理環境：尼羅河三角洲的哥珊地（Goshen）是肥沃的農業區，適合牧羊；西奈半島是岩石山地與礫石沙漠，夏季高溫超過 40°C，水源稀少；西奈山（可能是今天的賈貝爾穆薩山）是崎嶇的花崗岩地帶，海拔約 2285 公尺，摩西在此領受十誡。這段旅程的地理本身就是神學——從安全的奴役到危險的自由，是真正信心的試場。嗎哪的供應（出 16 章）在自然環境完全無法自給的曠野中，成為信靠神的每日操練。',
        image: {
          title: '西奈半島衛星圖（NASA）',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/SinaiPeninsula_ISS007-E-16811.jpg/600px-SinaiPeninsula_ISS007-E-16811.jpg',
          sourceName: 'NASA / Wikimedia Commons',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:SinaiPeninsula_ISS007-E-16811.jpg',
          license: 'Public Domain (NASA)',
          caption: '從國際太空站拍攝的西奈半島（2003 年）。這片岩石半島是以色列人曠野旅程的地理舞台，在乾旱荒涼的環境中，神供應嗎哪與水的神蹟具有更深的震撼力。',
          educationalUse: '提供曠野旅程的地理現實感，幫助讀者理解在這樣的環境中信靠神的供應意味著什麼。',
        },
      },
      artifacts: [
        {
          title: 'Merneptah Stele（局部）——「以色列」在古埃及文獻中的最早記錄',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Merneptah_Israel_Stele_Cairo.jpg/480px-Merneptah_Israel_Stele_Cairo.jpg',
          sourceName: 'Wikimedia Commons',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:Merneptah_Israel_Stele_Cairo.jpg',
          license: 'Public Domain',
          caption: 'Merneptah Stele（約 1208 BC），現藏埃及開羅博物館。碑文中出現「以色列」這個名字，是古代文獻中最早的聖經外部以色列記錄，現藏開羅博物館。',
          educationalUse: '展示埃及史料對以色列民族的外部記錄，作為聖經歷史的考古佐證。',
        },
      ],
    },

    scripture: {
      overview:
        '出埃及記到申命記是以色列民族的誕生證書，記錄了神如何把一群奴隸變成蒙召的民族：先給他們自由，再給他們律法，再給他們敬拜的方式，最後給他們一個身份。這四卷書的神學核心是：救贖在律法之前——神先愛，然後才要求回應。',
      bookGuides: [
        {
          bookName: '出埃及記',
          genre: '歷史敘事 + 律法',
          position: '記錄神的救贖行動與立約，是舊約最核心的事件，奠定了整個以色列信仰的基礎敘事。',
          readingQuestion: '在十災的敘事中，法老一次次「心裡剛硬」。你認為神是讓法老剛硬，還是法老自己選擇剛硬？這個張力告訴你什麼？',
          keyPassage: {
            reference: '出 14:13-14',
            text: '摩西對百姓說：「不要懼怕，只管站住！看耶和華今天向你們所要施行的救恩……耶和華必為你們爭戰；你們只管靜默，不要作聲。」',
          },
        },
        {
          bookName: '利未記',
          genre: '律法書 / 聖潔規條',
          position: '建立以色列的祭司制度與聖潔標準，回應「神如何能住在有罪的百姓中間」這個核心問題。',
          readingQuestion: '利未記的獻祭制度對你來說很陌生。在讀這些規條時，你如何看待「接近聖潔的神需要代價」這件事？',
          keyPassage: {
            reference: '利 19:2',
            text: '你曉諭以色列全會眾說：「你們要聖潔，因為我耶和華你們的神是聖潔的。」',
          },
        },
        {
          bookName: '民數記',
          genre: '歷史敘事 + 人口記錄',
          position: '記錄曠野漂流的失敗，是「得救之後仍然不信」的誠實記錄，也是警告後代不要重蹈覆轍的書。',
          readingQuestion: '以色列人在曠野一再抱怨，即使剛剛見過神的大能。你在哪些時刻發現自己做著同樣的事？',
        },
        {
          bookName: '申命記',
          genre: '演說 / 律法重申',
          position: '摩西的告別演說，把律法從外在規條帶入心靈層次，預備下一代進入應許地。',
          readingQuestion: '申命記 6:4-9 把愛神的命令與家庭日常生活緊密連結。你的信仰是如何進入日常的？',
          keyPassage: {
            reference: '申 6:4-5',
            text: '以色列啊，你要聽！耶和華我們神是獨一的主。你要盡心、盡性、盡力愛耶和華你的神。',
          },
        },
      ],
      readingPath: [
        { label: '摩西的呼召', reference: '出 1–4' },
        { label: '十災', reference: '出 7–12' },
        { label: '紅海過去', reference: '出 14–15' },
        { label: '西奈山 / 十誡', reference: '出 19–20' },
        { label: '十二探子的失敗', reference: '民 13–14' },
        { label: '愛神與記憶', reference: '申 6–8' },
      ],
    },

    reflection: {
      theme: '出埃及的神學：救贖在律法之前',
      godAtWork:
        '神救以色列人出埃及，不是因為他們守律法——律法是後來在西奈山才頒布的。神先救他們，再給他們規範。這個順序在舊約與新約中都保持一致：先是恩典，後是回應。出埃及記最顛覆人心的宣告是：你是先被愛了，才被呼召活在這愛的回應中。神以嗎哪每天供應，以雲柱火柱同行，以摩西的舉手爭戰——祂的同在是主動的、每日的、不等百姓完美才介入的。',
      humanPattern:
        '百姓在紅海邊唱勝利之歌（出 15），三天後就在瑪拉抱怨苦水（出 15:24）。這不是諷刺，而是誠實——人的記憶很短，人的不安全感很深。曠野是神訓練人「信任祂每日供應」的學校，不是人表現良好才能通過的考試。以色列人一次次「想回埃及去」，是因為他們寧可要看得見的奴役，也不要看不見的自由。這個掙扎是所有信仰旅程的縮影。',
      prompts: [
        {
          question: '神供應嗎哪「夠一天」的量，明天要重新信靠。你在哪方面最難讓神「夠一天」，而不是想儲存安全感？',
        },
        {
          question: '西奈山頒律法時，百姓「站在遠處」（出 20:18-21）。你如何體驗神的聖潔與你之間的距離感？這個距離叫你退縮，還是叫你更渴望？',
        },
        {
          question: '以色列人有一個多次出現的句子：「我們寧可回埃及去」（民 11:18）。你生命中有什麼是你在不知不覺中「想回去」的？',
        },
      ],
      prayer:
        '神啊，你在百姓抱怨的曠野中供應嗎哪，在他們失信的曠野中仍然同行。我承認我也常常想要回到我熟悉的奴役，而不是走向我還看不見的應許。求你教導我相信你今天的供應就是夠的，你同行的事實比終點更重要。阿們。',
    },

    sources: [
      { label: 'The Met Open Access：Egyptian Art', url: 'https://www.metmuseum.org/departments/egyptian-art', type: 'museum' },
      { label: 'Wikimedia Commons：Karnak Temple Complex', url: 'https://commons.wikimedia.org/wiki/Category:Karnak_Temple_Complex', type: 'image' },
      { label: 'Bible Odyssey / SBL：The Exodus', url: 'https://www.bibleodyssey.org/places/main-articles/exodus', type: 'academic' },
      { label: 'NASA Earth Observatory：Sinai Peninsula', url: 'https://earthobservatory.nasa.gov/', type: 'image' },
      { label: 'World History Encyclopedia：Merneptah Stele', url: 'https://www.worldhistory.org/Merneptah_Stele/', type: 'encyclopedia' },
    ],
  },
]

export function getDeepDive(periodId: string): TimelineDeepDive | undefined {
  return TIMELINE_DEEP_DIVES.find(d => d.periodId === periodId)
}

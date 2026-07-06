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
          '先祖時代的古近東已經有成熟城市、文字、法典與神廟經濟。美索不達米亞的法律與契約文化顯示，人們高度重視土地、繼承、婚姻與家族名分。創世記中的約、長子名分、家族衝突與土地應許，都要放在這種社會秩序中閱讀。這也解釋了為什麼亞伯拉罕買麥比拉洞、雅各取得長子名分、約瑟管理糧倉，並不是故事旁枝，而是信仰如何進入法律、經濟與家族制度的具體場景。',
      },
      humanity: {
        title: '家族是人的安全網，也是衝突核心',
        body:
          '在沒有現代國家保障的世界，家族與宗族就是人的身份、財產與安全來源。因此亞伯拉罕離開本地、本族、父家，不只是搬家，而是離開原本的保護系統。雅各、以掃、約瑟與兄弟之間的故事，也反映家族權力與祝福傳承的張力。先祖敘事一再呈現不孕、偏愛、兄弟相爭、外族婚姻與移民身份，讓讀者看見神不是在理想家庭中工作，而是在破裂家庭中保存應許。',
      },
      environment: {
        title: '肥沃月灣決定遷徙路線',
        body:
          '從兩河流域到迦南，再到埃及，先祖移動的路線大多沿著肥沃月灣。沙漠不是主要居住地，而是分隔文明的邊界；河流、牧草與糧食供應決定人能否生存。創世記多次出現饑荒，正提醒讀者：信心之旅常常被自然環境推動。亞伯拉罕下埃及、雅各家因糧荒遷往埃及，都不是單純的逃難，而是神把應許帶入國際糧食、氣候與移民流動中的故事。',
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
        '創世記把世界起源、人類破裂、揀選亞伯拉罕與以色列家族的形成串成一條線。約伯記則把先祖時代常見的義人受苦問題推到信仰核心：人是否只因祝福才敬畏神？讀這兩卷書時，可以同時看見兩條主線：神如何透過一個家族祝福萬族，以及人在無法掌控生命時如何仍然面對神。',
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
          '埃及新王國強調法老的神聖權威、行政動員與大型工程。出埃及記中的奴役、建城、十災與法老剛硬，不只是個人衝突，而是神與帝國權力、眾神體系之間的對抗。十災逐步觸及尼羅河、牲畜、農作、黑暗與長子，等於宣告以色列的神不是地方小神，而是掌管自然、生命與王權的主。',
      },
      humanity: {
        title: '奴役會塑造人的想像力',
        body:
          '以色列人出了埃及，心卻常常想回埃及。這顯示奴役不只控制身體，也會塑造人的慾望與恐懼。曠野抱怨、金牛犢、對食物與安全的焦慮，都說明自由需要重新學習。奴役留下的不是只有傷痕，也是一套想像：只要有鍋裡的肉、有可預測的制度，即使失去尊嚴也比未知安全。',
      },
      environment: {
        title: '曠野是缺乏之地，也是信靠的學校',
        body:
          '西奈與曠野地帶乾燥、缺水、路線艱難。正因如此，嗎哪、水、雲柱火柱不只是神蹟，也是每日依靠的訓練。環境把人帶到極限，使他們看見自己真正信靠的是埃及的穩定，還是神的同在。曠野也讓以色列失去可倚靠的城市與農田，迫使他們把時間、食物、方向與敬拜都重新交給神。',
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
        '出埃及記、利未記、民數記、申命記共同描述神如何拯救、立約、教導並塑造祂的百姓。這四卷書不是零散律法，而是一條從奴役到敬拜、從混亂到盟約身份的路。讀者若只把律法看成規條，會錯過它真正的功能：神正在把一群被奴役塑造的人，重新訓練成能與祂同住、彼此相待、記念救恩的群體。',
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
          '尼布甲尼撒時代的巴比倫是高度組織化的帝國中心，城牆、神廟、行政系統與宮廷教育共同塑造權力秩序。被擄者被帶入這套文化中，不只是被迫遷移，也被迫面對語言、名字、飲食、官僚體制與偶像崇拜的同化壓力。但以理書開頭的改名、學習迦勒底文字、食用王膳，正好呈現帝國如何透過教育與禮儀改寫人的身份。',
      },
      humanity: {
        title: '流亡使人失去外在身份，也暴露內在信仰',
        body:
          '對猶大人而言，耶路撒冷、聖殿、王室與土地都是身份核心。被擄讓這些外在標記同時崩塌，也逼問一個更深的問題：如果我不能再靠地方、制度與傳統證明自己屬於神，我還能如何忠心？但以理、以西結與哀歌都在回答這個問題。哀歌保留悲傷，以西結重新描繪神的榮耀，但以理則示範人在外邦制度中仍可敬畏神，三者合起來形成流亡信仰的完整面貌。',
      },
      environment: {
        title: '從山城耶路撒冷到河網平原巴比倫',
        body:
          '耶路撒冷位於山地，防衛與敬拜都圍繞聖殿山；巴比倫則坐落在幼發拉底河流域，以灌溉、運河與城市工程支撐帝國生活。空間的改變也改變了信仰經驗：詩篇說「在巴比倫河邊」，流亡者在陌生河岸記念錫安，學習在異地向神呼求。河邊不再只是經濟與交通場域，也成了悲傷、記憶與禱告交會的地方。',
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
        '耶利米哀歌、以西結書與但以理書從不同角度描述被擄信仰：哀歌允許人在廢墟中哀哭；以西結宣告神的榮耀仍臨到流亡之地；但以理示範在帝國中心仍不被帝國吞沒。這三卷書也分別對應三種靈性功課：如何哀悼、如何重新想像神的同在、如何在異文化中不失去忠誠。',
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

  {
    periodId: 'return',
    title: '歸回與重建：回到土地，卻需要重建心靈',
    thesis:
      '歸回應許地不等於回到過去。廢墟的耶路撒冷告訴以色列人：地理的歸回只是起點，真正的重建是信仰群體與屬神身份的重塑——這比城牆更難建造。',
    world: {
      culture: {
        title: '波斯帝國推行宗教包容作為治理策略',
        body:
          '居魯士大帝的政策允許被遷移民族返回故鄉、恢復神廟祭拜，這在古代是非常獨特的帝國策略。他的這個決定被刻在居魯士圓柱上，記錄他讓各民族帶著神像歸回故地。以斯拉記開頭引用居魯士詔書，聖經作者把它理解為神動用外邦君王來成就應許。整個波斯治下的近東，宗教與民族身份在帝國架構中相對獲得喘息空間。這提醒讀者：神的工作不只透過聖殿、祭司或以色列王，也可能透過外邦帝國的政策與歷史轉折成就。',
      },
      humanity: {
        title: '歸回者、留守者與外族之間的身份衝突',
        body:
          '歸回的猶大人面對的不是空地，而是已在這片土地生活了幾十年的混居群體。誰是「真正的以色列人」？誰有資格重建聖殿？以斯拉-尼希米記錄的通婚問題、安息日爭議、祭司名冊，都反映一場關於邊界與身份的深層討論。這種「歸回者的眼光」也造成了社群的張力，既排外又脆弱。讀這些書時要同時看見兩面：群體確實需要分辨身份，但身份焦慮也可能讓重建變得僵硬與排斥。',
      },
      environment: {
        title: '從河流平原到山城廢墟',
        body:
          '巴比倫坐落在幼發拉底河流域的肥沃平原，城市基礎設施完整；而歸回者面對的耶路撒冷，是山地廢墟、城牆頹敗、聖殿燒毀的景象。尼希米記對城牆的詳細記錄顯示，重建是一件具體、艱辛、在周圍敵人嘲弄下進行的工程。土地的實際狀況，讓應許地的榮耀與現實的落差更加刺骨。歸回不是浪漫的回家，而是面對斷垣殘壁、經濟壓力、敵意與灰心，仍然一天一天把石頭放回原位。',
      },
      artifacts: [
        {
          title: '阿契美尼德波斯帝國版圖（公元前 500 年）',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Map_of_the_Achaemenid_Empire.jpg/1280px-Map_of_the_Achaemenid_Empire.jpg',
          sourceName: 'Wikimedia Commons',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:Map_of_the_Achaemenid_Empire.jpg',
          license: 'CC BY-SA 3.0',
          caption: '波斯阿契美尼德帝國版圖橫跨從埃及到印度，居魯士大帝的宗教包容政策允許猶太人歸回故地，是以斯拉記歸回敘事的地緣政治背景。',
          educationalUse: '幫助讀者理解歸回時期的地緣政治背景，看見以色列從巴比倫到耶路撒冷的路程置放在更大帝國版圖中的比例與意義。',
        },
      ],
    },
    scripture: {
      overview:
        '這個時期的書卷共同回答一個問題：歸回之後，神的百姓如何在廢墟與衝突中重建屬神的群體？以斯拉-尼希米從律法與城牆兩個方向重建；哈該-撒迦利亞-瑪拉基從先知角度鼓勵並挑戰仍在妥協的百姓；以斯帖則從留在帝國的人的角度，提醒神在看不見之處仍護守祂的子民。這批書卷的張力在於：外在工程可以完成，內在更新卻仍未完成，因此它自然把讀者帶向更深的等待。',
      bookGuides: [
        {
          bookName: '以斯拉記',
          role: '記錄第一批歸回、聖殿重建與律法更新，焦點在身份的宗教核心。',
          readingQuestion: '以斯拉與利未人宣讀律法時，百姓一面哭泣一面重新明白神的話（尼 8）。是什麼讓人聽見神的話語時落淚？',
        },
        {
          bookName: '尼希米記',
          role: '記錄城牆重建、社群改革與敵人的阻撓，是信心與行動的具體敘事。',
          readingQuestion: '尼希米在外部嘲弄和內部妥協的壓力下繼續工作。你在哪些地方需要同樣的堅持？',
        },
        {
          bookName: '以斯帖記',
          role: '呈現留在波斯的猶太人如何在危機中，神隱藏地介入並保全祂的子民。',
          readingQuestion: '以斯帖記全書未提到神的名字，你如何在這故事中看見神的臨在？',
        },
        {
          bookName: '瑪拉基書',
          role: '舊約最後一卷先知書，指出歸回後的百姓仍在獻祭、婚姻與十分之一上漫不經心。',
          readingQuestion: '為什麼外在的歸回（回到土地、恢復祭祀）不等於心靈的歸回？',
        },
      ],
      readingPath: [
        { label: '歸回的命令', bookName: '以斯拉記', chapter: 1, purpose: '看居魯士詔書如何成為神應許的實現。' },
        { label: '城牆的危機', bookName: '尼希米記', chapter: 4, purpose: '看外部嘲弄如何成為信心與禱告的動力。' },
        { label: '律法的重新中心化', bookName: '尼希米記', chapter: 8, purpose: '看聽神的話語如何重建群體身份。' },
        { label: '帝國中的護守', bookName: '以斯帖記', chapter: 4, purpose: '看「此時此刻你來到王后的位分，豈不是為現今的機會嗎」。' },
        { label: '舊約的告別', bookName: '瑪拉基書', chapter: 4, purpose: '看最後一位先知如何預告以利亞與太陽升起的彌賽亞。' },
      ],
    },
    reflection: {
      theme: '歸回是起點，不是終點——神要建造的比城牆更深。',
      prompts: [
        {
          question: '我生命中是否有某個「歸回」之後，卻發現廢墟比想像中更多的時刻？那段重建的過程告訴你什麼？',
          hint: '可以想想恢復一段關係、重啟一個習慣、回歸一個群體，發現現實與期待落差的經驗。',
        },
        {
          question: '尼希米同時禱告又行動（尼 4:9「我們向神禱告，又因他們的緣故派人看守」）。你如何平衡信靠神與承擔責任？',
          hint: '注意尼希米不是「禱告之後等神工作」，而是「禱告之後繼續做工」。',
        },
        {
          question: '以斯帖記的神在幕後工作，沒有明顯神蹟。你如何在「看不見神的手」的時候仍然信任祂的主權？',
          hint: '留意以斯帖記的結構：每一個「巧合」如何連成一條看見神護守的線。',
        },
      ],
      prayer:
        '主啊，我感謝你連在廢墟中仍然帶領歸回。求你教我分辨什麼是外在的整齊，什麼是你真正要在我心裡重建的。讓我的歸回不只是回到熟悉的位置，而是真正回到你。',
    },
    sources: [
      {
        title: 'Elephantine Papyrus (Brooklyn Museum)',
        sourceName: 'Wikimedia Commons / Brooklyn Museum',
        url: 'https://commons.wikimedia.org/wiki/File:Elephantine_papyrus_in_the_Brooklyn_Museum.jpg',
        note: 'CC BY 3.0，波斯時代猶太離散群體的文獻，補充歸回期的多元猶太社群背景。',
      },
      {
        title: 'Cyrus Cylinder',
        sourceName: 'British Museum',
        url: 'https://www.britishmuseum.org/collection/object/W_1880-0617-1941',
        note: '居魯士圓柱——歸回詔書的歷史背景文物，與 exile 時期共享此來源。',
      },
      {
        title: 'Elephantine Papyri (Jewish community in Egypt)',
        sourceName: 'JSTOR / Jewish Encyclopedia',
        url: 'https://www.jewishencyclopedia.com/articles/5617-elephantine-papyri',
        note: '以拉凡那文書學術背景介紹，說明波斯時代猶太社群的行政、宗教與書信往來。',
      },
    ],
  },

  {
    periodId: 'intertestamental',
    title: '兩約之間：沉默中的預備',
    thesis:
      '從瑪拉基到馬太，四百年沒有新的先知聲音——但歷史沒有停止。希臘化、馬加比革命、羅馬征服、七十士譯本、會堂制度與法利賽傳統，共同預備了新約時代的語言、問題與期待。這四百年的沉默是神話語預備的時間，不是神缺席的時間。',
    world: {
      culture: {
        title: '希臘化：一種語言與思想的全球化',
        body:
          '亞歷山大大帝在公元前 333 年征服波斯，並將希臘文化向東推進到印度邊境。他死後帝國分裂，但希臘語（Koine Greek）成為地中海世界的通用語。猶太人面對希臘哲學、運動競技、文學與城市生活的全面滲透。安提阿古四世（約公元前 167 年）強制猶太人希臘化——禁止安息日、割禮，在聖殿設偶像——引發馬加比起義，獨立節光明節（Hanukkah）從此而來。七十士譯本（LXX）則是這場文化碰撞最有建設性的產物：希伯來聖經被譯成希臘語，使分散在帝國各地的猶太人與外邦人都能讀到神的話語。換句話說，壓迫與翻譯、同化與宣教機會，在同一個時代並存。',
      },
      humanity: {
        title: '猶太社群的四種回應方式',
        body:
          '面對希臘化與羅馬統治，猶太人形成了幾個重要派系，這些派系後來直接出現在福音書的衝突場景中：法利賽人護衛律法、發展口傳傳統（後來成為猶太法典 Talmud 的基礎），強調每個人在會堂中都能親近律法；撒都該人是聖殿貴族與祭司精英，只接受成文摩西五經，並與羅馬維持合作關係；愛色尼人隱居曠野（死海古卷的可能群體），等待末世審判；奮銳黨人主張武裝抵抗羅馬。這四種路線，代表了在強權下信仰群體如何保持身份的四種方式。理解這些派系，能幫助讀者讀懂福音書中耶穌為何不只是面對個人罪惡，也面對整套宗教、政治與民族期待。',
      },
      environment: {
        title: '從波斯到希臘到羅馬：帝國的三次更替',
        body:
          '這四百年巴勒斯坦先後在波斯（539–333 BC）、馬其頓/塞琉古（333–142 BC）、哈斯摩尼（142–63 BC）與羅馬（63 BC 起）的統治下。龐培在公元前 63 年進入聖殿（但未搶奪器物）標誌著羅馬時代的開始。耶路撒冷在這段時間成為一個被反覆征服、重建、世俗化又護衛的城市。到新約時代，巴勒斯坦是羅馬帝國的一個省，猶太人既享有一定的宗教自主，也承受重稅與占領的恥辱。這就是為什麼「神的國」在新約中不是抽象宗教詞彙，而是被佔領民族聽來極具重量的盼望。',
      },
      artifacts: [
        {
          title: '亞歷山大大帝馬賽克（龐貝出土，那不勒斯國立考古博物館）',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Alexander_the_Great_mosaic.jpg',
          sourceName: 'Wikimedia Commons',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:Alexander_the_Great_mosaic.jpg',
          license: 'Public Domain',
          caption: '亞歷山大大帝馬賽克，出土於龐貝古城，現藏那不勒斯國立考古博物館。約公元前 1 世紀複製自更早的希臘原作，描繪亞歷山大大帝在戰場上的形象——希臘化時代的視覺象徵。',
          educationalUse: '幫助讀者視覺化亞歷山大時代的帝國擴張，理解希臘化如何在政治與文化上改變了兩約之間的猶太世界。',
        },
      ],
    },
    scripture: {
      overview:
        '兩約之間沒有新的正典書卷，但這個時期的發展直接影響了新約的理解框架。以下的「承接閱讀」不是要補充新書卷，而是幫助讀者看見：舊約的結局如何留下問題，兩約之間的歷史如何放大這些問題，以及為什麼新約的開頭「終於來了」。如果跳過這段歷史，讀者會突然在新約遇見法利賽人、撒都該人、會堂、希律、羅馬總督，卻不知道這些角色如何形成。',
      bookGuides: [
        {
          bookName: '但以理書',
          role: '但以理書的帝國異象（第 2、7 章）預描了金銀銅鐵土的帝國更迭，至今被解讀為波斯→希臘→羅馬的序列，為兩約之間的人提供了一個理解歷史的神學框架。',
          readingQuestion: '如果你活在一個接連被帝國統治的時代，但以理的異象對你的盼望有什麼作用？',
        },
        {
          bookName: '瑪拉基書',
          role: '瑪拉基是舊約最後一位先知，他預告以利亞再來（瑪 4:5）——新約將這個應許連結到施洗約翰。讀這個結尾，有助於感受四百年「等待以利亞」的張力。',
          readingQuestion: '四百年沒有先知聲音的以色列人在等什麼？等待如何塑造一個群體的盼望？',
        },
        {
          bookName: '以斯拉記',
          role: '以斯拉記與尼希米記留下第二聖殿群體的起點：聖殿重建、律法宣讀、群體邊界與盼望尚未完全實現的張力。',
          readingQuestion: '當百姓已經回到土地，卻仍然沒有大衛王朝與完全自由，他們如何在未完成的恢復中繼續等待？',
        },
      ],
      readingPath: [
        { label: '帝國更迭的異象', bookName: '但以理書', chapter: 7, purpose: '看四獸異象如何成為流亡群體理解歷史的神學語言。' },
        { label: '舊約的問號', bookName: '瑪拉基書', chapter: 4, purpose: '看最後一位先知如何留下一個懸念：以利亞回來了嗎？' },
        { label: '未完成的歸回', bookName: '以斯拉記', chapter: 6, purpose: '看第二聖殿完成時的喜樂，如何仍帶著等待更大恢復的張力。' },
      ],
    },
    reflection: {
      theme: '沉默不是缺席——神在歷史的安靜中仍在預備。',
      prompts: [
        {
          question: '你是否有過神「沉默」的時期——沒有明顯的方向、感動或答案？那段時間，你如何維持信仰？',
          hint: '兩約之間的猶太人沒有先知，卻有會堂、律法、詩篇，還有彼此。沉默中的群體是什麼讓他們撐過去的？',
        },
        {
          question: '法利賽人、撒都該人、愛色尼人、奮銳黨人——四種面對強權的信仰方式。你最靠近哪一種？哪一種讓你不舒服？',
          hint: '不要急著評判哪一種對。先問：在壓力下，我傾向保持什麼、放棄什麼？',
        },
        {
          question: '希臘化帶來了更好的語言與基礎設施，卻也帶來文化的同化壓力。在你所在的文化中，哪些是可以學習的，哪些是需要保持界線的？',
          hint: '但以理在宮廷裡學習巴比倫語言，卻在飲食與敬拜上設定界線。這個取捨原則適用於今天嗎？',
        },
      ],
      prayer:
        '主啊，感謝你在沉默中仍然預備。當我看不見你的手、聽不見你的聲音時，求你讓我記得：你的時間不是我的時間，你的沉默不是你的缺席。讓我在等待中仍然忠心，在歷史的混亂中仍然看見你的主權。',
    },
    sources: [
      {
        title: 'Battle of Issus mosaic (Alexander)',
        sourceName: 'Wikimedia Commons',
        url: 'https://commons.wikimedia.org/wiki/File:Battle_of_Issus_333_BC-Poseidon_mosaic.jpg',
        note: 'Public Domain 馬賽克，用於視覺化希臘化時代的帝國更迭背景。',
      },
      {
        title: 'Maccabees and Hanukkah (World History Encyclopedia)',
        sourceName: 'World History Encyclopedia',
        url: 'https://www.worldhistory.org/Maccabees/',
        note: '馬加比起義的學術介紹，說明光明節起源、安提阿古四世的壓迫與哈斯摩尼獨立。',
      },
      {
        title: 'Dead Sea Scrolls (Leon Levy Dead Sea Scrolls Digital Library)',
        sourceName: 'Israel Antiquities Authority',
        url: 'https://www.deadseascrolls.org.il/',
        note: '死海古卷數位圖書館，提供愛色尼群體手稿的公開學術資源。',
      },
      {
        title: 'The Septuagint',
        sourceName: 'Encyclopaedia Britannica',
        url: 'https://www.britannica.com/topic/Septuagint',
        note: '七十士譯本背景資料，說明希伯來聖經被譯成希臘語後如何影響猶太離散社群與早期基督教引用。',
      },
    ],
  },

  {
    periodId: 'jesus',
    title: '耶穌時代：神道成肉身，與人同住',
    thesis:
      '耶穌來到兩約之間預備的世界，卻以完全出乎意料的方式成為彌賽亞——不是以武力驅逐羅馬，而是以受苦的僕人身份建立神的國度。四本福音書從不同角度記錄同一個人，邀請讀者反覆問那個核心問題：「你說我是誰？」',
    world: {
      culture: {
        title: '奧古斯都的和平帶來秩序，也帶來壓制',
        body:
          '羅馬帝國的「Pax Romana」（羅馬和平）在耶穌出生前後達到高峰。帝國的道路系統、希臘語通用語與統一貨幣，讓資訊與商業快速流通；但這套秩序是建立在軍事壓制與稅收剝削之上的。猶太人每年繳納宗教稅（給聖殿）、羅馬稅（人頭稅、商業稅）與地方稅，沉重的稅賦使窮人更窮。希律王大建聖殿（約公元前 20 年開工），外牆高達 30 公尺、用大理石貼面，是當時世界上最壯觀的建築之一——但它是靠羅馬體制支持的假榮耀。耶穌傳道的背景，是宗教建制與帝國秩序高度纏繞的世界。',
      },
      humanity: {
        title: '加利利漁夫與耶路撒冷文士活在不同世界',
        body:
          '巴勒斯坦在耶穌時代是高度分層的社會：聖殿祭司貴族、法利賽文士、小城市工匠（木匠/石匠）、漁夫、稅吏（被視為與羅馬勾結的叛徒）、屬靈不潔淨者（長痲瘋、流血的婦人）與外邦人，各自處在不同的社會與宗教等級中。加利利被耶路撒冷菁英視為鄉下邊緣地帶（「拿撒勒還能出什麼好的嗎？」）。耶穌呼召的十二門徒大多是加利利人，他在聖殿外、山邊、漁船上、稅吏家中教導，這些地點選擇本身就是一種宣告。',
      },
      environment: {
        title: '從加利利湖到各各他山——地理是神學的舞台',
        body:
          '耶穌的事工地理路線有意義：祂在約旦河受洗（與以色列過紅海呼應），在猶大曠野受試探 40 天（與以色列曠野 40 年呼應），在加利利湖邊呼召漁夫開始事工，在登山寶訓宣講新摩西律法，在耶路撒冷進城（棕枝主日）和死亡，在加利利山上完成復活後的差遣。加利利湖（海拔約 −213 公尺，地球上最低的淡水湖之一）到耶路撒冷（海拔約 800 公尺）的地形落差，在故事中充滿朝聖感——耶穌「上」耶路撒冷不只是方向，也是朝向十字架的神學動態。',
      },
      artifacts: [
        {
          title: '加利利湖（太巴列湖）全景',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Sea_of_galilee_tiberias.jpg/1280px-Sea_of_galilee_tiberias.jpg',
          sourceName: 'Wikimedia Commons',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:Sea_of_galilee_tiberias.jpg',
          license: 'CC BY-SA 3.0',
          caption: '加利利湖（太巴列湖），耶穌在這裡呼召彼得、安德烈、雅各與約翰，也在湖面上行走。這片湖是福音書事工的核心地理場景。',
          educationalUse: '幫助讀者建立福音書事工的地理感，理解耶穌在加利利鄉間起點的文化意義——而不是從耶路撒冷宗教中心開始。',
        },
      ],
    },
    scripture: {
      overview:
        '四本福音書不是四份耶穌的傳記，而是四個見證：馬太向猶太讀者宣告耶穌是應許的彌賽亞王；馬可用行動節奏呈現耶穌是有能力的神僕；路加向外邦人說明耶穌是所有人（窮人、婦女、罪人、外邦人）的救主；約翰深入神學，宣告耶穌是太初的道、與父同在的神。這四個角度合起來，比任何單一敘事都更完整地顯示「道成肉身」的深度。',
      bookGuides: [
        {
          bookName: '馬太福音',
          role: '向猶太讀者呈現耶穌是應許的彌賽亞，以五段大教導（登山寶訓、差遣門徒、天國比喻等）建立新律法框架。',
          readingQuestion: '馬太福音中的登山寶訓（第 5–7 章）哪一句最讓你感到挑戰？「天國是屬於心靈貧乏的人」的宣告，如何改變你對「得救」的理解？',
        },
        {
          bookName: '馬可福音',
          role: '最短的福音書，節奏快速，強調耶穌的能力與行動，幾乎每段故事以「立刻」（εὐθύς）連接，呈現緊迫的救贖臨到。',
          readingQuestion: '馬可福音中的耶穌常常要人「不要聲張」祂的身份，卻仍有人傳開。你對這個「彌賽亞的秘密」如何理解？',
        },
        {
          bookName: '路加福音',
          role: '最詳盡的福音書，大量記錄耶穌與婦女、稅吏、窮人、撒馬利亞人的互動，以及禱告場景，強調聖靈的工作。',
          readingQuestion: '路加筆下的耶穌如何打破當時社會的等級制度？這個耶穌與你從小認識的耶穌有什麼一樣或不一樣？',
        },
        {
          bookName: '約翰福音',
          role: '最具神學深度的福音書，以七個「我是」宣言、七個神蹟與序言的「道成肉身」宣告，呈現耶穌的神聖身份。',
          readingQuestion: '約翰 1:14「道成了肉身，住在我們中間」——這句宣告對你而言，最深刻的衝擊是什麼？',
        },
      ],
      readingPath: [
        { label: '道成肉身的宣告', bookName: '約翰福音', chapter: 1, purpose: '從最深的神學起點進入：耶穌是誰，在創造之前就已存在的那一位。' },
        { label: '拿撒勒會堂的宣言', bookName: '路加福音', chapter: 4, purpose: '看耶穌如何引用以賽亞書宣告自己的使命：傳福音給貧窮人。' },
        { label: '登山寶訓', bookName: '馬太福音', chapter: 5, purpose: '看天國倫理如何翻轉所有的人際等級與道德算計。' },
        { label: '拉撒路的復活', bookName: '約翰福音', chapter: 11, purpose: '看「復活與生命」的宣告被具體展示，也看耶穌在悲傷前哭泣。' },
        { label: '十字架上的王', bookName: '馬可福音', chapter: 15, purpose: '看「被放棄的神子」如何成為救贖的中心，並預備讀者進入第 16 章的空墓見證。' },
      ],
    },
    reflection: {
      theme: '耶穌問的問題：「你說我是誰？」',
      prompts: [
        {
          question: '彼得在腓立比的該撒利亞說「你是基督，是永生神的兒子」（太 16:16）——你現在的答案是什麼？是別人告訴你的，還是你自己在生命中認識到的？',
          hint: '不要給一個「標準答案」，而是誠實問：在你的日常選擇裡，耶穌對你來說到底是誰？',
        },
        {
          question: '登山寶訓中，哪一句是你最難真正活出來的？「愛你們的仇敵」、「不要為明天憂慮」、「飢渴慕義的人有福了」——選一句，思考為什麼它對你如此困難。',
          hint: '耶穌的教導不是道德建議，而是天國生命的描述；困難之處往往指向我們最需要被更新的地方。',
        },
        {
          question: '耶穌在路加福音中最常與「不該交往的人」同桌吃飯。你生命中的「同桌」是誰？誰是你覺得難以接納的人？',
          hint: '耶穌選擇的「誰」總是在告訴我們神的優先順序。',
        },
      ],
      prayer:
        '主耶穌，你是神道成肉身、住在我們中間的那一位。感謝你選擇了加利利漁夫，選擇了稅吏，選擇了在路旁哭泣的人。求你讓我不只是知道你的故事，而是認識你這個人。你問我「你說我是誰」——今天我要在你面前誠實回答。',
    },
    sources: [
      {
        title: 'File:Sea of galilee tiberias.jpg',
        sourceName: 'Wikimedia Commons',
        url: 'https://commons.wikimedia.org/wiki/File:Sea_of_galilee_tiberias.jpg',
        note: 'CC BY-SA 3.0，加利利湖全景圖，用於耶穌事工地理背景。',
      },
      {
        title: 'Herod\'s Temple Model (Israel Museum)',
        sourceName: 'Israel Museum, Jerusalem',
        url: 'https://www.imj.org.il/en/collections/373590',
        note: '耶路撒冷聖殿第二聖殿時代模型，後續可補充圖像作為耶路撒冷宗教背景。',
      },
      {
        title: 'Bible Odyssey: Jesus',
        sourceName: 'Society of Biblical Literature',
        url: 'https://www.bibleodyssey.org/people/main-articles/jesus',
        note: '耶穌的歷史與神學背景，學術導讀資源。',
      },
    ],
  },

  {
    periodId: 'early-church',
    title: '初期教會：聖靈進入世界，建立全新群體',
    thesis:
      '五旬節之後，幾十個被恐懼困住的門徒開始說各國語言、走出門、穿越帝國。初期教會的故事不是線性的勝利行進，而是一個混合著神蹟、迫害、爭論、悔改與跨文化衝突的群體，在聖靈的帶領下艱難地成形。',
    world: {
      culture: {
        title: '羅馬帝國的基礎建設成了福音傳播的管道',
        body:
          '羅馬帝國建設的道路系統（超過 80,000 公里）、港口與貨船航線，讓保羅能在 20 年內穿越小亞細亞、馬其頓、希臘抵達羅馬。通用希臘語（Koine）讓保羅的書信能被以弗所、哥林多、羅馬的不同群體讀懂。公元 64 年尼祿皇帝以羅馬大火嫁禍基督徒，開始第一波有組織的羅馬帝國迫害；多米田皇帝（約公元 81–96 年）則要求臣民敬拜他為「主和神」——對基督徒宣稱「耶穌是主」是直接的政治對抗。公元 70 年羅馬軍隊摧毀耶路撒冷聖殿，對猶太人與猶太基督徒都是毀滅性的神學震撼。',
      },
      humanity: {
        title: '第一個跨越所有邊界的群體',
        body:
          '初期教會是古代世界最不尋常的社群之一：它讓主人與奴隸、猶太人與外邦人、男人與婦女同桌相交（加 3:28）。這在當時不是理想宣告，而是每天製造衝突的現實——哥林多書信大量篇幅在處理因這些差異產生的問題。保羅三次宣教旅程跨越約 15,000 公里，在每座城市建立會眾後再用書信維繫。使徒行傳記錄的教會複製從耶路撒冷到安提阿（第一個稱呼門徒為「基督徒」的城市）再到「地極」，呈現一種無法靠人計畫、只有聖靈推動的擴張動態。',
      },
      environment: {
        title: '家庭教會、市場與競技場——信仰在日常與危險中生長',
        body:
          '初期教會沒有專屬建築，在信徒家中聚會（家庭教會）、在猶太會堂辯論、在市場廣場宣講。以弗所的阿提米斯（月神）廟是當時世界七大奇觀之一，保羅的傳道撼動了銀匠行業的收入（徒 19 章）——信仰的真實性被體現在經濟衝突上。羅馬的鬥獸場（Colosseum）在公元 80 年建成，是基督徒殉道的象徵地點。啟示錄中「巴比倫」是羅馬的代稱，約翰在拔摩島流放中寫下這本書，是逼迫中的盼望文學。',
      },
      artifacts: [
        {
          title: '亞壁古道（Via Appia），羅馬帝國主要幹道',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Appia_antica.jpg/1280px-Appia_antica.jpg',
          sourceName: 'Wikimedia Commons',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:Appia_antica.jpg',
          license: 'CC BY-SA 2.5',
          caption: '亞壁古道（Via Appia），公元前 312 年建造，是羅馬最古老的主幹道。保羅前往羅馬時就走這條路（徒 28:15），信徒出城迎接他。這條路象徵帝國建設如何意外成為福音傳播的通道。',
          educationalUse: '幫助讀者理解初期教會擴張的物質基礎，看見神如何使用羅馬帝國的基礎建設來承載祂的使命。',
        },
      ],
    },
    scripture: {
      overview:
        '使徒行傳記錄教會如何從 120 人的樓房擴展到羅馬帝國各地；保羅書信是對具體會眾的神學信件，每封都回應真實的衝突與混亂；其他使徒書信從不同角度牧養分散的群體；啟示錄以異象語言在逼迫中給受苦的教會帶來盼望。這些書卷合起來，是教會在歷史中的第一個世代如何學習活出「耶穌是主」的紀錄。',
      bookGuides: [
        {
          bookName: '使徒行傳',
          role: '記錄聖靈降臨、教會建立、保羅宣教旅程，是新約的「教會歷史書」，也是使徒行傳神學的核心：聖靈帶領教會而非人的計畫。',
          readingQuestion: '使徒行傳中的教會在五旬節、司提反殉道、彼得異象、耶路撒冷會議這些轉折點上，如何在聖靈帶領下突破原本的界線？',
        },
        {
          bookName: '羅馬書',
          role: '保羅最系統化的神學書信，呈現罪、稱義、恩典、聖靈與教會的完整框架，是整個新約神學的核心濃縮。',
          readingQuestion: '羅馬書 8 章說聖靈「為我們的軟弱幫助我們」，「替我們說出難以言表的嘆息」——你何時最感受到這樣的幫助？',
        },
        {
          bookName: '哥林多前書',
          role: '回應哥林多教會的真實混亂：派系分裂、屬靈恩賜的誤用、愛席的問題、復活的疑問——是最貼近今日教會現實的書信之一。',
          readingQuestion: '哥林多前書 13 章的「愛是恆久忍耐，又有恩慈」在恩賜爭論的脈絡下讀，你如何重新理解「愛」不是感覺而是選擇？',
        },
        {
          bookName: '以弗所書',
          role: '呈現教會的身份：基督身體、神的傑作（2:10）、合一的奧秘，以及信徒如何穿戴神的全副軍裝在屬靈爭戰中站立。',
          readingQuestion: '「我們是神的傑作，在基督耶穌裡被創造的」（弗 2:10）——你在哪些時刻很難相信這句話適用於你？',
        },
        {
          bookName: '啟示錄',
          role: '在羅馬逼迫中寫給受苦教會的異象書，用象徵語言呈現神的主權、羔羊的得勝、最終審判與新天新地。',
          readingQuestion: '啟示錄是寫給在逼迫中的教會的——如果你正在受苦，「神坐在寶座上」這個宣告對你的處境有什麼意義？',
        },
      ],
      readingPath: [
        { label: '五旬節：教會的誕生', bookName: '使徒行傳', chapter: 2, purpose: '看聖靈如何降臨，把恐懼中的門徒變成公開見證的群體。' },
        { label: '外邦人的接納', bookName: '使徒行傳', chapter: 10, purpose: '看彼得如何在異象中被改變，突破猶太與外邦的界線。' },
        { label: '聖靈的生命', bookName: '羅馬書', chapter: 8, purpose: '看「靠聖靈行事」的生命如何超越律法的控告與肉體的轄制。' },
        { label: '愛是最大的恩賜', bookName: '哥林多前書', chapter: 13, purpose: '在恩賜爭競的脈絡中讀「愛的詩篇」，看愛的定義如何顛覆一切屬靈優越感。' },
        { label: '萬物更新的盼望', bookName: '啟示錄', chapter: 21, purpose: '看「神要與人同住」的最終應許，也是整本聖經最後的答案。' },
      ],
    },
    reflection: {
      theme: '教會是一個新的人類群體——不靠血統，而靠聖靈的連結。',
      prompts: [
        {
          question: '使徒行傳的教會在擴展時一再打破邊界（猶太/外邦人、有受割禮/沒有受割禮、男/女、主人/奴隸）。在你所在的教會群體中，哪些邊界是還沒有被打破的？',
          hint: '不是要你批評教會，而是問：如果聖靈的工作是合一，哪裡是你可以踏出一步的？',
        },
        {
          question: '保羅的書信幾乎都是在回應真實的衝突——不是理想教會的指南。讀哥林多書信時，你感受到的教會最像哪一章的哥林多？',
          hint: '哥林多書信最誠實地呈現了一個又充滿恩賜、又充滿問題的教會，跟今天的差距比我們想像的少。',
        },
        {
          question: '啟示錄第一章說約翰因為神的道和耶穌的見證被放逐在拔摩島。當你的信仰讓你付出代價時，你如何面對？',
          hint: '初期教會的見證不是在舒適中給出的，而是在具體的代價之後。',
        },
      ],
      prayer:
        '主啊，感謝你差遣聖靈進入世界，建立一個超越所有界線的群體。我為那些在逼迫中仍然忠心的初代信徒感謝你。求你讓我所在的群體也成為一個真實的見證：你的國度已經開始，在每一次選擇愛與合一時可以被看見。阿們。',
    },
    sources: [
      {
        title: 'File:Appia antica.jpg',
        sourceName: 'Wikimedia Commons',
        url: 'https://commons.wikimedia.org/wiki/File:Appia_antica.jpg',
        note: 'CC BY-SA 2.5，亞壁古道圖，用於初期教會傳播的帝國道路背景。',
      },
      {
        title: 'Bible Odyssey: Early Christianity',
        sourceName: 'Society of Biblical Literature',
        url: 'https://www.bibleodyssey.org/en/people/related-articles/paul-and-early-christianity',
        note: '初期教會的歷史與神學背景，學術導讀資源。',
      },
      {
        title: 'The Acts of the Apostles (World History Encyclopedia)',
        sourceName: 'World History Encyclopedia',
        url: 'https://www.worldhistory.org/Acts_of_the_Apostles/',
        note: '使徒行傳的歷史背景介紹，包含宣教旅程地圖與早期教會擴張資料。',
      },
      {
        title: 'Early Christian Writings',
        sourceName: 'Early Christian Writings',
        url: 'https://www.earlychristianwritings.com/',
        note: '初期教會文獻的學術資源，包含使徒教父書信與早期神學發展。',
      },
    ],
  },

  {
    periodId: 'conquest',
    title: '征服與士師：進入應許地，也進入信仰循環',
    thesis:
      '約書亞帶領以色列進入迦南，但土地並沒有自動使人忠心。征服與士師時期讓讀者看見：神的應許真實臨到，人的心卻仍可能在安定之後轉向偶像。這是一段關於得地、妥協、呼求與拯救的循環故事。',
    world: {
      culture: {
        title: '迦南是城邦與地方神明交織的世界',
        body:
          '晚期青銅時代的迦南不是統一國家，而是許多城邦、山地村落與地方勢力交錯的地區。城市有自己的王、城牆、神廟與外交依附關係，常在埃及、赫人與其他近東勢力的夾縫中求生。約書亞記中的耶利哥、艾城、夏瑣等地，不只是軍事目標，也代表以色列進入一個已經被宗教、政治與農耕節奏深深塑造的世界。',
      },
      humanity: {
        title: '定居後的最大危險不是戰爭，而是同化',
        body:
          '在曠野中，以色列人缺乏食物與水；進入迦南後，他們面對的是另一種試探：有土地、有農作、有地方神明、有婚姻聯盟，也有「看起來比較實際」的生存方式。士師記反覆出現的循環——犯罪、受壓、呼求、拯救、再犯罪——不是簡單的道德失敗，而是群體在安定與壓力中不斷被周圍文化吸收的過程。',
      },
      environment: {
        title: '山地、谷地與城門塑造敘事張力',
        body:
          '迦南地形複雜：沿海平原、中央山地、約旦河谷與耶斯列平原彼此不同。以色列初期多在山地定居，面對低地戰車與城邦軍事優勢時常處於弱勢。士師故事中的戰場、泉源、禾場、城門與山地都不只是背景，而是說明神常在軍事弱勢與地理限制中拯救百姓。',
      },
      artifacts: [
        {
          title: 'Tell es-Sultan（古耶利哥遺址）',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Tell_es-sultan.jpg/1280px-Tell_es-sultan.jpg',
          sourceName: 'Wikimedia Commons',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:Tell_es-sultan.jpg',
          license: 'CC BY-SA 3.0',
          caption: 'Tell es-Sultan 是古耶利哥遺址所在的土丘，幫助讀者把約書亞記中的城牆敘事放回古代城邦地景中。',
          educationalUse: '用來建立「城邦、城牆、山地定居」的空間感，不把考古爭議簡化成單一證明，而是幫助讀者理解征服敘事的地理與城市背景。',
        },
      ],
    },
    scripture: {
      overview:
        '約書亞記、士師記、路得記形成一組強烈對照：約書亞記宣告神信實成就應許；士師記揭露人進入土地後仍反覆失敗；路得記則在黑暗時代中放入一個小而忠誠的故事，預備大衛家的線索。讀這三卷書，要同時看見宏大得地與日常忠心。',
      bookGuides: [
        {
          bookName: '約書亞記',
          role: '記錄以色列進入應許地、分地與更新盟約，核心是神信實守約。',
          readingQuestion: '約書亞記一方面強調勇敢爭戰，一方面強調不可離開律法。這如何修正你對「成功」的定義？',
        },
        {
          bookName: '士師記',
          role: '記錄以色列沒有王時反覆偏離神、受壓迫、蒙拯救的循環。',
          readingQuestion: '士師記的循環中，哪一步最像你自己的屬靈模式：妥協、受壓、呼求、短暫恢復，還是再次忘記？',
        },
        {
          bookName: '路得記',
          role: '在士師時代的混亂中，呈現信實、憐憫與救贖親屬如何保存盼望。',
          readingQuestion: '路得記裡最改變歷史的，不是戰爭，而是日常忠誠。這如何改變你對「神使用我」的想像？',
        },
      ],
      readingPath: [
        { label: '進入應許地', bookName: '約書亞記', chapter: 1, purpose: '看神如何把勇敢與遵行律法綁在一起。' },
        { label: '更新盟約', bookName: '約書亞記', chapter: 24, purpose: '看「至於我和我家，我們必定事奉耶和華」如何成為進地後的選擇。' },
        { label: '士師循環', bookName: '士師記', chapter: 2, purpose: '看下一代如何不認識神，也看整卷士師記的神學框架。' },
        { label: '黑暗中的忠誠', bookName: '路得記', chapter: 2, purpose: '看路得與波阿斯如何在小事上活出信實。' },
      ],
    },
    reflection: {
      theme: '進入應許不等於自動忠心；安定也可能成為新的試探。',
      prompts: [
        {
          question: '我是否曾在「神帶我進入某個祝福」之後，反而慢慢忘記神？',
          hint: '士師記提醒我們，困難會使人呼求神，安定也可能使人失去警醒。',
        },
        {
          question: '我生命中有哪些「迦南文化」看似實際、合理，卻正在慢慢塑造我的敬拜？',
          hint: '不要只想到明顯偶像，也可以想到效率、安全感、成功、關係或身份。',
        },
        {
          question: '路得記中的忠誠很平凡，卻進入大衛與彌賽亞家譜。我的日常忠心可能正在預備什麼我看不見的事？',
          hint: '神常把救贖歷史藏在不被注意的田間、家庭與承諾裡。',
        },
      ],
      prayer:
        '主啊，求你讓我在祝福中不忘記你，在安定中仍保持敬畏。當我反覆落入自己的循環時，求你使我真實回轉，也讓我在平凡日常中活出路得那樣的忠誠。',
    },
    sources: [
      {
        title: 'Tell es-Sultan',
        sourceName: 'Wikimedia Commons',
        url: 'https://commons.wikimedia.org/wiki/File:Tell_es-sultan.jpg',
        note: '古耶利哥遺址照片，用於建立迦南城邦與城牆背景。',
      },
      {
        title: 'Ancient Jericho / Tell es-Sultan',
        sourceName: 'UNESCO World Heritage Centre',
        url: 'https://whc.unesco.org/en/list/1687/',
        note: '古耶利哥 / Tell es-Sultan 的世界遺產資料，可補充遺址與考古背景。',
      },
    ],
  },

  {
    periodId: 'united-kingdom',
    title: '統一王國：敬拜、權力與智慧的高峰',
    thesis:
      '掃羅、大衛與所羅門的時代，是以色列從鬆散支派走向王國的關鍵轉折。這段歷史有聖殿、詩篇、智慧與國家榮耀，也有權力誘惑、家庭破裂與敬拜混雜；它讓讀者看見，神的應許會經過君王制度，卻不被君王制度取代。',
    world: {
      culture: {
        title: '王權帶來秩序，也帶來集中化的危險',
        body:
          '統一王國使以色列有固定首都、行政制度、軍隊與聖殿中心。大衛攻取耶路撒冷，使它成為政治與敬拜的交會點；所羅門建殿與擴大國際貿易，使以色列短暫進入古近東的繁榮網絡。但撒母耳記早已警告：王會徵兵、徵稅、取得田地與人力。王權能保護群體，也能把群體重新帶回另一種奴役。',
      },
      humanity: {
        title: '大衛家的榮耀與傷口同時展開',
        body:
          '大衛既是合神心意的人，也是犯下姦淫、謀殺並使家庭長期破裂的人。所羅門既有智慧，也因政治婚姻與外邦神明使心偏離。統一王國的敘事拒絕把領袖浪漫化：聖經讓讀者看見恩膏、才幹、詩歌與智慧都不能取代悔改與敬畏。',
      },
      environment: {
        title: '耶路撒冷成為信仰地圖的中心',
        body:
          '耶路撒冷位於山地，不像埃及或巴比倫那樣依靠大河平原。它的政治力量起初並不顯眼，但因大衛遷都、約櫃進城、所羅門建殿，成為以色列記憶中的屬靈中心。詩篇中「上行之詩」與錫安神學，都把地理上的上行變成信仰上的朝向神。',
      },
      artifacts: [
        {
          title: 'City of David, Jerusalem',
          imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/City_of_David,_Jerusalem.jpg',
          sourceName: 'Wikimedia Commons',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:City_of_David,_Jerusalem.jpg',
          license: 'CC BY-SA 3.0',
          caption: '耶路撒冷城南側的大衛城區域，幫助讀者理解大衛遷都與錫安傳統的地理背景。',
          educationalUse: '用來建立耶路撒冷如何從政治據點成為敬拜中心的空間感，並連結撒母耳記、列王紀與詩篇。',
        },
      ],
    },
    scripture: {
      overview:
        '撒母耳記上下講述王權如何被建立，也揭露王權如何傷害人；詩篇把王國時代的祈禱、哀歌、讚美與悔改保存下來；箴言、傳道書與雅歌則呈現智慧傳統的多面向：生活秩序、人生虛空與愛的渴望。這個時期的書卷讓讀者看見，信仰不只關於戰爭與聖殿，也關於情感、倫理、智慧與領袖的內心。',
      bookGuides: [
        {
          bookName: '撒母耳記上',
          role: '描述撒母耳、掃羅與大衛興起，呈現王權的渴望與危險。',
          readingQuestion: '以色列要求立王，是出於對神治理的不信任，還是對秩序的真實需要？這兩者如何同時存在？',
        },
        {
          bookName: '撒母耳記下',
          role: '記錄大衛王國的高峰、犯罪、悔改與家庭後果。',
          readingQuestion: '大衛是真實敬拜者，也是破碎罪人。這如何幫助你看待屬靈領袖與自己的矛盾？',
        },
        {
          bookName: '詩篇',
          role: '保存以色列的禱告語言，涵蓋讚美、哀歌、悔改、君王與錫安盼望。',
          readingQuestion: '詩篇允許人把憤怒、恐懼、罪疚與盼望都帶到神面前。你最不習慣向神表達哪一類情緒？',
        },
        {
          bookName: '箴言',
          role: '把敬畏神落實到日常生活、言語、金錢、工作、人際與判斷。',
          readingQuestion: '如果智慧的起點是敬畏耶和華，那我的判斷方式和世界的成功邏輯有何不同？',
        },
      ],
      readingPath: [
        { label: '王權的警告', bookName: '撒母耳記上', chapter: 8, purpose: '看以色列要求立王時，神如何揭露王權的代價。' },
        { label: '大衛之約', bookName: '撒母耳記下', chapter: 7, purpose: '看神如何把大衛家與彌賽亞盼望連在一起。' },
        { label: '破碎中的悔改', bookName: '詩篇', chapter: 51, purpose: '看大衛犯罪後如何在神面前承認真相。' },
        { label: '智慧的起點', bookName: '箴言', chapter: 1, purpose: '看智慧文學如何把信仰帶入日常選擇。' },
      ],
    },
    reflection: {
      theme: '神可以使用權力，但權力永遠不能取代神。',
      prompts: [
        {
          question: '我是否期待某個領袖、制度或成功狀態，替我帶來只有神能給的安全感？',
          hint: '以色列想要王，部分原因是想像「像列國一樣」就會安全。',
        },
        {
          question: '大衛的故事如何幫助我同時看見恩典與責任？我是否常只強調其中一邊？',
          hint: '神赦免大衛，但後果並沒有被取消；恩典不等於輕看傷害。',
        },
        {
          question: '詩篇中的哪一種禱告語言，是我現在最需要重新學習的：讚美、哀哭、悔改、等候，還是信靠？',
          hint: '詩篇不是只教人說漂亮話，而是教人把真實生命帶到神面前。',
        },
      ],
      prayer:
        '主啊，求你讓我在渴望秩序與成功時，不把任何人或制度當作偶像。教我像大衛一樣悔改，像詩篇一樣誠實禱告，像箴言一樣在日常中敬畏你。',
    },
    sources: [
      {
        title: 'City of David, Jerusalem',
        sourceName: 'Wikimedia Commons',
        url: 'https://commons.wikimedia.org/wiki/File:City_of_David,_Jerusalem.jpg',
        note: '耶路撒冷大衛城區域照片，用於統一王國與錫安傳統背景。',
      },
      {
        title: 'City of David',
        sourceName: 'Bible Odyssey / SBL',
        url: 'https://www.bibleodyssey.org/places/main-articles/city-of-david',
        note: '大衛城與耶路撒冷歷史背景的學術導讀。',
      },
    ],
  },

  {
    periodId: 'divided-kingdom',
    title: '分裂王國與先知：在帝國陰影下聽見神的聲音',
    thesis:
      '王國分裂後，以色列與猶大在偶像、權力、外交與社會不義中逐漸走向審判。先知不是預測未來的神祕人物，而是在帝國威脅與宗教虛假中，替神指出真相、呼喚悔改，也保存彌賽亞盼望的人。',
    world: {
      culture: {
        title: '亞述與巴比倫把小國推進生存危機',
        body:
          '北國以色列與南國猶大夾在亞述、埃及、巴比倫等強權之間，外交選邊常與敬拜選擇交織。君王一方面尋求軍事聯盟，一方面在國內推行或容忍偶像崇拜；先知則不斷指出，真正的危機不是軍事弱小，而是失去對神的信靠。以賽亞面對亞述威脅，耶利米面對巴比倫興起，兩者都把國際政治重新放在神主權之下閱讀。',
      },
      humanity: {
        title: '敬拜腐敗必然流向社會不義',
        body:
          '阿摩司、彌迦、以賽亞等先知一再把偶像崇拜與欺壓窮人連在一起。人若在聖殿獻祭，卻在市場剝削貧弱，在法庭顛倒公義，在家庭與土地上欺壓無助者，這樣的敬拜就是神厭惡的。分裂王國時期讓讀者看見，信仰敗壞不是只發生在宗教儀式裡，也會具體表現在經濟、司法、性倫理與權力運作上。',
      },
      environment: {
        title: '撒瑪利亞、耶路撒冷與拉吉成為審判地圖',
        body:
          '北國首都撒瑪利亞在公元前 722 年被亞述攻陷；南國的拉吉在西拿基立入侵時被圍攻，成為亞述宮殿浮雕中炫耀勝利的場景；耶路撒冷則在希西家時短暫得救，最終仍在巴比倫手中陷落。這些地名不是背景裝飾，而是先知信息具體落地的地方：神的話語進入城門、市場、宮廷與戰場。',
      },
      artifacts: [
        {
          title: 'Lachish relief inscription',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Lachish_inscription.jpeg/1280px-Lachish_inscription.jpeg',
          sourceName: 'Wikimedia Commons / British Museum',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:Lachish_inscription.jpeg',
          license: 'Public Domain',
          caption: '拉吉浮雕銘文出自亞述王西拿基立的尼尼微宮殿，描繪亞述攻取猶大城拉吉的勝利宣傳。',
          educationalUse: '幫助讀者把列王紀、以賽亞書中的亞述威脅放入帝國宣傳與軍事壓力中理解，也看見小國猶大面對強權時的脆弱。',
        },
      ],
    },
    scripture: {
      overview:
        '列王紀與歷代志從不同角度回顧王國興衰；先知書則把這段歷史變成神學診斷。以賽亞、耶利米、何西阿、阿摩司、彌迦、那鴻、哈巴谷等先知，不只是說未來，也揭露現在：虛假敬拜、社會不義、政治倚靠與忘記盟約。這個時期的閱讀重點，是學習讓神的話語解讀歷史，而不是讓恐懼解讀歷史。',
      bookGuides: [
        {
          bookName: '列王紀上',
          role: '從所羅門晚年、王國分裂到眾王興衰，呈現敬拜選擇如何決定國家方向。',
          readingQuestion: '列王紀評價君王時，不先問他多成功，而問他是否行耶和華眼中看為正的事。這如何挑戰你的評價標準？',
        },
        {
          bookName: '列王紀下',
          role: '記錄北國滅亡、南國改革與耶路撒冷最終陷落。',
          readingQuestion: '為什麼希西家、約西亞的改革如此重要，卻仍無法完全阻止審判？改革與悔改有何差別？',
        },
        {
          bookName: '以賽亞書',
          role: '在亞述威脅下宣告聖潔的神、受苦僕人與將來的安慰。',
          readingQuestion: '以賽亞同時講審判與盼望。你是否容易只接受其中一面？',
        },
        {
          bookName: '阿摩司書',
          role: '從社會公義角度揭露宗教虛偽，宣告神不接受與不義共存的敬拜。',
          readingQuestion: '我是否可能一面維持宗教生活，一面在金錢、工作或關係中忽略公義？',
        },
        {
          bookName: '耶利米書',
          role: '在巴比倫陰影下呼籲猶大面對真相，並預告新約。',
          readingQuestion: '耶利米常被拒絕，因他說的不是人想聽的。你如何分辨安慰與逃避真相？',
        },
      ],
      readingPath: [
        { label: '王國分裂', bookName: '列王紀上', chapter: 12, purpose: '看驕傲、重擔與政治計算如何撕裂群體。' },
        { label: '亞述威脅', bookName: '以賽亞書', chapter: 36, purpose: '看拉伯沙基如何用恐嚇語言攻擊信心。' },
        { label: '神厭惡虛假敬拜', bookName: '阿摩司書', chapter: 5, purpose: '看公義如何成為敬拜不可分割的一部分。' },
        { label: '新約的應許', bookName: '耶利米書', chapter: 31, purpose: '看審判之後，神如何應許把律法寫在心上。' },
      ],
    },
    reflection: {
      theme: '先知不是讓人知道更多未來，而是讓人誠實面對現在。',
      prompts: [
        {
          question: '如果先知今天進入我的生活，他最可能指出哪一個我不想面對的真相？',
          hint: '先知常常先處理敬拜、金錢、公義、權力與安全感，而不是滿足人的好奇心。',
        },
        {
          question: '我是否曾用宗教行為遮蓋生活中的不義？',
          hint: '阿摩司書提醒我們，敬拜若不流向公義，就會變成自我安慰。',
        },
        {
          question: '當我面對大環境壓力時，我最容易倚靠什麼「埃及」或「亞述」？',
          hint: '先知不是反對策略，而是反對把策略變成取代神的救主。',
        },
      ],
      prayer:
        '主啊，求你給我能聽見先知聲音的耳朵。當你的話語指出我不想面對的地方，求你不要任憑我用宗教語言逃避真相。讓我的敬拜與公義相連，讓我的安全感重新回到你裡面。',
    },
    sources: [
      {
        title: 'Lachish reliefs',
        sourceName: 'Wikimedia Commons',
        url: 'https://commons.wikimedia.org/wiki/File:Lachish_inscription.jpeg',
        note: 'Public Domain，亞述拉吉浮雕銘文，用於亞述威脅與猶大歷史背景。',
      },
      {
        title: 'The Lachish reliefs',
        sourceName: 'British Museum',
        url: 'https://www.britishmuseum.org/collection/term/BIOG59031',
        note: 'British Museum 對拉吉浮雕與西拿基立王宮背景的收藏資料。',
      },
    ],
  },


]

export function findTimelineDeepDive(periodId: string) {
  return TIMELINE_DEEP_DIVES.find(item => item.periodId === periodId)
}

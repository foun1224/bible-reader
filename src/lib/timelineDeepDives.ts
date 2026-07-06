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

  {
    periodId: 'return',
    title: '歸回與重建：回到土地，卻需要重建心靈',
    thesis:
      '歸回應許地不等於回到過去。廢墟的耶路撒冷告訴以色列人：地理的歸回只是起點，真正的重建是信仰群體與屬神身份的重塑——這比城牆更難建造。',
    world: {
      culture: {
        title: '波斯帝國推行宗教包容作為治理策略',
        body:
          '居魯士大帝的政策允許被遷移民族返回故鄉、恢復神廟祭拜，這在古代是非常獨特的帝國策略。他的這個決定被刻在居魯士圓柱上，記錄他讓各民族帶著神像歸回故地。以斯拉記開頭引用居魯士詔書，聖經作者把它理解為神動用外邦君王來成就應許。整個波斯治下的近東，宗教與民族身份在帝國架構中相對獲得喘息空間。',
      },
      humanity: {
        title: '歸回者、留守者與外族之間的身份衝突',
        body:
          '歸回的猶大人面對的不是空地，而是已在這片土地生活了幾十年的混居群體。誰是「真正的以色列人」？誰有資格重建聖殿？以斯拉-尼希米記錄的通婚問題、安息日爭議、祭司名冊，都反映一場關於邊界與身份的深層討論。這種「歸回者的眼光」也造成了社群的張力，既排外又脆弱。',
      },
      environment: {
        title: '從河流平原到山城廢墟',
        body:
          '巴比倫坐落在幼發拉底河流域的肥沃平原，城市基礎設施完整；而歸回者面對的耶路撒冷，是山地廢墟、城牆頹敗、聖殿燒毀的景象。尼希米記對城牆的詳細記錄顯示，重建是一件具體、艱辛、在周圍敵人嘲弄下進行的工程。土地的實際狀況，讓應許地的榮耀與現實的落差更加刺骨。',
      },
      artifacts: [
        {
          title: '以拉凡那波斯文書（Elephantine Papyri，局部複製）',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Elephantine_papyrus_in_the_Brooklyn_Museum.jpg/480px-Elephantine_papyrus_in_the_Brooklyn_Museum.jpg',
          sourceName: 'Wikimedia Commons / Brooklyn Museum',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:Elephantine_papyrus_in_the_Brooklyn_Museum.jpg',
          license: 'CC BY 3.0',
          caption: '以拉凡那莎草文書（約公元前 5 世紀），記錄波斯時代留在埃及的猶太人社群的生活與書信，是同期猶太離散群體的真實文獻。',
          educationalUse: '幫助讀者理解歸回期間「留下的猶太人」如何在波斯帝國各地持續建立信仰社群，補充聖經以外的同期歷史視角。',
        },
      ],
    },
    scripture: {
      overview:
        '這個時期的書卷共同回答一個問題：歸回之後，神的百姓如何在廢墟與衝突中重建屬神的群體？以斯拉-尼希米從律法與城牆兩個方向重建；哈該-撒迦利亞-瑪拉基從先知角度鼓勵並挑戰仍在妥協的百姓；以斯帖則從留在帝國的人的角度，提醒神在看不見之處仍護守祂的子民。',
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
          '亞歷山大大帝在公元前 333 年征服波斯，並將希臘文化向東推進到印度邊境。他死後帝國分裂，但希臘語（Koine Greek）成為地中海世界的通用語。猶太人面對希臘哲學、運動競技、文學與城市生活的全面滲透。安提阿古四世（約公元前 167 年）強制猶太人希臘化——禁止安息日、割禮，在聖殿設偶像——引發馬加比起義，獨立節光明節（Hanukkah）從此而來。七十士譯本（LXX）則是這場文化碰撞最有建設性的產物：希伯來聖經被譯成希臘語，使分散在帝國各地的猶太人與外邦人都能讀到神的話語。',
      },
      humanity: {
        title: '猶太社群的四種回應方式',
        body:
          '面對希臘化與羅馬統治，猶太人形成了幾個重要派系，這些派系後來直接出現在福音書的衝突場景中：法利賽人護衛律法、發展口傳傳統（後來成為猶太法典 Talmud 的基礎），強調每個人在會堂中都能親近律法；撒都該人是聖殿貴族與祭司精英，只接受成文摩西五經，並與羅馬維持合作關係；愛色尼人隱居曠野（死海古卷的可能群體），等待末世審判；奮銳黨人主張武裝抵抗羅馬。這四種路線，代表了在強權下信仰群體如何保持身份的四種方式。',
      },
      environment: {
        title: '從波斯到希臘到羅馬：帝國的三次更替',
        body:
          '這四百年巴勒斯坦先後在波斯（539–333 BC）、馬其頓/塞琉古（333–142 BC）、哈斯摩尼（142–63 BC）與羅馬（63 BC 起）的統治下。龐培在公元前 63 年進入聖殿（但未搶奪器物）標誌著羅馬時代的開始。耶路撒冷在這段時間成為一個被反覆征服、重建、世俗化又護衛的城市。到新約時代，巴勒斯坦是羅馬帝國的一個省，猶太人既享有一定的宗教自主，也承受重稅與占領的恥辱。',
      },
      artifacts: [
        {
          title: '亞歷山大大帝馬賽克（龐貝古城，伊蘇斯戰役）',
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Battle_of_Issus_333_BC-Poseidon_mosaic.jpg/640px-Battle_of_Issus_333_BC-Poseidon_mosaic.jpg',
          sourceName: 'Wikimedia Commons',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:Battle_of_Issus_333_BC-Poseidon_mosaic.jpg',
          license: 'Public Domain',
          caption: '伊蘇斯戰役馬賽克（約公元前 100 年，龐貝出土），描繪亞歷山大大帝對抗波斯王大流士三世，現藏那不勒斯國家考古博物館。此戰役是希臘化時代開端的歷史地標。',
          educationalUse: '幫助讀者視覺化亞歷山大時代的帝國擴張，理解希臘化如何在政治與文化上改變了兩約之間的猶太世界。',
        },
      ],
    },
    scripture: {
      overview:
        '兩約之間沒有新的正典書卷，但這個時期的發展直接影響了新約的理解框架。以下的「承接閱讀」不是要補充新書卷，而是幫助讀者看見：舊約的結局如何留下問題，兩約之間的歷史如何放大這些問題，以及為什麼新約的開頭「終於來了」。',
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

]

export function findTimelineDeepDive(periodId: string) {
  return TIMELINE_DEEP_DIVES.find(item => item.periodId === periodId)
}

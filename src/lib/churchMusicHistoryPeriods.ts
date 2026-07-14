export interface MusicKeyFigure {
  name: string
  role: string
  quote?: string
}

export interface RepresentativeWork {
  title: string
  composer: string
  significance: string
  excerpt?: string
}

export interface MusicEraAssessment {
  contribution: string
  shadow: string
  discernment: string
}

export interface HymnStory {
  person: string
  year: string
  hymn: string
  story: string
  significance: string
}

export interface ChurchMusicHistoryPeriod {
  periodId: string
  title: string
  dateRange: string
  stage: string
  thesis: string
  musicalQuestion: string
  inheritedFrom: string | null
  thisEraAnswer: string
  unresolvedTension: string
  insights: {
    whyItMatters: string
    commonMisconception: string
    scriptureConnection: string
  }
  soundPortrait: {
    description: string
    forms: string[]
  }
  keyFigures: MusicKeyFigure[]
  representativeWorks: RepresentativeWork[]
  eraAssessment: MusicEraAssessment
  hymnStory?: HymnStory
  todayReflection: {
    question: string
    prompt: string
  }[]
  source: {
    label: string
    url: string
  }
}

export const CHURCH_MUSIC_HISTORY_PERIODS: ChurchMusicHistoryPeriod[] = [
  {
    periodId: 'psalms-early-church',
    title: '詩篇與初期教會：聖言先成為聲音',
    dateRange: '約 30–400 年',
    stage: '聖言成聲',
    thesis:
      '教會音樂不是從樂器或樂譜開始，而是從已經被誦讀、記憶與共誦的聖言開始。詩篇是以色列的禱告書，也是初代教會的「歌本」；音樂首先服務記憶、群體合一與敬拜中的道，而不是審美表演。',
    musicalQuestion: '當教會還沒有管風琴、五線譜與專業詩班時，聖言如何成為可被群體分享的聲音？',
    inheritedFrom: null,
    thisEraAnswer:
      '延續猶太會堂的詩篇與誦讀傳統，以單聲、可記憶的旋律承載經文；東方有敘利亞與拜占庭的調式詠唱，西方則在地方教會中逐步形成素歌傳統。音樂的「正確性」首先是神學與文本的忠實，其次才是美。',
    unresolvedTension:
      '地方調式與語言差異越來越大：什麼樣的聲音算「教會的」？希臘語、拉丁語、敘利亞語社群各自發展，統一與多元的張力被留給下一個時代。',
    insights: {
      whyItMatters:
        '若跳過這個起點，後面的葛利果聖歌、複音、聖詩都容易被誤讀成「風格史」。事實上它們都在回答同一個問題：群體如何用聲音共同持守神話語。',
      commonMisconception:
        '有人以為初期教會「沒有音樂」或「禁止樂器就等於反藝術」。更準確的是：在逼迫與家中聚會的處境中，人聲與經文優先；樂器爭議後來才系統化，且東西方立場並不一致。',
      scriptureConnection:
        '詩篇本身就是唱出來的禱告（詩 96、150）；保羅勸勉「用詩章、頌詞、靈歌彼此對說」（弗 5:19；西 3:16）。新約沒有給出樂譜，卻清楚把歌唱放在教導與感恩的生活中心。',
    },
    soundPortrait: {
      description:
        '以人聲為主，常為單聲部、音域不寬、節奏貼近語言重音。重點是讓會眾或小群體能一起記住經文，而不是炫技。東方調式與西方地方素歌已出現差異，但仍共享「聖言在先」的秩序。',
      forms: ['詩篇詠唱', '回應式短句', '聖經頌歌（如馬利亞頌）', '簡單的哈利路亞歡呼'],
    },
    keyFigures: [
      {
        name: '安波羅修（Ambrose of Milan）',
        role: '米蘭主教；推動會眾可參與的拉丁讚美詩，影響西方聖詩傳統',
        quote: '詩篇是百姓的聲音，也是教會的聲音。',
      },
      {
        name: '以法蓮（Ephrem the Syrian）',
        role: '敘利亞教會的「聖神之琴」；以詩與歌教導正統信仰、回應異端',
      },
    ],
    representativeWorks: [
      {
        title: '安波羅修讚美詩傳統（如 Deus Creator Omnium）',
        composer: '安波羅修及其傳統',
        significance: '展示早期拉丁教會如何用規整、可學的詩節讓會眾參與，而不只是聖職人員獨誦。',
      },
      {
        title: '聖經頌歌：尊主頌（Magnificat）',
        composer: '禮儀傳統（路 1:46–55）',
        significance: '經文本身成為固定詠唱文本，說明「音樂」首先是被聖化的語言，而非附加裝飾。',
        excerpt: '我心尊主為大，我靈以神我的救主為樂。',
      },
    ],
    eraAssessment: {
      contribution:
        '確立了「聖言—記憶—群體聲音」的優先序，使音樂成為門徒訓練與合一的媒介，而非只是氣氛工具。',
      shadow:
        '在部分處境中，對異教音樂形式的警戒後來被簡化成對身體、情感與樂器的全面懷疑，使後世容易把敬虔等同於「越少聲音越好」。',
      discernment:
        '我們的聚會若先追求編曲完整、再回頭找經文填空，是否已經顛倒了初期教會「先有道、才有聲」的秩序？',
    },
    source: {
      label: 'Oxford Research Archive：早期西方基督教音樂研究',
      url: 'https://ora.ox.ac.uk/objects/uuid:770f3a26-7036-4ffb-bbd7-49b458122b26',
    },
    hymnStory: {
      person: '保羅與西拉',
      year: '約 49 年，腓立比監獄',
      hymn: '半夜的讚美詩（徒 16:25）',
      story:
        '他們剛被剝了衣服、用棍打了「許多棍」，兩腳上了木狗，關在內監。按常理，這是呻吟或沉默的夜晚。但路加記錄的是：「約在半夜，保羅和西拉禱告，唱詩讚美神，眾囚犯也側耳而聽。」他們不是唱給自己壯膽——「眾囚犯也側耳而聽」這句話透露：歌聲成了黑暗中其他囚犯聽見的見證。地震開了監門之後，獄卒問的問題是「我當怎樣行才可以得救？」那一夜歌聲的聽眾，成了腓立比教會最早的成員。',
      significance:
        '教會音樂的第一個故事就定下了基調：唱詩不需要條件俱足。不是因為環境好才唱，而是在最壞的環境裡，歌聲宣告苦難沒有最終發言權。',
    },
    todayReflection: [
      {
        question: '你記得的經文裡，有多少是「唱進心裡」而不是「讀過一次」的？',
        prompt: '選一段短詩篇或頌歌，連續一週只靠聲音重複，觀察記憶與情感如何被重新塑造。',
      },
      {
        question: '當樂器與音響暫時拿掉，你的教會還能用什麼方式共同持守神話語？',
        prompt: '試著在小組用無伴奏方式讀唱一段經文，注意速度、呼吸與彼此聆聽。',
      },
    ],
  },
  {
    periodId: 'gregorian-monastic',
    title: '葛利果聖歌與修道院：把敬拜變成日課',
    dateRange: '約 400–1000 年',
    stage: '聖言成聲',
    thesis:
      '修道院把歌唱編進一天的節奏：詩篇不再只是偶爾的讚美，而是日復一日的禱告勞動。葛利果聖歌（及相關素歌傳統）代表西方教會嘗試以統一、可傳承的單聲旋律，承載禮儀年與聖經誦讀。',
    musicalQuestion: '如何在廣袤的基督王國裡，讓相距千里的教會用可辨識的聲音共同禱告？',
    inheritedFrom: 'psalms-early-church',
    thisEraAnswer:
      '透過修道院日課（canonical hours）、詩篇分配與素歌曲目的整理，音樂成為禮儀時間的骨架。旋律仍多為單聲，但系統化程度遠高於初期：調式、文本搭配與節期差異逐漸固定。',
    unresolvedTension:
      '統一帶來可傳承性，也帶來「地方聲音被吸納」的壓力。誰有權決定「標準」的教會之聲？羅馬、高盧、西班牙、盎格魯傳統之間的拉扯仍在。',
    insights: {
      whyItMatters:
        '沒有這段「把歌變成制度」的歷史，後來的複音、經文歌與會眾聖詩就缺少可改寫的共同文本庫。素歌是西方教會音樂的語法底層。',
      commonMisconception:
        '「葛利果聖歌」常被想像成教宗葛利果一世親自作了全部曲目。更符合研究的是：它是長期彙編、改革與追溯權威的結果；名字承載的是合法性敘事，不只是單一作曲家傳奇。',
      scriptureConnection:
        '詩篇被分配到每日時辰，實踐了「晝夜思想」（詩 1）與「七次赞美」（詩 119:164）的節奏。音樂服務的是時間中的門徒生活，而不只是主日演出。',
    },
    soundPortrait: {
      description:
        '單聲部、無固定和聲、節奏自由而貼近拉丁經文。音響理想是融為一個身體：個人聲音消失在共同線條裡。空間（石造教堂的殘響）本身就是「樂器」。',
      forms: ['彌撒固有部分', '日課詩篇詠唱', '續抒調（sequence）早期型態', '反覆短詩（antiphon）'],
    },
    keyFigures: [
      {
        name: '本篤（Benedict of Nursia）',
        role: '《本篤規章》把祈禱與勞動（含詩篇日課）定為修院生活核心',
        quote: '沒有什麼可優先於敬拜上帝的事。',
      },
      {
        name: '教宗葛利果一世（傳統歸名）',
        role: '西方素歌權威敘事的核心人物；象徵禮儀音樂的統一與牧養關懷',
      },
    ],
    representativeWorks: [
      {
        title: '求主垂憐（Kyrie）與榮耀頌（Gloria）素歌傳統',
        composer: '西方素歌庫',
        significance: '展示普通彌撒文本如何以可辨識旋律在整個拉丁世界流動。',
      },
      {
        title: '來，創造者聖神（Veni Creator Spiritus）',
        composer: '傳統歸於拉巴努斯·毛魯斯等',
        significance: '聖神讚美詩成為按立、會議與節期的聲音標記，說明歌曲如何承載教會行動。',
      },
    ],
    eraAssessment: {
      contribution:
        '把歌唱制度化為每日門徒操練，並留下可傳承的旋律—文本庫，使教會之聲能跨越世代複製。',
      shadow:
        '高度專業化與修院中心化，可能讓普通會友變成禮儀的旁聽者；統一化也壓抑地方語言與民間虔誠的聲音。',
      discernment:
        '我們的敬拜流程是否只服務「主日演出成功」，而缺少可重複、可記憶、能進入週間生活的聲音節奏？',
    },
    source: {
      label: '美國國會圖書館：10–16 世紀禮儀聖歌手稿',
      url: 'https://www.loc.gov/collections/tenth-to-sixteenth-century-liturgical-chants/about-this-collection/',
    },
    hymnStory: {
      person: '無名的修士們',
      year: '整個中世紀，歐洲各地修道院',
      hymn: '每週一百五十篇詩篇的日課',
      story:
        '本篤會規第十九章寫著：「我們相信神無所不在，但在唱詩的時刻尤其如此。」修士每天七次放下手中的工作走進禮拜堂——半夜、清晨、日間各時辰——用歌聲唱過整本詩篇，一週一輪，年復一年直到死亡。沒有觀眾，沒有錄音，絕大多數人歷史上連名字都沒留下。歐洲最黑暗混亂的幾個世紀裡，這些歌聲沒有停過：瘟疫、戰亂、帝國崩解，修道院的日課照唱。我們今天能有樂譜、能有保存下來的聖歌傳統，是因為有一群人把「唱詩給神聽」當成了一生的職業。',
      significance:
        '這個故事的主角不是天才，而是無名的堅持。教會音樂最深的地基，不是某首名曲，而是千萬次無人聽見、只唱給神的日課。',
    },
    todayReflection: [
      {
        question: '若敬拜歌曲無法在週一被記得、被低聲再唱，它還算進入門徒生活嗎？',
        prompt: '挑一首短而有神學密度的歌，設定固定時段（如晨禱或睡前）連續唱兩週。',
      },
      {
        question: '你的教會「統一的聲音」是在成全合一，還是在消除差異？',
        prompt: '列出聚會中哪些元素必須共同、哪些可以有文化彈性，並用一節經文檢驗。',
      },
    ],
  },
  {
    periodId: 'polyphony-medieval',
    title: '複音的誕生：當多個聲音開始對話',
    dateRange: '約 1000–1400 年',
    stage: '複音與禮儀',
    thesis:
      '奧甘農、經文歌與早期對位法讓教會音樂從「一條聖言的線」變成「多層同時發生的聲音建築」。這是技術突破，也是神學與權力的實驗：美可以被建造到什麼程度，而不蓋過經文？',
    musicalQuestion: '若多個聲部同時進行，敬拜的中心仍是可理解的聖言，還是轉向聲音本身的奇觀？',
    inheritedFrom: 'gregorian-monastic',
    thisEraAnswer:
      '以素歌為固定聲部（cantus firmus），在其上疊加新聲部；巴黎聖母院樂派等把節奏模式與寫譜技術推進，使複雜多聲成為大教堂禮儀的榮光象徵。',
    unresolvedTension:
      '可理解性與華麗性的衝突尖銳化。教會當局多次試圖限制複雜音樂；作曲家與詩班則持續擴張技藝邊界。這場拉扯直接通向宗教改革對「會眾聽得懂、唱得了」的訴求。',
    insights: {
      whyItMatters:
        '複音不只是音樂史轉折，也是西方思考「秩序中的多元」的聲音實驗室：不同線條如何既獨立又和諧，成為後來神學、政治與藝術的共同隱喻。',
      commonMisconception:
        '以為中世紀教會全面禁止藝術創新。事實上大教堂正是當時最高度的藝術研發現場；限制與創新往往同時存在，而不是簡單的「黑暗時代」。',
      scriptureConnection:
        '啟示錄中天上敬拜的「眾聲」（啟 5、7、14）常被用來想像多層次的讚美；但地上教會仍要面對哥林多前書對「造就人」與「可理解」的要求（林前 14）。',
    },
    soundPortrait: {
      description:
        '從平行奧甘農的樸素加線，到節奏化、多文本經文歌的密集織體。高聲部可能更華麗，低聲部托住素歌。在石造空間中，和聲的共鳴本身成為神學體驗的一部分。',
      forms: ['奧甘農（organum）', '克勞蘇拉（clausula）', '經文歌（motet）', '早期對位彌撒段落'],
    },
    keyFigures: [
      {
        name: '萊奧南（Léonin）與佩羅坦（Pérotin）',
        role: '巴黎聖母院樂派代表；推進多聲部奧甘農與節奏寫法',
      },
      {
        name: '紀堯姆·德·馬肖（Guillaume de Machaut）',
        role: '14 世紀重要作曲家；《聖母彌撒》是早期完整彌撒套曲的里程碑',
      },
    ],
    representativeWorks: [
      {
        title: 'Viderunt Omnes（佩羅坦傳統）',
        composer: '巴黎聖母院樂派',
        significance: '展示盛大節期中，複音如何把短小素歌材料擴建成聲音的大教堂。',
      },
      {
        title: '聖母彌撒（Messe de Nostre Dame）',
        composer: '馬肖',
        significance: '完整彌撒套曲思維出現，音樂開始以大型結構承載禮儀整體，而不只是片段裝飾。',
      },
    ],
    eraAssessment: {
      contribution:
        '打開多聲部寫作的技術與想像，使教會音樂能表達更豐富的情感與結構，並為文藝復興對位法奠基。',
      shadow:
        '專業詩班與複雜織體可能讓會眾淪為觀眾；多文本堆疊有時犧牲經文可懂度，敬拜淪為宮廷化展示。',
      discernment:
        '當編曲、燈光與聲場都極盡華麗時，會眾還能清楚聽見並回應福音，還是只在消費一場神聖氣氛？',
    },
    source: {
      label: '美國國會圖書館：中世紀禮儀記譜手稿',
      url: 'https://www.loc.gov/collections/tenth-to-sixteenth-century-liturgical-chants/about-this-collection/',
    },
    hymnStory: {
      person: '賀德佳（Hildegard of Bingen）',
      year: '1178–1179 年，賓根魯柏山修道院',
      hymn: '被禁唱的日課',
      story:
        '八十歲的賀德佳——女修道院長、神學家、中世紀最多產的可考作曲者之一——在修道院墓地埋葬了一位曾被絕罰、但她確信已與教會和好的貴族青年。美因茲的教會當局命令她掘出屍體，她拒絕，甚至親手抹去墳墓的痕跡讓人無法辨認。當局對修道院下了禁令：不得舉行彌撒，不得唱日課。對一生以歌唱敬拜為呼吸的群體，這是最重的刑罰。賀德佳寫了一封流傳後世的信抗議：音樂是人回憶樂園的方式，是亞當墮落前與天使同唱的殘響——「那些不義地使教會沉默的人，將去到沒有音樂的地方。」禁令在她去世前幾個月解除；1179 年 9 月，她在恢復了歌聲的修道院中安息。',
      significance:
        '她用神學為音樂辯護：歌唱不是崇拜的裝飾品，而是人性受造的一部分。使敬拜沉默是嚴重的屬靈暴力——這封信是教會音樂史上最早、也最有力的「音樂神學宣言」之一。',
    },
    todayReflection: [
      {
        question: '你更常被「聽懂的真理」打動，還是被「震撼的聲場」打動？兩者可以並存嗎？',
        prompt: '下次主日記下：哪一句歌詞你真的聽清並認同；哪一段只有感覺沒有內容。',
      },
      {
        question: '你的教會有沒有「只有特定人能參與的華麗層」，把其他人關在門外？',
        prompt: '檢視詩班／敬拜團曲目：有多少是會眾可唱的？有多少只能表演給會眾看？',
      },
    ],
  },
  {
    periodId: 'reformation-hymnody',
    title: '宗教改革與會眾聖詩：把歌本交還百姓',
    dateRange: '16 世紀',
    stage: '會眾之歌',
    thesis:
      '宗教改革不只改教義與制度，也重新分配「誰可以開口」。馬丁路德讓會眾用母語唱神學；加爾文傳統以韻律詩篇強調敬拜的規範與簡樸。教會音樂的中心問題從「如何更華麗」轉為「如何讓全會眾以真理歌唱」。',
    musicalQuestion: '敬拜的歌，主要是獻給神的精緻祭，還是全民可參與的聖道回應？',
    inheritedFrom: 'polyphony-medieval',
    thisEraAnswer:
      '以母語聖詩與韻律詩篇重建會眾聲音；旋律取自素歌、民間曲調與新創，神學內容被放進可重複的詩節結構。印刷術使歌本與信仰告白同步傳播。',
    unresolvedTension:
      '自由與規範的路線之爭：路德宗較寬（可保留許多音樂形式），改革宗部分地區更嚴格（甚至限制無聖經文本的讚美詩）。「什麼可以唱」成為教派身份的一部分。',
    insights: {
      whyItMatters:
        '今日全球新教的「會眾同唱」幾乎是改革遺產。沒有這次聲音的民主化，敬拜很難從觀看聖事變成共同宣信。',
      commonMisconception:
        '以為改革宗「反音樂」。更精確的是：許多改革者反的是分心與非聖經內容，而不是聲音本身；伯撒與日內瓦詩篇恰是高度音樂性的規劃。',
      scriptureConnection:
        '會眾同唱呼應「向列邦述說」（詩 96）與「用悟性歌唱」（林前 14:15）。宗教改革把「可理解的語言」原則同時應用在講道與歌唱。',
    },
    soundPortrait: {
      description:
        '旋律線條清楚、音域適中、節奏適合多人齊唱。和聲逐漸走向四聲部聖詩編配。重點是記憶與教義傳承：一首歌唱完，要能帶走一句信仰。',
      forms: ['德語會眾聖詩（choral）', '日內瓦韻律詩篇', '英語韻律詩篇', '簡易對位合唱'],
    },
    keyFigures: [
      {
        name: '馬丁路德（Martin Luther）',
        role: '改革家與聖詩作者；主張音樂是次於神學的上帝恩賜',
        quote: '音樂是上帝最美的禮物之一……它驅除魔鬼，使人快樂。',
      },
      {
        name: '路易·布爾熱瓦（Louis Bourgeois）',
        role: '日內瓦詩篇重要旋律編創者；〈舊百篇〉等曲調影響深遠',
      },
    ],
    representativeWorks: [
      {
        title: '上主是我堅固保障（Ein feste Burg）',
        composer: '馬丁路德',
        significance: '把詩篇 46 的信靠化為會眾可唱的戰鬥與安慰之歌，成為宗教改革的聲音象徵。',
        excerpt: '上主是我堅固保障，是我的磐石與救恩。',
      },
      {
        title: '舊百篇（Old Hundredth）',
        composer: '日內瓦／布爾熱瓦傳統',
        significance: '展示韻律詩篇如何以穩健旋律服務長期會眾記憶，並跨越語言與世紀。',
      },
    ],
    eraAssessment: {
      contribution:
        '把歌唱權交還會眾，使聖詩成為教義教育、群體認同與家庭敬虔的載體；音樂再次緊貼可理解的道。',
      shadow:
        '教派音樂邊界有時變成互相定罪；對「世俗曲調」與圖像、樂器的恐懼也可能壓抑正當的情感與文化創造。',
      discernment:
        '我們的歌單是在訓練會眾宣信，還是在追流行曲風？會眾是否真的「擁有」這些歌，還是只在現場跟著螢幕？',
    },
    source: {
      label: 'LCMS：Singing the Reformation',
      url: 'https://resources.lcms.org/history/singing-the-reformation/',
    },
    hymnStory: {
      person: '馬丁·路德',
      year: '1527 年前後，威登堡',
      hymn: '《上主是我堅固保障》（Ein feste Burg）',
      story:
        '寫這首歌的路德，是一個被教廷絕罰、被帝國通緝的人——沃木斯詔書宣告任何人都可以殺他而不受罰。1527 年前後是他最黑暗的時期：瘟疫襲擊威登堡，他的兒子病重，他自己陷入嚴重的憂鬱與病痛，改教運動內部分裂。就在這樣的處境裡，他把詩篇四十六篇「神是我們的避難所」鍛造成一首軍歌般的眾讚歌。後來每逢沮喪，他對同工墨蘭頓說：「來，我們唱第四十六篇，讓魔鬼氣死。」這首歌傳遍德國，被獄中的殉道者唱過，被流亡的難民唱過——它成了整個運動的精神堡壘。',
      significance:
        '一首詩歌可以是避難所。路德不是在順境中寫下宣告，而是把自己的恐懼按在詩篇上，唱出比感覺更堅固的真理——這正是教會把神學交給會眾歌唱的原因。',
    },
    todayReflection: [
      {
        question: '若關掉投影，會眾還能唱完幾首「屬於你們」的歌？',
        prompt: '統計三個月常用曲目，標出哪些有明確聖經／教義骨架，哪些只有氣氛詞彙。',
      },
      {
        question: '你更怕「唱錯神學」還是「唱得不夠好看」？這個害怕如何塑造選歌？',
        prompt: '為下個月選三首：一首教導屬性、一首認罪盼望、一首差遣——並說明神學理由。',
      },
    ],
  },
  {
    periodId: 'baroque-sacred',
    title: '巴洛克聖樂：當教義長成聲音建築',
    dateRange: '約 1600–1750 年',
    stage: '會眾之歌',
    thesis:
      '巴赫、韓德爾與同時代作曲家把路德宗聖詩、經文與對位法推到新高峰：教會音樂可以極為精煉，卻仍指向聖經與節期。這是「為神的榮耀而作」的技藝巔峰，也埋下後來專業演出與會眾參與再度分離的種子。',
    musicalQuestion: '最高度的音樂技藝，能否仍然是教會的祈禱，而不是音樂會的展品？',
    inheritedFrom: 'reformation-hymnody',
    thisEraAnswer:
      '以清唱劇、受難曲、神曲與管風琴作品，把聖經敘事與教義戲劇化、結構化；同時聖詩合唱（chorale）仍作為會眾與信徒身份的錨。對巴赫而言，寫作技術與解經是同一件事。',
    unresolvedTension:
      '作品越宏大，越需要專業樂手與資源；教會音樂開始同時活在崇拜與宮廷／公共演出兩個世界。敬拜與「聖樂欣賞」的界線愈來愈需要分辨。',
    insights: {
      whyItMatters:
        '這段歷史證明：深度神學不必排斥深度藝術。反之，膚淺的歌詞配上巨大音響，並不能自動成為更好的敬拜。',
      commonMisconception:
        '把巴赫簡化成「博物館裡的古典」。對他的許多作品而言，第一現場是禮拜與節期，樂譜上的 SDG（Soli Deo Gloria）不是裝飾簽名，而是目的聲明。',
      scriptureConnection:
        '受難曲把福音書敘事唱出來；清唱劇常緊扣經課與聖詩，實踐「用各樣的智慧把基督的話豐豐富富存在心裡」（西 3:16）。',
    },
    soundPortrait: {
      description:
        '通奏低音支撐的和聲世界；對位精巧，情感修辭（喜樂、痛悔、榮耀）有固定音樂語彙。管風琴成為新教教堂的神學象徵之一：秩序、宏大與地方會眾傳統並存。',
      forms: ['教會清唱劇', '受難曲', '神曲（oratorio）', '聖詩前奏與管風琴曲', '經文歌'],
    },
    keyFigures: [
      {
        name: '約翰·塞巴斯蒂安·巴赫（J. S. Bach）',
        role: '路德宗音樂的集大成者；以對位法「解經」',
        quote: '一切音樂的目的與終點，無非是榮耀上帝、使心靈歡愉。',
      },
      {
        name: '喬治·弗利德里希·韓德爾（G. F. Handel）',
        role: '《彌賽亞》等神曲作者；把聖經敘事帶入廣大公共聽眾',
      },
    ],
    representativeWorks: [
      {
        title: '馬太受難曲（St. Matthew Passion）',
        composer: '巴赫',
        significance: '以音樂走進基督受難敘事，讓聽者以情感與教義同時默想十字架。',
      },
      {
        title: '彌賽亞（Messiah）中的「哈利路亞」合唱',
        composer: '韓德爾',
        significance: '展示聖經詞句如何在公共音樂生活中成為集體宣信，而不限於主日禮儀內部。',
        excerpt: 'He shall reign for ever and ever.',
      },
    ],
    eraAssessment: {
      contribution:
        '證明教義、聖經敘事與最高音樂工藝可以合一；為後世留下仍能牧養靈魂的聽覺神學遺產。',
      shadow:
        '專業化使「聽聖樂」與「會眾唱」逐漸分家；資源不足的教會可能覺得自己「不夠資格」做出合神心意的音樂。',
      discernment:
        '我們追求的「品質」是為了更清楚地指向基督，還是為了證明自己的品味與實力？',
    },
    source: {
      label: 'Bach Digital：巴赫手稿與作品資料庫',
      url: 'https://www.bach-digital.de/',
    },
    hymnStory: {
      person: '巴哈',
      year: '1723–1750 年，萊比錫',
      hymn: '每週一部清唱劇，末頁簽 S.D.G.',
      story:
        '巴哈在萊比錫的職位表面光鮮，實際上是市議會的雇員：薪水微薄、雜務繁重，要教拉丁文、管理詩班的頑童，還常與雇主爭執。他十歲成為孤兒，一生埋葬了第一任妻子和十個早夭的孩子。就在這樣的日常裡，他以幾乎每週一部的速度寫出清唱劇——供下主日崇拜用完即束之高閣，沒有出版，沒有版稅，多數作品在他死後沉睡近百年才被孟德爾頌重新發掘。但每一部手稿的開頭他寫 J.J.（Jesu Juva，耶穌，求祢幫助），結尾簽 S.D.G.（Soli Deo Gloria，榮耀唯獨歸神）。他不知道後世會稱這些「用過即棄」的週間作業為人類音樂的頂點。',
      significance:
        '最偉大的教會音樂是當「消耗品」寫的——為下週日的會眾，不為不朽。S.D.G. 的意思是：作品的價值不在於誰聽見，而在於獻給誰。',
    },
    todayReflection: [
      {
        question: '你上一次被一首「難」的聖樂帶到悔改或敬畏，是什麼時候？',
        prompt: '選一段巴赫合唱或韓德爾神曲，先讀對應經文再聽，寫下被喚醒的屬靈知覺。',
      },
      {
        question: '若沒有專業樂隊，你的教會如何仍能在能力範圍內追求「出色」而非「炫耀」？',
        prompt: '定義三個可實踐的品質標準：歌詞清晰、神學準確、會眾可參與。',
      },
    ],
  },
  {
    periodId: 'hymn-revival-gospel',
    title: '聖詩復興與福音詩歌：個人得救的聲音',
    dateRange: '約 1700–1900 年',
    stage: '會眾之歌',
    thesis:
      '以瓦茨、衛斯理、芬尼復興與福音詩歌為代表，教會音樂愈來愈面向個人悔改、確據與宣教動員。旋律更口語、情感更直接，歌詞常用「我」的見證語氣。這讓福音贴近普通人，也帶來情感操控與神學淺化的風險。',
    musicalQuestion: '當歌曲強力喚起個人情感與決志，它是在牧養良心，還是在製造可複製的宗教高潮？',
    inheritedFrom: 'baroque-sacred',
    thisEraAnswer:
      '大量創作會眾可唱的聖詩與福音詩歌；搭配奮興聚會、主日學與海外宣教，音樂成為傳播與動員的核心技術。英語世界的聖詩規範與短詩+副歌結構影響全球。',
    unresolvedTension:
      '主觀確據與客觀教義、情感真實與情緒表演之間的界線模糊。黑人靈歌等受壓迫群體的聲音同時成為深刻神學見證，卻也常被主流文化挪用。',
    insights: {
      whyItMatters:
        '今日許多華人教會仍活在這條譜系：短詩、副歌、見證式歌詞、鋼琴／風琴傳統，以及「唱到心裡柔軟」的復興想像。',
      commonMisconception:
        '把福音詩歌一律看成膚淺。其中確有薄弱之作，但如《奇異恩典》等也能承載極深的罪與恩對照；要分辨的是神學骨架，不是年代或曲風標籤。',
      scriptureConnection:
        '個人呼召與新歌傳統可見於詩篇（詩 40、51）與「向列國傳揚」的宣教詩；但聖經同樣警告只有嘴唇親近（賽 29:13）。',
    },
    soundPortrait: {
      description:
        '規則詩節、易記副歌、功能和聲清楚，適合大眾齊唱與巡迴佈道。靈歌則常用呼應句、即興與身體節奏，在苦難中形成集體盼望。',
      forms: ['英語聖詩（hymn）', '福音詩歌（gospel song）', '黑人靈歌（spiritual）', '主日學短歌'],
    },
    keyFigures: [
      {
        name: '以撒·瓦茨（Isaac Watts）',
        role: '英語聖詩之父；讓會眾不只唱詩篇韻文，也唱新約基督論讚美',
      },
      {
        name: '查理·衛斯理（Charles Wesley）',
        role: '數千首聖詩作者；以詩句教導成聖與十字架救恩',
        quote: 'Jesus, Lover of my soul, let me to Thy bosom fly…',
      },
      {
        name: '芬尼·克羅斯比（Fanny Crosby）',
        role: '盲人聖詩作者；福音詩歌時代的多產見證者',
      },
    ],
    representativeWorks: [
      {
        title: '奇異恩典（Amazing Grace）',
        composer: '約翰·牛頓（詞）',
        significance: '把個人悔改敘事寫成可被無數世代借用的救恩告白。',
        excerpt: 'Amazing grace! how sweet the sound, that saved a wretch like me.',
      },
      {
        title: '成何奧妙（And Can It Be）',
        composer: '查理·衛斯理',
        significance: '以驚嘆語氣凝視恩典與十字架，展示情感可以服事教義而非取代教義。',
      },
    ],
    eraAssessment: {
      contribution:
        '讓普通人能用自己的語言唱出罪、恩、確據與差遣；音樂成為宣教與復興的強大載體。',
      shadow:
        '決志技術化、歌詞空洞化、情感表演化的風險上升；種族與階級不公也滲進「誰的聲音被出版、被宣教工業看見」。',
      discernment:
        '一首歌讓人落淚之後，是否留下更清楚的基督與更具體的順服？若沒有，感動可能只是消費。',
    },
    source: {
      label: '美國國會圖書館：黑人靈歌的歷史與聲音',
      url: 'https://www.loc.gov/collections/songs-of-america/articles-and-essays/musical-styles/ritual-and-worship/spirituals/',
    },
    hymnStory: {
      person: '賀拉修·斯帕福德（Horatio Spafford）',
      year: '1873 年，大西洋海上',
      hymn: '《我心靈得安寧》（It Is Well with My Soul）',
      story:
        '芝加哥律師斯帕福德在 1871 年芝加哥大火中失去大部分產業，接著幼子病逝。1873 年他安排全家赴歐洲休養，臨行因公務改期，先讓妻子與四個女兒搭船。11 月 22 日，客輪與鐵殼帆船相撞沉沒，四個女兒全部罹難，妻子獲救後發來的電報只有兩個字：「獨存」（Saved alone）。斯帕福德隨即搭船赴英，途中船長告訴他：現在經過的海域就是你女兒們沉沒之處。傳統記載他就在那片海上寫下：「有時享平安，如江河平又穩；有時遇悲傷，似浪滾——不論何環境，我已蒙主引領，我心靈得安寧，得安寧。」',
      significance:
        '這首歌沒有否認悲劇，第一句就把「悲傷如浪滾」唱了出來。信仰的安寧不是感覺不到痛，而是痛到底處仍然有話可以對神說——這正是詩篇的傳統，在十九世紀的一場海難中再次成為血肉。',
    },
    todayReflection: [
      {
        question: '你最喜歡的「觸動」歌曲，神學上到底說了什麼？',
        prompt: '把副歌逐句改寫成教義命題；若寫不出來，討論它是否只剩氣氛。',
      },
      {
        question: '群體中較弱小的聲音（方言、年齡、文化）有沒有出現在你們的歌單裡？',
        prompt: '這個月刻意學一首來自另一文化或世代的聖詩／靈歌，並讀它的歷史背景。',
      },
    ],
  },
  {
    periodId: 'contemporary-global',
    title: '當代敬拜與全球聖詩：市場、靈恩與多元聲音',
    dateRange: '1900 年–今日',
    stage: '全球敬拜',
    thesis:
      '錄音工業、靈恩運動、全球南方教會成長與數位平台，徹底改寫了「教會音樂」的生產與流通。敬拜歌曲可以在數週內全球同步，也能以本土語言與節奏長出新傳統。機會是宣教與合一；危險是消費主義、名人化，以及把敬拜窄化成某種舞台美學。',
    musicalQuestion: '在全球曲風與平台演算法的時代，地方教會如何既參與普世歌聲，又不失去聖經深度與自身呼召？',
    inheritedFrom: 'hymn-revival-gospel',
    thisEraAnswer:
      '當代敬拜音樂（CCM／praise & worship）成為跨宗派共通語；同時全球各地發展本土聖詩、非洲與拉丁節奏、亞洲語言創作。靈恩運動強調自發歌唱與聖靈工作；禮儀更新運動則嘗試找回歷史深度。',
    unresolvedTension:
      '平台化導致少數出版中心定義「全球教會在唱什麼」；表演文化與會眾參與持續拉扯；神學深度參差，快速消費的歌曲也可能快速被遺忘。',
    insights: {
      whyItMatters:
        '你週日唱的歌，往往是全球產業鏈、本地牧養抉擇與屬靈潮流的交叉點。理解這段歷史，才能有意識地選歌，而不是被推薦清單牽著走。',
      commonMisconception:
        '「新歌屬靈、老歌死板」或相反的「只有傳統才敬虔」都是世代偏見。真正的問題是：這首歌是否忠於聖經、能否被會眾真實領受、是否服事教會的使命。',
      scriptureConnection:
        '「向耶和華唱新歌」（詩 96:1）肯定創新；「持守善道」（提後 1:13）要求辨識。啟示錄的終末敬拜是多國、多民、多方言——支持全球多元，卻以羔羊為唯一中心。',
    },
    soundPortrait: {
      description:
        '樂隊編制、循環和弦、橋段與情緒曲線成為常見語法；同時傳統聖詩被重新編曲，原民與南半球節奏進入世界教會。線上直播讓「現場感」可以複製，也改變參與的定義。',
      forms: ['當代敬拜歌', '重新編曲聖詩', '全球本土聖詩', '短反覆禱詞式歌唱', '敬拜演唱會化製作'],
    },
    keyFigures: [
      {
        name: '湯瑪斯·鄧斯特（Thomas Dorsey）等福音傳統',
        role: '城市福音音樂先驅之一；把藍調語彙與信仰告白結合',
      },
      {
        name: '全球當代敬拜作者群（如 Getty、地方教會創作者）',
        role: '代表兩種拉力：重建聖詩神學深度，以及地方語言的新創作',
      },
    ],
    representativeWorks: [
      {
        title: '聖哉三一／現代聖詩運動代表作（如 In Christ Alone）',
        composer: 'Keith & Kristyn Getty 等',
        significance: '嘗試在當代音樂語彙中恢復明確基督論與救贖論骨架。',
      },
      {
        title: '各地母語敬拜創作（開放曲庫）',
        composer: '全球地方教會',
        significance: '提醒我們：教會音樂史的主角不只是歐美出版目錄，也包括無名的地方詩人與樂手。',
      },
    ],
    eraAssessment: {
      contribution:
        '讓更多語言與文化能用自己的聲音敬拜；資源分享加速宣教與跨教會學習；青年世代得以在當代語彙中遇見信仰。',
      shadow:
        '名人化、版權與市場邏輯可能扭曲選歌；情緒曲線被工程化；地方教會若只消費全球熱歌，會喪失自己的神學與歷史記憶。',
      discernment:
        '我們的歌單是在形成一個門徒群體的共同記憶，還是在追蹤上季的串流排行？誰從中得利，誰的聲音缺席？',
    },
    source: {
      label: 'Duke Divinity：當代 Praise & Worship 歷史',
      url: 'https://divinity.duke.edu/news/books/history-contemporary-praise-worship',
    },
    hymnStory: {
      person: '呂小敏與中國家庭教會',
      year: '1990 年至今，河南',
      hymn: '《迦南詩歌》',
      story:
        '1990 年，河南方城縣一個十九歲的農村女孩在聚會中忽然開口唱出一首沒人教過的歌。呂小敏只有小學學歷，不識樂譜，此後三十多年寫（她說是「領受」）了超過一千五百首詩歌——全部先在心裡成形，再請人記譜。這些歌誕生的環境是取締、罰款與拘留的陰影：聚會常在深夜的農舍，詩歌靠手抄本流傳，抄本被沒收就再抄。《迦南詩歌》沒有和聲學、沒有錄音室，卻成為數千萬中國信徒的共同語言——許多在文革後第一代信主的農民，是用這些帶著中原口音的旋律學會禱告的。',
      significance:
        '教會音樂史的最新一章不是寫在西方的錄音室，而是寫在受限制環境下的農舍裡。從腓立比監獄的半夜到河南的深夜聚會，這個故事首尾呼應：教會最真實的歌聲，往往來自最沒有條件唱歌的地方。',
    },
    todayReflection: [
      {
        question: '若未來五年你們只能固定三十首歌作為「教會共同記憶」，你會留下哪些？為什麼？',
        prompt: '用三個篩選標準各列十首：聖經密度、會眾可唱性、對宣教／關懷的塑造。',
      },
      {
        question: '數位平台讓你更深入敬拜，還是更像在消費內容？',
        prompt: '連續兩週：一週只唱「會眾已會」的歌，一週學一首神學紮實的新歌，比較群體參與品質。',
      },
    ],
  },
]

export function findChurchMusicHistoryPeriod(periodId: string) {
  return CHURCH_MUSIC_HISTORY_PERIODS.find(p => p.periodId === periodId)
}

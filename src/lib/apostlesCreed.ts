export interface CreedScriptureLink {
  reference: string
  note: string
}

export interface CreedArticle {
  articleId: string
  number: number
  title: string
  text: string
  latin?: string
  summary: string
  affirms: string
  rejects: string
  historicalNote: string
  commonMisconception: string
  scriptures: CreedScriptureLink[]
  todayReflection: {
    question: string
    prompt: string
  }[]
}

export interface ApostlesCreedData {
  title: string
  subtitle: string
  fullText: string[]
  introduction: {
    whatItIs: string
    whyItMatters: string
    howToRead: string
    originNote: string
  }
  articles: CreedArticle[]
}

export const APOSTLES_CREED: ApostlesCreedData = {
  title: '使徒信經',
  subtitle: '信仰的骨架：十二條宣信',
  fullText: [
    '我信上帝，全能的父，創造天地的主。',
    '我信我主耶穌基督，上帝的獨生子；',
    '因聖灵感孕，由童貞女馬利亞所生；',
    '在本丟彼拉多手下受難，被釘於十字架，受死，埋葬；',
    '降在陰間；第三天從死人中復活；',
    '升天，坐在全能父上帝的右邊；',
    '將來必從那裡降臨，審判活人、死人。',
    '我信聖靈；',
    '我信聖而公之教會；我信聖徒相通；',
    '我信罪得赦免；',
    '我信身體復活；',
    '我信永生。阿們。',
  ],
  introduction: {
    whatItIs:
      '使徒信經是西方教會最通行的洗禮與崇拜宣信文之一。它不是使徒逐字口授的會議紀錄，而是初代教會在洗禮與教理問答中，逐漸凝結下來的信仰摘要：用最短的句子，說出「我們到底信什麼」。',
    whyItMatters:
      '當教義爭論、文化潮流或個人感覺把信仰沖淡時，信經像骨架一樣把中心撐住。它不取代聖經，而是幫助教會用同一張地圖閱讀聖經：父、子、聖靈，教會、赦罪、復活與永生。',
    howToRead:
      '建議先整篇慢讀一遍，聽見節奏；再逐條進入「肯定什麼／拒絕什麼／經文依據／今日功課」。讀信經不是背口號，而是練習用教會的語言認信。',
    originNote:
      '現存完整拉丁文本約在 4–8 世紀間定型（常稱 Textus receptus）；更早的「古羅馬信經」已具相似骨架。名稱「使徒信經」表達其使徒性內容與權威，而非主張十二使徒各寫一條的傳奇故事為史實。',
  },
  articles: [
    {
      articleId: 'father-creator',
      number: 1,
      title: '全能的父，創造天地的主',
      text: '我信上帝，全能的父，創造天地的主。',
      latin: 'Credo in Deum Patrem omnipotentem, Creatorem caeli et terrae.',
      summary:
        '信仰的第一句不是「我很屬靈」，而是承認：有一位真實的上帝，是父，是全能者，是天與地的來源。',
      affirms:
        '上帝是獨一的；祂以父的身份與我們建立關係；祂的能力涵蓋一切受造；世界不是偶然，也不是邪惡物質的牢籠，而是祂所造並稱為好的。',
      rejects:
        '拒絕無神、多神、命運宿命論，以及把物質世界視為本質邪惡的思想（如某些諾斯底傾向）。也拒絕把「父」理解成性別偶像或人間暴君的投影。',
      historicalNote:
        '初代教會在多神帝國中宣認「一神」與「創造主」，是公開的身份宣告。洗禮前的教理問答常從這裡開始：你信創造你的那一位嗎？',
      commonMisconception:
        '「全能」常被誤解成「上帝會做任何我們要求的事」。信經的全能，是指沒有任何受造界能與上帝的主權匹敵；不是把上帝變成許願機。',
      scriptures: [
        { reference: '創 1:1', note: '起初，上帝創造天地——信仰從創造敘事起筆。' },
        { reference: '詩 24:1', note: '地和其中所充滿的，都屬耶和華。' },
        { reference: '太 6:9', note: '主禱文稱上帝為父，與信經第一人稱宣信相呼應。' },
      ],
      todayReflection: [
        {
          question: '你日常生活中，更常活得像世界是「隨機」的，還是「被創造且被看顧」的？',
          prompt: '列出三件今天令你焦慮的事，逐一用「創造主仍是主」重新命名它們。',
        },
      ],
    },
    {
      articleId: 'jesus-son-lord',
      number: 2,
      title: '我主耶穌基督，上帝的獨生子',
      text: '我信我主耶穌基督，上帝的獨生子；',
      latin: 'Et in Iesum Christum, Filium eius unicum, Dominum nostrum,',
      summary:
        '第二條把焦點從「有上帝」推進到「這位上帝在耶穌裡臨到」：祂是基督（受膏者），是獨生子，是我們的主。',
      affirms:
        '耶穌的身份是神的兒子，不是眾多宗教英雄之一；「主」這個稱號在初代教會具有絕對效忠的意味——凱撒不是最終的主，耶穌才是。',
      rejects:
        '拒絕把耶穌降為先知、道德教師或暫時顯現的幻影。也拒絕「多位基督」或私人靈感可以另立主的主張。',
      historicalNote:
        '在羅馬世界稱耶穌為 Kyrios（主），是政治與信仰雙重張力下的宣認。信經把「我主」放在名字核心，提醒信仰是效忠，不只是意見。',
      commonMisconception:
        '有人把「獨生子」聽成「上帝某時刻才生出一個兒子」。古典基督教理解強調的是聖子與聖父的獨特關係與同質，而非受造物的誕生時間表。',
      scriptures: [
        { reference: '約 1:14, 18', note: '道成肉身的獨生子，將父表明出來。' },
        { reference: '羅 10:9', note: '口裡認耶穌為主，心裡信上帝叫祂從死裡復活。' },
        { reference: '腓 2:9–11', note: '萬膝跪拜、萬口宣認耶穌基督為主。' },
      ],
      todayReflection: [
        {
          question: '在你的時間表、金錢與關係裡，誰實際坐在「主」的位置？',
          prompt: '選一個本週決定，寫下：若耶穌真是主，我會怎樣改這個決定。',
        },
      ],
    },
    {
      articleId: 'incarnation',
      number: 3,
      title: '聖靈感孕，童貞女馬利亞所生',
      text: '因聖灵感孕，由童貞女馬利亞所生；',
      latin: 'qui conceptus est de Spiritu Sancto, natus ex Maria Virgine,',
      summary:
        '這一條守護道成肉身的真實：耶穌進入人類歷史的方式，既是上帝的作為，也是真正的出生。',
      affirms:
        '聖子取了真實人性；祂的生命從一開始就是聖靈的工作；馬利亞是真實的母親，救恩發生在肉體與時間之中。',
      rejects:
        '拒絕幻影說（耶穌只是看起來像人）、也拒絕把童女生子化為可有可無的神話點綴。救恩不是抽象理念，而是進入母腹與馬槽的事件。',
      historicalNote:
        '對抗早期幻影說與貶低物質的思潮時，教會堅持「由女人所生」（加 4:4）。馬利亞在信經中的位置是基督論的，不是私人聖母崇拜的起點。',
      commonMisconception:
        '有人只把這一條當成生物學辯論。信經首先宣認的是神學真相：救主與我們同屬人類家族，卻又不是從罪的延續中「自然長出來」的另一個罪人。',
      scriptures: [
        { reference: '路 1:26–38', note: '天使報喜：聖靈要臨到你身上。' },
        { reference: '太 1:18–23', note: '以馬內利——上帝與我們同在。' },
        { reference: '加 4:4–5', note: '上帝就差遣祂的兒子，為女子所生。' },
      ],
      todayReflection: [
        {
          question: '你是否更舒服把耶穌留在「靈感」裡，而不讓祂碰觸你的身體、家庭與日常？',
          prompt: '思想一處你想「屬靈化掉」的具體生活困境，問：道成肉身的主如何走進那裡。',
        },
      ],
    },
    {
      articleId: 'suffered-crucified',
      number: 4,
      title: '在本丟彼拉多手下受難',
      text: '在本丟彼拉多手下受難，被釘於十字架，受死，埋葬；',
      latin: 'passus sub Pontio Pilato, crucifixus, mortuus, et sepultus,',
      summary:
        '信經突然變得很「歷史」：出現一個總督的名字。十字架不是寓言，而是在公開政治暴力中發生的事件。',
      affirms:
        '耶穌真的受苦、真的被釘、真的死、真的被埋葬。救恩锚定在可查核的歷史中，而不是私人神秘經驗。',
      rejects:
        '拒絕「耶穌只是昏死」或「十字架只是道德榜樣故事」。也拒絕把福音抽離公共世界，變成與不義無關的心靈雞湯。',
      historicalNote:
        '點名本丟彼拉多，是古代信經的「時間戳」。教會要說：這事發生在你們的世界史裡。受死與埋葬也堵住了「沒有真死」的逃逸路線。',
      commonMisconception:
        '有人讀到「受難」只感到血腥或自責情緒。信經的重點是宣認：上帝的兒子進入苦難至深之處；情緒反應要服事這個宣信，而不是取代它。',
      scriptures: [
        { reference: '可 15:1–47', note: '受審、被釘、氣絕、安葬的敘事骨架。' },
        { reference: '林前 15:3–4', note: '基督照聖經所說，為我們的罪死了，而且埋葬了。' },
        { reference: '彼前 2:24', note: '祂被掛在木頭上，親身擔當了我們的罪。' },
      ],
      todayReflection: [
        {
          question: '你的信仰敘事有沒有「彼拉多」——也就是願意承認罪與權勢在真實歷史中的交會？',
          prompt: '寫下一個你傾向用「沒事」略過的痛苦事件，試著在禱告中對上帝說實話。',
        },
      ],
    },
    {
      articleId: 'descent-resurrection',
      number: 5,
      title: '降在陰間；第三天復活',
      text: '降在陰間；第三天從死人中復活；',
      latin: 'descendit ad inferos; tertia die resurrexit a mortuis;',
      summary:
        '這一條連接死亡的深淵與復活的清晨：基督的救恩抵達死人的領域，並以復活宣告死亡不是終局。',
      affirms:
        '耶穌的死是真實且徹底的；祂也進入死亡權勢的範圍。第三天復活是身體性的、歷史性的勝利，不只是門徒心中的希望復燃。',
      rejects:
        '拒絕「復活只是精神不死」或「只是影響力還在」。也提醒：不要用好奇的陰間地圖學，取代對復活主的宣信。',
      historicalNote:
        '「降在陰間／陰府」在傳統中有多重解釋（真正死去、向被囚者宣告、勝過死亡權勢）。各支派強調點不同，但共同核心是：沒有一處死亡之地是基督主權到不了的。',
      commonMisconception:
        '有人把「降陰間」讀成耶穌在地獄被懲罰補罪。更符合信經與多數列聖傳統的是：強調死的真實與對死亡國度的得勝，而非父懲罰子的第二現場。',
      scriptures: [
        { reference: '徒 2:24–32', note: '死亡無法拘禁祂；大衛的盼望指向復活。' },
        { reference: '林前 15:20–22', note: '基督已經從死裡復活，成為睡了之人初熟的果子。' },
        { reference: '彼前 3:18–19', note: '傳統常與「向被囚的靈宣講」並讀（釋經有爭論，宜謙卑）。' },
      ],
      todayReflection: [
        {
          question: '你最害怕「沒有出口」的是什麼？復活宣信如何改寫那恐懼？',
          prompt: '為一處看起來已死的關係或盼望禱告，承認無力，並求復活的主開路。',
        },
      ],
    },
    {
      articleId: 'ascension',
      number: 6,
      title: '升天，坐在父的右邊',
      text: '升天，坐在全能父上帝的右邊；',
      latin: 'ascendit ad caelos, sedet ad dexteram Dei Patris omnipotentis;',
      summary:
        '升天不是告別演出，而是登基：被釘的那一位，如今在權柄的位置上作王、代求。',
      affirms:
        '耶穌的人性被接到榮耀裡；祂現今掌權並作中保。教會的使命在「主已登基」的前提下展開，而不是在無主的虛空中自救。',
      rejects:
        '拒絕「耶穌只活在我們回憶裡」。也拒絕把「上帝的右邊」理解成空間座標遊戲——它是王權與尊榮的聖經語言。',
      historicalNote:
        '早期宣講極重視高升（徒 2；腓 2）。升天連結受難與教會時代：同一位主，先降卑後升高，並差遣門徒。',
      commonMisconception:
        '有人以為升天表示「耶穌離開，只剩聖靈勉強頂班」。約翰福音與使徒行傳卻顯示：升天開啟了更普遍的同在與使命。',
      scriptures: [
        { reference: '徒 1:9–11', note: '祂被接上升；門徒受差等待。' },
        { reference: '來 7:25', note: '凡靠著祂進到上帝面前的人，祂都能拯救到底。' },
        { reference: '弗 1:20–22', note: '使祂在天上坐在自己的右邊，為教會作萬有之首。' },
      ],
      todayReflection: [
        {
          question: '你禱告時，比較像在對「缺席的朋友」說話，還是對「在位的王」說話？',
          prompt: '用一週晚禱重讀本條，先默想「坐在右邊」，再呈上祈求。',
        },
      ],
    },
    {
      articleId: 'return-judgment',
      number: 7,
      title: '再來，審判活人死人',
      text: '將來必從那裡降臨，審判活人、死人。',
      latin: 'inde venturus est iudicare vivos et mortuos.',
      summary:
        '信經拒絕讓歷史變成無意義的循環：同一位被釘與升高的主，還要公開再來，以公義作王。',
      affirms:
        '耶穌的故事尚未完結；有真實的終末、真實的問責。對受壓迫者，這是盼望；對犯罪者（包括我們），這是醒悟與恩典仍可及的警告。',
      rejects:
        '拒絕「死後什麼都沒有」、也拒絕私人陰謀式的終末恐慌產業。審判屬於基督，不屬於網路預言家。',
      historicalNote:
        '初代教會在逼迫中靠「主必再來」站立。信經把審判放在基督身上，避免把最終裁決交給帝國或暴民。',
      commonMisconception:
        '有人用審判條文專門恐嚇別人，卻從不審判自己的偶像。信經的「我信」包括：我自己也要站在主面前。',
      scriptures: [
        { reference: '太 25:31–46', note: '人子降臨，聚集萬民。' },
        { reference: '徒 17:31', note: '上帝已經定了日子，要藉祂所設立的人審判天下。' },
        { reference: '林後 5:10', note: '我們眾人必要在基督臺前顯露出來。' },
      ],
      todayReflection: [
        {
          question: '若明天主公開再來，你最想先求祂憐憫的是哪一件未了之事？',
          prompt: '寫一封不寄出的短信給主：承認、求赦、求勇氣去修補。',
        },
      ],
    },
    {
      articleId: 'holy-spirit',
      number: 8,
      title: '我信聖靈',
      text: '我信聖靈；',
      latin: 'Credo in Spiritum Sanctum,',
      summary:
        '第三段轉向聖靈：信仰不是只背兩位元的上帝論，而是宣認那使基督的工作臨到我們的聖靈。',
      affirms:
        '聖靈是上帝自己的臨在與作為，賜生命、光照、使人重生、將我們接入基督，並在教會中運作恩賜與聖潔。',
      rejects:
        '拒絕把聖靈變成氣氛、能量或舞台效果。也拒絕「只有聖父聖子、聖靈是較低級力量」的半亞流派直覺。',
      historicalNote:
        '使徒信經對聖靈的陳述極短，後來尼西亞信經加以展開。短，不代表不重要——它把聖靈放在整段救恩完成的樞紐上。',
      commonMisconception:
        '要麼把聖靈「感」化成情緒高峰，要麼把聖靈「體制」化成章程。信經要求兩者之外的第三條路：聖靈是主，是賜生命者。',
      scriptures: [
        { reference: '約 14:16–17, 26', note: '保惠師，真理的聖靈。' },
        { reference: '羅 8:9–16', note: '基督的靈若在你們心裡……我們呼叫阿爸父。' },
        { reference: '林前 12:3–13', note: '若不是被聖靈感動，沒有人能說耶穌是主。' },
      ],
      todayReflection: [
        {
          question: '你更常「使用」聖靈語言，還是讓聖靈「使用」你去認識基督、愛具體的人？',
          prompt: '今天求聖靈光照一處你正在自欺的地方，並寫下你聽見的下一步。',
        },
      ],
    },
    {
      articleId: 'church-communion',
      number: 9,
      title: '聖而公之教會；聖徒相通',
      text: '我信聖而公之教會；我信聖徒相通；',
      latin: 'sanctam Ecclesiam catholicam, sanctorum communionem,',
      summary:
        '信仰不是私人俱樂部。聖靈帶我們進入被分別為聖、又面向普世的群體，並在聖徒的團契中共享基督。',
      affirms:
        '教會屬基督而為聖；「公」指普世、完整的信仰群體，而非某國某派私有。聖徒相通包括共享福音、聖禮、愛與代求，也跨越生死與時代。',
      rejects:
        '拒絕「只要我跟耶穌好、不需要教會」。也拒絕把「公教會」窄化成某一宗派商標，或把聖徒相通變成名人崇拜。',
      historicalNote:
        'catholicam 在此首要意思是「普世的／大公的」。改教傳統仍宣認大公教會，同時以聖經批判具體教會的錯誤。',
      commonMisconception:
        '把「聖徒相通」只理解成「我在小組很有歸屬感」。傳統更寬：與古今聖徒同屬一身，同享恩典的餽贈。',
      scriptures: [
        { reference: '弗 4:4–6', note: '一個身體、一靈、一主、一信、一洗。' },
        { reference: '林前 12:12–27', note: '肢體彼此相屬。' },
        { reference: '來 12:22–24', note: '天上的耶路撒冷，諸長子之會所共聚。' },
      ],
      todayReflection: [
        {
          question: '你目前是「使用教會服務的人」，還是「讓自己成為肢體」的人？',
          prompt: '選一個具體服事或修補關係的行動，在本週完成，作為相通的練習。',
        },
      ],
    },
    {
      articleId: 'forgiveness',
      number: 10,
      title: '罪得赦免',
      text: '我信罪得赦免；',
      latin: 'remissionem peccatorum,',
      summary:
        '教會與相通若沒有赦罪，只會變成道德社團。這一條把福音的核心放進群體生活：罪被真實赦免。',
      affirms:
        '因基督的緣故，罪人可以被宣告為義、被洗淨、被接納。赦免是上帝的作為，透過福音與聖禮臨到信心。',
      rejects:
        '拒絕「靠累積善行慢慢抵銷」的自救。也拒絕廉價恩典——把赦免當成無需悔改的通行證。',
      historicalNote:
        '洗禮宣信特別強調赦罪：進入教會就是進入被赦免的人民。宗教改革再次把「罪得赦免」推回福音中心。',
      commonMisconception:
        '有人只赦別人不可赦的罪，卻不相信自己真被赦；有人則把自己的罪說得很小，使赦免變得廉價。兩者都偏離宣信。',
      scriptures: [
        { reference: '約壹 1:8–9', note: '我們若認自己的罪，上帝是信實的，必要赦免我們。' },
        { reference: '徒 2:38', note: '悔改受洗……使罪得赦。' },
        { reference: '弗 1:7', note: '我們藉這愛子的血得蒙救贖，過犯得以赦免。' },
      ],
      todayReflection: [
        {
          question: '有哪一件罪，你嘴上說「上帝會赦」，心裡卻仍當自己是無期囚徒？',
          prompt: '向一位可信的肢體或在聖餐前誠實認罪，練習接受赦免的具體性。',
        },
      ],
    },
    {
      articleId: 'resurrection-body',
      number: 11,
      title: '身體復活',
      text: '我信身體復活；',
      latin: 'carnis resurrectionem,',
      summary:
        '基督教的盼望不是靈魂逃離身體，而是上帝重塑受造的人——包括身體。',
      affirms:
        '將來的生命是全人的蒙贖；身體被造為好的，也將被更新。現今對身體的照顧、貞潔、公義與哀傷都有終末重量。',
      rejects:
        '拒絕「身體只是暫時外壳」的二元論。也拒絕今世以身體偶像（外貌、能力、種族優越）取代復活盼望。',
      historicalNote:
        '拉丁文 carnis（肉身）說得很硬，就是要堵住「只是精神續存」的退路。這與希臘某些靈魂觀形成對比。',
      commonMisconception:
        '把復活想成殭屍式的舊身體重啟，或完全想像成雲端意識上傳。保羅用「種子與植物」比喻連續又轉化的榮耀身體（林前 15）。',
      scriptures: [
        { reference: '林前 15:35–49', note: '所種的是血氣的身體，復活的是靈性的身體。' },
        { reference: '羅 8:11, 23', note: '那叫耶穌復活的，也必藉著聖靈使你們必死的身體又活過來。' },
        { reference: '腓 3:20–21', note: '改變我們這卑賤的身體，和祂榮耀的身體相似。' },
      ],
      todayReflection: [
        {
          question: '你對待自己的身體，比較像「可拋棄的工具」還是「將被贖的聖殿」？',
          prompt: '選一項身體的習慣（睡眠、飲食、性、勞動），用復活盼望重新制定本週規則。',
        },
      ],
    },
    {
      articleId: 'life-everlasting',
      number: 12,
      title: '永生',
      text: '我信永生。阿們。',
      latin: 'et vitam aeternam. Amen.',
      summary:
        '最後一句不是夢幻結局，而是關係的完成：認識上帝、與基督同在、在新創造中活著。阿們——願這是真實的。',
      affirms:
        '永生已在認識父與子裡開始（約 17:3），並指向將來的豐滿。信徒的終局是相交與敬拜，不是孤獨的靈魂漂流。',
      rejects:
        '拒絕以成功、後代或名氣偽造的「不死」。也拒絕把永生講成與今世公義無關的逃逸艙。',
      historicalNote:
        '以「阿們」作結，是禮儀中的群體印章：不只是我嘴上說說，而是願這宣信立定。洗禮與崇拜中，阿們把個人納入共同信仰。',
      commonMisconception:
        '把永生等同「上天堂看風景」。聖經更常強調新天新地、上帝的同在、眼淚被擦去，以及受造界的更新。',
      scriptures: [
        { reference: '約 17:3', note: '認識你獨一的真神，並且認識你所差來的耶穌基督，這就是永生。' },
        { reference: '啟 21:1–5', note: '新天新地；上帝要與人同住。' },
        { reference: '約 11:25–26', note: '復活在我，生命也在我。' },
      ],
      todayReflection: [
        {
          question: '若永生已經開始，你今天哪些焦慮其實是在拜「短暫」為神？',
          prompt: '默想啟 21:3–4 五分鐘，把一個你抓最緊的恐懼交還給上帝。',
        },
      ],
    },
  ],
}

export function findCreedArticle(articleId: string) {
  return APOSTLES_CREED.articles.find(a => a.articleId === articleId)
}

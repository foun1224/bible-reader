# 聖經時間軸 Deep Dive 設計規格

Last reviewed: 2026-07-06

## 目標

時間軸首頁保留目前的縱覽卡片，用來建立整體地圖感。下一階段不是把首頁變長，而是讓每張時期卡片成為一個「主題入口」，點進去後進入該時期的深度學習頁。

使用者在每個時期頁應該完成三件事：

1. 看懂這個時代的人怎麼生活、世界怎麼變。
2. 知道這個時期與哪些聖經書卷相關，以及這些書卷要怎麼讀。
3. 把歷史與經文收斂成信仰反思，而不是只累積知識。

## 三輪設計推敲

### 第一輪：心理學與教育目的

問題：使用者若只看到時間、事件、書卷，很容易變成資訊瀏覽，而不是理解。

設計決策：

- 用「世界文化背景 → 聖經書卷 → 信仰反思」作固定順序。
- 先建立情境，再讀文本，最後才引導反思。
- 每個 section 都要回答一個明確問題：
  - 世界背景：那個時代的人活在什麼環境裡？
  - 聖經書卷：聖經在這個時代說了什麼？
  - 信仰反思：這個時代對今天的我有什麼提醒？

心理學依據：

- Context before content：先提供脈絡，降低理解抽象經文的負荷。
- Dual coding：文字搭配史料圖像，比純文字更容易形成長期記憶。
- Progressive disclosure：首頁只保留縱覽，深入頁才展開細節。
- Generative learning：信仰反思要讓使用者產生自己的回應，而不是只讀結論。

### 第二輪：內容架構

每個時期一個 `TimelineDeepDive` 內容單元。

```ts
interface TimelineDeepDive {
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
```

內容順序固定：

1. 世界背景
   - 文化背景：制度、宗教、帝國、城市、文字、法律。
   - 人文變遷：家庭、奴隸、遷徙、民族衝突、王權、社會階層。
   - 自然環境：河流、沙漠、山地、氣候、貿易路線、農業條件。
   - 史料與圖片：器物、地圖、碑文、浮雕、手稿、遺址照片。
2. 聖經相關書卷
   - 這些書卷在大敘事中的位置。
   - 每卷書的閱讀問題。
   - 建議閱讀路徑：先讀哪幾章，再讀哪幾段背景。
3. 信仰反思
   - 一個時代主題，例如「在異鄉中忠心」、「權力與敬拜」、「等候中的信心」。
   - 2 到 3 個反思問題。
   - 一段短禱文或默想引導。

### 第三輪：UI 與資料呈現

首頁卡片不塞長文，只新增一個低干擾入口：

```text
[深入理解這個時代 →]
```

深入頁版型：

```text
返回時間軸

時期名稱
一句 thesis

[世界背景]
  文化背景
  人文變遷
  自然環境
  史料圖像 carousel / grid

[聖經書卷]
  書卷 chips
  每卷書：一句定位 + 閱讀問題
  開始閱讀按鈕

[信仰反思]
  主題
  反思問題
  默想筆記 textarea
```

互動規則：

- 深入頁是主內容區，不放在 modal。
- 手機優先，垂直閱讀。
- 圖片要有 caption、source、license。
- 不使用自動播放 carousel。
- 不把世界史做成主軸；它是幫助理解聖經敘事的背景。

## 來源規則

優先使用公開、穩定、可核對的來源。

第一級來源：

- Museum collection pages：The Met Open Access、British Museum、Louvre、Israel Museum。
- Public-domain / CC image repositories：Wikimedia Commons、Library of Congress、NASA。
- 大學或學術機構：Bible Odyssey / SBL、ORACC、Livius、Perseus、Internet Archive 中的公版原典。

第二級來源：

- World History Encyclopedia。
- Britannica。
- 專題博物館文章。

避免：

- 無來源的部落格。
- 只做護教或只做反護教的單一立場材料。
- Getty 這類授權不清或常對 public-domain 圖片加商業限制的平台。

## 已確認可用的來源種子

這些不是唯一來源，但可以作為第一批內容與圖片資料的起點。

| 類型 | 來源 | 用途 |
| --- | --- | --- |
| Open Access 圖像與器物 | The Met Open Access | 古埃及、古近東、希臘羅馬器物圖片。The Met 明確提供 public-domain 圖像與資料的 CC0 使用。 |
| 博物館物件頁 | British Museum Collection | 居魯士圓柱、亞述/巴比倫/波斯文物、古代碑文與器物說明。 |
| 公版聖經插畫 | Wikimedia Commons: Gustave Dore Bible illustrations | 只作敘事情境圖，不作史實證據。 |
| 古近東與聖經背景 | Bible Odyssey / SBL | 用作背景解釋與學術平衡，避免只採單一宗派觀點。 |
| 古典與古近東原典 | ORACC、Livius、Perseus、Internet Archive | 引用原典、碑文、古代作者時使用。 |

第一批可直接試用的史料圖像方向：

- `創世與先祖`：古巴比倫法典/泥板、古代美索不達米亞城市與地圖、迦南地理圖。
- `出埃及與曠野`：埃及新王國器物、尼羅河/西奈地形、埃及浮雕。
- `被擄巴比倫`：British Museum Cyrus Cylinder，用來說明波斯政策與被擄歸回背景。
- `耶穌時代`：第二聖殿時期猶太社會、羅馬帝國道路/錢幣/城巿背景。

## 圖片規則

每個時期至少 1 張主圖，最多 3 張輔助圖。

圖片類型優先順序：

1. 史料照片：碑文、浮雕、泥板、古卷、考古器物。
2. 地理圖片：河流、沙漠、山地、古道、城市遺址。
3. 公版插畫：Gustave Dore 聖經木刻，僅作情境補充，不作史實證據。

每張圖必須包含：

```ts
interface SourceAsset {
  title: string
  imageUrl: string
  sourceName: string
  sourceUrl: string
  license: string
  caption: string
  educationalUse: string
}
```

## 第一批實作順序

不要一次做完 10 個時期。先做 2 個示範頁，確認 Sean 的閱讀感受後再批次展開。

Phase 1：資料模型與 UI scaffold

- 新增 `src/lib/timelineDeepDives.ts`
- 新增 `MainTimelineDeepDive.tsx`
- 時間軸卡片新增「深入理解這個時代」入口
- 完成 `patriarchs` 與 `exodus` 兩個時期內容

Phase 2：內容擴充

- 補完舊約其餘 6 個時期。
- 每個時期至少 2 個可靠來源、1 張圖。
- 所有來源集中在 `sources` 欄位，不散落在 JSX。

Phase 3：新約與兩約之間

- 兩約之間、耶穌時代、初期教會補完整。
- 加入希臘化、羅馬帝國、第二聖殿猶太教背景。

Phase 4：驗收

- 手機可讀性檢查。
- 圖片授權檢查。
- 每個 section 是否符合「背景 → 書卷 → 反思」順序。
- 內容是否避免把爭議性考古議題寫成單一結論。

## 給實作者的底線

- 不要讓「世界史」搶走聖經主線。
- 不要只列知識點；每段都要幫助使用者讀懂經文。
- 不要把反思寫成道德口號；要連回該時代的處境。
- 不要把圖片當裝飾；每張圖片都要有教學用途。

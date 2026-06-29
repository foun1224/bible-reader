# Bible Reader Design Guidelines

目的：讓所有 UI/UX 修正都服務同一個產品方向：少干擾、深閱讀、能自然進入經文反思。任何新功能、PR、文案或版面調整，都應先通過本文件的檢查。

## 1. Product Promise

使用者打開產品時，應該感覺自己進入的是一個安靜的讀經與反思空間，而不是任務管理工具、成就系統或資料儀表板。

核心句：

> 先專注經文，再整理領受，最後留下可回看的默想痕跡。

## 2. Mental Model

產品只允許兩個主要心智模式：

1. 經文
   - 找到章節
   - 閱讀經文
   - 劃線與記錄本章默想

2. 領受
   - 進入每日引導
   - 回到相關經文
   - 以經文為中心回應

不要新增第三個同等級模式，例如成就、統計、任務、計畫。這些只能是次層、低干擾的回顧功能。

## 3. Psychological Principles

### 3.1 Cognitive Load

主畫面一次只呈現當下任務需要的控制項。

- 經文模式：目錄、目前章節、搜尋、閱讀設定、沉浸模式。
- 領受模式：日期切換、領受內容、打開相關經文。
- 不要在領受模式顯示經文專用工具。
- 不要在側邊欄混入反思、統計、成就或每日任務。

### 3.2 Attention Residue

使用者閱讀經文時，不應被旁邊的面板、數字或未完成狀態吸走注意力。

- Sidebar 只做定位。
- 章末才出現默想與本章劃線。
- 統計與回顧不能出現在第一層主流程。

### 3.3 Self-Determination

產品要支持自主、安靜和內在動機，不用績效語言推動使用者。

避免：

- 達標
- streak
- 成就解鎖
- 勇士、挑戰、任務
- 倒數、催促

可用：

- 回到上次停留
- 已記錄這次閱讀
- 閱讀回顧
- 本章默想
- 今日領受

### 3.4 Peak-End Rule

一章結束時的體驗會影響使用者對整次讀經的記憶。

章末順序應是：

1. 經文讀完
2. 章末反思
3. 本章劃線回顧
4. 安靜的標記已讀或上下章導航

不要讓完成提示、彈窗或統計在章末搶走注意力。

### 3.5 Progressive Disclosure

重要功能應依照閱讀流程逐層出現。

- 第一層：經文與領受
- 第二層：搜尋、閱讀設定、章節切換
- 第三層：閱讀回顧、歷史、計畫

任何新增入口都要回答：它是不是第一層必須出現？如果不是，應收進次層。

## 4. Layout Rules

### 4.1 Sidebar

Sidebar 的唯一職責是經文定位。

允許：

- 搜尋書卷
- 目前位置
- 舊約 / 新約 / 雅煞珥書
- 書卷展開
- 章節選擇
- 低彩度已讀狀態

禁止：

- 默想 textarea
- 本章劃線列表
- 全部劃線列表
- 成就、streak、今日目標
- 功能 tab bar
- 多功能底部工具列

### 4.2 Main Reading Area

Main area 是產品的核心，不應被裝飾或工具包圍。

經文模式：

- 文字寬度維持 680-720px。
- 字級以閱讀舒適為優先，不追求密度。
- 節號可淡化或隱藏。
- 長按或點按節文才顯示劃線工具。
- 章末顯示反思與本章劃線。

領受模式：

- 使用主畫面完整寬度，不放在 sidebar。
- 內容以日期、引用經文、問題、禱告文排序。
- 外部連結要低於「打開相關經文」。

### 4.3 Toolbar

Toolbar 是環境控制，不是功能展示牆。

允許第一層顯示：

- 經文 / 領受模式切換
- 目前位置
- 搜尋
- 閱讀設定
- 沉浸模式
- 更多

規則：

- 經文專用工具只在經文模式顯示。
- 領受模式不顯示搜尋、閱讀設定、沉浸模式。
- 設定 popover 只能放閱讀環境：文字、主題、節號、行距。

### 4.4 Chapter End Reflection

章末反思是深度閱讀的主要設計點。

內容順序：

1. 本章默想
2. 本章劃線
3. 章節導航與標記已讀

文案原則：

- 引導但不催促。
- 不顯示完成度。
- 不把空白狀態寫成失敗。

## 5. Typography

### 5.1 Reading Text

- 正文：使用現有 serif 字體。
- 行高：舒適模式約 1.9，寬鬆模式約 2.4。
- 字距：中文正文不要超過 0.02em。
- 章標題要清楚，但不要 hero 化。

### 5.2 Sidebar Type Scale

Sidebar 需要穩定、可掃描，而不是大字搶焦點。

建議層級：

- Sidebar title：16px / medium
- Section label：11px / semibold / uppercase tracking
- Book name：14px / regular or medium when active
- Current location：14px / medium
- Chapter button：14px text, 36px minimum touch target
- Metadata：10-11px

避免：

- 書卷 15px 以上造成和正文搶焦點。
- Section label 小於 10px 造成辨識困難。
- 章節按鈕小於 32px，尤其手機。

## 6. Color And Material

色彩應安靜、低飽和，像紙面註記，不像遊戲回饋。

允許：

- Stone / paper base
- Sage 作為主互動色
- Semantic highlight 使用柔和底色
- Border 與背景用低對比區隔

避免：

- 高飽和大片色塊
- 紅色警告式提示，除非是破壞性操作
- 大量 badge、ring、glow、emoji 慶祝
- 紫色漸層、裝飾 blob、強烈 dashboard 視覺

## 7. Interaction Rules

- 主要閱讀不應需要頻繁開關 modal。
- Mobile fixed bottom bar 必須保留 safe-area 和 spacer。
- 所有 touch target 至少 36px，常用操作建議 40-44px。
- Popover 在 iOS 需要 fixed positioning 與 backdrop，避免 touch clipping。
- Immersive mode 應隱藏 sidebar 與 toolbar 干擾。

## 8. Content Rules

文案要安靜、陪伴、低壓。

Preferred terms：

- 經文
- 領受
- 默想
- 本章劃線
- 閱讀回顧
- 回到上次停留
- 已記錄

Avoid terms：

- 成就
- 達標
- 連勝
- 挑戰
- 任務
- 勇士
- 解鎖
- 倒數

## 9. PR Review Checklist

每個 UI/UX PR 必須回答：

- 這個改動是否讓經文更容易被專注閱讀？
- 是否降低了 sidebar、toolbar 或 main area 的認知負荷？
- 是否避免績效語言與壓力訊號？
- 是否符合兩個主模式：經文 / 領受？
- 是否把反思放在閱讀流程中，而不是干擾閱讀？
- 手機 touch target、safe-area、bottom spacer 是否保留？
- 是否通過 `npm run build`？

若任何一項答案是否定，PR 需要重設計或拆小。

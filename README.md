# 你的人生 Bible Reader

一個以繁體中文閱讀體驗為核心的聖經閱讀與學習網站。功能包含經文閱讀、靈修、書卷背景、線上教材導引、聖經時間軸、史料深度學習與閱讀回顧。

## 功能概覽

- 經文閱讀：CKJV 中文聖經、章節切換、書籤、劃線、閱讀設定、沉浸模式。
- 靈修：每日靈修、相關經文、詩歌欣賞、延伸閱讀、默想筆記與靈修劃線。
- 書卷背景：66 卷背景介紹，從書卷目錄的「簡介」入口進入。
- 線上教材：依書卷與主題整理 FHL 多媒體聖經學苑課程連結。
- 聖經時間軸：10 個時期總覽、世界歷史對照、deep dive、史料細讀、經文慢讀與信仰反思。
- 功能導引：首次開啟自動顯示一次，也可從右上角更多選單重新打開。

## 開發

```bash
npm install
npm run dev
npm run build
```

## 參考資料來源

本專案整合多種公開資料與外部連結，包括：

- 聖經文本：Bolls Bible API 的 CKJV / CKJUV translation。
- 雅煞珥書：公開 PDF 解析後轉為 JSON。
- 書卷背景：信望愛 a2z 聖經專卷註釋。
- 每日靈修：letsfollowjesus.org 每日靈修頁與補充文章。
- 線上教材：FHL 多媒體聖經學苑。
- 時間軸史料與圖片：Wikimedia Commons、The Metropolitan Museum of Art、British Museum、Israel Museum、NASA、World History Encyclopedia、Society of Biblical Literature 等公開資料。

完整來源、使用位置與維護原則請見 [docs/references.md](docs/references.md)。

## 授權

本 repo 原創程式碼與文件框架採用 [MIT License](LICENSE)。第三方文本、圖片、課程與史料仍依各自來源授權與使用條款處理；引用或再散佈時請同時參考 [docs/references.md](docs/references.md)。

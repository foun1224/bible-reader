# 參考資料來源

本專案程式碼以 MIT License 授權；第三方文本、圖片、課程與史料仍依各自來源的授權、使用條款與署名要求處理。本頁整理目前網站使用或連結的主要資料來源，方便維護、查核與後續補充。

## 聖經文本

| 用途 | 專案位置 | 來源 | 備註 |
| --- | --- | --- | --- |
| 中文聖經閱讀本文（CKJV / Chinese King James Version） | `public/data/ckjv.json` | Bolls Bible API：`https://bolls.life/api/bolls/` | 由 `scripts/fetch_ckjv.py` 抓取 `CKJUV` translation；若更新資料，需重新確認 upstream 授權與版本資訊。 |
| 雅煞珥書 | `public/data/jasher.json` | PDF：`https://1802261014.rsc.cdn77.org/wp-content/uploads/雅煞珥書1至91章NEW.pdf` | 由 `scripts/extract_jasher.py` 解析 PDF；屬次經/旁經材料，網站 UI 已標示為次經。 |

## 書卷背景與註釋

| 用途 | 專案位置 | 來源 | 備註 |
| --- | --- | --- | --- |
| 66 卷書卷背景介紹 | `public/book-intros.json` | 信望愛 a2z 聖經專卷註釋：`https://a2z.fhl.net/bible/` | 由 `scripts/scrape-book-intros.mjs` 抓取各卷 `pcom.php?book=3&engs=...` 頁面；App 內每卷背景頁也連回原始來源。 |

## 靈修內容

| 用途 | 專案位置 | 來源 | 備註 |
| --- | --- | --- | --- |
| 每日靈修主內容、觀察默想、回應、禱告 | `public/devotional-plan.json` | `https://letsfollowjesus.org/main/daily/` | 由 `scripts/scrape-devotional.mjs` 抓取每日頁。 |
| 靈修補充：亮光、詩歌、信息、見證 | `public/devotional-plan.json` | `https://letsfollowjesus.org/main/daily/` 與其 `articles/` 子頁 | 由 `scripts/scrape-supplemental.mjs` 補入對應欄位與連結。 |

## 線上聖經教材

| 用途 | 專案位置 | 來源 | 備註 |
| --- | --- | --- | --- |
| 線上教材總覽與分類 | `src/lib/bookCourses.ts`、`docs/online-bible-curriculum-guide.md` | FHL 多媒體聖經學苑手機入口：`https://fungclass.fhl.net/smartphone.html` | App 只整理與連結課程，不複製課程全文。 |
| 單卷書卷課程連結 | `src/lib/bookCourses.ts` | `https://fungclass.fhl.net/` 各課程目錄 | 若某卷沒有單卷逐章課程，App 會退回到分類或總覽教材入口。 |

## 聖經時間軸與深度學習

| 用途 | 專案位置 | 來源 | 備註 |
| --- | --- | --- | --- |
| 10 個聖經時期總覽與世界歷史對照 | `src/lib/timelinePeriods.ts` | 聖經敘事脈絡、世界史常識、公開歷史資料 | 用於時間軸首頁；世界背景為教育性摘要。 |
| 時期 deep dive：文化背景、人文變遷、自然環境、史料細讀、經文慢讀、信仰反思 | `src/lib/timelineDeepDives.ts` | 見各時期 `sources` 陣列與 `world.artifacts` 的 `sourceUrl` | 每個 deep dive 內的圖片與史料都保留 `sourceName`、`sourceUrl`、`license` 或來源備註。 |
| 公開圖片與考古文物圖 | `src/lib/timelineDeepDives.ts` | Wikimedia Commons、The Metropolitan Museum of Art、British Museum、Israel Museum、NASA 等 | 圖片在 UI 顯示來源與 license；新增圖片時必須補 `sourceUrl` 與 `license`。 |
| 外部史料與百科參考 | `src/lib/timelineDeepDives.ts` | British Museum、World History Encyclopedia、Encyclopaedia Britannica、Society of Biblical Literature、Bible Odyssey、Early Christian Writings 等 | 用於背景說明與史料解讀；應避免把單一來源當成唯一結論。 |

## 設計與心理學參考

| 用途 | 專案位置 | 來源 | 備註 |
| --- | --- | --- | --- |
| 產品設計原則、心理學與可讀性調整 | `docs/design-guidelines.md`、`docs/design-review-psychology-skills.md`、`docs/psychology-ux-redesign.md` | UX 心理學原則、Nielsen heuristics、Fitts' Law、Gestalt、progressive disclosure 等 | 作為 UI review 與後續設計調整依據。 |
| 動畫與互動標準 | `docs/design-review-psychology-skills.md` | Emil Kowalski skills / motion design practices | 用於檢查過度動畫、transition-all、缺少 reduced motion 等問題。 |

## 授權與維護原則

1. `LICENSE` 只授權本 repo 原創程式碼與文件框架；第三方內容仍依來源授權。
2. 新增外部文本、圖片、課程或史料時，必須在資料結構或本文件補上來源 URL。
3. 圖片需保留 `sourceName`、`sourceUrl`、`license`；若來源授權不明，不要放入 repo。
4. 可連結外部教材頁；除非授權明確，不要複製課程全文。
5. 更新 scraper 產出的資料時，PR 需說明資料來源、抓取日期、覆蓋率與失敗項目。

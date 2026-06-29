# Bible Reader — Agent Shared State
> gridman 維護。所有 agent 作業前必讀此文件。

## 目前狀態（2026-06-29 01:37）

### 產品
- **GitHub Pages**: https://foun1224.github.io/bible-reader/
- **Repo**: https://github.com/foun1224/bible-reader (public)
- **本地**: /home/node/bible-reader/ (dev server port 5173)
- **最新 commit**: 338ccc4 — fetch path fix 已部署

### 已完成功能
- CKJV 66 書、31,102 節（public/data/ckjv.json）
- 雅煞珥書 91 章（public/data/jasher.json）
- 側邊欄書卷/章節導航、書名搜尋
- 節文顯示、深色/淺色模式、字體大小切換
- 書籤（localStorage）

### 已知問題（Sean 回報）
- ❌ 「完全沒辦法按」— 已修復 fetch 路徑 bug（base URL），部署中
- ❓ 品質差（具體待 Hi-ν 審查後列清單）

### 技術棧
- React + TypeScript + Vite + Tailwind CSS
- 無後端，靜態 JSON
- GitHub Actions 自動部署

## 分工

| 角色 | 任務 | 產物 |
|------|------|------|
| **Hi-ν** | code review + 列出所有品質問題清單（UI/UX/功能/程式碼）| 問題清單 + 優先級 |
| **unicorn** | 依照 Hi-ν 的清單逐項修復 | PR 或 commit |
| **gridman** | 統籌、部署、驗收、更新此文件 | 此文件 + 部署 |

## Hi-ν 驗收條件（每輪）
1. 點擊書卷名 → 展開章節列表
2. 點擊章節號 → 主畫面顯示節文
3. 節文格式：節號（amber）+ 節文（分行）
4. 深色/淺色切換正常
5. 手機螢幕（375px 以下）側邊欄可用

## 檔案結構
```
/home/node/bible-reader/
├── src/
│   ├── App.tsx          # 主狀態管理、資料載入、dark mode
│   ├── types.ts         # TypeScript 型別
│   ├── index.css        # Tailwind 入口
│   └── components/
│       ├── Sidebar.tsx  # 書卷/章節導航
│       └── Reader.tsx   # 節文閱讀器
├── public/data/
│   ├── ckjv.json        # CKJV 聖經資料
│   └── jasher.json      # 雅煞珥書資料
├── scripts/             # 資料抽取腳本（Python）
└── .github/workflows/   # 自動部署
```

## 禁止事項
- 不要修改 public/data/*.json（資料正確）
- 不要改 .github/workflows/deploy.yml（部署設定正確）
- 不要猜 API 路徑（已確認資料來源，不需再探）

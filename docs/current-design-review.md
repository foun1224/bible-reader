# Current Design Review And Action Plan

日期：2026-06-29
依據：Sean 要求以心理學與 UI/UX 原則重新檢視目前版本，目標是少干擾、深度反思經文。

## 1. Current State

目前產品已完成幾個重要方向：

- 主模式已簡化為經文 / 領受。
- 領受已移到主畫面，不再塞在 sidebar。
- Sidebar 已回到純目錄。
- 默想與本章劃線已移到章末。
- 成就與高壓 gamification 已被移除或降級。
- iOS bottom clipping 與 settings popover touch issue 已修。

這些方向符合「經文優先、低壓陪伴、章末反思」的產品方向。

## 2. Remaining Problems

### P1. Toolbar Still Feels Like A Utility Bar

雖然已經精簡，但 toolbar 同時有模式切換、目前位置、搜尋、沉浸、設定、更多。桌面可以接受，手機仍可能偏擁擠。

建議：

- 手機 toolbar 只保留：目錄、經文 / 領受、更多。
- 搜尋與閱讀設定可進更多或使用底層 sheet。
- 桌面維持目前工具列，但 icon-only 按鈕需要一致尺寸。

### P1. Chapter End Reflection Needs Better Visual Separation

章末反思位置正確，但需要讓它感覺是「讀後整理」，不是另一個表單。

建議：

- 章末反思區加更清楚的節奏：經文結尾後留出 breathing space。
- 本章默想 textarea 預設可以更像紙上空白，不像表單輸入。
- 本章劃線 empty state 更安靜，不要提示太多操作。

### P2. Completion Still Competes With Reflection

標記已讀仍在章末導航中間。這可能讓使用者把章末理解為「完成」而不是「反思」。

建議：

- 將標記已讀放在章末反思之後，降格為文字連結。
- 點擊後只顯示低干擾文字：已記錄這次閱讀。
- 不要讓 completion banner 搶在默想之前出現。

### P2. More Menu Needs Audit

More menu 是次層入口，但仍可能承載太多「管理」感功能。

建議：

- More menu 只保留：閱讀回顧、已完成紀錄。
- 不新增領受、默想、筆記入口，避免和主流程重複。

### P3. Legacy Components Should Be Removed Or Archived

`ReflectionPanel` 等舊結構若不再使用，會讓後續開發誤判產品架構。

建議：

- 確認未使用元件。
- 若無路由或 import，刪除或移到 docs/legacy-notes。

## 3. Recommended Implementation Phases

### Phase 1: Lock The Design Contract

- Add `docs/design-guidelines.md`.
- Add this current review document.
- Every future UI PR links to these guidelines.

### Phase 2: Quiet The Toolbar

- Mobile toolbar 再降噪。
- 統一 icon button 尺寸與 hit area。
- 搜尋/設定在手機改用次層 sheet 或 More menu。

### Phase 3: Refine Chapter End Reflection

- 將章末反思改成更像閱讀後留白。
- 調整 textarea material：低邊框、紙面感、focus 才顯示明顯邊界。
- 本章劃線列表減少 card 感，改成註記式列表。

### Phase 4: Demote Completion Further

- 標記已讀改為低干擾文字 action。
- Completion banner 不打斷章末反思。
- 完成紀錄只進 Reading Review。

### Phase 5: Remove Legacy Ambiguity

- Audit unused components.
- Remove dead UI paths.
- Keep product architecture aligned with two modes: Scripture / Devotional.

## 4. Ownership Split

Hi-ν / Codex:

- Maintain design guidelines.
- Review UI architecture against psychology and UX principles.
- Implement scoped UI changes as PRs.

Gridman:

- Review PRs against guidelines.
- Keep knowledge distilled into docs when a rule becomes reusable.
- Guard merge order and regression risks.

Sean:

- Product direction and taste decisions.
- Final approval for changes that alter core reading flow.

## 5. Non-Negotiables

- Sidebar is navigation only.
- Reflection belongs after scripture, not beside it.
- Devotional belongs in main view, not sidebar.
- Completion and review are secondary, never the first emotional reward.
- Mobile safe-area and bottom spacer fixes must not regress.

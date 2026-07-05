# Design Review: Psychology + Design Engineering Skills

Review date: 2026-07-05
Scope: Bible reader, devotional view, book background view, and FHL online curriculum guide.
External reference: https://github.com/emilkowalski/skills

## Review Frame

This review combines the product's existing psychology guidelines with design-engineering rules from `emilkowalski/skills`.

The relevant design-engineering ideas are:

- Small invisible details compound into perceived quality.
- Good defaults matter more than adding many options.
- Frequent actions should feel instant and should not be over-animated.
- Buttons need immediate press feedback.
- Popovers/drawers should use motion only when it clarifies spatial relationship.
- UI polish should serve the product personality, not decoration.

For this Bible reader, the product personality is quiet, focused, and reflective. Design should help users move from reading to meditation without feeling like they are operating a dashboard.

## Current Direction: Mostly Correct

The current product direction is fundamentally sound:

| Area | Current State | Assessment |
| --- | --- | --- |
| Main mental model | Bottom nav separates `經文` and `靈修` | Correct. Two clear modes reduce cognitive load. |
| Sidebar | Primarily book/chapter navigation | Correct. It supports location instead of competing with reading. |
| Book background | Opens in main content area, not modal | Correct. Long educational text should not live in a modal. |
| Devotional | Full main view with notes/highlights | Correct. Reflection belongs in the main experience. |
| Curriculum guide | Documented as a future independent `教材` view | Correct. It should not be mixed into scripture reading controls. |

The biggest remaining risk is not visual style. It is information architecture drift: adding every helpful thing into the first layer until the reader again feels busy.

## Recommended IA

The app should keep three content destinations, but only two persistent bottom-nav modes.

| Destination | Entry Point | Persistent Nav? | Why |
| --- | --- | --- | --- |
| 經文 | Bottom nav `經文` | Yes | Primary daily reading mode. |
| 靈修 | Bottom nav `靈修` | Yes | Primary guided reflection mode. |
| 教材 / 書卷背景 | Contextual links from sidebar or book background page | No | Supportive learning; should not compete with reading. |

Do not add `教材` as a third bottom-nav item yet. It is useful, but not equal to reading and devotion. Add it later only if usage proves it is a daily primary mode.

## Findings And Fixes

| Before | After | Why |
| --- | --- | --- |
| `教材` is currently only a document proposal. | If implemented, create `MainCurriculum` as a secondary content page opened from MoreMenu or book background, not bottom nav. | Prevents the product from becoming a portal. Reading and devotion stay primary. |
| Book background `簡介` tile appears beside chapter numbers. | Keep it there, but visually treat it as a pre-reading tile: same 36px target, softer border/background, label `簡介`. | It is contextual to a book and should be discoverable without feeling like another chapter. |
| Long book background text uses parser-generated blocks. | Add a short top summary block later: `本書重點 / 閱讀提醒 / 開始閱讀`. | The current a2z content is scholarly. A summary reduces cognitive load before deep reading. |
| Toolbar has several small controls plus centered brand. | Keep controls minimal, but add active press feedback to buttons (`active:scale-[0.97]`, transform transition). | Emil's design-engineering rule: pressable elements should feel like they heard the user. |
| MoreMenu drawer uses slide transition. | Keep it under 250ms, use ease-out or custom drawer curve; avoid decorative bounce. | Drawer is occasional but functional. Motion should explain spatial entry, not entertain. |
| Settings popover is fixed with backdrop. | Keep fixed positioning, but if animated later, scale from top-right trigger origin rather than center. | Origin-aware popovers feel connected to their trigger. |
| Bottom nav changes content instantly. | Keep mode switching mostly instant; avoid heavy page transitions. | `經文/靈修` is frequent. Animations here would make navigation feel slower. |
| FHL curriculum links are many and external. | Group into six categories and open externally; optionally add a compact filter by `導讀 / 單卷 / 主題`. | Progressive disclosure avoids presenting a wall of links. |
| Reading review/history remain in MoreMenu. | Keep them out of first layer. If surfaced, show as low-salience review, not achievement. | Supports self-determination; avoids streak/score pressure. |

## Psychology Review

### Cognitive Load

The current bottom-nav split is good. The next risk is adding `教材` too prominently. Curriculum should be presented as a learning library, not as a live reading control.

Rules:

- In `經文`, show navigation, reading settings, and contextual background only.
- In `靈修`, show devotional content, related verses, highlights, and note taking.
- In `教材`, if implemented, show categorized cards and external links only.
- Do not cross-load all tools into every mode.

### Attention Residue

Book background and curriculum can create attention residue if they interrupt the reading flow. They should be available before or after reading, not injected inside verse text.

Rules:

- Keep `簡介` at the chapter-grid level, not inside the chapter text.
- Put FHL course links at the bottom of book background or inside a dedicated curriculum page.
- Do not show course recommendations between verses.

### Self-Determination

The user should feel invited, not pushed.

Use:

- `延伸教材`
- `了解本書背景`
- `開始閱讀第 1 章`
- `回到經文`

Avoid:

- `必讀`
- `完成課程`
- `挑戰`
- `進度達成`
- `你還沒讀完`

### Peak-End Rule

After reading a chapter, the best ending remains chapter reflection, not curriculum promotion.

Rules:

- Chapter end order should stay: reflection, highlights, quiet navigation.
- If adding learning links, place them under a collapsed `延伸教材` section after reflection.
- Never replace chapter-end reflection with external course links.

## Design-Engineering Rules To Add To Guidelines

Add these to future PR review checks:

| Rule | Requirement |
| --- | --- |
| Press feedback | Every button/tile should have a visible hover/focus state and subtle `active:scale-[0.97]` unless it would disturb text reading. |
| Motion budget | Frequent actions: no animation or under 160ms. Drawers/popovers: 150-250ms. Avoid animations over 300ms. |
| Motion purpose | Animate only for feedback, spatial consistency, or reducing jarring changes. No decorative motion in reading flow. |
| Transform only | Animate `transform` and `opacity`, not layout properties. |
| Reduced motion | Any future motion must respect `prefers-reduced-motion`. |
| Touch targets | Keep common mobile actions at least 40-44px where possible; minimum remains 36px. |
| External links | External learning links must open in a new tab and include clear source labeling. |
| Contextual learning | Book/curriculum material must be contextual or secondary, never inserted into verse flow. |

## Proposed Next PRs

### P1: Add Curriculum Data

Create `public/curriculum-guide.json` from `docs/online-bible-curriculum-guide.md`.

Acceptance:

- Six categories only.
- Each item has `title`, `url`, `category`, `level`, optional `bookName`.
- No UI change yet.

### P2: Add MainCurriculum View

Create `MainCurriculum.tsx` as a secondary view opened from MoreMenu, not bottom nav.

Acceptance:

- Card-based category layout.
- External links open in new tab.
- No course links inside verse text.
- Mobile layout must not compete with BottomNav.

### P3: Book Background Summary Layer

Add a short manually curated or generated summary above the scholarly a2z text.

Acceptance:

- 3 short blocks: `本書重點`, `閱讀提醒`, `開始閱讀`.
- Full source text remains below as `詳細背景`.
- Summary is optional and can be missing per book.

### P4: Interaction Polish Pass

Add consistent press feedback and motion rules to toolbar buttons, sidebar tiles, MoreMenu, and BottomNav.

Acceptance:

- `active:scale-[0.97]` on pressable UI where appropriate.
- No animation on frequently repeated mode switching beyond color state.
- MoreMenu drawer stays under 250ms and respects reduced motion.

## Decision

Do not immediately build a large online-course portal inside the reader. First, preserve the product's core promise: quiet scripture reading and reflection. Then add curriculum as a secondary learning layer that supports the current book or topic without becoming the main interface.

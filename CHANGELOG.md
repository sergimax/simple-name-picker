# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2026-04-09

### Added

- **README-RU.md:** Russian project readme; cross-links with `README.md`.

### Changed

- **Documentation:** `README.md` / `README-RU.md` now describe dual name presets, the preset storage key, pick pool rules (no positive ratings), and header **Сбросить** as reapplying the active saved preset (not only the bundled default).
- **Agent rules:** `.cursor/rules/project-rules.mdc` — when multiple language readmes exist, keep their technical facts in sync.

## [1.0.0] - 2026-04-09

### Changed

- **Stable release:** version **1.0.0** — no behavior change relative to v0.4.0; SemVer applies going forward for documented flows, UI, bundled name lists, and `localStorage` keys/shapes described in the README.

## [0.4.0] - 2026-04-09

### Added

- **Dual presets (female / male):** `src/data/names.ts` exports `FEMALE_NAMES` and `MALE_NAMES` (small bundled male starter list). `NAMES` remains an alias of the female list for existing defaults (`namePickerState`, migrations).
- **Preset catalog persistence:** `simple-name-picker:preset-names` stores `{ female, male, selected? }`. Plain-array preset JSON from earlier versions is migrated to the female list on load.
- **Список имён dialog:** template buttons **Вставить женские (шаблон)** / **Вставить мужские (шаблон)** fill the editor from the bundled lists; **Сохранить и применить** updates the chosen slot, sets it active, and reapplies the catalog (ratings and bans cleared).

### Changed

- **Редактировать** flow no longer uses an in-dialog preset switch; choosing a template defines the save target until you pick the other template or reopen the dialog (initial draft follows the active saved preset).

## [0.3.0] - 2026-04-07

### Added

- **Preset name list editor:** header button **Редактировать** opens a dialog (**Список имён**) to edit the name list (one name per line); **Очистить** clears the draft; **Сохранить и применить** updates the preset and reapplies the catalog while clearing ratings and bans.
- Persist preset list separately in `localStorage` under `simple-name-picker:preset-names`.

### Changed

- Header **Сбросить** reapplies the **saved preset** (names + clears ratings + bans), instead of always restoring the bundled default catalog from `data/names.ts`.
- Header actions use a consistent button style and stay right-aligned next to the title.

## [0.2.2] - 2026-04-07

### Changed

- On narrow screens, the **Ratings** panel is shown before **Discarded (banned)**.

### Fixed

- On narrow screens, the **Discarded (banned)** and **Ratings** panels now stretch to full width instead of appearing as uneven side-by-side columns.
- On narrow screens, the page can scroll again (small-screen overflow rules were previously overridden).

## [0.2.1] - 2026-04-07

### Changed

- Translate the app UI to Russian (no localization framework).
- Pick button label now changes to “Следующее имя” after a name is shown.
- Footer credits remain in English.

## [0.2.0] - 2026-04-03

### Added

- **`AppFooter`** component: build-time version label (`__APP_VERSION__` from `package.json` via Vite `define`) and GitHub profile link.

### Changed

- Footer layout and styles live in `src/components/app-footer/` instead of `App.css`.

## [0.1.0] - 2026-04-03

### Added

- **Layout:** Three columns on wide screens—Discarded (banned) left, main picker center, **Ratings** right; on narrow viewports the order is main, then discarded, then ratings. Side lists use the viewport height and scroll inside the panel.
- **Ratings panel** (non-zero scores only, positive and negative): sort by highest score first; **−** / **+** to adjust points; **Reset** clears the stored rating (back to implicit 0) and removes the row from the list. Row background **brightness** scales with score (higher = stronger accent) within the visible slice.
- **Pick pool rule:** names with a **positive** rating are excluded from random picks until the score is lowered or reset in the Ratings panel.
- **Discarded list:** compact, muted row styling; semantic panel hooks (`data-names-panel`, etc.).
- **Current pick:** larger hero typography and accent “spotlight” card; **Like** / **Dislike** / **Ban** styled as primary row actions.

### Changed

- After **Like** or **Dislike**, the picker moves to **another random** pickable name when possible (not the name you just rated).
- Intro line “(N banned)” uses the same count as the Discarded list (bans that apply to names still in the catalog), not raw `banned` length with orphaned entries.
- Empty-pick and post-ban status messages mention unbanning, lowering positive ratings, or reset where relevant.
- **Picker intro** states that banned names and names with a positive rating are skipped when picking.

## Earlier

Pre–0.1.0 history was not kept in this file; treat prior `0.0.0` as initial scaffold.

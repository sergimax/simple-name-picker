# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

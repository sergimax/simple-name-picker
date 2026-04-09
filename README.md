# simple-name-picker

**Version 1.0.1** · Russian: [README-RU.md](./README-RU.md).

Small **Vite + React + TypeScript** web app for drawing a **random name** from a catalog, giving each name a **rating** (like / dislike), and **banning** names so they are skipped until you restore them. State is **saved in the browser** (`localStorage`). See [CHANGELOG.md](./CHANGELOG.md) for release notes.

## Features

- **Pick** chooses a random name that is **not banned** and does **not** have a **positive** rating (scores above 0 stay out of the pool until you lower or reset them in the ratings panel).
- **Like** / **Dislike** adjust the stored rating; the picker then moves to **another random eligible name** when possible (not the one you just rated).
- **Ban** removes the current name from the pick pool and immediately picks again; **Restore** on the discarded list puts a name back.
- **Discarded (banned)** and **Top rated** side panels: bans vs the current catalog, and **non-zero** ratings (positive and negative), sorted by score with a display cap (see `TOP_RATED_DISPLAY_LIMIT` in `namePickerState.ts`).
- **Edit** (header **Редактировать**) opens **Список имён**: two saved presets (**female** / **male** lists). **Вставить женские (шаблон)** / **Вставить мужские (шаблон)** load bundled lists from `src/data/names.ts` (`FEMALE_NAMES`, `MALE_NAMES`) into the editor; **Сохранить и применить** saves that slot, makes it active, and reapplies the catalog (ratings and bans cleared).
- **Reset** (header **Сбросить**) reapplies the **active saved** preset to the catalog and clears ratings and bans.

The intro line counts names in the catalog and how many are **banned within that catalog**—the same set as under Discarded. Orphan ban entries are not counted there.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Vite) |
| `npm run build` | Typecheck and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Tech stack

- React 19
- TypeScript (strict)
- Vite 8 (`@vitejs/plugin-react`)
- ESLint (flat config)
- Plain CSS under `src/` (no UI framework)

## Project layout

```
src/
├── App.tsx              # Composes picker UI
├── App.css
├── main.tsx
├── index.css
├── components/          # PickerHeader, PickedResult, panels, …
├── hooks/               # Catalog persistence, picking, status messages
├── namePickerState.ts   # Defaults, pickable set, ratings helpers
├── namesStorage.ts      # localStorage load/save (`NAMES_STORAGE_KEY`)
├── presetNamesStorage.ts # Preset catalogs (female/male) in localStorage
├── data/names.ts        # FEMALE_NAMES, MALE_NAMES (bundled defaults)
└── assets/

public/                  # Static assets
README-RU.md             # Russian readme (keep in sync with this file)
CHANGELOG.md             # Keep a Changelog–style history
```

## Persistence

- **Catalog + ratings + bans:** `simple-name-picker:names` (see `src/namesStorage.ts`).
- **Presets + active slot:** `simple-name-picker:preset-names` — JSON `{ female: string[], male: string[], selected?: 'female' | 'male' }`. Older saves that stored a single string array are migrated to the female preset on load (see `src/presetNamesStorage.ts`).
- **Shape (names key):** `names` (string array), `ratings` (record of name → number), `banned` (string array). Legacy data that is only an array of strings still loads as names with empty ratings and bans.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

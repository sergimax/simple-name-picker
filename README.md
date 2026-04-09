# simple-name-picker

Russian: [README-RU.md](./README-RU.md).

Small **Vite + React + TypeScript** web app for drawing a **random name** from a catalog, giving each name a **rating** (like / dislike), and **banning** names so they are skipped until you restore them. State is **saved in the browser** (`localStorage`).

## Features

- **Pick** chooses a random name from everyone not banned.
- **Like** / **Dislike** adjust the stored rating; the picker then moves to **another random name** (not the one you just rated, when other names exist).
- **Ban** removes the current name from the pick pool and immediately picks again; **Restore** on the discarded list puts a name back.
- **Discarded (banned)** and **Top rated** side panels summarize bans and positively rated names (top list is capped for display).
- **Reset** restores the default name catalog and clears ratings and bans.

The intro line counts names in the catalog and how many are **banned within that catalog**—the same set shown under Discarded (banned). Stale ban entries for names no longer in the list are not counted there.

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
├── data/names.ts        # Bundled default catalog (generated list)
└── assets/

public/                  # Static assets
CHANGELOG.md             # Keep a Changelog–style history
```

## Persistence

- **Storage key:** `simple-name-picker:names` (see `src/namesStorage.ts`).
- **Shape:** `names` (string array), `ratings` (record of name → number), `banned` (string array). Legacy saved data that is only an array of strings is still loaded as names with empty ratings and bans.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

# simple-name-picker

**Version 0.2.1** · Small **Vite + React + TypeScript** web app for drawing a **random name** from a catalog, **rating** names (like / dislike), and **banning** names until you restore them. State is **saved in the browser** (`localStorage`). See [CHANGELOG.md](./CHANGELOG.md) for release notes.

## Features

- **Pick** chooses a random name that is **not banned** and does **not** have a **positive** rating (scores above 0 stay out of the pool until you lower or reset them in the Ratings panel).
- **Like** / **Dislike** change the stored rating and move to **another random** pickable name when possible (not the name you just rated).
- **Ban** removes the current name from the pool and picks again; **Restore** on the discarded list puts a name back.
- **Discarded (banned)** (left) and **Ratings** (right) flank the main picker on wide screens; on narrow viewports the stack is main, then discarded, then ratings. Side lists scroll within the viewport. The Ratings list shows **non-zero** scores (including negatives), with **−** / **+** / **Reset** per row; higher scores read **brighter** in the row tint. Display is capped (see `TOP_RATED_DISPLAY_LIMIT` in `namePickerState.ts`).
- **Reset** (header) restores the default name catalog and clears ratings and bans.
- **Footer** credits: `version {semver} by sergimax via Cursor` (semver from `package.json` at build time; links to GitHub and Cursor).

The intro line counts names in the catalog and how many are **banned within that catalog**—the same set as under Discarded (banned). Stale ban entries for names no longer in the list are not counted there.

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
├── App.tsx              # Composes picker UI (three-column shell)
├── App.css
├── main.tsx
├── index.css
├── components/          # PickerHeader, PickedResult, DiscardedNamesPanel, TopRatedNamesPanel, AppFooter, …
├── hooks/               # Catalog persistence, picking, status messages
├── namePickerState.ts   # Defaults, pickable set, ratings helpers
├── namesStorage.ts      # localStorage load/save (`NAMES_STORAGE_KEY`)
├── data/names.ts        # Bundled default catalog (generated list)
└── assets/

public/                  # Static assets
CHANGELOG.md             # Keep a Changelog–style history
```

`vite.config.ts` sets `base: '/simple-name-picker/'` for GitHub Pages and injects `__APP_VERSION__` for the footer.

## Persistence

- **Storage key:** `simple-name-picker:names` (see `src/namesStorage.ts`).
- **Shape:** `names` (string array), `ratings` (record of name → number), `banned` (string array). Legacy saved data that is only an array of strings is still loaded as names with empty ratings and bans.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

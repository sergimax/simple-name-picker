# simple-name-picker

Small web app for **picking or drawing names** from a list (fair random choice, list editing, and similar workflows as the product grows).

Right now the repo is a **Vite + React + TypeScript** starter: run the dev server and edit `src/App.tsx` to build out the picker.

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
- TypeScript
- Vite 8 (`@vitejs/plugin-react`)
- ESLint (flat config)

Styling today is plain CSS under `src/` (no component library in the template).

## Project layout

```
src/
├── App.tsx       # Main UI (starter — replace with name-picker flows)
├── App.css
├── main.tsx      # Entry
├── index.css
└── assets/       # Images, etc.

public/           # Static files (favicon, SVG sprite, …)
```

As features land, it’s fine to add folders such as `src/components/`, `src/hooks/`, and `src/types/` when they keep the code clearer.

Persistence (for example `localStorage`) is **not** defined yet; document any key names and shapes here when you add them.

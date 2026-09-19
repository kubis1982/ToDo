# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Type-check (tsc) then production build via Vite
npm run preview   # Preview the production build locally
```

There is no test suite and no linter configured in this repository.

## Architecture

Single-page React + TypeScript + Vite ToDo app. All data lives client-side in IndexedDB via Dexie — there is no backend/API.

- **`src/db/database.ts`** — Dexie database singleton (`TodoDatabase`, `todos` table). Schema changes go through `db.version(n).stores({...})`.
- **`src/hooks/useTodos.ts`** — the single hook that owns all todo state and CRUD (`addTodo`, `updateTodo`, `deleteTodo`, `toggleTodo`, `completeAll`, `deleteCompleted`). It uses `useLiveQuery` from `dexie-react-hooks` to read reactively from IndexedDB — components never talk to `db` directly, they go through this hook. Filtering (`all`/`active`/`completed`) happens in-memory here, not in the Dexie query.
- **`src/contexts/ThemeContext.tsx`** — light/dark theme state, persisted to `localStorage` under key `theme`, applied via a `data-theme` attribute on `document.documentElement` (styled in `src/styles/themes.css`).
- **`src/App.tsx`** — top-level composition: wraps everything in `ThemeProvider`, holds `filter` and `editingTodo` UI state, and wires `useTodos` output into `TodoForm` / `TodoFilter` / `TodoList`. Editing a todo reuses `TodoForm` (no separate edit modal) by passing the todo being edited down as `editingTodo`.
- **`src/components/`** — presentational components (`TodoForm`, `TodoItem`, `TodoList`, `TodoFilter`, `ThemeToggle`), each taking callbacks/data as props rather than reading the hook/context themselves (except `ThemeToggle`, which uses `useTheme()` directly).
- **`src/types/todo.ts`** — shared `Todo`, `Priority`, `Filter` types used across components/hook/db.

### Build & deployment specifics

- `vite.config.ts` sets `base: '/ToDo/'` — the app is deployed to GitHub Pages under a `/ToDo/` subpath (`vite-plugin-pwa` manifest `scope`/`start_url`/icon paths also use this prefix). Keep these in sync if the deployment path ever changes.
- PWA support is provided by `vite-plugin-pwa` (`registerType: 'autoUpdate'`), configured entirely in `vite.config.ts`.
- `.github/workflows/deploy.yml` builds with `npm ci && npm run build` and deploys `./dist` to GitHub Pages on every push to `main`.

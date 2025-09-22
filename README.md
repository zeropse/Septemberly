# Septemberly

## Description of the website

Septemberly is a lightweight, single-page productivity dashboard implemented with React and Vite. It showcases a modular set of small widgets and utilities useful for daily focus and quick interactions. The core idea is to provide a compact, retro UI where users can:

- Create and manage short notes and a simple todo list.
- Run a Pomodoro timer to help with focused work cycles.
- Play short sample tracks (Royalty Free) using a built-in music player.
- View short inspirational quotes and a simple profile widget.
- Check weather of any place in Earth.

## Website (client web app)

Location: `website/`

Summary:

- Modern SPA built with React (v19) and Vite.
- Local state management with Zustand.
- Reusable UI primitives under `src/components/ui/` and a retro style variant under `src/components/ui/8bit/`.
- Widgets include Notes, Todo, Pomodoro, Music Player, Weather, Profile, Quotes, and Settings.
- Includes bundled demo audio in `public/songs/` and simple client-side managers (`src/data/AudioManager.jsx`, `PomodoroManager.jsx`).

Available npm scripts in `website/package.json` (common):

- `dev` — start Vite dev server
- `build` — create production build
- `preview` — preview the built app
- `lint` — run ESLint across the project

Useful paths & files (website):

- `index.html` — Vite entry
- `src/main.jsx` — application bootstrap
- `src/App.jsx`, `src/Layout.jsx` — app and layout
- `src/components/` — reusable components and widgets
- `src/data/` — managers: `AudioManager.jsx`, `PomodoroManager.jsx`, `songs.js`, `quotes.json`
- `src/stores/` — Zustand stores for app state
- `public/` — static assets (icons, video, sample songs)

## GUI (Electron app)

Location: `gui/`

Summary:

- Electron-based desktop wrapper that appears to integrate the web UI (or a closely related UI) for native distribution.
- Contains Electron + Vite configuration, signing/entitlements for macOS, and packaging metadata.

Check `gui/electron-builder.yml` and `gui/electron.vite.config.mjs` for packaging details.

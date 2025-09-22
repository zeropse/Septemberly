Septemberly — Website

Overview

Septemberly is a small React + Vite website that powers the public web UI for the Septemberly app. It includes a compact set of UI components, widgets (notes, todo, pomodoro, music player, weather, profile, and quotes), audio assets and a lightweight local state management using Zustand.

Key technologies

- React (v19)
- Vite (dev server & build)
- TailwindCSS (present in project deps)
- Zustand (state management)
- Radix UI primitives for accessible UI building blocks
- Sonner (toasts), Framer Motion (animations), date-fns, Axios

Quick start

1. Install dependencies

```bash
cd website
pnpm install
```

2. Development server

```bash
pnpm dev
```

Open `http://localhost:5173` (Vite default) to view the site.

3. Build for production

```bash
pnpm build
```

4. Preview production build

```bash
pnpm preview
```

Available npm scripts

- `dev` — start Vite dev server (alias: `vite`)
- `build` — create production build (`vite build`)
- `lint` — run ESLint across the project (`eslint .`)
- `preview` — locally preview the production build (`vite preview`)

Project structure highlights

- `index.html` — Vite entry HTML
- `src/main.jsx` — application bootstrap
- `src/App.jsx` and `src/Layout.jsx` — top-level app and layout
- `src/components/` — reusable UI components and widgets
  - `Onboarding/` — onboarding flow
  - `sections/` — higher-level app sections like header and error boundary
  - `ui/` — basic UI primitives (button, input, checkbox, etc.) including a retro `8bit` subfolder
  - `widgets/` — feature widgets: `Home`, `Notes`, `MusicPlayer`, `Pomodoro`, `Profile`, `Quote`, `TodoList`, `WeatherWidget`
- `src/data/` — client-only managers and JSON fixtures (audio manager, pomodoro manager, quotes, songs list)
- `src/stores/` — Zustand stores for app state (music, notes, pomodoro, quotes, theme, todo, weather)
- `public/` — static assets (videos, images, icon set, songs)
- `style/` — global CSS and theme helpers

Notable files

- `public/songs/` — packaged sample mp3 files used by the in-app music player
- `src/data/AudioManager.jsx` — audio playback helper used by the music player

Development notes & tips

- This project uses Vite with React plugin; the `dev` script runs `vite` which provides HMR and a fast dev experience.
- Tailwind is present in the dependencies and the project uses a `styles` folder (and a `8bit/styles/retro.css`) for retro theme support — adjust Tailwind config if you add new classes that need to be purged.
- The project targets modern browsers; if you add SSR or older-browser support, adjust build targets in `vite.config.js`.
- ESLint is configured (see `eslint.config.js`). Run `pnpm lint` and fix issues before PRs.

Testing and quality gates

- Lint: `pnpm lint`.
- Build: `pnpm build` and then `pnpm preview` to smoke-test.

Contributing

- If you plan to contribute, fork the repository and open a pull request. Keep changes small and focused. Run the lint task locally and ensure the app builds.

License

- This copy of the codebase doesn't include an explicit license file in the `website/` folder. If you plan to publish, add a `LICENSE` file at the repo root and update package metadata accordingly.

Contact / Notes

This README describes the `website/` folder from the Septemberly workspace. For native/electron-specific code check the `gui/` folder in the repository. If you'd like, I can add a short development checklist, CI config, or example screenshots next.

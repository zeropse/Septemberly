# Septemberly

Septemberly is a lightweight, productivity dashboard implemented with React and Vite. It showcases a modular set of small widgets and utilities useful for daily focus and quick interactions. Both Website and GUI (Electron) is available. The core idea is to provide a compact, retro UI where users can:

- Create and manage short notes and a simple todo list.
- Run a Pomodoro timer to help with focused work cycles.
- Play short sample tracks (Royalty Free) using a built-in music player.
- View short inspirational quotes and a simple profile widget.
- Check weather of any place in Earth.

## 🎮 Gamification System

Septemberly includes a built-in XP (Experience Points) and leveling system to make productivity more engaging:

### XP Rewards

- **Completing a task:** +5 XP
- **Finishing a pomodoro session:** +10 XP
- **Adding a note:** +2 XP
- **Listening to a full track:** +1 XP

### Level Progression

- **Level 1:** Novice Focuser (0-99 XP)
- **Level 2:** Apprentice (100-249 XP)
- **Level 3:** Journeyman (250-499 XP)
- **Level 4:** Scholar (500-999 XP)
- **Level 5:** Focus Master (1000+ XP) - Maximum level

# How to Use

### Website

To visit the live website [Click Here](https://septemberly.zeropse.org/).

### Desktop GUI

Due to the signing requirements for macOS and Windows applications, we are unable to offer pre-built installers. However, you can easily build the application yourself:

1. From the root directory, change into the `gui/` (Electron) folder.

2. To build for macOS, execute `pnpm or npm run build:mac`. You'll find the `.dmg` installer in the dist/ directory.

3. To build for Windows, execute `pnpm or npm run build:win`. The `.exe` installer will be located in the dist/ directory.

## Website

Location: `website/`

Summary:

- Reusable UI primitives under `src/components/ui/` and a retro style variant under `src/components/ui/8bit/`.
- Widgets include Notes, Todo, Pomodoro, Music Player, Weather, Profile, Quotes, and Settings.
- Includes bundled demo audio in `public/songs/` and simple client-side managers (`src/data/AudioManager.jsx`, `PomodoroManager.jsx`).

## GUI (Electron app)

Location: `gui/`

Summary:

- Electron-based desktop wrapper that appears to integrate the web UI for native distribution.
- Contains Electron + Vite configuration and packaging metadata.

Check `gui/electron-builder.yml` and `gui/electron.vite.config.mjs` for packaging details.

## Development (GUI)

Quick commands to develop and build the project. Run these from the project root or change into the folder shown.

1. Install dependencies

Using npm:

```
cd gui
npm install
# or
pnpm install
```

2. Run the Electron app in development (hot reload)

```
cd gui
npm run dev
# or
pnpm dev
```

3. Build production bundles (renderer + main)

```
cd gui
npm run build
# or
pnpm build
```

Then preview the built app:

```
npm run start
# or
pnpm start
```

4. Create platform installers (packaging)

These scripts call the `build` step; run from `gui/`:

macOS:

```
npm run build:mac
# or
pnpm build:mac
```

Windows:

```
npm run build:win
# or
pnpm build:win
```

You're right, there's a lot of repetition between the "GUI" and "Website" sections. This usually means that these two parts of your project share a significant amount of their front-end stack.

Here's a more concise and organized way to present this information, highlighting the shared technologies and noting the differences:

## Implemented Technologies

This project consists of two main applications: a GUI (Electron app) and a Website (Browser). Both applications leverage a common set of front-end technologies, with specific additions for the GUI.

### Front-End Technologies

- **Frameworks & Runtime:**
  - `react`, `react-dom`
- **Bundling & Development Tooling:**
  - `vite`, `@vitejs/plugin-react`
- **UI & Component Libraries:**
  - `@radix-ui/*` (avatar, checkbox, dialog, select, separator, slider, slot, switch)
  - `@tabler/icons-react`
  - `lucide-react`
- **Styling & Utilities:**
  - `tailwindcss`, `@tailwindcss/vite`, `tw-animate-css`
  - `clsx`, `class-variance-authority`, `tailwind-merge`
- **Motion & Animation:**
  - `framer-motion`, `motion`
- **State Management & Data Handling:**
  - `zustand`, `date-fns`, `axios`
- **Notifications / Toasts:**
  - `sonner`

### GUI (Electron App) Specific Technologies (`gui/`)

In addition to the shared technologies, the GUI utilizes:

- **Electron Specifics:**
  - `electron`
  - `electron-vite`, `electron-builder`
  - `@electron-toolkit/*`
- **Development & Linting:**
  - `eslint`, `prettier`

---

**Notes:**

Special thanks to [8bitCN](https://www.8bitcn.com/) for providing the styled components to use.

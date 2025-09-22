# Septemberly

Septemberly is a lightweight, productivity dashboard implemented with React and Vite. It showcases a modular set of small widgets and utilities useful for daily focus and quick interactions. Both Website and GUI (Electron) is available. The core idea is to provide a compact, retro UI where users can:

- Create and manage short notes and a simple todo list.
- Run a Pomodoro timer to help with focused work cycles.
- Play short sample tracks (Royalty Free) using a built-in music player.
- View short inspirational quotes and a simple profile widget.
- Check weather of any place in Earth.

# How to Use

### Website

To visit the live website [Click Here](https://septemberly.zeropse.org/).

### Desktop GUI

Download a prebuilt installer for macOS or Windows from the Releases page: https://github.com/zeropse/Septemberly/releases.

### Local

To build locally, go the `gui/` folder (Electron) and the `website/` folder (web app) and check the `package.json` for further commands.

## Website

Location: `website/`

Summary:

- Reusable UI primitives under `src/components/ui/` and a retro style variant under `src/components/ui/8bit/`.
- Widgets include Notes, Todo, Pomodoro, Music Player, Weather, Profile, Quotes, and Settings.
- Includes bundled demo audio in `public/songs/` and simple client-side managers (`src/data/AudioManager.jsx`, `PomodoroManager.jsx`).

## GUI (Electron app)

Location: `gui/`

Summary:

- Electron-based desktop wrapper that appears to integrate the web UI (or a closely related UI) for native distribution.
- Contains Electron + Vite configuration, signing/entitlements for macOS, and packaging metadata.

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

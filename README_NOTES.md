Septemberly — Local widgets notes

What's included

- Cozy Notes: create/edit/delete notes with categories. Persisted to `localStorage` key `notes_v1`.
- To-Do List: add/check/delete tasks. Counts shown and persisted to `localStorage` key `todos_v1`.
- Pomodoro: 25/5 timer with start/stop/reset, SVG progress, small beep when session ends, sessions count persisted to `localStorage` key `pomodoro_v1`.
- Weather Widget: fetches OpenWeather data. By default it looks for a global `window.__OPENWEATHER_API_KEY__` or you can replace the placeholder in code. If no key is provided, the widget displays instructions.
- Quote of the Day: local `src/data/quotes.json` with refresh button.

How to provide OpenWeather API key

1. Create an account at https://openweathermap.org/ and get an API key.
2. Set it on the `window` before the app mounts (for development) — for example, in `index.html` add a small script:

```html
<script>
  window.__OPENWEATHER_API_KEY__ = "YOUR_KEY_HERE";
</script>
```

Alternatively, update the `WeatherWidget.jsx` to inject your key at build time.

Notes on persistence and storage

- All data is stored in the browser `localStorage` under the keys shown above. Clearing site data will remove notes, todos, and session counts.

Next steps you may want

- Improve styling using shadcn components (this skeleton uses minimal CSS).
- Add unit tests for components and localStorage logic.
- Add optional sync/export for notes and todos.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/style/index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Background Pomodoro ticker: run the store tick() every second while running.
// This ensures timers keep advancing even when the Pomodoro component is unmounted.
import { usePomodoroStore } from "@/stores/pomodoroStore";

if (typeof window !== "undefined") {
  const interval = setInterval(() => {
    const state = usePomodoroStore.getState();
    // Background ticker is the single source of truth for ticking.
    if (state.running) {
      // tick() uses lastUpdated and Date.now() so timing remains accurate even if ticks are delayed
      state.tick();
    }
  }, 1000);

  // Clean up during HMR
  if (import.meta.hot) {
    import.meta.hot.dispose(() => clearInterval(interval));
  }
}

// Reset Pomodoro timer if the user closes the tab/window or navigates away.
// Use `pagehide` (recommended) and `beforeunload` as a fallback.
if (typeof window !== "undefined") {
  const resetOnUnload = () => {
    try {
      const state = usePomodoroStore.getState();
      if (state.running) {
        // Reset the timer to default when site is closed
        state.resetTimer();
      }
    } catch {
      // ignore
    }
  };

  window.addEventListener("pagehide", resetOnUnload, { capture: true });
  window.addEventListener("beforeunload", resetOnUnload, { capture: true });

  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      window.removeEventListener("pagehide", resetOnUnload, { capture: true });
      window.removeEventListener("beforeunload", resetOnUnload, {
        capture: true,
      });
    });
  }
}

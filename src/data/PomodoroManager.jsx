import { useEffect } from "react";
import { usePomodoroStore } from "@/stores/pomodoroStore";

export default function PomodoroManager() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const interval = setInterval(() => {
      const state = usePomodoroStore.getState();
      if (state.running) {
        state.tick();
      }
    }, 1000);

    // HMR cleanup
    if (import.meta.hot) {
      import.meta.hot.dispose(() => clearInterval(interval));
    }

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const resetOnUnload = () => {
      try {
        const state = usePomodoroStore.getState();
        if (state.running) {
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
        window.removeEventListener("beforeunload", resetOnUnload, { capture: true });
      });
    }

    return () => {
      window.removeEventListener("pagehide", resetOnUnload, { capture: true });
      window.removeEventListener("beforeunload", resetOnUnload, { capture: true });
    };
  }, []);

  return null;
}

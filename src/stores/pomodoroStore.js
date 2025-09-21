import { create } from "zustand";
import { persist } from "zustand/middleware";

const POMODORO = {
  FOCUS: 25 * 60,
  BREAK: 5 * 60,
};

export const usePomodoroStore = create(
  persist(
    (set, get) => ({
      // State
      mode: "focus",
      secondsLeft: POMODORO.FOCUS,
      running: false,
      lastUpdated: null,
      sessions: 0,

      // Actions
      startTimer: () =>
        set({
          running: true,
          lastUpdated: Date.now(),
        }),

      pauseTimer: () =>
        set({
          running: false,
          lastUpdated: Date.now(),
        }),

      toggleTimer: () => {
        const state = get();
        if (state.running) {
          state.pauseTimer();
        } else {
          state.startTimer();
        }
      },

      resetTimer: () => {
        set({
          running: false,
          mode: "focus",
          secondsLeft: POMODORO.FOCUS,
          lastUpdated: null,
        });
      },

      switchMode: (newMode) => {
        const nextSeconds =
          newMode === "focus" ? POMODORO.FOCUS : POMODORO.BREAK;
        set({
          mode: newMode,
          secondsLeft: nextSeconds,
          running: false,
          lastUpdated: null,
        });
      },

      incrementSession: () =>
        set((state) => ({
          sessions: state.sessions + 1,
        })),

      tick: () => {
        const state = get();
        if (!state.running) return;

        const now = Date.now();
        const elapsed = state.lastUpdated
          ? Math.floor((now - state.lastUpdated) / 1000)
          : 1;
        const newSecondsLeft = Math.max(0, state.secondsLeft - elapsed);

        if (newSecondsLeft === 0) {
          // Timer finished
          if (state.mode === "focus") {
            state.incrementSession();
            state.switchMode("break");
          } else {
            state.switchMode("focus");
          }
        } else {
          set({
            secondsLeft: newSecondsLeft,
            lastUpdated: now,
          });
        }
      },

      // Initialize timer when coming back to widget
      initializeFromStorage: () => {
        const state = get();
        if (state.running && state.lastUpdated) {
          const now = Date.now();
          const elapsedSeconds = Math.floor((now - state.lastUpdated) / 1000);

          if (elapsedSeconds > 0) {
            const newSecondsLeft = Math.max(
              0,
              state.secondsLeft - elapsedSeconds
            );

            if (newSecondsLeft === 0) {
              // Timer finished while away
              if (state.mode === "focus") {
                state.incrementSession();
                state.switchMode("break");
              } else {
                state.switchMode("focus");
              }
            } else {
              set({
                secondsLeft: newSecondsLeft,
                lastUpdated: now,
              });
            }
          }
        }
      },
    }),
    {
      name: "pomodoro-storage",
      partialize: (state) => ({
        mode: state.mode,
        secondsLeft: state.secondsLeft,
        running: state.running,
        lastUpdated: state.lastUpdated,
        sessions: state.sessions,
      }),
    }
  )
);

// Create computed selectors
export const usePomodoroProgress = () =>
  usePomodoroStore((state) => {
    const total = state.mode === "focus" ? POMODORO.FOCUS : POMODORO.BREAK;
    return Math.max(0, Math.min(1, 1 - state.secondsLeft / total));
  });

export const usePomodoroFormattedTime = () =>
  usePomodoroStore((state) => {
    const minutes = Math.floor(state.secondsLeft / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(state.secondsLeft % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  });

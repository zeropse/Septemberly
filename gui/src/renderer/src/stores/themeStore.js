import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set) => ({
      themeVariant: "cassette",
      mode: "system",
      setThemeVariant: (themeVariant) => set({ themeVariant }),
      setMode: (mode) => set({ mode }),
    }),
    {
      name: "septemberly-ui-theme",
      partialize: (state) => ({
        themeVariant: state.themeVariant,
        mode: state.mode,
        theme: state.theme,
      }),
    }
  )
);

export default useThemeStore;

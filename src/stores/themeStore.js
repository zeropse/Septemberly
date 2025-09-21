import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "septemberly-ui-theme",
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);

export default useThemeStore;

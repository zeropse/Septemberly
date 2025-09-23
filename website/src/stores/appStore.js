import { create } from "zustand";
import { persist } from "zustand/middleware";
import widgets from "@/data/widgets.jsx";

export const useAppStore = create(
  persist(
    (set) => ({
      // App State
      activeWidget: widgets[0].id,
      profile: null,
      onboarded: false,

      // Actions
      setActiveWidget: (widgetId) => set({ activeWidget: widgetId }),

      setProfile: (profile) =>
        set({
          profile,
          onboarded: true,
        }),
    }),
    {
      name: "app-storage", // localStorage key
      partialize: (state) => ({
        profile: state.profile,
        onboarded: state.onboarded,
      }),
    }
  )
);

// Create computed selectors
export const useIsOnboarded = () =>
  useAppStore((state) => Boolean(state.profile));

export const useProfileName = () => useAppStore((state) => state.profile?.name);

export const useProfileTrait = () =>
  useAppStore((state) => state.profile?.trait);

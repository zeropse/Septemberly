import { create } from "zustand";
import { persist } from "zustand/middleware";
import widgets from "@/data/widgets.jsx";

export const useAppStore = create(
  persist(
    (set) => ({
      // App State
      activeWidget: widgets[0].id,
      profile: null,
      profileDraft: null,
      onboarded: false,

      // Actions
      setActiveWidget: (widgetId) => set({ activeWidget: widgetId }),

      setProfile: (profile) =>
        set({
          profile,
          onboarded: true,
        }),

      setProfileDraft: (draft) => set({ profileDraft: draft }),

      updateProfileDraft: (updates) =>
        set((state) => ({
          profileDraft: state.profileDraft
            ? { ...state.profileDraft, ...updates }
            : { ...state.profile, ...updates },
        })),

      clearProfileDraft: () => set({ profileDraft: null }),

      commitProfileDraft: () =>
        set((state) => ({
          profile: state.profileDraft
            ? { ...state.profileDraft }
            : state.profile,
          profileDraft: null,
          onboarded: Boolean(state.profileDraft) || state.onboarded,
        })),

      updateProfile: (updates) =>
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updates } : updates,
        })),

      clearProfile: () =>
        set({
          profile: null,
          onboarded: false,
        }),

      completeOnboarding: () => set({ onboarded: true }),
    }),
    {
      name: "app-storage", // localStorage key
      partialize: (state) => ({
        activeWidget: state.activeWidget,
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

export const useProfileAbout = () =>
  useAppStore(
    (state) => state.profile?.about || "Add something about yourself."
  );

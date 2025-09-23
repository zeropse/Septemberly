import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "@/components/ui/8bit/toast";

// XP thresholds for each level
const LEVEL_THRESHOLDS = [
  { level: 1, name: "Novice Focuser", minXP: 0, maxXP: 99 },
  { level: 2, name: "Apprentice", minXP: 100, maxXP: 249 },
  { level: 3, name: "Journeyman", minXP: 250, maxXP: 499 },
  { level: 4, name: "Scholar", minXP: 500, maxXP: 999 },
  { level: 5, name: "Focus Master", minXP: 1000, maxXP: Infinity },
];

// XP rewards for different actions
const XP_REWARDS = {
  COMPLETE_TODO: 5,
  FINISH_POMODORO: 10,
  ADD_NOTE: 2,
  LISTEN_FULL_TRACK: 1,
};

export const useGamificationStore = create(
  persist(
    (set, get) => ({
      // State
      totalXP: 0,
      currentLevel: 1,
      recentActions: [], // For activity feed

      // Computed getters
      getCurrentLevelInfo: () => {
        const state = get();
        return (
          LEVEL_THRESHOLDS.find(
            (level) =>
              state.totalXP >= level.minXP && state.totalXP <= level.maxXP
          ) || LEVEL_THRESHOLDS[0]
        );
      },

      getProgressToNextLevel: () => {
        const state = get();
        const currentLevelInfo = state.getCurrentLevelInfo();

        if (currentLevelInfo.level === 5) {
          return { progress: 100, remaining: 0 };
        }

        const nextLevel = LEVEL_THRESHOLDS[currentLevelInfo.level];
        const progressInCurrentLevel = state.totalXP - currentLevelInfo.minXP;
        const xpNeededForCurrentLevel =
          nextLevel.minXP - currentLevelInfo.minXP;
        const progress =
          (progressInCurrentLevel / xpNeededForCurrentLevel) * 100;
        const remaining = nextLevel.minXP - state.totalXP;

        return { progress, remaining };
      },

      // Actions
      addXP: (amount, action) => {
        const timestamp = Date.now();

        set((state) => {
          const newTotalXP = state.totalXP + amount;
          const oldLevelInfo = state.getCurrentLevelInfo();

          // Find new level based on new XP
          const newLevelInfo =
            LEVEL_THRESHOLDS.find(
              (level) => newTotalXP >= level.minXP && newTotalXP <= level.maxXP
            ) || LEVEL_THRESHOLDS[0];

          // Create action record
          const actionRecord = {
            id: timestamp.toString(),
            action,
            xpGained: amount,
            timestamp,
            levelUp: newLevelInfo.level > oldLevelInfo.level,
            newLevel:
              newLevelInfo.level > oldLevelInfo.level ? newLevelInfo : null,
          };

          // Show level up toast notification
          if (newLevelInfo.level > oldLevelInfo.level) {
            setTimeout(() => {
              toast(
                `🎉 Level Up! You are now a ${newLevelInfo.name} (Level ${newLevelInfo.level})!`
              );
            }, 100);
          } else {
            // Show regular XP gain notification
            setTimeout(() => {
              toast(`+${amount} XP - ${action}`);
            }, 50);
          }

          return {
            totalXP: newTotalXP,
            currentLevel: newLevelInfo.level,
            recentActions: [actionRecord, ...state.recentActions].slice(0, 5), // Keep last 5 actions
          };
        });
      },

      // Specific action methods
      completeTask: () => {
        get().addXP(XP_REWARDS.COMPLETE_TODO, "Completed a task");
      },

      finishPomodoro: () => {
        get().addXP(XP_REWARDS.FINISH_POMODORO, "Finished a pomodoro session");
      },

      addNote: () => {
        get().addXP(XP_REWARDS.ADD_NOTE, "Added a note");
      },

      listenFullTrack: () => {
        get().addXP(XP_REWARDS.LISTEN_FULL_TRACK, "Listened to a full track");
      },

      // Reset progress (for testing/debugging)
      resetProgress: () => {
        set({
          totalXP: 0,
          currentLevel: 1,
          recentActions: [],
        });
      },

      clearRecentActions: () => {
        set({ recentActions: [] });
      },
    }),
    {
      name: "gamification-storage", // localStorage key
      partialize: (state) => ({
        totalXP: state.totalXP,
        currentLevel: state.currentLevel,
        recentActions: state.recentActions,
      }),
    }
  )
);

// Export constants for use in other components
export { LEVEL_THRESHOLDS, XP_REWARDS };

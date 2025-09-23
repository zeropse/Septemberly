import { create } from "zustand";

export const useMusicStore = create((set, get) => ({
  tracks: [],
  index: 0,
  playing: false,
  volume: 1,
  muted: false,
  lastVolume: 1,
  progress: 0,
  duration: 0,
  seekRequest: null,

  // setters
  setTracks: (tracks) => set({ tracks }),
  setIndex: (index) => {
    const len = get().tracks.length || 1;
    set({ index: ((index % len) + len) % len });
  },
  next: () => {
    const s = get();
    const len = s.tracks.length || 1;
    set({ index: (s.index + 1) % len });
  },
  prev: () => {
    const s = get();
    const len = s.tracks.length || 1;
    set({ index: (s.index - 1 + len) % len });
  },
  setPlaying: (playing) => set({ playing }),
  togglePlaying: () => set((s) => ({ playing: !s.playing })),
  setVolume: (volume) => set({ volume }),
  setMuted: (muted) =>
    set((s) => {
      if (muted) {
        return { muted: true, lastVolume: s.volume, volume: 0 };
      }
      return { muted: false, volume: s.lastVolume ?? 1 };
    }),
  toggleMute: () =>
    set((s) => {
      if (s.muted) {
        return { muted: false, volume: s.lastVolume ?? 1 };
      }
      return { muted: true, lastVolume: s.volume, volume: 0 };
    }),
  setProgress: (progress) => set({ progress }),
  setDuration: (duration) => set({ duration }),
  requestSeek: (progress) => set({ progress, seekRequest: progress }),
  clearSeek: () => set({ seekRequest: null }),
}));

// convenience selectors
export const selectMusicState = (s) => ({
  tracks: s.tracks,
  index: s.index,
  playing: s.playing,
  volume: s.volume,
  progress: s.progress,
  duration: s.duration,
});

export default useMusicStore;

import { create } from "zustand";
import { persist } from "zustand/middleware";

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

export const useNotesStore = create(
  persist(
    (set) => ({
      // State
      notes: [],

      // Actions
      addNote: ({ title, content }) => {
        // Defensive programming: ensure parameters exist
        if (!title && !content) return;

        const newNote = {
          id: uid(),
          title: (title || "").trim(),
          content: (content || "").trim(),
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };

        set((state) => ({
          notes: [newNote, ...state.notes],
        }));
      },

      updateNote: (id, { title, content }) => {
        // Defensive programming: ensure parameters exist
        if (!id) return;

        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? {
                  ...note,
                  title: (title || "").trim(),
                  content: (content || "").trim(),
                  updatedAt: Date.now(),
                }
              : note
          ),
        }));
      },

      deleteNote: (id) => {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        }));
      },
    }),
    {
      name: "notes-storage",
    }
  )
);

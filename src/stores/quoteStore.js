import { create } from "zustand";
import { persist } from "zustand/middleware";

function getRandomQuote(quotes, exclude) {
  let newQuote;
  do {
    newQuote = quotes[Math.floor(Math.random() * quotes.length)];
  } while (quotes.length > 1 && newQuote.text === exclude?.text);
  return newQuote;
}

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

export const useQuoteStore = create(
  persist(
    (set, get) => ({
      // State
      quote: null,
      dailyQuote: null,

      // Actions
      setQuote: (quote) => set({ quote }),

      setDailyQuote: (dailyQuote) => set({ dailyQuote }),

      loadDailyQuote: (quotes) => {
        const state = get();
        const today = todayString();

        if (state.dailyQuote?.date === today && state.dailyQuote?.quote) {
          set({ quote: state.dailyQuote.quote });
        } else {
          const newQuote = getRandomQuote(quotes, undefined);
          const newDailyQuote = { date: today, quote: newQuote };
          set({
            dailyQuote: newDailyQuote,
            quote: newQuote,
          });
        }
      },

      refreshQuote: (quotes) => {
        const state = get();
        const newQuote = getRandomQuote(quotes, state.quote);
        const today = todayString();
        const newDailyQuote = { date: today, quote: newQuote };

        set({
          dailyQuote: newDailyQuote,
          quote: newQuote,
        });
      },
    }),
    {
      name: "quote-storage",
    }
  )
);

// Create computed selectors
export const useIsQuoteLoaded = () =>
  useQuoteStore((state) => Boolean(state.quote));

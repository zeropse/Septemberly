import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWeatherStore = create(
  persist(
    (set, get) => ({
      savedCity: "",
      city: "",
      draftCity: "",
      saveCity: false,
      loading: false,
      temperature: null,
      icon: "❓",
      error: null,
      weatherData: null,

      // Actions
      setCity: (city) => set({ city }),
      setDraftCity: (draftCity) => set({ draftCity }),
      setSaveCity: (saveCity) => set({ saveCity }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      setWeatherData: (data) => {
        // Handle both raw API response and processed weather info
        if (!data) {
          set({
            temperature: null,
            icon: "❓",
            weatherData: null,
            error: null,
          });
          return;
        }

        // If data is already processed (from WeatherWidget)
        if (typeof data.temperature === "number") {
          set({
            temperature: data.temperature,
            icon: data.icon || "❓",
            weatherData: {
              feelsLike: data.feelsLike,
              humidity: data.humidity,
              pressure: data.pressure,
              description: data.description,
              tempMin: data.tempMin,
              tempMax: data.tempMax,
              visibility: data.visibility,
              clouds: data.clouds,
            },
            error: null,
          });
          return;
        }

        // If data is raw API response
        if (data.main && data.weather && data.weather[0]) {
          set({
            temperature: Math.round(data.main.temp),
            icon: data.icon || "❓",
            weatherData: {
              feelsLike: Math.round(data.main.feels_like),
              humidity: data.main.humidity,
              pressure: data.main.pressure,
              description: data.weather[0].description,
              tempMin: Math.round(data.main.temp_min),
              tempMax: Math.round(data.main.temp_max),
              visibility: data.visibility
                ? Math.round(data.visibility / 1000)
                : null,
              clouds: data.clouds?.all || 0,
            },
            error: null,
          });
        } else {
          set({
            error: "Invalid weather data format",
            temperature: null,
            icon: "❓",
            weatherData: null,
          });
        }
      },

      clearWeatherData: () =>
        set({
          temperature: null,
          icon: "❓",
          weatherData: null,
        }),

      // Initialize from saved city
      initializeCity: () => {
        const state = get();
        if (state.savedCity) {
          set({
            city: state.savedCity,
            saveCity: true,
            draftCity: state.savedCity,
          });
          return state.savedCity;
        }
        return null;
      },

      updateSavedCity: () => {
        const state = get();
        if (state.saveCity && state.city) {
          set({ savedCity: state.city });
        } else {
          set({ savedCity: "" });
        }
      },
    }),
    {
      name: "weather-storage",
      partialize: (state) => ({
        savedCity: state.savedCity,
      }),
    }
  )
);

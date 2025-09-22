import { useEffect, useCallback, useRef } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";
import { Input } from "@/components/ui/8bit/input";
import { Button } from "@/components/ui/8bit/button";
import { ICONS } from "@/data/weather-icons";
import { Switch } from "@/components/ui/8bit/switch";
import { useWeatherStore } from "@/stores/weatherStore";

export default function WeatherWidget() {
  const {
    savedCity,
    loading,
    temperature,
    icon,
    error,
    saveCity,
    weatherData,
    setCity,
    draftCity,
    setDraftCity,
    setLoading,
    setWeatherData,
    setError,
    setSaveCity,
    updateSavedCity,
  } = useWeatherStore();
  const initRef = useRef(false);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const fetchWeather = useCallback(
    async (q) => {
      if (!API_KEY) {
        setError("Missing OpenWeather API key");
        setWeatherData(null);
        return;
      }

      if (!q) {
        setError("Please enter a city");
        setWeatherData(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const { data } = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          { params: { q, appid: API_KEY, units: "metric" } }
        );

        // Validate API response structure
        if (!data || !data.main || !data.weather || !data.weather[0]) {
          throw new Error("Invalid weather data received from API");
        }

        const weatherInfo = {
          temperature: Math.round(data.main.temp),
          icon: ICONS[data.weather[0].id] || "❓",
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
        };

        setWeatherData(weatherInfo);
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Error fetching weather"
        );
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    },
    [API_KEY, setLoading, setError, setWeatherData]
  );

  // Load saved city on mount (initial sync only)
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    if (savedCity) {
      setCity(savedCity);
      setSaveCity(true);
      setDraftCity(savedCity);
      fetchWeather(savedCity);
    }
  }, [savedCity, fetchWeather, setCity, setSaveCity, setDraftCity]);

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Weather</CardTitle>
        <div className="flex items-center gap-2">
          <span>Save City</span>
          <Switch
            aria-label="Save City"
            className="cursor-pointer"
            checked={saveCity}
            onCheckedChange={(val) => {
              setSaveCity(val);
              if (val && draftCity) {
                setCity(draftCity);
                updateSavedCity();
              }
              if (!val) {
                updateSavedCity();
              }
            }}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-3 text-center">
        <Input
          className="w-full bg-transparent text-center"
          value={draftCity}
          onChange={(e) => setDraftCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (!draftCity) return;
              setCity(draftCity);
              if (saveCity) updateSavedCity();
              fetchWeather(draftCity);
            }
          }}
          placeholder="Enter city"
        />

        <Button
          className="w-full cursor-pointer"
          variant="default"
          onClick={() => {
            if (!draftCity) return;
            setCity(draftCity);
            if (saveCity) updateSavedCity();
            fetchWeather(draftCity);
          }}
          disabled={loading}
        >
          Refresh
        </Button>

        {loading && <div className="text-2xl text-gray-400 pt-5">Loading…</div>}

        {error && <div className="text-xl text-gray-400 pt-5">{error}</div>}

        {weatherData && temperature !== null && !loading && !error && (
          <div className="space-y-2">
            <div className="text-2xl mt-2 flex items-center gap-2 justify-center">
              {icon} {temperature}°C
            </div>
            <div className="text-sm text-gray-400 space-y-4">
              <div>Feels like: {weatherData.feelsLike}°C</div>
              <div>Humidity: {weatherData.humidity}%</div>
              <div>Pressure: {weatherData.pressure} hPa</div>
              {weatherData.visibility && (
                <div>Visibility: {weatherData.visibility} km</div>
              )}
              <div>Clouds: {weatherData.clouds}%</div>
              <div className="capitalize">
                Weather: {weatherData.description}
              </div>
              <div className="text-xs">
                Min: {weatherData.tempMin}°C | Max: {weatherData.tempMax}°C
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

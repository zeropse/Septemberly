import { useState, useEffect, useCallback } from "react";
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

const STORAGE_KEY = "CityWeather";

export default function WeatherWidget() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [temperature, setTemperature] = useState(null);
  const [icon, setIcon] = useState("❓");
  const [error, setError] = useState(null);
  const [saveCity, setSaveCity] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const fetchWeather = useCallback(
    async (q) => {
      if (!API_KEY) {
        setError("Missing OpenWeather API key");
        setTemperature(null);
        return;
      }

      if (!q) {
        setError("Please enter a city");
        setTemperature(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const { data } = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          { params: { q, appid: API_KEY, units: "metric" } }
        );

        setTemperature(Math.round(data.main.temp));
        setIcon(ICONS[data.weather[0].id] || "❓");
        setWeatherData({
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
        });
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Error fetching weather"
        );
        setTemperature(null);
        setIcon("❓");
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    },
    [API_KEY]
  );

  // Load saved city on mount
  useEffect(() => {
    const savedCity = localStorage.getItem(STORAGE_KEY);
    if (savedCity) {
      setCity(savedCity);
      setSaveCity(true);
      fetchWeather(savedCity);
    }
  }, [fetchWeather]);

  useEffect(() => {
    if (saveCity && city) {
      localStorage.setItem(STORAGE_KEY, city);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [saveCity, city]);

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
            onCheckedChange={setSaveCity}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-3 text-center">
        <Input
          className="w-full bg-transparent text-center"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />

        <Button
          className="w-full cursor-pointer"
          variant="default"
          onClick={() => fetchWeather(city)}
          disabled={loading}
        >
          Refresh
        </Button>

        {loading && <div className="text-2xl text-gray-400 pt-5">Loading…</div>}

        {error && <div className="text-xl text-gray-400 pt-5">{error}</div>}

        {temperature !== null && !loading && !error && (
          <div className="space-y-2">
            <div className="text-2xl mt-2 flex items-center gap-2 justify-center">
              {icon} {temperature}°C
            </div>
            {weatherData && (
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
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

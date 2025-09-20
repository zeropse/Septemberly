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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/8bit/tooltip";

const STORAGE_KEY = "CityWeather";

export default function WeatherWidget() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [temperature, setTemperature] = useState(null);
  const [icon, setIcon] = useState("❓");
  const [error, setError] = useState(null);
  const [saveCity, setSaveCity] = useState(false);

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
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Error fetching weather"
        );
        setTemperature(null);
        setIcon("❓");
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
    <Card className="mb-3">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Weather</CardTitle>
        <Tooltip>
          <TooltipTrigger asChild>
            <Switch
              aria-label="Save City"
              className="cursor-pointer"
              checked={saveCity}
              onCheckedChange={setSaveCity}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Save City</p>
          </TooltipContent>
        </Tooltip>
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

        {loading && <div className="text-2xl text-gray-400">Loading…</div>}

        {error && (
          <div className="text-sm text-gray-400">
            {error}. Make sure your OpenWeather API key is valid.
          </div>
        )}

        {temperature !== null && !loading && !error && (
          <div className="text-2xl mt-2 flex items-center gap-2 justify-center">
            {icon} {temperature}°C
          </div>
        )}
      </CardContent>
    </Card>
  );
}

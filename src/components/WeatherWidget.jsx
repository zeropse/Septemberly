import { useEffect, useState } from "react";

const ICONS = {
  Clear: "☀️",
  Clouds: "☁️",
  Rain: "🌧️",
  Drizzle: "🌦️",
  Thunderstorm: "⛈️",
  Snow: "❄️",
  Mist: "🌫️",
};

export default function WeatherWidget({ defaultCity = "London" }) {
  const [city, setCity] = useState(defaultCity);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Read API key from global var (if set)
  const GLOBAL_KEY =
    typeof window !== "undefined" && window.__OPENWEATHER_API_KEY__;

  async function fetchWeather(q) {
    const API_KEY = GLOBAL_KEY || "YOUR_OPENWEATHER_API_KEY";
    if (!API_KEY || API_KEY === "YOUR_OPENWEATHER_API_KEY") {
      setError("Missing OpenWeather API key");
      setData(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          q
        )}&units=metric&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message || "Error");
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (GLOBAL_KEY) fetchWeather(city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const icon =
    data && (ICONS[data.weather[0].main] || data.weather[0].icon || "🌈");

  return (
    <div className="bg-gray-900/40 border border-gray-800 p-3 rounded-md mb-3">
      <h2 className="font-semibold">Weather</h2>

      {/* Input + Refresh button */}
      <div className="flex items-center gap-2 mt-2">
        <input
          className="flex-1 p-2 rounded-md bg-transparent border border-gray-700"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="px-3 py-1 rounded-md bg-sky-500 text-sky-900"
          onClick={() => fetchWeather(city)}
        >
          Refresh
        </button>
      </div>

      {/* States */}
      {loading && <div className="text-sm text-gray-400 mt-2">Loading…</div>}

      {error && (
        <div className="text-sm text-gray-400 mt-2">
          {error}. If you don’t have an API key, set{" "}
          <code>OPENWEATHER_API_KEY</code> in your environment.
        </div>
      )}

      {data && (
        <div className="mt-2">
          <div className="text-2xl">
            {icon} {Math.round(data.main.temp)}°C
          </div>
          <div className="text-sm text-gray-400">
            {data.name} • {data.weather[0].main}
          </div>
        </div>
      )}

      {!data && !loading && !error && (
        <div className="text-sm text-gray-400 mt-2">
          No data. Set an OpenWeather API key or search a city and click
          Refresh.
        </div>
      )}
    </div>
  );
}

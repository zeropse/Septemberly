import { useEffect, useRef, useState } from "react";
import { Card, CardTitle, CardHeader, CardContent } from "./ui/8bit/card";
import { Button } from "./ui/8bit/button";

const STORAGE_KEY = "pomodoro_v1";

function formatTime(s) {
  const m = Math.floor(s / 60)
    .toString()
    .padStart(2, "0");
  const sec = Math.floor(s % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${sec}`;
}

export default function Pomodoro() {
  const FOCUS = 25 * 60;
  const BREAK = 5 * 60;

  const [mode, setMode] = useState("focus");
  const [secondsLeft, setSecondsLeft] = useState(FOCUS);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);

  const timerRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data.sessions) setSessions(data.sessions);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ sessions }));
  }, [sessions]);

  useEffect(() => {
    if (!running) return;
    timerRef.current = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [running]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      // play sound
      try {
        audioRef.current && audioRef.current.play();
      } catch (err) {
        console.error("audio play failed", err);
      }

      if (mode === "focus") {
        setSessions((s) => s + 1);
        setMode("break");
        setSecondsLeft(BREAK);
        setRunning(false);
      } else {
        setMode("focus");
        setSecondsLeft(FOCUS);
        setRunning(false);
      }
    }
  }, [secondsLeft, mode, FOCUS, BREAK]);

  const start = () => setRunning(true);
  const stop = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    setMode("focus");
    setSecondsLeft(FOCUS);
  };

  const total = mode === "focus" ? FOCUS : BREAK;
  const progress = Math.max(0, Math.min(1, 1 - secondsLeft / total));

  return (
    <Card className="bg-white/2 border border-white/5 p-3 rounded-md mb-3">
      <CardHeader className="text-center">
        <CardTitle>Pomodoro</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          {/* Circular timer */}
          <svg width="180" height="180" viewBox="0 0 200 200" className="mb-6">
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r="70"
              stroke="#334155"
              strokeWidth="12"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="100"
              cy="100"
              r="70"
              stroke="#0ea5e9"
              strokeWidth="12"
              fill="none"
              strokeDasharray={2 * Math.PI * 70}
              strokeDashoffset={(1 - progress) * 2 * Math.PI * 70}
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
              style={{
                transition: "stroke-dashoffset 1s linear",
              }}
            />
            {/* Centered timer text */}
            <text
              x="100"
              y="105"
              fontSize="24"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#e2e8f0"
              fontWeight="700"
            >
              {formatTime(secondsLeft)}
            </text>
          </svg>

          {/* Mode text */}
          <div className="text-base mb-3 text-gray-300 font-medium">
            {mode === "focus" ? "Focus" : "Break"}
          </div>

          {/* Start/Stop Button */}
          <div className="mb-3 w-full">
            {!running ? (
              <Button
                onClick={start}
                className="w-full py-3 text-lg font-semibold"
              >
                Start
              </Button>
            ) : (
              <Button
                onClick={stop}
                variant="destructive"
                className="w-full py-3 text-lg font-semibold"
              >
                Stop
              </Button>
            )}
          </div>

          {/* Reset Button */}
          <div className="w-full">
            <Button
              onClick={reset}
              variant="secondary"
              className="w-full py-2 text-sm"
            >
              Reset
            </Button>
          </div>

          {/* Sessions completed */}
          <div className="mt-4 text-sm text-gray-400">
            Sessions completed: {sessions}
          </div>
        </div>

        <audio ref={audioRef}>
          <source
            src="data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA="
            type="audio/wav"
          />
        </audio>
      </CardContent>
    </Card>
  );
}

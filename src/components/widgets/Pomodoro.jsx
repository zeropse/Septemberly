import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/components/ui/8bit/card";
import { Button } from "@/components/ui/8bit/button";

const STORAGE_KEY = "pomodoro";

// Config constants
const POMODORO = {
  FOCUS: 25 * 60,
  BREAK: 5 * 60,
};

function formatTime(s) {
  const m = Math.floor(s / 60)
    .toString()
    .padStart(2, "0");
  const sec = Math.floor(s % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${sec}`;
}

// useInterval hook
function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

export default function Pomodoro() {
  const [mode, setMode] = useState("focus");
  const [secondsLeft, setSecondsLeft] = useState(POMODORO.FOCUS);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);

  // Load saved state
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data.sessions) setSessions(data.sessions);
        if (data.mode) setMode(data.mode);
        if (data.secondsLeft) setSecondsLeft(data.secondsLeft);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Persist state
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ sessions, mode, secondsLeft })
    );
  }, [sessions, mode, secondsLeft]);

  // Timer logic
  useInterval(
    () => {
      if (!running) return;

      if (secondsLeft > 0) {
        setSecondsLeft((s) => s - 1);
      } else {
        if (mode === "focus") {
          setSessions((s) => s + 1);
          setMode("break");
          setSecondsLeft(POMODORO.BREAK);
        } else {
          setMode("focus");
          setSecondsLeft(POMODORO.FOCUS);
        }
        setRunning(false);
      }
    },
    running ? 1000 : null
  );

  const toggleRunning = () => setRunning((r) => !r);
  const reset = () => {
    setRunning(false);
    setMode("focus");
    setSecondsLeft(POMODORO.FOCUS);
  };

  const total = mode === "focus" ? POMODORO.FOCUS : POMODORO.BREAK;
  const progress = Math.max(0, Math.min(1, 1 - secondsLeft / total));

  // 6. Color change based on mode
  const progressColor = mode === "focus" ? "#0ea5e9" : "#22c55e";

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Pomodoro</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <svg
            onClick={toggleRunning}
            width="180"
            height="180"
            viewBox="0 0 200 200"
            className="mb-6 cursor-pointer"
          >
            <circle
              cx="100"
              cy="100"
              r="70"
              stroke="#334155"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="100"
              cy="100"
              r="70"
              stroke={progressColor}
              strokeWidth="12"
              fill="none"
              strokeDasharray={2 * Math.PI * 70}
              strokeDashoffset={(1 - progress) * 2 * Math.PI * 70}
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
              style={{
                transition: "stroke-dashoffset 0.5s ease-out, stroke 0.5s",
              }}
            />
            <text
              x="100"
              y="105"
              fontSize="24"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {formatTime(secondsLeft)}
            </text>
          </svg>

          <div className="text-base my-5 font-medium">
            {mode === "focus" ? "Focus" : "Break"}
          </div>

          <div className="mb-6 w-full">
            <Button
              onClick={reset}
              variant="secondary"
              className="w-full py-2 text-sm cursor-pointer"
            >
              Reset
            </Button>
          </div>

          <div className="mt-4 text-sm text-gray-400">
            Sessions completed: {sessions}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

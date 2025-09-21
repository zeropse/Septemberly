import { useEffect, useRef } from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/components/ui/8bit/card";
import { Button } from "@/components/ui/8bit/button";
import {
  usePomodoroStore,
  usePomodoroProgress,
  usePomodoroFormattedTime,
} from "@/stores/pomodoroStore";

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
  const mode = usePomodoroStore((s) => s.mode);
  const running = usePomodoroStore((s) => s.running);
  const sessions = usePomodoroStore((s) => s.sessions);
  const toggleTimer = usePomodoroStore((s) => s.toggleTimer);
  const resetTimer = usePomodoroStore((s) => s.resetTimer);
  const initializeFromStorage = usePomodoroStore(
    (s) => s.initializeFromStorage
  );
  const tick = usePomodoroStore((s) => s.tick);
  const progress = usePomodoroProgress();
  const formatted = usePomodoroFormattedTime();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      initializeFromStorage();
      hasInitialized.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useInterval(
    () => {
      tick();
    },
    running ? 1000 : null
  );

  const progressColor = mode === "focus" ? "#0ea5e9" : "#22c55e";

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Pomodoro</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <svg
            onClick={toggleTimer}
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
              fill="currentColor"
              className="text-black dark:text-white"
            >
              {formatted}
            </text>
          </svg>

          <div className="text-base my-5 font-medium">
            {mode === "focus" ? "Focus" : "Break"}
          </div>

          <div className="mb-6 w-full">
            <Button
              onClick={resetTimer}
              variant="destructive"
              className="w-full py-2 text-sm cursor-pointer"
            >
              Reset
            </Button>
          </div>

          <div className="my-4 text-sm text-gray-700 dark:text-gray-400">
            Sessions completed: {sessions}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

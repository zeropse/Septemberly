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

export default function Pomodoro() {
  const mode = usePomodoroStore((s) => s.mode);
  const sessions = usePomodoroStore((s) => s.sessions);
  const running = usePomodoroStore((s) => s.running);
  const toggleTimer = usePomodoroStore((s) => s.toggleTimer);
  const resetTimer = usePomodoroStore((s) => s.resetTimer);
  const initializeFromStorage = usePomodoroStore(
    (s) => s.initializeFromStorage
  );
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

  const progressColor = mode === "focus" ? "#0ea5e9" : "#22c55e";

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Pomodoro</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <svg width="180" height="180" viewBox="0 0 200 200" className="mb-6">
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
              className="text-foreground"
            >
              {formatted}
            </text>
          </svg>

          <div className="text-base my-2 font-medium text-center">
            <p className="mb-2">
              Currently: {mode === "focus" ? "Focus" : "Break"}
            </p>
            <p>
              {mode === "focus"
                ? "Kindly focus — minimize distractions and work for your session."
                : "Kindly take a break — relax and recharge for a few minutes."}
            </p>
          </div>

          <div className="w-3/4 gap-5 flex flex-col my-5">
            <Button
              onClick={toggleTimer}
              variant={running ? "secondary" : "primary"}
              className="w-full py-2 text-sm cursor-pointer"
            >
              {running ? "Pause" : "Start"}
            </Button>

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

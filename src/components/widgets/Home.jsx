import { Calendar } from "@/components/ui/8bit/calendar";
import { useProfileName } from "@/stores/appStore";
import { useState } from "react";
import { useTodoStats } from "@/stores/todoStore";
import { usePomodoroStore } from "@/stores/pomodoroStore";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/8bit/card";

const Home = () => {
  const [date, setDate] = useState(new Date());
  const name = useProfileName();
  const stats = useTodoStats();
  const pomodoroSessions = usePomodoroStore((s) => s.sessions);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background video - fills the screen */}
      <video
        src="/bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />

      {/* Overlay to improve contrast */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Centered content */}
      <main className="relative z-10 flex min-h-screen w-full items-center justify-center p-6">
        <div className="mx-auto w-full max-w-4xl rounded-lg bg-white/5 p-8 shadow-lg ring-1 ring-white/5 sm:p-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col items-start justify-center">
              <h1 className="text-3xl font-bold text-white">Hello, {name}</h1>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Task Overview</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {stats.total === 0 ? (
                  <p className="text-md">No new tasks</p>
                ) : (
                  <p className="text-md">
                    Tasks pending - {stats.remaining}/{stats.total}
                  </p>
                )}
                <p className="text-md">
                  Total Pomodoro Sessions - {pomodoroSessions}
                </p>
              </CardContent>
            </Card>

            <div className="flex items-center justify-center">
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

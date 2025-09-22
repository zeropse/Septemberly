import { Calendar } from '@/components/ui/8bit/calendar'
import { useProfileName } from '@/stores/appStore'
import { useState } from 'react'
import { useTodoStats } from '@/stores/todoStore'
import { usePomodoroStore } from '@/stores/pomodoroStore'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/8bit/card'
import RetroMusicPlayer from '@/components/MusicPlayer'
import Quote from '@/components/widgets/Quote'
import tracks from '@/data/songs'

const Home = () => {
  const [date, setDate] = useState(new Date())
  const name = useProfileName()
  const stats = useTodoStats()
  const pomodoroSessions = usePomodoroStore((s) => s.sessions)

  return (
    <div className="relative min-h-screen w-full">
      {/* Background video */}
      <video
        src="./bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Main content */}
      <main className="relative z-10 flex flex-col min-h-screen w-full p-6">
        <div className="mx-auto w-full max-w-6xl rounded-lg bg-white/5 p-8 shadow-lg ring-1 ring-white/10 sm:p-12">
          {/* Greeting */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-center sm:text-left">Hello, {name}!</h1>
          </div>

          {/* Task Overview */}
          <Card className="bg-white/10 p-4 my-2">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-center sm:text-left">
                Task Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 text-center sm:text-left">
              {stats.total === 0 ? (
                <p>No new tasks</p>
              ) : (
                <p>
                  Tasks pending: {stats.remaining}/{stats.total}
                </p>
              )}
              <p>Total Pomodoro Sessions: {pomodoroSessions}</p>
            </CardContent>
          </Card>

          {/* Calendar + Quote grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            <div>
              <Card className="bg-white/10 p-4 flex justify-center items-center">
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </Card>
            </div>

            <div>
              <Quote className="bg-white/10 p-4" />
            </div>
          </div>

          {/* Music Player */}
          <div className="w-full">
            <Card className="bg-white/10 p-4 w-full">
              <CardContent>
                <RetroMusicPlayer tracks={tracks} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home

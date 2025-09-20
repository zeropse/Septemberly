import Notes from "./components/Notes";
import TodoList from "./components/TodoList";
import Pomodoro from "./components/Pomodoro";
import WeatherWidget from "./components/WeatherWidget";
import Quote from "./components/Quote";
import { ThemeProvider } from "./style/theme-provider";
import { ModeToggle } from "./style/mode-toggle";
import { Toaster } from "@/components/ui/sonner";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="septemberly-ui-theme">
      <Toaster position="top-right" />
      <div className="max-w-[920px] mx-auto px-4 py-8 min-h-screen">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-wide flex items-center gap-2">
            🌿 Septemberly
          </h1>
          <ModeToggle />
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Main Notes Section */}
          <section>
            <ErrorBoundary>
              <Notes />
            </ErrorBoundary>
          </section>

          {/* Sidebar Widgets */}
          <aside className="flex flex-col space-y-4">
            <ErrorBoundary>
              <TodoList />
            </ErrorBoundary>

            <ErrorBoundary>
              <Pomodoro />
            </ErrorBoundary>

            <ErrorBoundary>
              <WeatherWidget />
            </ErrorBoundary>

            <ErrorBoundary>
              <Quote />
            </ErrorBoundary>
          </aside>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;

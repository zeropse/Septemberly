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
      <ErrorBoundary>
        <div className="max-w-[920px] mx-auto px-4 py-8">
          <header className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Septemberly</h1>
            <ModeToggle />
          </header>

          <main
            className="grid gap-4"
            style={{ gridTemplateColumns: "1fr 320px" }}
          >
            <section>
              <Notes />
            </section>

            <aside>
              <TodoList />
              <div />
              <Pomodoro />
              <div />
              <WeatherWidget defaultCity="San Francisco" />
              <div />
              <Quote />
            </aside>
          </main>
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;

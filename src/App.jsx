import { useState } from "react";
import Notes from "./components/widgets/Notes";
import TodoList from "./components/widgets/TodoList";
import Pomodoro from "./components/widgets/Pomodoro";
import WeatherWidget from "./components/widgets/WeatherWidget";
import Quote from "./components/widgets/Quote";
import Header from "./components/Header";
import Onboarding from "./components/Onboarding/Onboarding";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./style/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/8bit/button";
import { Card, CardContent } from "@/components/ui/8bit/card";
import { Separator } from "@/components/ui/8bit/separator";

const widgets = [
  { id: "notes", label: "Notes", component: Notes, emoji: "📝" },
  { id: "todo", label: "Todo", component: TodoList, emoji: "✅" },
  { id: "pomodoro", label: "Pomodoro", component: Pomodoro, emoji: "⏱️" },
  { id: "weather", label: "Weather", component: WeatherWidget, emoji: "☀️" },
  { id: "quote", label: "Quote", component: Quote, emoji: "💬" },
];

const App = () => {
  const [active, setActive] = useState(widgets[0].id);
  const [onboarded, setOnboarded] = useState(() => {
    try {
      return Boolean(localStorage.getItem("Profile"));
    } catch {
      return false;
    }
  });

  const ActiveComponent =
    widgets.find((w) => w.id === active)?.component || Notes;

  return (
    <ThemeProvider defaultTheme="dark" storageKey="septemberly-ui-theme">
      <Toaster position="top-right" />

      <div className="max-w-[920px] mx-auto px-4 py-8 min-h-screen">
        <Header />

        {!onboarded && (
          <Onboarding
            onFinish={() => {
              setOnboarded(true);
            }}
          />
        )}
        <Separator className="my-4" />

        {/* Desktop/Laptop Layout */}
        <div className="hidden lg:block">
          <main className="grid grid-cols-[1fr_120px] gap-6">
            {/* Active Widget */}
            <Card className="min-h-[60vh]">
              <CardContent>
                <ErrorBoundary>
                  <ActiveComponent />
                </ErrorBoundary>
              </CardContent>
            </Card>

            {/* Sidebar */}
            <aside className="flex flex-col items-center space-y-3">
              <div className="w-full flex flex-col items-center space-y-2">
                {widgets.map((w) => {
                  const isActive = w.id === active;
                  return (
                    <Button
                      key={w.id}
                      variant={isActive ? "default" : "ghost"}
                      className="w-full justify-start gap-2 hover:none"
                      onClick={() => setActive(w.id)}
                      title={w.label}
                    >
                      <span className="text-lg">{w.emoji}</span>
                      <span className="flex-1 text-sm">{w.label}</span>
                    </Button>
                  );
                })}
              </div>
            </aside>
          </main>
        </div>

        {/* Mobile Message */}
        <div className="block lg:hidden text-center py-20">
          <p className="text-lg font-semibold text-muted-foreground">
            This app is available only on Laptop/PC.
          </p>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;

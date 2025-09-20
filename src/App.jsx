import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Notes from "./components/widgets/Notes";
import Header from "./components/Header";
import Onboarding from "./components/Onboarding/Onboarding";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./style/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Card, CardContent } from "@/components/ui/8bit/card";
import { Separator } from "@/components/ui/8bit/separator";
import { cn } from "@/lib/utils";
import widgets from "@/data/widgets";

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

      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
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
            <div className="flex gap-10">
              {/* Main Widget Area */}
              <motion.div
                className="flex-1"
                layout
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Card className="h-full p-6 shadow-xl border-0 ">
                  <CardContent>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="h-full"
                      >
                        <ErrorBoundary>
                          <ActiveComponent />
                        </ErrorBoundary>
                      </motion.div>
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Sidebar */}
              <div className="w-80">
                <div className="h-full flex flex-col gap-3">
                  {widgets.map((widget, index) => (
                    <motion.div
                      key={widget.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card
                        className={cn(
                          "cursor-pointer transition-all duration-200 hover:scale-105 ",
                          widget.color,
                          "",
                          active === widget.id &&
                            "ring-2 ring-primary/50 shadow-lg scale-105"
                        )}
                        onClick={() => setActive(widget.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl">{widget.emoji}</span>
                            <div>
                              <h3
                                className={cn(
                                  "font-semibold text-sm",
                                  active === widget.id && "text-primary"
                                )}
                              >
                                {widget.label}
                              </h3>
                            </div>
                          </div>

                          <div className="h-24 bg-muted/30 rounded border overflow-hidden">
                            <div className="p-2 scale-50 origin-top-left transform pointer-events-none">
                              <ErrorBoundary>
                                <widget.component />
                              </ErrorBoundary>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Message */}
          <div className="block lg:hidden text-center py-20">
            <p className="text-lg font-semibold text-muted-foreground">
              This app is available only on Laptop/PC.
            </p>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;

import { useState, Suspense } from "react";
import { Card, CardContent } from "@/components/ui/8bit/card";
import Onboarding from "@/components/Onboarding/Onboarding";
import ErrorBoundary from "@/components/sections/ErrorBoundary";
import Dock from "@/components/Dock";
import widgets from "@/data/widgets";
import { useAppStore } from "@/stores/appStore";

const Content = () => {
  const { activeWidget, onboarded } = useAppStore();
  const [showOnboarding, setShowOnboarding] = useState(() => !onboarded);
  const shouldShowOnboarding = !onboarded && showOnboarding;

  return (
    <>
      {shouldShowOnboarding && (
        <Onboarding
          onFinish={() => {
            setShowOnboarding(false);
          }}
        />
      )}

      {/* Desktop/Laptop Layout */}
      <div className="hidden lg:block">
        <div
          className={`flex gap-10 ${
            shouldShowOnboarding
              ? "pointer-events-none select-none filter blur-sm opacity-90"
              : ""
          }`}
        >
          {/* Main Widget Area */}
          <div className="flex-1">
            <Card className="h-full">
              <CardContent>
                {(() => {
                  const active = widgets.find((w) => w.id === activeWidget);
                  if (!active) return null;
                  const ActiveComponent = active.component;
                  return (
                    <div className="h-full" key={active.id}>
                      <ErrorBoundary>
                        <Suspense
                          fallback={<div className="p-4">Loading…</div>}
                        >
                          <ActiveComponent />
                        </Suspense>
                      </ErrorBoundary>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Message */}
      <div className="block lg:hidden text-center py-20">
        <p className="text-lg font-semibold text-muted-foreground">
          This app is available only on Laptop/PC.
        </p>
      </div>

      <div
        className={
          shouldShowOnboarding
            ? "pointer-events-none select-none filter blur-sm opacity-90"
            : ""
        }
      >
        <Dock />
      </div>
    </>
  );
};

export default Content;

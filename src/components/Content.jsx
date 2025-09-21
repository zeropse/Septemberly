import { useState } from "react";
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
        <div className="flex gap-10">
          {/* Main Widget Area */}
          <div className="flex-1">
            <Card className="h-full">
              <CardContent>
                {widgets.map((widget) => {
                  const WidgetComponent = widget.component;
                  return (
                    <div
                      key={widget.id}
                      className={`h-full ${
                        activeWidget === widget.id ? "block" : "hidden"
                      }`}
                    >
                      <ErrorBoundary>
                        <WidgetComponent />
                      </ErrorBoundary>
                    </div>
                  );
                })}
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

      <Dock />
    </>
  );
};

export default Content;

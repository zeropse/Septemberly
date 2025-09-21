import { useState } from "react";
import Onboarding from "@/components/Onboarding/Onboarding";
import ErrorBoundary from "@/components/sections/ErrorBoundary";
import Dock from "@/components/Dock";
import { Card, CardContent } from "@/components/ui/8bit/card";
import widgets from "@/data/widgets";
import useLocalStorage from "@/hooks/useLocalStorage";

const Content = ({ active, setActive }) => {
  active = active || widgets[0].id;
  const [profile] = useLocalStorage("Profile", null);
  const [onboarded, setOnboarded] = useState(() => Boolean(profile));

  return (
    <>
      {!onboarded && (
        <Onboarding
          onFinish={() => {
            setOnboarded(true);
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
                        active === widget.id ? "block" : "hidden"
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

      <Dock active={active} setActive={setActive} />
    </>
  );
};

export default Content;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Notes from "./widgets/Notes";
import Onboarding from "./Onboarding/Onboarding";
import ErrorBoundary from "@/components/sections/ErrorBoundary";
import Dock from "@/components/Dock";
import { Card, CardContent } from "@/components/ui/8bit/card";
import widgets from "@/data/widgets";
import useLocalStorage from "@/hooks/useLocalStorage";

const Content = ({ active, setActive }) => {
  active = active || widgets[0].id;
  const [profile] = useLocalStorage("Profile", null);
  const [onboarded, setOnboarded] = useState(() => Boolean(profile));

  const ActiveComponent =
    widgets.find((w) => w.id === active)?.component || Notes;

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
          <motion.div
            className="flex-1"
            layout
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Card className="h-full">
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

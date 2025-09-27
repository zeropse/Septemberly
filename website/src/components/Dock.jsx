import React from "react";
import widgets from "@/data/widgets.jsx";
import { FloatingDock } from "@/components/ui/floating-dock";
import { useAppStore } from "@/stores/appStore";

const Dock = () => {
  const { activeWidget, setActiveWidget } = useAppStore();

  const items = widgets.map((w) => ({
    title: w.label,
    icon: <span className="text-2xl">{w.emoji}</span>,
    href: "#",
    onClick: () => setActiveWidget(w.id),
    color: w.color,
    isActive: activeWidget === w.id,
  }));

  return (
    <FloatingDock
      items={items}
      desktopClassName="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-background backdrop-blur-sm border border-border/50 shadow-lg"
      mobileClassName="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-background backdrop-blur-sm border border-border/50 shadow-lg [&_div_div]:h-6 [&_div_div]:w-6 [&_div_div]:text-lg [&_.flex-col]:gap-6 [&_a]:h-12 [&_a]:w-12 [&_.bottom-full]:mb-4"
    />
  );
};

export default Dock;

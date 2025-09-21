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
      mobileClassName="hidden"
    />
  );
};

export default Dock;

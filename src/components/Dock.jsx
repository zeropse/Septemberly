import React from "react";
import widgets from "@/data/widgets";
import { FloatingDock } from "@/components/ui/floating-dock";

const Dock = ({ setActive }) => {
  const items = widgets.map((w) => ({
    title: w.label,
    icon: <span className="text-xl">{w.emoji}</span>,
    href: "#",
    onClick: () => setActive(w.id),
  }));

  return (
    <FloatingDock
      items={items}
      desktopClassName="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
      mobileClassName="hidden"
    />
  );
};

export default Dock;

import { useState } from "react";
import Header from "@/components/sections/Header";
import Content from "@/components/Content";
import widgets from "@/data/widgets";

const Layout = () => {
  const [active, setActive] = useState(widgets[0].id);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-9xl mx-auto">
        <Header />
        <Content active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default Layout;

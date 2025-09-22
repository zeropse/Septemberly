import Header from "@/components/sections/Header";
import Content from "@/components/Content";
import { Separator } from "@/components/ui/8bit/separator";

const Layout = () => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-9xl mx-auto">
        <Header />
        <Separator className="my-4" />
        <Content />
      </div>
    </div>
  );
};

export default Layout;

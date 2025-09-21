import Header from "@/components/sections/Header";
import Content from "@/components/Content";

const Layout = () => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-9xl mx-auto">
        <Header />
        <Content />
      </div>
    </div>
  );
};

export default Layout;

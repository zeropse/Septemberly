import Layout from "@/Layout";
import { ThemeProvider } from "@/style/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="septemberly-ui-theme">
      <Toaster position="top-right" />
      <Layout />
    </ThemeProvider>
  );
};

export default App;

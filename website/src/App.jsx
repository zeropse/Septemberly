import Layout from "@/Layout";
import { ThemeProvider } from "@/style/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import AudioManager from "@/data/AudioManager";
import PomodoroManager from "@/data/PomodoroManager";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="septemberly-ui-theme">
      <Toaster position="bottom-right" />
      <AudioManager />
      <PomodoroManager />
      <Layout />
    </ThemeProvider>
  );
};

export default App;

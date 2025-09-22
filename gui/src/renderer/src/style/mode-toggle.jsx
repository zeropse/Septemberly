import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/8bit/button";
import { useTheme } from "./theme-context";

export function ModeToggle() {
  const { mode, setMode } = useTheme();
  const nextMode = () => (mode === "light" ? "dark" : "light");
  const handleClick = () => setMode(nextMode());

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      size="icon"
      className="relative overflow-hidden cursor-pointer"
    >
      {mode === "light" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

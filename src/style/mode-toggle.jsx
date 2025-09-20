import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/8bit/button";
import { useTheme } from "./theme-context";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const nextTheme = () => (theme === "light" ? "dark" : "light");

  const handleClick = () => setTheme(nextTheme());

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      size="icon"
      className="relative overflow-hidden cursor-pointer"
    >
      {theme === "light" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

import { Button } from "@/components/ui/8bit/button";
import { useTheme } from "./theme-context";

export function ThemeSwitcher() {
  const { themeVariant, setThemeVariant } = useTheme();

  const themes = [
    {
      id: "cassette",
      name: "Cassette",
    },
    {
      id: "pacman",
      name: "Pacman",
    },
    {
      id: "arcade",
      name: "Arcade",
    },
    {
      id: "rustybyte",
      name: "Rusty Byte",
    },
  ];

  return (
    <div className="w-full">
      <h3 className="text-center font-medium mb-4">Themes</h3>
      <div className="grid grid-cols-2 gap-5">
        {themes.map((theme) => {
          const isActive = themeVariant === theme.id;

          return (
            <Button
              key={theme.id}
              onClick={() => setThemeVariant(theme.id)}
              variant={isActive ? "default" : "outline"}
              size="sm"
              className="cursor-pointer"
            >
              {theme.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

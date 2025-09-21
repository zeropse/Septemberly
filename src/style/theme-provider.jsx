import { useEffect } from "react";
import { ThemeProviderContext } from "./theme-context";
import useThemeStore from "@/stores/themeStore";

export function ThemeProvider({ children, defaultTheme = "system" }) {
  const theme = useThemeStore((s) => s.theme) ?? defaultTheme;
  const setTheme = useThemeStore((s) => s.setTheme);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const appliedTheme =
      theme === "system" ? (prefersDark ? "dark" : "light") : theme;

    root.classList.add(appliedTheme);
  }, [theme]);

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

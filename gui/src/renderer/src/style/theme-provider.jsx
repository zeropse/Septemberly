import { useEffect } from "react";
import { ThemeProviderContext } from "./theme-context";
import useThemeStore from "@/stores/themeStore";

export function ThemeProvider({ children, defaultTheme = "system" }) {
  const themeVariant = useThemeStore((s) => s.themeVariant) ?? "cassette";
  const mode = useThemeStore((s) => s.mode) ?? defaultTheme;
  const setThemeVariant = useThemeStore((s) => s.setThemeVariant);
  const setMode = useThemeStore((s) => s.setMode);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    root.classList.remove(
      "light",
      "dark",
      "pacman",
      "pacman-dark",
      "arcade",
      "arcade-dark",
      "rustybyte",
      "rustybyte-dark"
    );

    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const appliedMode =
      mode === "system" ? (prefersDark ? "dark" : "light") : mode;

    if (themeVariant === "pacman") {
      root.classList.add(appliedMode === "dark" ? "pacman-dark" : "pacman");
    } else if (themeVariant === "arcade") {
      root.classList.add(appliedMode === "dark" ? "arcade-dark" : "arcade");
    } else if (themeVariant === "rustybyte") {
      root.classList.add(
        appliedMode === "dark" ? "rustybyte-dark" : "rustybyte"
      );
    } else {
      root.classList.add(appliedMode);
    }
  }, [themeVariant, mode]);

  return (
    <ThemeProviderContext.Provider
      value={{
        themeVariant,
        setThemeVariant,
        mode,
        setMode,
      }}
    >
      {children}
    </ThemeProviderContext.Provider>
  );
}

import { createContext, useContext } from "react";

export const ThemeProviderContext = createContext({
  theme: "system",
  setTheme: () => {},
  themeVariant: "cassette",
  setThemeVariant: () => {},
  mode: "system",
  setMode: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};

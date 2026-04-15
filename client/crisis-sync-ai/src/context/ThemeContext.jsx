import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  const toggle = () => setDark((d) => !d);

  const theme = {
    dark,
    page: dark ? "#111" : "#f5f5f5",
    card: dark ? "#1e1e1e" : "#ffffff",
    text: dark ? "#f0f0f0" : "#111111",
    muted: dark ? "#999" : "#666",
    border: dark ? "#333" : "#e0e0e0",
    inputBg: dark ? "#2a2a2a" : "#ffffff",
    inputBorder: dark ? "#444" : "#cccccc",
    btnBg: dark ? "#f0f0f0" : "#111111",
    btnText: dark ? "#111" : "#ffffff",
    googleBg: dark ? "#252525" : "#f9f9f9",
    googleBorder: dark ? "#444" : "#dddddd",
    googleText: dark ? "#ddd" : "#333",
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

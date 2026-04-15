import { useTheme } from "../../context/ThemeContext";

export default function DarkToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      style={{
        position: "absolute",
        top: 16,
        right: 16,
        padding: "6px 14px",
        borderRadius: 20,
        fontSize: 12,
        cursor: "pointer",
        background: theme.card,
        border: `0.5px solid ${theme.inputBorder}`,
        color: theme.muted,
      }}
    >
      {theme.dark ? "☀ Day" : "☽ Night"}
    </button>
  );
}

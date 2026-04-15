import { useTheme } from "../../context/ThemeContext";

export default function GoogleButton({ onClick }) {
  const { theme } = useTheme();

  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: 10,
        borderRadius: 8,
        cursor: "pointer",
        background: theme.googleBg,
        border: `0.5px solid ${theme.googleBorder}`,
        color: theme.googleText,
        fontSize: 14,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <svg width="18" height="18" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.7 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-9 20-20 0-1.3-.1-2.7-.4-4z" />
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
        <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.5 35.5 26.9 36 24 36c-5.2 0-9.7-2.9-11.3-7.1l-6.6 4.9C9.7 39.7 16.3 44 24 44z" />
        <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.4-2.5 4.4-4.6 5.8l6.2 5.2C41.2 35.5 44 30 44 24c0-1.3-.1-2.7-.4-4z" />
      </svg>
      Sign in with Google
    </button>
  );
}

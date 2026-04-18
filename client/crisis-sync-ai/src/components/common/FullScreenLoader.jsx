import { useTheme } from "../../context/ThemeContext";
export default function FullScreenLoader() {
  const { theme } = useTheme();

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: theme.page,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: "50%",
          border: `4px solid ${theme.border}`,
          borderTop: `4px solid ${theme.text}`,
          animation: "spin 0.9s linear infinite",
        }}
      />

      {/* inline keyframes */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
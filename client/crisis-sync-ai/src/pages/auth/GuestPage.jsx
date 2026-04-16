import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import DarkToggle from "../../components/auth/DarkToggle";

export default function GuestPage({ onNavigateLogin }) {
  const { theme } = useTheme();
  const { login } = useAuth();

  const [roomNumber, setRoomNumber] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (!roomNumber.trim()) {
      setError(true);
      setTimeout(() => setError(false), 1500);
      return;
    }
    login(`guest-room-${roomNumber}`, "guest");
    alert(`Entering as Guest — Room ${roomNumber}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.page,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        fontFamily: "sans-serif",
        position: "relative",
        transition: "background .3s",
      }}
    >
      <DarkToggle />

      <p style={{ fontSize: 20, fontWeight: 500, color: theme.text, marginBottom: "2rem" }}>
        CRISIS SYNC AI
      </p>

      <div
        style={{
          width: "100%",
          maxWidth: 360,
          background: theme.card,
          border: `0.5px solid ${theme.border}`,
          borderRadius: 16,
          padding: "2rem 1.75rem",
          transition: "background .3s",
        }}
      >
        {/* Icon */}
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 32 }}>🚪</span>
        </div>

        <h1 style={{ fontSize: 22, fontWeight: 500, textAlign: "center", color: theme.text }}>
          Guest Access
        </h1>
        <p style={{ fontSize: 14, textAlign: "center", color: theme.muted, margin: "6px 0 24px" }}>
          Enter your room number to continue
        </p>

        <input
          type="text"
          placeholder="Room number"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          style={{
            width: "100%",
            padding: "10px 12px",
            fontSize: 14,
            borderRadius: 8,
            marginBottom: 10,
            background: theme.inputBg,
            color: theme.text,
            outline: "none",
            border: `0.5px solid ${error ? "#e24b4a" : theme.inputBorder}`,
            transition: "border-color .15s",
            boxSizing: "border-box",
            textAlign: "center",
            letterSpacing: "0.05em",
          }}
        />
        {error && (
          <p style={{ fontSize: 12, color: "#e24b4a", textAlign: "center", marginBottom: 8, marginTop: -4 }}>
            Please enter a room number
          </p>
        )}

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: 11,
            fontSize: 14,
            fontWeight: 500,
            background: theme.btnBg,
            color: theme.btnText,
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            marginTop: 4,
          }}
        >
          Continue as Guest
        </button>

        {/* Back to login */}
        <button
          onClick={onNavigateLogin}
          style={{
            width: "100%",
            padding: 10,
            fontSize: 13,
            fontWeight: 400,
            background: "transparent",
            color: theme.muted,
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            marginTop: 6,
            textDecoration: "underline",
          }}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

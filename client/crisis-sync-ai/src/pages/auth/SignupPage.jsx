import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import DarkToggle from "../../components/auth/DarkToggle";
import GoogleButton from "../../components/auth/GoogleButton";
import api from "../../api/api";

export default function SignupPage({ onNavigateLogin }) {
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [org, setOrg] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password || !org || password !== confirm) {
      setError(true);
      setTimeout(() => setError(false), 1500);
      return;
    }

    try {
      await api.post("api/auth/register", {
        email,
        password,
        org,
        adminKey // optional → only for admin
      });

      onNavigateLogin();
    } catch (err) {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: theme.page,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem 1rem",
      fontFamily: "sans-serif",
    }}>
      
      <DarkToggle />

      <p style={{ fontSize: 20, fontWeight: 500, color: theme.text, marginBottom: "2rem" }}>
        CRISIS SYNC AI
      </p>

      <div style={{
        width: "100%",
        maxWidth: 360,
        background: theme.card,
        border: `0.5px solid ${theme.border}`,
        borderRadius: 16,
        padding: "2rem 1.75rem"
      }}>

        <h1 style={{ fontSize: 22, textAlign: "center", color: theme.text }}>
          Create Account
        </h1>

        <p style={{ fontSize: 14, textAlign: "center", color: theme.muted, marginBottom: 20 }}>
          Sign up to get started
        </p>

        {/* Organization */}
        <input
          type="text"
          placeholder="Organization (Hotel Name)"
          value={org}
          onChange={(e) => setOrg(e.target.value)}
          style={inputStyle(theme, error)}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="email@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle(theme, error)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle(theme, error)}
        />

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          style={inputStyle(theme, error)}
        />

        {/* Admin Key (optional) */}
        <input
          type="text"
          placeholder="Admin Key (only for admin)"
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)}
          style={inputStyle(theme, error)}
        />

        <button onClick={handleSubmit} style={buttonStyle(theme)}>
          Create Account
        </button>

        <div style={dividerStyle(theme)}>
          <div style={{ flex: 1, height: 0.5, background: theme.border }} />
          <span>or continue with</span>
          <div style={{ flex: 1, height: 0.5, background: theme.border }} />
        </div>

        <GoogleButton onClick={() => alert("Google sign-up coming soon!")} />

        <div style={dividerStyle(theme)}>
          <div style={{ flex: 1, height: 0.5, background: theme.border }} />
          <span>Already have an account?</span>
          <div style={{ flex: 1, height: 0.5, background: theme.border }} />
        </div>

        <button onClick={onNavigateLogin} style={outlineBtn(theme)}>
          Sign in
        </button>
      </div>
    </div>
  );
}

/* --- Styles --- */

const inputStyle = (theme, error) => ({
  width: "100%",
  padding: "10px 12px",
  fontSize: 14,
  borderRadius: 8,
  marginBottom: 10,
  background: theme.inputBg,
  color: theme.text,
  outline: "none",
  border: `0.5px solid ${error ? "#e24b4a" : theme.inputBorder}`,
});

const buttonStyle = (theme) => ({
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
});

const outlineBtn = (theme) => ({
  width: "100%",
  padding: 11,
  background: "transparent",
  color: theme.text,
  border: `0.5px solid ${theme.text}`,
  borderRadius: 8,
  cursor: "pointer",
});

const dividerStyle = (theme) => ({
  display: "flex",
  alignItems: "center",
  gap: 10,
  margin: "1rem 0",
  fontSize: 13,
  color: theme.muted,
});
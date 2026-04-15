import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import DarkToggle from "../../components/auth/DarkToggle";
import GoogleButton from "../../components/auth/GoogleButton";

export default function SignupPage({ onNavigateLogin }) {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (!email || !password || password !== confirm) {
      setError(true);
      setTimeout(() => setError(false), 1500);
      return;
    }
    alert(`Account created for ${email}`);
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
        App Name
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
        <h1 style={{ fontSize: 22, fontWeight: 500, textAlign: "center", color: theme.text }}>
          Create Account
        </h1>
        <p style={{ fontSize: 14, textAlign: "center", color: theme.muted, margin: "6px 0 20px" }}>
          Sign up to get started
        </p>

        {[
          { field: "email", placeholder: "email@domain.com", value: email, set: setEmail },
          { field: "password", placeholder: "Password", value: password, set: setPassword },
          { field: "confirm", placeholder: "Confirm Password", value: confirm, set: setConfirm },
        ].map(({ field, placeholder, value, set }) => (
          <input
            key={field}
            type={field === "email" ? "email" : "password"}
            placeholder={placeholder}
            value={value}
            onChange={(e) => set(e.target.value)}
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
            }}
          />
        ))}

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
          Create Account
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            margin: "1.1rem 0",
            fontSize: 13,
            color: theme.muted,
          }}
        >
          <div style={{ flex: 1, height: 0.5, background: theme.border }} />
          <span>or continue with</span>
          <div style={{ flex: 1, height: 0.5, background: theme.border }} />
        </div>

        <GoogleButton onClick={() => alert("Google sign-up coming soon!")} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            margin: "1.1rem 0",
            fontSize: 13,
            color: theme.muted,
          }}
        >
          <div style={{ flex: 1, height: 0.5, background: theme.border }} />
          <span>Already have an account?</span>
          <div style={{ flex: 1, height: 0.5, background: theme.border }} />
        </div>

        <button
          onClick={onNavigateLogin}
          style={{
            width: "100%",
            padding: 11,
            fontSize: 14,
            fontWeight: 500,
            background: "transparent",
            color: theme.text,
            border: `0.5px solid ${theme.text}`,
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Sign in
        </button>

        <p
          style={{
            fontSize: 12,
            textAlign: "center",
            color: theme.muted,
            marginTop: "1.25rem",
            lineHeight: 1.6,
          }}
        >
          By clicking continue, you agree to our{" "}
          <span style={{ textDecoration: "underline", cursor: "pointer", color: theme.text }}>
            Terms of Service
          </span>{" "}
          and{" "}
          <span style={{ textDecoration: "underline", cursor: "pointer", color: theme.text }}>
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  );
}

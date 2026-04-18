import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import DarkToggle from "../../components/auth/DarkToggle";
import GoogleButton from "../../components/auth/GoogleButton";
import api from "../../api/api";

export default function LoginPage({ onNavigateSignup, onNavigateGuest }) {
  const { theme } = useTheme();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading]=useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      setError(true);
      setTimeout(() => setError(false), 1500);
      return;
    }
    try {
      setLoading(true);
      const { data } = await api.post("api/auth/login", { email, password });
      login(data.user.email, data.user.role);
    } catch (err) {
      
       if (err.response?.status === 401 || err.response?.status === 404) {
        setError("Invalid email or password");
      } else {
        setError("Something went wrong. Try again.");
      }
      console.log(err)
      setTimeout(() => setError(false), 1500);
    }
    finally{
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    onNavigateGuest();
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
        <h1 style={{ fontSize: 22, fontWeight: 500, textAlign: "center", color: theme.text }}>
          Login
        </h1>
        <p style={{ fontSize: 14, textAlign: "center", color: theme.muted, margin: "6px 0 20px" }}>
          Enter your credentials to continue
        </p>

        {["email", "password"].map((field) => (
          <input
            key={field}
            type={field}
            placeholder={field === "email" ? "email@domain.com" : "Password"}
            value={field === "email" ? email : password}
            onChange={(e) =>
              field === "email" ? setEmail(e.target.value) : setPassword(e.target.value)
            }
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
          Sign in
        </button>

        {/* Continue as Guest */}
        <button
          onClick={handleGuestLogin}
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
          Continue as Guest
        </button>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            margin: "1rem 0",
            fontSize: 13,
            color: theme.muted,
          }}
        >
          <div style={{ flex: 1, height: 0.5, background: theme.border }} />
          <span>or continue with</span>
          <div style={{ flex: 1, height: 0.5, background: theme.border }} />
        </div>

        <GoogleButton onClick={() => alert("Google sign-in coming soon!")} />

        {/* Sign Up prompt */}
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
          <span>Don't have an account?</span>
          <div style={{ flex: 1, height: 0.5, background: theme.border }} />
        </div>

        <button
          onClick={onNavigateSignup}
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
          Sign up
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

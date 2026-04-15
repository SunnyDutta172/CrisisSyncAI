import { useState } from "react";

const ROLES = {
  admin: { label: "Admin", desc: "Full system access", color: "#a32d2d", bg: "#fde8e8" },
  staff: { label: "Staff", desc: "Standard workspace access", color: "#185fa5", bg: "#e6f1fb" },
  guest: { label: "Guest", desc: "View-only, limited access", color: "#3b6d11", bg: "#eaf3de" },
};

export default function AuthPage() {
  const [dark, setDark] = useState(false);
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const theme = {
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

  const handleSubmit = () => {
    if (!email || !password) {
      setError(true);
      setTimeout(() => setError(false), 1500);
      return;
    }
    alert(`Signed in as ${ROLES[role].label} — ${email}`);
  };

  return (
    <div style={{ minHeight: "100vh", background: theme.page, display: "flex",
      flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "2rem 1rem", fontFamily: "sans-serif", position: "relative", transition: "background .3s" }}>

      {/* Day/Night Toggle */}
      <button onClick={() => setDark(!dark)} style={{
        position: "absolute", top: 16, right: 16,
        padding: "6px 14px", borderRadius: 20, fontSize: 12, cursor: "pointer",
        background: theme.card, border: `0.5px solid ${theme.inputBorder}`,
        color: theme.muted }}>
        {dark ? "☀ Day" : "☽ Night"}
      </button>

      {/* App Name */}
      <p style={{ fontSize: 20, fontWeight: 500, color: theme.text, marginBottom: "2rem" }}>
        App Name
      </p>

      {/* Card */}
      <div style={{ width: "100%", maxWidth: 360, background: theme.card,
        border: `0.5px solid ${theme.border}`, borderRadius: 16, padding: "2rem 1.75rem",
        transition: "background .3s" }}>

        <h1 style={{ fontSize: 22, fontWeight: 500, textAlign: "center", color: theme.text }}>Login</h1>
        <p style={{ fontSize: 14, textAlign: "center", color: theme.muted, margin: "6px 0 20px" }}>
          Enter your credentials to continue
        </p>

        {/* Role Selector */}
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          {Object.entries(ROLES).map(([key, val]) => (
            <button key={key} onClick={() => setRole(key)} style={{
              flex: 1, padding: "7px 0", fontSize: 13, borderRadius: 8, cursor: "pointer",
              border: `0.5px solid ${role === key ? theme.text : theme.inputBorder}`,
              background: role === key ? theme.btnBg : theme.inputBg,
              color: role === key ? theme.btnText : theme.muted,
              fontWeight: role === key ? 500 : 400, transition: "all .15s" }}>
              {val.label}
            </button>
          ))}
        </div>

        {/* Role Badge */}
        <div style={{ textAlign: "center", marginBottom: 16, fontSize: 12 }}>
          <span style={{ background: ROLES[role].bg, color: ROLES[role].color,
            padding: "2px 10px", borderRadius: 20, marginRight: 6, fontSize: 11 }}>
            {ROLES[role].label}
          </span>
          <span style={{ color: theme.muted }}>{ROLES[role].desc}</span>
        </div>

        {/* Inputs */}
        {["email", "password"].map((field) => (
          <input key={field} type={field} placeholder={field === "email" ? "email@domain.com" : "Password"}
            value={field === "email" ? email : password}
            onChange={(e) => field === "email" ? setEmail(e.target.value) : setPassword(e.target.value)}
            style={{ width: "100%", padding: "10px 12px", fontSize: 14, borderRadius: 8,
              marginBottom: 10, background: theme.inputBg, color: theme.text, outline: "none",
              border: `0.5px solid ${error ? "#e24b4a" : theme.inputBorder}`,
              transition: "border-color .15s" }} />
        ))}

        {/* Sign In Button */}
        <button onClick={handleSubmit} style={{
          width: "100%", padding: 11, fontSize: 14, fontWeight: 500,
          background: theme.btnBg, color: theme.btnText,
          border: "none", borderRadius: 8, cursor: "pointer", marginTop: 4 }}>
          Sign in as {ROLES[role].label}
        </button>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "1.1rem 0", fontSize: 13, color: theme.muted }}>
          <div style={{ flex: 1, height: 0.5, background: theme.border }} />
          <span>or continue with</span>
          <div style={{ flex: 1, height: 0.5, background: theme.border }} />
        </div>

        {/* Google Button */}
        <button style={{ width: "100%", padding: 10, borderRadius: 8, cursor: "pointer",
          background: theme.googleBg, border: `0.5px solid ${theme.googleBorder}`,
          color: theme.googleText, fontSize: 14, display: "flex",
          alignItems: "center", justifyContent: "center", gap: 10 }}>
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.7 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-9 20-20 0-1.3-.1-2.7-.4-4z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.5 35.5 26.9 36 24 36c-5.2 0-9.7-2.9-11.3-7.1l-6.6 4.9C9.7 39.7 16.3 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.4-2.5 4.4-4.6 5.8l6.2 5.2C41.2 35.5 44 30 44 24c0-1.3-.1-2.7-.4-4z"/>
          </svg>
          Sign in withGoogle
        </button>
          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "1.1rem 0", fontSize: 13, color: theme.muted }}>
            <div style={{ flex: 1, height: 0.5, background: theme.border }} />
            <span>Don't have an account?</span>
            <div style={{ flex: 1, height: 0.5, background: theme.border }} />
          </div>
          <button style={{
            width: "100%", padding: 11, fontSize: 14, fontWeight: 500,
            background: "transparent", color: theme.text,
            border: `0.5px solid ${theme.text}`, borderRadius: 8, cursor: "pointer" }}>
            Sign up
          </button>
        {/* Footer */}
        <p style={{ fontSize: 12, textAlign: "center", color: theme.muted, marginTop: "1.25rem", lineHeight: 1.6 }}>
          By clicking continue, you agree to our{" "}
          <span style={{ textDecoration: "underline", cursor: "pointer", color: theme.text }}>Terms of Service</span>
          {" "}and{" "}
          <span style={{ textDecoration: "underline", cursor: "pointer", color: theme.text }}>Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
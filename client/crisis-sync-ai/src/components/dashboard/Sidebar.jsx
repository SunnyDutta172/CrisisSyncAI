import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const NAV_ITEMS = [
  { role: "admin", label: "Admin Panel", icon: "🛡" },
  { role: "staff", label: "Staff Portal", icon: "👤" },
  { role: "guest", label: "Guest View", icon: "🔵" },
];

export default function Sidebar({ activeRole, onSwitch }) {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    try {
      setLoading(true);
      await logout(); // calls backend + clears state
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside
      style={{
        width: 210,
        minHeight: "100vh",
        background: "#0d0d0d",
        borderRight: "1px solid #1e1e1e",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        fontFamily: "'DM Mono', monospace",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "18px 20px 16px",
          borderBottom: "1px solid #1a1a1a",
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: "linear-gradient(135deg, #3b5bdb, #7048e8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
            color: "#fff",
          }}
        >
          N
        </div>
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#e8e8e8",
            letterSpacing: "0.08em",
          }}
        >
          NEXUS OPS
        </span>
      </div>

      {/* Switch Role */}
      <div style={{ padding: "18px 20px 8px" }}>
        <p
          style={{
            fontSize: 10,
            color: "#444",
            letterSpacing: "0.12em",
            marginBottom: 10,
            textTransform: "uppercase",
          }}
        >
          Switch Role
        </p>

        {NAV_ITEMS.map((item) => {
          const isActive = activeRole === item.role;
          return (
            <button
              key={item.role}
              onClick={() => onSwitch(item.role)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "9px 12px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                background: isActive ? "#1c1f2e" : "transparent",
                color: isActive ? "#a5b4fc" : "#555",
                fontSize: 13,
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 2,
                transition: "all .15s",
              }}
            >
              <span style={{ fontSize: 14 }}>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* User footer */}
      <div
        style={{
          padding: "14px 20px",
          borderTop: "1px solid #1a1a1a",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "#1a1a1a",
            border: "1px solid #2a2a2a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            color: "#666",
          }}
        >
          👤
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontSize: 12,
              color: "#ccc",
              margin: 0,
              fontWeight: 500,
            }}
          >
            {user?.email?.split("@")[0] ?? "User"}
          </p>
          <p
            style={{
              fontSize: 10,
              color: "#444",
              margin: 0,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {activeRole} mode
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          disabled={loading}
          title="Logout"
          style={{
            background: "none",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            color: "#444",
            fontSize: 14,
            padding: 2,
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "..." : "⏏"}
        </button>
      </div>
    </aside>
  );
}
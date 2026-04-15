import { ROLES } from "../../constants/roles";
import { useTheme } from "../../context/ThemeContext";

export default function RoleSelector({ role, setRole }) {
  const { theme } = useTheme();

  return (
    <>
      {/* Role Buttons */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {Object.entries(ROLES).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setRole(key)}
            style={{
              flex: 1,
              padding: "7px 0",
              fontSize: 13,
              borderRadius: 8,
              cursor: "pointer",
              border: `0.5px solid ${role === key ? theme.text : theme.inputBorder}`,
              background: role === key ? theme.btnBg : theme.inputBg,
              color: role === key ? theme.btnText : theme.muted,
              fontWeight: role === key ? 500 : 400,
              transition: "all .15s",
            }}
          >
            {val.label}
          </button>
        ))}
      </div>

      {/* Role Badge */}
      <div style={{ textAlign: "center", marginBottom: 16, fontSize: 12 }}>
        <span
          style={{
            background: ROLES[role].bg,
            color: ROLES[role].color,
            padding: "2px 10px",
            borderRadius: 20,
            marginRight: 6,
            fontSize: 11,
          }}
        >
          {ROLES[role].label}
        </span>
        <span style={{ color: theme.muted }}>{ROLES[role].desc}</span>
      </div>
    </>
  );
}

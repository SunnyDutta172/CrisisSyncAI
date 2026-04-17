import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/dashboard/Sidebar";

const TABS = ["Alerts", "Rooms", "Chat", "Map", "Manager"];
const TAB_ICONS = { Alerts: "🔔", Rooms: "🏠", Chat: "💬", Map: "🗺", Manager: "👥" };

const MOCK_ALERTS = [];
const MOCK_ROOMS = [
  { number: "101", floor: 1, status: "occupied", guest: "John Doe" },
  { number: "102", floor: 1, status: "vacant" },
  { number: "103", floor: 1, status: "maintenance" },
  { number: "201", floor: 2, status: "occupied", guest: "Sarah Lee" },
  { number: "202", floor: 2, status: "vacant" },
];

export default function StaffPage({ onSwitch }) {
  const { user } = useAuth();
  const [tab, setTab] = useState("Alerts");
  const [alerts, setAlerts] = useState(MOCK_ALERTS);
  const [chatMsg, setChatMsg] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { from: "system", text: "Staff channel is active. All staff can see these messages." }
  ]);

  const staffName = user?.email?.split("@")[0] ?? "Staff";

  const sendChat = () => {
    if (!chatMsg.trim()) return;
    setChatHistory([...chatHistory, { from: staffName, text: chatMsg }]);
    setChatMsg("");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0a0a", fontFamily: "'DM Mono', monospace" }}>
      <Sidebar activeRole="staff" onSwitch={onSwitch} />

      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 32px", height: 56,
          borderBottom: "1px solid #1a1a1a", background: "#0d0d0d",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#ddd", marginRight: 8 }}>Staff Portal</span>
            <div style={{ display: "flex", gap: 4 }}>
              {TABS.map(t => (
                <button key={t} onClick={() => setTab(t)} style={{
                  padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer",
                  background: tab === t ? "#1c1f2e" : "transparent",
                  color: tab === t ? "#a5b4fc" : "#555",
                  fontSize: 12, display: "flex", alignItems: "center", gap: 6,
                  transition: "all .15s",
                }}>
                  <span>{TAB_ICONS[t]}</span> {t}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div>
              <p style={{ fontSize: 12, color: "#ccc", margin: 0, textAlign: "right", fontWeight: 500 }}>
                {staffName}
              </p>
              <p style={{ fontSize: 10, color: "#40c057", margin: 0, textAlign: "right", letterSpacing: "0.08em" }}>
                ● AVAILABLE
              </p>
            </div>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "#1c1f2e", border: "1px solid #2a2d45",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, color: "#7048e8",
            }}>👤</div>
          </div>
        </div>

        {/* Tab Content */}
        <div style={{ flex: 1, padding: "40px 48px", overflowY: "auto" }}>

          {/* ALERTS */}
          {tab === "Alerts" && (
            alerts.length === 0 ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60vh", gap: 16 }}>
                <div style={{ fontSize: 48, color: "#2a2a2a" }}>🛡</div>
                <p style={{ color: "#444", fontSize: 14, letterSpacing: "0.04em" }}>All clear. No pending alerts.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {alerts.map((a, i) => (
                  <div key={i} style={{
                    background: "#111", border: "1px solid #2a1a1a", borderRadius: 12,
                    padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center",
                  }}>
                    <div>
                      <p style={{ color: "#f03e3e", fontSize: 13, fontWeight: 600, margin: 0 }}>{a.title}</p>
                      <p style={{ color: "#666", fontSize: 12, margin: "4px 0 0" }}>{a.desc}</p>
                    </div>
                    <button onClick={() => setAlerts(alerts.filter((_, idx) => idx !== i))}
                      style={{ background: "#1a0a0a", border: "1px solid #3a1a1a", borderRadius: 6, color: "#f03e3e", fontSize: 11, padding: "4px 12px", cursor: "pointer" }}>
                      Resolve
                    </button>
                  </div>
                ))}
              </div>
            )
          )}

          {/* ROOMS */}
          {tab === "Rooms" && (
            <div>
              <h2 style={{ color: "#ddd", fontSize: 20, fontWeight: 600, margin: "0 0 24px" }}>Room Overview</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14 }}>
                {MOCK_ROOMS.map(room => {
                  const colors = { occupied: "#7048e8", vacant: "#40c057", maintenance: "#f59f00" };
                  return (
                    <div key={room.number} style={{
                      background: "#111", border: `1px solid ${colors[room.status]}33`,
                      borderRadius: 12, padding: "18px 20px",
                    }}>
                      <p style={{ fontSize: 22, fontWeight: 700, color: "#ddd", margin: "0 0 6px" }}>#{room.number}</p>
                      <p style={{ fontSize: 10, color: "#555", margin: "0 0 10px", letterSpacing: "0.08em" }}>FLOOR {room.floor}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: colors[room.status] }} />
                        <span style={{ fontSize: 11, color: colors[room.status], letterSpacing: "0.08em" }}>
                          {room.status.toUpperCase()}
                        </span>
                      </div>
                      {room.guest && <p style={{ fontSize: 11, color: "#555", margin: "8px 0 0" }}>{room.guest}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* CHAT */}
          {tab === "Chat" && (
            <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 160px)" }}>
              <h2 style={{ color: "#ddd", fontSize: 20, fontWeight: 600, margin: "0 0 20px" }}>Staff Channel</h2>
              <div style={{
                flex: 1, background: "#0d0d0d", border: "1px solid #1e1e1e", borderRadius: 12,
                padding: "16px 20px", overflowY: "auto", marginBottom: 12,
                display: "flex", flexDirection: "column", gap: 10,
              }}>
                {chatHistory.map((msg, i) => (
                  <div key={i}>
                    <span style={{ fontSize: 10, color: "#444", letterSpacing: "0.08em" }}>
                      {msg.from === "system" ? "SYSTEM" : msg.from.toUpperCase()}
                    </span>
                    <p style={{ fontSize: 13, color: msg.from === "system" ? "#555" : "#ccc", margin: "3px 0 0" }}>
                      {msg.text}
                    </p>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <input value={chatMsg} onChange={e => setChatMsg(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendChat()}
                  placeholder="Send a message to staff..."
                  style={{
                    flex: 1, padding: "10px 14px", fontSize: 13, borderRadius: 8,
                    background: "#111", border: "1px solid #2a2a2a", color: "#ddd", outline: "none",
                  }} />
                <button onClick={sendChat} style={{
                  padding: "10px 18px", borderRadius: 8, border: "none", cursor: "pointer",
                  background: "linear-gradient(135deg, #3b5bdb, #7048e8)", color: "#fff", fontSize: 13,
                }}>Send</button>
              </div>
            </div>
          )}

          {/* MAP */}
          {tab === "Map" && (
            <div>
              <h2 style={{ color: "#ddd", fontSize: 20, fontWeight: 600, margin: "0 0 24px" }}>Facility Map</h2>
              <div style={{
                background: "#111", border: "1px solid #1e1e1e", borderRadius: 12,
                padding: "24px", display: "inline-block",
              }}>
                {[1, 2, 3].map(floor => (
                  <div key={floor} style={{ marginBottom: 20 }}>
                    <p style={{ fontSize: 10, color: "#444", letterSpacing: "0.1em", marginBottom: 10 }}>FLOOR {floor}</p>
                    <div style={{ display: "flex", gap: 8 }}>
                      {["01", "02", "03"].map(n => {
                        const roomNum = `${floor}${n}`;
                        const room = MOCK_ROOMS.find(r => r.number === roomNum);
                        const colors = { occupied: "#7048e8", vacant: "#1a2a1a", maintenance: "#2a1a00" };
                        return (
                          <div key={n} style={{
                            width: 70, height: 55, borderRadius: 8,
                            background: room ? colors[room.status] : "#151515",
                            border: `1px solid ${room?.status === "occupied" ? "#7048e833" : "#1e1e1e"}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 12, color: "#555",
                          }}>
                            {roomNum}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                  {[["#7048e8", "Occupied"], ["#40c057", "Vacant"], ["#f59f00", "Maintenance"]].map(([c, l]) => (
                    <div key={l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: c }} />
                      <span style={{ fontSize: 11, color: "#555" }}>{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MANAGER */}
          {tab === "Manager" && (
            <div>
              <h2 style={{ color: "#ddd", fontSize: 20, fontWeight: 600, margin: "0 0 8px" }}>Manager Tools</h2>
              <p style={{ color: "#444", fontSize: 13, margin: "0 0 28px" }}>Quick actions for shift management</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
                {[
                  { label: "Start Shift", icon: "▶", color: "#40c057" },
                  { label: "End Shift", icon: "⏹", color: "#f03e3e" },
                  { label: "Request Backup", icon: "📡", color: "#f59f00" },
                  { label: "File Report", icon: "📋", color: "#7048e8" },
                ].map(action => (
                  <button key={action.label} onClick={() => alert(`${action.label} triggered`)} style={{
                    background: "#111", border: `1px solid ${action.color}22`, borderRadius: 12,
                    padding: "22px 20px", cursor: "pointer", textAlign: "left",
                  }}>
                    <div style={{ fontSize: 22, marginBottom: 10 }}>{action.icon}</div>
                    <p style={{ fontSize: 13, color: action.color, margin: 0, fontWeight: 600 }}>{action.label}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

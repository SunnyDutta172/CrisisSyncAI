import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/dashboard/Sidebar";

const FLOOR_ROOMS = [
  ["101", "102", "103"],
  ["104", "105", "106"],
  ["107", "108", "109"],
];

export default function GuestDashboard({ onSwitch }) {
  const { user } = useAuth();
  const [chatMsg, setChatMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [emergencyPressed, setEmergencyPressed] = useState(false);

  const roomNumber = user?.email?.replace("guest-room-", "") ?? "101";
  const guestName = user?.email?.startsWith("guest-room-") ? "Guest" : (user?.email?.split("@")[0] ?? "Guest");

  const sendMsg = () => {
    if (!chatMsg.trim()) return;
    const userMsg = { from: "guest", text: chatMsg };
    setMessages(prev => [...prev, userMsg]);
    setChatMsg("");
    setTimeout(() => {
      setMessages(prev => [...prev, { from: "concierge", text: "Thank you for reaching out! A staff member will assist you shortly." }]);
    }, 800);
  };

  const handleEmergency = () => {
    setEmergencyPressed(true);
    setTimeout(() => setEmergencyPressed(false), 3000);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0a0a", fontFamily: "'DM Mono', monospace" }}>
      <Sidebar activeRole="guest" onSwitch={onSwitch} />

      <main style={{ flex: 1, padding: "36px 48px", overflowY: "auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: "#eee", margin: 0 }}>
              Welcome, {guestName}
            </h1>
            <p style={{ fontSize: 12, color: "#444", margin: "6px 0 0", letterSpacing: "0.08em" }}>
              ROOM {roomNumber} • FLOOR 1
            </p>
          </div>
          {/* WiFi Badge */}
          <div style={{
            background: "#111", border: "1px solid #1e1e1e", borderRadius: 12,
            padding: "12px 18px", display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: 8,
              background: "linear-gradient(135deg, #3b5bdb, #7048e8)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
            }}>🏠</div>
            <div>
              <p style={{ fontSize: 10, color: "#444", margin: 0, letterSpacing: "0.1em" }}>WIFI ACCESS</p>
              <p style={{ fontSize: 13, color: "#a5b4fc", fontWeight: 600, margin: 0 }}>NEXUSOPS_GUEST</p>
            </div>
          </div>
        </div>

        {/* Two column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

          {/* Left column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Emergency */}
            <div style={{
              background: "#111", border: "1px solid #1e1e1e", borderRadius: 14, padding: "24px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ color: "#f03e3e" }}>🚨</span>
                <h2 style={{ fontSize: 14, fontWeight: 600, color: "#ddd", margin: 0 }}>Emergency Assistance</h2>
              </div>
              <p style={{ fontSize: 12, color: "#555", margin: "0 0 20px", lineHeight: 1.7 }}>
                Press the button below if you need immediate assistance from our staff. A notification will be sent to all active personnel.
              </p>
              <button onClick={handleEmergency} style={{
                width: "100%", padding: "14px",
                background: emergencyPressed
                  ? "linear-gradient(135deg, #862e2e, #a01a1a)"
                  : "linear-gradient(135deg, #c92a2a, #f03e3e)",
                border: "none", borderRadius: 10, cursor: "pointer",
                color: "#fff", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                transition: "all .2s",
                boxShadow: emergencyPressed ? "none" : "0 4px 20px #f03e3e33",
              }}>
                <span>⚠</span>
                {emergencyPressed ? "NOTIFYING STAFF..." : "CALL EMERGENCY STAFF"}
              </button>
            </div>

            {/* Facility Map */}
            <div style={{
              background: "#111", border: "1px solid #1e1e1e", borderRadius: 14, padding: "24px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                <span>🗺</span>
                <h2 style={{ fontSize: 14, fontWeight: 600, color: "#ddd", margin: 0 }}>Facility Map</h2>
              </div>

              {/* Grid map */}
              <div style={{
                background: "#0d0d0d", borderRadius: 10, padding: "16px",
                border: "1px solid #1a1a1a",
              }}>
                {FLOOR_ROOMS.map((row, ri) => (
                  <div key={ri} style={{ display: "flex", gap: 8, marginBottom: ri < FLOOR_ROOMS.length - 1 ? 8 : 0 }}>
                    {row.map(room => {
                      const isYours = room === roomNumber;
                      return (
                        <div key={room} style={{
                          flex: 1, height: 60, borderRadius: 8,
                          background: isYours ? "#1c1f2e" : "#141414",
                          border: isYours ? "1.5px solid #7048e8" : "1px solid #1e1e1e",
                          display: "flex", flexDirection: "column",
                          alignItems: "center", justifyContent: "center", gap: 4,
                        }}>
                          <span style={{ fontSize: 11, color: isYours ? "#a5b4fc" : "#333" }}>{room}</span>
                          {isYours && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7048e8" }} />}
                        </div>
                      );
                    })}
                  </div>
                ))}
                {/* Hallway indicator */}
                <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
                  <div style={{
                    height: 2, width: "60%", background: "#1e1e1e",
                    borderRadius: 2, position: "relative",
                  }}>
                    <div style={{
                      position: "absolute", left: "50%", top: "50%",
                      transform: "translate(-50%,-50%)",
                      width: 8, height: 8, borderRadius: "50%",
                      background: "#3b5bdb",
                    }} />
                  </div>
                </div>
              </div>

              {/* Safety tip */}
              <div style={{
                background: "#0d1a0d", border: "1px solid #1a2e1a", borderRadius: 10,
                padding: "12px 16px", marginTop: 14,
              }}>
                <p style={{ fontSize: 10, color: "#40c057", letterSpacing: "0.1em", margin: "0 0 4px" }}>SAFETY TIP</p>
                <p style={{ fontSize: 12, color: "#555", margin: 0, lineHeight: 1.6 }}>
                  The nearest emergency exit is located at the end of the hallway to your left.
                </p>
              </div>
            </div>
          </div>

          {/* Right column — Concierge Chat */}
          <div style={{
            background: "#111", border: "1px solid #1e1e1e", borderRadius: 14, padding: "24px",
            display: "flex", flexDirection: "column",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <span>💬</span>
              <h2 style={{ fontSize: 14, fontWeight: 600, color: "#ddd", margin: 0 }}>Concierge Chat</h2>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1, minHeight: 300, display: "flex", flexDirection: "column",
              justifyContent: messages.length === 0 ? "center" : "flex-start",
              alignItems: messages.length === 0 ? "center" : "stretch",
              gap: 12,
            }}>
              {messages.length === 0 ? (
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 32, color: "#2a2a2a", marginBottom: 12 }}>💬</div>
                  <p style={{ fontSize: 11, color: "#333", letterSpacing: "0.08em" }}>NO MESSAGES YET</p>
                  <p style={{ fontSize: 11, color: "#333", letterSpacing: "0.08em" }}>HOW CAN WE HELP?</p>
                </div>
              ) : (
                messages.map((msg, i) => (
                  <div key={i} style={{
                    alignSelf: msg.from === "guest" ? "flex-end" : "flex-start",
                    maxWidth: "80%",
                  }}>
                    <p style={{ fontSize: 10, color: "#444", margin: "0 0 4px", letterSpacing: "0.06em",
                      textAlign: msg.from === "guest" ? "right" : "left" }}>
                      {msg.from === "guest" ? "YOU" : "CONCIERGE"}
                    </p>
                    <div style={{
                      background: msg.from === "guest" ? "#1c1f2e" : "#151515",
                      border: `1px solid ${msg.from === "guest" ? "#2a2d45" : "#1e1e1e"}`,
                      borderRadius: 10, padding: "10px 14px",
                      fontSize: 13, color: "#ccc", lineHeight: 1.5,
                    }}>
                      {msg.text}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input */}
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              <input
                value={chatMsg}
                onChange={e => setChatMsg(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMsg()}
                placeholder="Ask concierge..."
                style={{
                  flex: 1, padding: "10px 14px", fontSize: 13, borderRadius: 8,
                  background: "#0d0d0d", border: "1px solid #1e1e1e", color: "#ddd", outline: "none",
                }}
              />
              <button onClick={sendMsg} style={{
                width: 40, height: 40, borderRadius: 8, border: "none", cursor: "pointer",
                background: "linear-gradient(135deg, #3b5bdb, #7048e8)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, color: "#fff", flexShrink: 0,
              }}>➤</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

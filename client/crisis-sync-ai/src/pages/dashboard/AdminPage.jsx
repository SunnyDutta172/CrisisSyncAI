import { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";

const MOCK_STAFF = [
  { name: "Alice Johnson", status: "active", age: 28, floor: "Floor 1", tenure: 450 },
  { name: "Bob Smith", status: "active", age: 34, floor: "Floor 2", tenure: 120 },
  { name: "Charlie Davis", status: "offline", age: 25, floor: "Floor 1", tenure: 30 },
];

export default function AdminPage({ onSwitch }) {
  const [staff, setStaff] = useState(MOCK_STAFF);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", age: "", floor: "Floor 1" });

  const totalStaff = staff.length;
  const activeNow = staff.filter(s => s.status === "active").length;
  const avgTenure = Math.round(staff.reduce((a, b) => a + b.tenure, 0) / staff.length);

  const handleAdd = () => {
    if (!form.name || !form.age) return;
    setStaff([...staff, { ...form, age: Number(form.age), status: "active", tenure: 0 }]);
    setForm({ name: "", age: "", floor: "Floor 1" });
    setShowModal(false);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0a0a", fontFamily: "'DM Mono', monospace" }}>
      <Sidebar activeRole="admin" onSwitch={onSwitch} />

      <main style={{ flex: 1, padding: "40px 48px", overflowY: "auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 30, fontWeight: 700, color: "#eee", margin: 0, letterSpacing: "-0.01em" }}>
              Staff Directory
            </h1>
            <p style={{ fontSize: 13, color: "#444", margin: "6px 0 0", letterSpacing: "0.02em" }}>
              Overview and control of all facility personnel
            </p>
          </div>
          <button onClick={() => setShowModal(true)} style={{
            padding: "10px 20px", borderRadius: 10, border: "none", cursor: "pointer",
            background: "linear-gradient(135deg, #3b5bdb, #7048e8)",
            color: "#fff", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6,
          }}>
            + Add Staff Member
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
          {[
            { label: "TOTAL STAFF", value: totalStaff, accent: false },
            { label: "ACTIVE NOW", value: activeNow, accent: false },
            { label: "AVG. TENURE", value: `${avgTenure} days`, accent: true },
          ].map(stat => (
            <div key={stat.label} style={{
              background: "#111", border: "1px solid #1e1e1e", borderRadius: 12,
              padding: "20px 24px",
            }}>
              <p style={{ fontSize: 10, color: "#444", letterSpacing: "0.12em", margin: "0 0 10px", textTransform: "uppercase" }}>
                {stat.label}
              </p>
              <p style={{ fontSize: 28, fontWeight: 700, margin: 0, color: stat.accent ? "#7048e8" : "#ddd" }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, overflow: "hidden" }}>
          {/* Table header */}
          <div style={{
            display: "grid", gridTemplateColumns: "2fr 1fr 0.5fr 1fr 1fr 0.8fr",
            padding: "12px 24px", borderBottom: "1px solid #1a1a1a",
          }}>
            {["NAME", "STATUS", "AGE", "FLOOR", "TENURE", "ACTIONS"].map(h => (
              <span key={h} style={{ fontSize: 10, color: "#444", letterSpacing: "0.1em" }}>{h}</span>
            ))}
          </div>

          {staff.map((s, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "2fr 1fr 0.5fr 1fr 1fr 0.8fr",
              padding: "16px 24px", borderBottom: i < staff.length - 1 ? "1px solid #161616" : "none",
              alignItems: "center",
            }}>
              {/* Name */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: "#1c1f2e", border: "1px solid #2a2d45",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, color: "#7048e8", fontWeight: 700,
                }}>
                  {s.name[0]}
                </div>
                <span style={{ fontSize: 13, color: "#ccc", fontWeight: 500 }}>{s.name}</span>
              </div>
              {/* Status */}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: 7, height: 7, borderRadius: "50%",
                  background: s.status === "active" ? "#40c057" : "#555",
                }} />
                <span style={{ fontSize: 11, color: s.status === "active" ? "#40c057" : "#555", letterSpacing: "0.08em" }}>
                  {s.status.toUpperCase()}
                </span>
              </div>
              <span style={{ fontSize: 13, color: "#666" }}>{s.age}</span>
              <span style={{ fontSize: 13, color: "#666" }}>{s.floor}</span>
              <span style={{ fontSize: 13, color: "#666" }}>{s.tenure} days</span>
              {/* Actions */}
              <button
                onClick={() => setStaff(staff.filter((_, idx) => idx !== i))}
                style={{
                  background: "none", border: "1px solid #2a2a2a", borderRadius: 6,
                  color: "#555", fontSize: 11, padding: "4px 10px", cursor: "pointer",
                  letterSpacing: "0.05em",
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Add Modal */}
      {showModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
        }}>
          <div style={{
            background: "#111", border: "1px solid #2a2a2a", borderRadius: 16,
            padding: "28px 32px", width: 340,
          }}>
            <h2 style={{ color: "#ddd", fontSize: 16, fontWeight: 600, margin: "0 0 20px" }}>Add Staff Member</h2>
            {[
              { key: "name", placeholder: "Full name", type: "text" },
              { key: "age", placeholder: "Age", type: "number" },
            ].map(f => (
              <input key={f.key} type={f.type} placeholder={f.placeholder}
                value={form[f.key]}
                onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                style={{
                  width: "100%", padding: "10px 12px", fontSize: 13, borderRadius: 8,
                  marginBottom: 10, background: "#1a1a1a", color: "#ddd",
                  border: "1px solid #2a2a2a", outline: "none", boxSizing: "border-box",
                }} />
            ))}
            <select value={form.floor} onChange={e => setForm({ ...form, floor: e.target.value })}
              style={{
                width: "100%", padding: "10px 12px", fontSize: 13, borderRadius: 8,
                marginBottom: 18, background: "#1a1a1a", color: "#ddd",
                border: "1px solid #2a2a2a", outline: "none", boxSizing: "border-box",
              }}>
              {["Floor 1", "Floor 2", "Floor 3"].map(f => <option key={f}>{f}</option>)}
            </select>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowModal(false)} style={{
                flex: 1, padding: 10, borderRadius: 8, border: "1px solid #2a2a2a",
                background: "transparent", color: "#666", fontSize: 13, cursor: "pointer",
              }}>Cancel</button>
              <button onClick={handleAdd} style={{
                flex: 1, padding: 10, borderRadius: 8, border: "none",
                background: "linear-gradient(135deg, #3b5bdb, #7048e8)",
                color: "#fff", fontSize: 13, cursor: "pointer", fontWeight: 600,
              }}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

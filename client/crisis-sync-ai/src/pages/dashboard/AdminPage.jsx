import { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import AddFloorModal from "../../components/dashboard/AddFloorModal";
import FloorMapModal from "../../components/dashboard/FloorMapModal";

const MOCK_STAFF = [
  { name: "Alice Johnson", status: "active", age: 28, floor: "Floor 1", tenure: 450 },
  { name: "Bob Smith", status: "active", age: 34, floor: "Floor 2", tenure: 120 },
  { name: "Charlie Davis", status: "offline", age: 25, floor: "Floor 1", tenure: 30 },
];

const TABS = ["Staff Directory", "Floors"];

export default function AdminPage({ onSwitch }) {
  const [tab, setTab] = useState("Staff Directory");
  const [staff, setStaff] = useState(MOCK_STAFF);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [staffForm, setStaffForm] = useState({ name: "", age: "", floor: "Floor 1" });

  const [floors, setFloors] = useState([]);
  const [showAddFloor, setShowAddFloor] = useState(false);
  const [viewFloor, setViewFloor] = useState(null);

  const totalStaff = staff.length;
  const activeNow = staff.filter(s => s.status === "active").length;
  const avgTenure = staff.length
    ? Math.round(staff.reduce((a, b) => a + b.tenure, 0) / staff.length)
    : 0;

  const handleAddStaff = () => {
    if (!staffForm.name || !staffForm.age) return;
    setStaff([...staff, { ...staffForm, age: Number(staffForm.age), status: "active", tenure: 0 }]);
    setStaffForm({ name: "", age: "", floor: "Floor 1" });
    setShowStaffModal(false);
  };

  const inputStyle = {
    width: "100%", padding: "10px 12px", fontSize: 13, borderRadius: 8,
    marginBottom: 10, background: "#1a1a1a", color: "#ddd",
    border: "1px solid #2a2a2a", outline: "none", boxSizing: "border-box",
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0a0a", fontFamily: "'DM Mono', monospace" }}>
      <Sidebar activeRole="admin" onSwitch={onSwitch} />

      <main style={{ flex: 1, padding: "40px 48px", overflowY: "auto" }}>

        {/* Page Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 32, borderBottom: "1px solid #1a1a1a", paddingBottom: 0 }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: "8px 18px 12px", borderRadius: 0, border: "none", cursor: "pointer",
              background: "transparent",
              color: tab === t ? "#a5b4fc" : "#555",
              fontSize: 13, fontWeight: tab === t ? 600 : 400,
              borderBottom: tab === t ? "2px solid #7048e8" : "2px solid transparent",
              transition: "all .15s",
            }}>{t}</button>
          ))}
        </div>

        {/* ── STAFF DIRECTORY ── */}
        {tab === "Staff Directory" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
              <div>
                <h1 style={{ fontSize: 28, fontWeight: 700, color: "#eee", margin: 0 }}>Staff Directory</h1>
                <p style={{ fontSize: 13, color: "#444", margin: "6px 0 0" }}>
                  Overview and control of all facility personnel
                </p>
              </div>
              <button onClick={() => setShowStaffModal(true)} style={{
                padding: "10px 20px", borderRadius: 10, border: "none", cursor: "pointer",
                background: "linear-gradient(135deg, #3b5bdb, #7048e8)",
                color: "#fff", fontSize: 13, fontWeight: 600,
              }}>+ Add Staff Member</button>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
              {[
                { label: "TOTAL STAFF", value: totalStaff, accent: false },
                { label: "ACTIVE NOW", value: activeNow, accent: false },
                { label: "AVG. TENURE", value: `${avgTenure} days`, accent: true },
              ].map(stat => (
                <div key={stat.label} style={{
                  background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: "20px 24px",
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
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: "#1c1f2e", border: "1px solid #2a2d45",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, color: "#7048e8", fontWeight: 700,
                    }}>{s.name[0]}</div>
                    <span style={{ fontSize: 13, color: "#ccc", fontWeight: 500 }}>{s.name}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: s.status === "active" ? "#40c057" : "#555" }} />
                    <span style={{ fontSize: 11, color: s.status === "active" ? "#40c057" : "#555", letterSpacing: "0.08em" }}>
                      {s.status.toUpperCase()}
                    </span>
                  </div>
                  <span style={{ fontSize: 13, color: "#666" }}>{s.age}</span>
                  <span style={{ fontSize: 13, color: "#666" }}>{s.floor}</span>
                  <span style={{ fontSize: 13, color: "#666" }}>{s.tenure} days</span>
                  <button onClick={() => setStaff(staff.filter((_, idx) => idx !== i))} style={{
                    background: "none", border: "1px solid #2a2a2a", borderRadius: 6,
                    color: "#555", fontSize: 11, padding: "4px 10px", cursor: "pointer",
                  }}>Remove</button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── FLOORS ── */}
        {tab === "Floors" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
              <div>
                <h1 style={{ fontSize: 28, fontWeight: 700, color: "#eee", margin: 0 }}>Floor Management</h1>
                <p style={{ fontSize: 13, color: "#444", margin: "6px 0 0" }}>
                  Add floors and upload their map images to Cloudinary
                </p>
              </div>
              <button onClick={() => setShowAddFloor(true)} style={{
                padding: "10px 20px", borderRadius: 10, border: "none", cursor: "pointer",
                background: "linear-gradient(135deg, #3b5bdb, #7048e8)",
                color: "#fff", fontSize: 13, fontWeight: 600,
              }}>+ Add Floor</button>
            </div>

            {floors.length === 0 ? (
              <div style={{
                background: "#111", border: "1px dashed #222", borderRadius: 14,
                padding: "72px 40px", textAlign: "center",
              }}>
                <p style={{ fontSize: 36, margin: "0 0 14px" }}>🏢</p>
                <p style={{ fontSize: 14, color: "#444", margin: 0 }}>No floors added yet</p>
                <p style={{ fontSize: 12, color: "#333", margin: "6px 0 24px" }}>
                  Upload a floor map image and it will be stored on Cloudinary and linked to your hotel.
                </p>
                <button onClick={() => setShowAddFloor(true)} style={{
                  padding: "10px 24px", borderRadius: 8, border: "1px solid #2a2a2a",
                  background: "transparent", color: "#666", fontSize: 13, cursor: "pointer",
                }}>+ Add your first floor</button>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
                {floors.map(floor => (
                  <div
                    key={floor.id}
                    onClick={() => setViewFloor(floor)}
                    style={{
                      background: "#111", border: "1px solid #1e1e1e", borderRadius: 14,
                      overflow: "hidden", cursor: "pointer", transition: "border-color .15s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = "#7048e8"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "#1e1e1e"}
                  >
                    <div style={{ height: 140, overflow: "hidden", background: "#0d0d0d" }}>
                      <img src={floor.imageUrl} alt={`Floor ${floor.floorNumber}`}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </div>
                    <div style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 600, color: "#ddd", margin: 0 }}>
                          Floor {floor.floorNumber}
                        </p>
                        <p style={{ fontSize: 11, color: "#444", margin: "4px 0 0", letterSpacing: "0.06em" }}>
                          {floor.hotelName}
                        </p>
                      </div>
                      <span style={{
                        background: "#1c1f2e", border: "1px solid #2a2d45",
                        borderRadius: 6, padding: "4px 10px",
                        fontSize: 10, color: "#a5b4fc", letterSpacing: "0.06em",
                      }}>VIEW MAP</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Add Staff Modal */}
      {showStaffModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
        }}>
          <div style={{ background: "#111", border: "1px solid #2a2a2a", borderRadius: 16, padding: "28px 32px", width: 340 }}>
            <h2 style={{ color: "#ddd", fontSize: 16, fontWeight: 600, margin: "0 0 20px" }}>Add Staff Member</h2>
            {[
              { key: "name", placeholder: "Full name", type: "text" },
              { key: "age", placeholder: "Age", type: "number" },
            ].map(f => (
              <input key={f.key} type={f.type} placeholder={f.placeholder}
                value={staffForm[f.key]}
                onChange={e => setStaffForm({ ...staffForm, [f.key]: e.target.value })}
                style={inputStyle} />
            ))}
            <select value={staffForm.floor} onChange={e => setStaffForm({ ...staffForm, floor: e.target.value })}
              style={{ ...inputStyle, marginBottom: 18 }}>
              {floors.length > 0
                ? floors.map(f => <option key={f.id}>Floor {f.floorNumber}</option>)
                : ["Floor 1", "Floor 2", "Floor 3"].map(f => <option key={f}>{f}</option>)
              }
            </select>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowStaffModal(false)} style={{
                flex: 1, padding: 10, borderRadius: 8, border: "1px solid #2a2a2a",
                background: "transparent", color: "#666", fontSize: 13, cursor: "pointer",
              }}>Cancel</button>
              <button onClick={handleAddStaff} style={{
                flex: 1, padding: 10, borderRadius: 8, border: "none",
                background: "linear-gradient(135deg, #3b5bdb, #7048e8)",
                color: "#fff", fontSize: 13, cursor: "pointer", fontWeight: 600,
              }}>Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Floor Modal */}
      {showAddFloor && (
        <AddFloorModal
          onClose={() => setShowAddFloor(false)}
          onAdded={floor => setFloors(prev => [...prev, floor])}
        />
      )}

      {/* Floor Map Viewer */}
      {viewFloor && (
        <FloorMapModal floor={viewFloor} onClose={() => setViewFloor(null)} />
      )}
    </div>
  );
}

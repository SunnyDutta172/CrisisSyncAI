export default function FloorMapModal({ floor, onClose }) {
  if (!floor) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 300, padding: "24px",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#111", border: "1px solid #2a2a2a", borderRadius: 16,
          overflow: "hidden", maxWidth: 860, width: "100%",
          fontFamily: "'DM Mono', monospace",
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "16px 22px", borderBottom: "1px solid #1e1e1e",
        }}>
          <div>
            <p style={{ fontSize: 15, fontWeight: 600, color: "#ddd", margin: 0 }}>
              Floor {floor.floorNumber} — Map
            </p>
            <p style={{ fontSize: 11, color: "#444", margin: "3px 0 0", letterSpacing: "0.08em" }}>
              {floor.hotelName.toUpperCase()}
            </p>
          </div>
          <button onClick={onClose} style={{
            background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8,
            color: "#666", fontSize: 18, width: 34, height: 34,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}>✕</button>
        </div>

        {/* Image */}
        <div style={{ padding: "16px" }}>
          <img
            src={floor.imageUrl}
            alt={`Floor ${floor.floorNumber} map`}
            style={{ width: "100%", borderRadius: 10, display: "block", maxHeight: "70vh", objectFit: "contain" }}
          />
        </div>

        {/* Footer */}
        <div style={{
          padding: "12px 22px", borderTop: "1px solid #1e1e1e",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <p style={{ fontSize: 11, color: "#444", margin: 0, letterSpacing: "0.06em" }}>
            Hosted on Cloudinary
          </p>
          <a href={floor.imageUrl} target="_blank" rel="noreferrer" style={{
            fontSize: 11, color: "#a5b4fc", textDecoration: "none", letterSpacing: "0.06em",
          }}>
            Open original ↗
          </a>
        </div>
      </div>
    </div>
  );
}

import { useState, useRef } from "react";
import { uploadToCloudinary } from "../../utils/cloudinary";
import api from "../../api/api";

export default function AddFloorModal({ onClose, onAdded }) {
  const [floorNumber, setFloorNumber] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!floorNumber || !hotelName || !imageFile) {
      setError("All fields are required.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      // 1. Upload image to Cloudinary
      const imageUrl = await uploadToCloudinary(imageFile);

      // 2. Send floor data to backend
      const { data } = await api.post("/floors", {
        floorNumber: Number(floorNumber),
        hotelName,
        imageUrl,
      });

      onAdded({ floorNumber: Number(floorNumber), hotelName, imageUrl, id: data.id ?? Date.now() });
      onClose();
    } catch (err) {
      setError("Upload failed. Check your Cloudinary config and backend.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "10px 12px", fontSize: 13, borderRadius: 8,
    marginBottom: 10, background: "#1a1a1a", color: "#ddd",
    border: "1px solid #2a2a2a", outline: "none", boxSizing: "border-box",
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200,
    }}>
      <div style={{
        background: "#111", border: "1px solid #2a2a2a", borderRadius: 16,
        padding: "28px 32px", width: 380,
      }}>
        <h2 style={{ color: "#ddd", fontSize: 16, fontWeight: 600, margin: "0 0 6px" }}>Add Floor</h2>
        <p style={{ fontSize: 12, color: "#444", margin: "0 0 20px" }}>
          Upload a floor map image and it will be stored on Cloudinary.
        </p>

        <input
          type="text"
          placeholder="Hotel name"
          value={hotelName}
          onChange={e => setHotelName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Floor number (e.g. 1)"
          value={floorNumber}
          onChange={e => setFloorNumber(e.target.value)}
          style={inputStyle}
        />

        {/* Image upload area */}
        <div
          onClick={() => fileRef.current.click()}
          style={{
            border: "1px dashed #2a2a2a", borderRadius: 10,
            padding: preview ? 0 : "28px 20px",
            marginBottom: 16, cursor: "pointer",
            background: "#151515", overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "center",
            minHeight: 100, transition: "border-color .15s",
          }}
        >
          {preview ? (
            <img src={preview} alt="floor preview" style={{ width: "100%", borderRadius: 10, display: "block" }} />
          ) : (
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 22, margin: "0 0 6px" }}>🗺</p>
              <p style={{ fontSize: 12, color: "#555", margin: 0 }}>Click to upload floor map image</p>
              <p style={{ fontSize: 11, color: "#333", margin: "4px 0 0" }}>PNG, JPG, WEBP</p>
            </div>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />

        {preview && (
          <button onClick={() => { setPreview(null); setImageFile(null); }}
            style={{
              fontSize: 11, color: "#555", background: "none", border: "none",
              cursor: "pointer", marginBottom: 10, textDecoration: "underline",
            }}>
            Remove image
          </button>
        )}

        {error && <p style={{ fontSize: 12, color: "#f03e3e", marginBottom: 10 }}>{error}</p>}

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} disabled={loading} style={{
            flex: 1, padding: 10, borderRadius: 8, border: "1px solid #2a2a2a",
            background: "transparent", color: "#666", fontSize: 13, cursor: "pointer",
          }}>Cancel</button>
          <button onClick={handleSubmit} disabled={loading} style={{
            flex: 1, padding: 10, borderRadius: 8, border: "none",
            background: loading ? "#2a2d45" : "linear-gradient(135deg, #3b5bdb, #7048e8)",
            color: loading ? "#666" : "#fff", fontSize: 13, cursor: loading ? "not-allowed" : "pointer", fontWeight: 600,
          }}>
            {loading ? "Uploading..." : "Add Floor"}
          </button>
        </div>
      </div>
    </div>
  );
}

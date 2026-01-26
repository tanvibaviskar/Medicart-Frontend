// src/pages/admin/ViewAllMedicals.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";

const ViewAllMedicals = () => {
  const [medicals, setMedicals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch all medicals
  const fetchMedicals = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/admin/medicals");
      setMedicals(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching medicals:", err);
      setError(err.response?.data?.message || "Failed to fetch medicals");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicals();
  }, []);

  // ✅ Update status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosInstance.patch(`/admin/medicals/${id}/status`, { status: newStatus });
      setMedicals((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  // ✅ Soft delete medical
  const handleDeleteMedical = async (id) => {
    if (!window.confirm("Are you sure you want to delete this medical?")) return;

    try {
      await axiosInstance.delete(`/admin/medicals/${id}`);
      setMedicals((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Error deleting medical:", err);
      alert(err.response?.data?.message || "Failed to delete medical");
    }
  };

  if (loading) return <p>Loading medicals...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>All Medicals</h2>

      {medicals.length === 0 ? (
        <p>No medicals found.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              minWidth: "900px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <thead style={{ backgroundColor: "#2980b9", color: "white" }}>
              <tr>
                <th style={{ padding: "10px" }}>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>License</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {medicals.map((m, index) => (
                <tr
                  key={m.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#ecf0f1" : "#ffffff",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d1e7ff")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#ecf0f1" : "#ffffff")
                  }
                >
                  <td style={{ padding: "8px", textAlign: "center" }}>{m.id}</td>
                  <td>{m.fullName}</td>
                  <td>{m.email}</td>
                  <td>{m.contact}</td>
                  <td>{m.license}</td>
                  <td>{m.latitude}</td>
                  <td>{m.longitude}</td>
                  <td>
  {/* If status is PENDING, show badge instead of making it selectable */}
  {m.status === "PENDING" ? (
    <span
      style={{
        padding: "5px 10px",
        borderRadius: "5px",
        backgroundColor: "#f1c40f", // yellow
        color: "white",
        fontWeight: "bold",
      }}
    >
      PENDING
    </span>
  ) : (
    <select
      value={m.status}
      onChange={(e) => handleStatusChange(m.id, e.target.value)}
      style={{
        padding: "5px",
        borderRadius: "5px",
        border: "1px solid #bdc3c7",
        backgroundColor: m.status === "APPROVED" ? "#2ecc71" : "#e74c3c",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      <option value="APPROVED">APPROVED</option>
      <option value="REJECTED">REJECTED</option>
    </select>
  )}
</td>

                  <td>
                    <button
                      onClick={() => handleDeleteMedical(m.id)}
                      style={{
                        backgroundColor: "#e74c3c",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewAllMedicals;

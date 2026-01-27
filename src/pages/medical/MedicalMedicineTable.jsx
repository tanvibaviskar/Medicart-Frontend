import axios from "axios";
import { useEffect, useState } from "react";
import "./MedicalMedicineTable.css";

const MedicalMedicineTable = () => {
  const [medicines, setMedicines] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:8080/medicals/viewStatus",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];

      setMedicines(data);
    } catch (err) {
      console.error(err);
      setMedicines([]);
    }
  };

  const handleStatusChange = async (medicineId, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:8080/medicals/changeMedicineStatus/${medicineId}`,
        null,
        {
          params: { status: newStatus },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMedicines((prev) =>
        prev.map((m) =>
          m.id === medicineId ? { ...m, status: newStatus } : m
        )
      );

      setMsg("✅ Status updated successfully");
    } catch (err) {
      console.error(err);
      setMsg("❌ Failed to update status");
    }
  };

  const handleSoftDelete = async (medicineId) => {
    if (!window.confirm("Are you sure you want to delete this medicine?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:8080/medicals/softDeleteMedicine/${medicineId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMedicines((prev) => prev.filter((m) => m.id !== medicineId));
      setMsg("🗑️ Medicine deleted successfully");
    } catch (err) {
      console.error(err);
      setMsg("❌ Failed to delete medicine");
    }
  };

  return (
    <div className="medicine-table-container">
      <h2>My Medicines</h2>
      {msg && <p className="msg-text">{msg}</p>}

      <div className="table-wrapper">
        <table className="medicine-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Brand</th>
              <th>Description</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Discount</th>
              <th>MFG</th>
              <th>EXP</th>
              <th>Status</th>
              <th>Change Status</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {medicines.length === 0 ? (
              <tr>
                <td colSpan="11" style={{ textAlign: "center" }}>
                  No medicines found
                </td>
              </tr>
            ) : (
              medicines.map((m) => (
                <tr key={m.id}>
                  <td>{m.id ?? "—"}</td>
                  <td>{m.brand ?? "—"}</td>
                  <td>{m.description ?? "—"}</td>
                  <td>{m.quantity ?? 0}</td>
                  <td>₹{m.price ?? 0}</td>
                  <td>{m.discount ?? 0}%</td>
                  <td>{m.mfgDate ?? "—"}</td>
                  <td>{m.expDate ?? "—"}</td>

                  <td>
                    <span
                      className={`status-badge ${
                        (m.status ?? "inactive").toLowerCase()
                      }`}
                    >
                      {m.status ?? "INACTIVE"}
                    </span>
                  </td>

                  <td>
                    <select
                      value={m.status ?? "INACTIVE"}
                      onChange={(e) =>
                        handleStatusChange(m.id, e.target.value)
                      }
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
                      <option value="EXPIRED">EXPIRED</option>
                    </select>
                  </td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleSoftDelete(m.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicalMedicineTable;

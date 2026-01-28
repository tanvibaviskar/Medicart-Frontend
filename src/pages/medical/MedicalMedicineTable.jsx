import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import "./MedicalMedicineTable.css";

const MedicalMedicineTable = () => {
  const [medicines, setMedicines] = useState([]);

  // Fetch all medicines
  const fetchMedicines = async () => {
    const res = await axiosInstance.get("/medicals/viewStatus");
    const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
    setMedicines(data);
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  // Change medicine status
  const handleStatusChange = async (id, status) => {
    await axiosInstance.put(`/medicals/changeMedicineStatus/${id}`, null, {
      params: { status },
    });
    setMedicines((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m)),
    );
  };

  // Soft delete medicine
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this medicine?")) return;
    await axiosInstance.delete(`/medicals/softDeleteMedicine/${id}`);
    setMedicines((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="medical-table-wrapper">
      <div className="medical-table-header">
        <div>
          <h2>My Medicines</h2>
          <p>Manage your listed medicines and availability</p>
        </div>
      </div>

      <div className="table-responsive">
        <table className="medical-table">
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
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {medicines.length === 0 ? (
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  No medicines found
                </td>
              </tr>
            ) : (
              medicines.map((m, index) => (
                <tr key={m.id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="store-cell">
                      <div className="store-icon">💊</div>
                      <strong>{m.brand ?? "—"}</strong>
                    </div>
                  </td>
                  <td className="wrap-text">{m.description ?? "—"}</td>
                  <td>{m.quantity ?? 0}</td>
                  <td>₹{m.price ?? 0}</td>
                  <td>{m.discount ?? 0}%</td>
                  <td>{m.mfgDate ?? "—"}</td>
                  <td>{m.expDate ?? "—"}</td>
                  <td>
                    <select
                      className={`status-dropdown ${(
                        m.status ?? "INACTIVE"
                      ).toLowerCase()}`}
                      value={m.status ?? "INACTIVE"}
                      onChange={(e) => handleStatusChange(m.id, e.target.value)}
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
                      <option value="EXPIRED">EXPIRED</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(m.id)}
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

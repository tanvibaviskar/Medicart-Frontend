import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import "./ViewAllMedicals.css";

const ViewAllMedicals = () => {
  const [medicals, setMedicals] = useState([]);

  const fetchMedicals = async () => {
    const res = await axiosInstance.get("/admin/medicals");
    setMedicals(res.data);
  };

  useEffect(() => {
    fetchMedicals();
  }, []);

  const handleStatusChange = async (id, status) => {
    await axiosInstance.patch(`/admin/medicals/${id}/status`, { status });
    setMedicals((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m)),
    );
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this medical store?")) return;
    await axiosInstance.delete(`/admin/medicals/${id}`);
    setMedicals((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="medical-table-wrapper">
      <div className="medical-table-header">
        <div>
          <h2>Recent Medical Stores Registrations</h2>
          <p>Review and approve new store applications</p>
        </div>
      </div>

      <table className="medical-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Store Name</th>
            <th>Email ID</th>
            <th>Contact</th>
            <th>License</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {medicals.map((m, index) => (
            <tr key={m.id}>
              <td>{index + 1}</td>
              <td>
                <div className="store-cell">
                  <div className="store-icon">🏥</div>
                  <strong>{m.fullName}</strong>
                </div>
              </td>
              <td>{m.email}</td>
              <td>{m.contact}</td>
              <td>{m.license}</td>
              <td>
               <select
  className={`status-dropdown ${m.status.toLowerCase()}`}
  value={m.status}
  onChange={(e) => handleStatusChange(m.id, e.target.value)}
>
  <option value="PENDING">Pending</option>
  <option value="APPROVED">Approved</option>
  <option value="REJECTED">Rejected</option>
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAllMedicals;
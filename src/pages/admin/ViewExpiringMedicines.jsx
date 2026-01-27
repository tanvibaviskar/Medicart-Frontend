import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import "./ViewAllMedicals.css"; // reuse existing CSS

const ViewExpiringMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch expiring medicines
  const fetchExpiring = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/admin/medicines/expiring");
      setMedicines(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching expiring medicines:", err);
      setError(err.response?.data?.message || "Failed to fetch expiring medicines");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpiring();
  }, []);

  if (loading) return <p>Loading expiring medicines...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="medical-table-wrapper">
      <div className="medical-table-header">
        <div>
          <h2>Expiring / Expired Medicines</h2>
          <p>Medicines that are expired or nearing 1 month to expiry</p>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="medical-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Brand</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Discount</th>
              <th>MFG Date</th>
              <th>EXP Date</th>
              <th>Status</th>
              <th>Medical Store</th>
            </tr>
          </thead>
          <tbody>
            {medicines.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", padding: "16px" }}>
                  No expiring medicines found.
                </td>
              </tr>
            ) : (
              medicines.map((m, index) => {
                // Determine status color
                let statusClass = "";
                switch (m.status?.trim().toUpperCase()) {
                  case "ACTIVE":
                    statusClass = "active";
                    break;
                  case "INACTIVE":
                    statusClass = "inactive";
                    break;
                  case "OUT_OF_STOCK":
                    statusClass = "out-of-stock";
                    break;
                  case "EXPIRED":
                    statusClass = "expired";
                    break;
                  case "DELETED":
                    statusClass = "deleted";
                    break;
                  default:
                    statusClass = "";
                }

                return (
                  <tr key={m.id || index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="store-cell">
                        <div className="store-icon">💊</div>
                        <strong>{m.brand}</strong>
                      </div>
                    </td>
                    <td>{m.quantity}</td>
                    <td>{m.price.toFixed(2)}</td>
                    <td>{m.discount.toFixed(2)}</td>
                    <td>{new Date(m.mfgDate).toLocaleDateString()}</td>
                    <td>{new Date(m.expDate).toLocaleDateString()}</td>
                    <td>
                      <span className={`status-label ${statusClass}`}>
                        {m.status?.trim().replaceAll("_", " ")}
                      </span>
                    </td>
                    <td>{m.medicalName}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewExpiringMedicines;
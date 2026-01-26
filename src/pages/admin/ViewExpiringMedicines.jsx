import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";

const ViewExpiringMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpiring = async () => {
    try {
      const response = await axiosInstance.get("/admin/medicines/expiring");
      setMedicines(response.data);
    } catch (err) {
      console.error("Error fetching expiring medicines:", err);
      setError(err.response?.data?.message || "Failed to fetch expiring medicines");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpiring();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Expired / Near 1 Month Expiry Medicines</h2>
      {medicines.length === 0 ? (
        <p>No medicines expiring soon.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#2980b9", color: "white" }}>
            <tr>
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
            {medicines.map((m, idx) => (
              <tr key={idx} style={{ backgroundColor: "#ecf0f1" }}>
                <td>{m.brand}</td>
                <td>{m.quantity}</td>
                <td>{m.price.toFixed(2)}</td>
                <td>{m.discount.toFixed(2)}</td>
                <td>{new Date(m.mfgDate).toLocaleDateString()}</td>
                <td>{new Date(m.expDate).toLocaleDateString()}</td>
                <td>
                  <span
                    style={{
                      padding: "5px 10px",
                      borderRadius: "5px",
                      backgroundColor:
                        new Date(m.expDate) < new Date() ? "#e74c3c" : "#f1c40f",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {m.status}
                  </span>
                </td>
                <td>{m.medicalName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewExpiringMedicines;

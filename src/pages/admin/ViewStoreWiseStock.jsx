import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import "./ViewStoreWiseStock.css";

const ViewStoreWiseStock = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStoreWiseStock = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/admin/store-wise-stock");
      setStores(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching store-wise stock:", err);
      setError(err.response?.data?.message || "Failed to fetch store stock");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStoreWiseStock();
  }, []);

  // Map enum status to CSS classes
  const getStatusClass = (status) => {
    switch (status?.trim().toUpperCase()) {
      case "ACTIVE":
        return "active";
      case "INACTIVE":
        return "inactive";
      case "OUT_OF_STOCK":
        return "out-of-stock";
      case "EXPIRED":
        return "expired";
      case "DELETED":
        return "deleted";
      default:
        return "";
    }
  };

  if (loading) return <p>Loading store-wise stock...</p>;
  if (error) return <p className="error">{error}</p>;
  if (stores.length === 0) return <p>No stores found.</p>;

  return (
    <div className="storewise-wrapper">
      {stores.map((store) => (
        <div key={store.medicalId} className="store-card">
          {/* Store Header */}
          <div className="store-header">
            <div className="store-icon">🏥</div>
            <div className="store-info">
              <h3>{store.medicalStoreName}</h3>
              <p>{store.contact || store.email}</p>
            </div>
          </div>

          {/* Medicines Table */}
          {store.medicines.length === 0 ? (
            <p className="no-medicines">No medicines in this store.</p>
          ) : (
            <div className="table-responsive">
              <table className="medicine-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Brand</th>
                    <th className="wrap-text">Description</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>MFG</th>
                    <th>EXP</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {store.medicines.map((m, index) => (
                    <tr
                      key={m.medicineId}
                      className={index % 2 === 0 ? "even-row" : "odd-row"}
                    >
                      <td>{m.medicineId}</td>
                      <td>{m.brand}</td>
                      <td className="wrap-text">{m.description}</td>
                      <td>{m.quantity}</td>
                      <td>{m.price}</td>
                      <td>{m.discount}</td>
                      <td>{m.mfgDate}</td>
                      <td>{m.expDate}</td>
                      <td>
                        <span
                          className={`status-label ${getStatusClass(m.status)}`}
                        >
                          {m.status?.trim().replaceAll("_", " ")}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ViewStoreWiseStock;
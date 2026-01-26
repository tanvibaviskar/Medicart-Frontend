import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";

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

  if (loading) return <p>Loading store-wise stock...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (stores.length === 0) return <p>No stores found.</p>;

  return (
    <div className="storewise-container">
      <h2>Store Wise Medicine Stock</h2>

      {stores.map((store) => (
        <div key={store.medicalId} className="store-section">
          {/* 👈 Show store/medical name above the table */}
          <h3 className="store-name">{store.medicalStoreName}</h3>


          {store.medicines.length === 0 ? (
            <p className="no-medicines">No medicines in this store.</p>
          ) : (
            <div className="table-container">
              <table className="store-table">
                <thead>
                  <tr>
                    <th>Medicine ID</th>
                    <th>Brand</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>MFG Date</th>
                    <th>EXP Date</th>
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
                      <td>{m.description}</td>
                      <td>{m.quantity}</td>
                      <td>{m.price}</td>
                      <td>{m.discount}</td>
                      <td>{m.mfgDate}</td>
                      <td>{m.expDate}</td>
                      <td>
                        <span className={`status-badge ${m.status.toLowerCase()}`}>
                          {m.status}
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

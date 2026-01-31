import axios from "axios";
import { useEffect, useState } from "react";
import "./ViewAllMedicals.css";

const ViewAllMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:9090/admin/medicines", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setMedicines(res.data); // include all medicines (ACTIVE/INACTIVE/DELETED)
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading medicines...</p>;

  return (
    <div className="medical-table-wrapper">
      <div className="medical-table-header">
        <div>
          <h2>Medicines</h2>
          <p>View all registered medicines</p>
        </div>
      </div>

      <div className="table-responsive">
        <table className="medical-table">
          <thead>
            <tr>
              <th style={{ width: "40px" }}>ID</th>
              <th style={{ width: "120px" }}>Brand</th>
              <th style={{ width: "200px" }}>Description</th>
              <th style={{ width: "180px" }}>Store</th>
              <th style={{ width: "60px" }}>Qty</th>
              <th style={{ width: "80px" }}>Price</th>
              <th style={{ width: "80px" }}>Discount</th>
              <th style={{ width: "100px" }}>MFG</th>
              <th style={{ width: "100px" }}>EXP</th>
              <th style={{ width: "100px" }}>Status</th>
            </tr>
          </thead>

          <tbody>
            {medicines.map((m, index) => (
              <tr key={m.medicineId}>
                <td>{index + 1}</td>
                <td>
                  <div className="store-cell">
                    <div className="store-icon">💊</div>
                    <strong>{m.brand}</strong>
                  </div>
                </td>
                <td className="wrap-text">{m.description}</td>
                <td className="wrap-text">{m.medicalStoreName}</td>
                <td>{m.quantity}</td>
                <td>₹{m.price}</td>
                <td>₹{m.discount}</td>
                <td>{m.mfgDate}</td>
                <td>{m.expDate}</td>
                <td>
                  <span
                    className={`status-dropdown ${
                      m.status.toLowerCase() === "active"
                        ? "approved"
                        : m.status.toLowerCase() === "inactive"
                          ? "rejected"
                          : "deleted"
                    }`}
                    style={{ cursor: "default" }}
                  >
                    {m.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllMedicines;
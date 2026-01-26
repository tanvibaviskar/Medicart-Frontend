import axios from "axios";
import { useEffect, useState } from "react";
import "./AdminDashboard.css";

const ViewAllMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/medicines", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setMedicines(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading medicines...</p>;

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Brand</th>
            <th>Description</th>
            <th>Store</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Discount</th>
            <th>MFG</th>
            <th>EXP</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {medicines.map((m) => (
            <tr key={m.medicineId}>
              <td>{m.medicineId}</td>
              <td>{m.brand}</td>
              <td>{m.description}</td>
              <td>{m.medicalStoreName}</td>
              <td>{m.quantity}</td>
              <td>₹{m.price}</td>
              <td>₹{m.discount}</td>
              <td>{m.mfgDate}</td>
              <td>{m.expDate}</td>
              <td className={m.status === "ACTIVE" ? "active" : "inactive"}>
                {m.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAllMedicines;

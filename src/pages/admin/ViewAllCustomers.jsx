import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import "./ViewAllMedicals.css"; // reuse the same CSS

const ViewAllCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch all customers
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/admin/customers");
      setCustomers(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError(err.response?.data?.message || "Failed to fetch customers");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) return <p>Loading customers...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="medical-table-wrapper">
      <div className="medical-table-header">
        <div>
          <h2>Customers</h2>
          <p>View all registered customers</p>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="medical-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Pincode</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((c, index) => (
              <tr key={c.id}>
                <td>{index + 1}</td>
                <td>
                  <div className="store-cell">
                    <div className="store-icon">👤</div>
                    <strong>{c.userDetails?.fullname}</strong>
                  </div>
                </td>
                <td>{c.userDetails?.email}</td>
                <td>{c.userDetails?.contact}</td>
                <td>{c.latitude}</td>
                <td>{c.longitude}</td>
                <td>{c.pincode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllCustomers;
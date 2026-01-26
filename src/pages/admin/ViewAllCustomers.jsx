import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";

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
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>All Customers</h2>

      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              minWidth: "900px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <thead style={{ backgroundColor: "#2980b9", color: "white" }}>
              <tr>
                <th style={{ padding: "10px" }}>ID</th>
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
                <tr
                  key={c.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#ecf0f1" : "#ffffff",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#d1e7ff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      index % 2 === 0 ? "#ecf0f1" : "#ffffff")
                  }
                >
                  <td style={{ padding: "8px", textAlign: "center" }}>{c.id}</td>
                  <td>{c.userDetails?.fullname}</td>
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
      )}
    </div>
  );
};

export default ViewAllCustomers;

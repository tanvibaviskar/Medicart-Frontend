import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios"; // ✅ use axiosInstance with token
import "./SearchMedicines.css";

const SearchMedicines = () => {
  const [brand, setBrand] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch medicines from backend
  const fetchMedicines = async () => {
  if (!brand) {
    setMedicines([]);
    return;
  }
  setLoading(true);
  setError("");
  try {
    const res = await axiosInstance.get(
      `/customers/medicines/search?brand=${brand}` // ✅ correct URL
    );
    setMedicines(res.data);
  } catch (err) {
    console.error(err);
    if (err.response?.status === 403) {
      setError("You are not authorized to access this resource.");
    } else if (err.response?.status === 404) {
      setError("Endpoint not found. Check backend URL.");
    } else {
      setError("Failed to fetch medicines. Try again.");
    }
  } finally {
    setLoading(false);
  }
};

  // Fetch when user types (with debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMedicines();
    }, 500); // fetch after 500ms of no typing
    return () => clearTimeout(timer);
  }, [brand]);

  return (
    <div className="search-medicines-container">
      <h2>Search Medicines by Brand</h2>
      <input
        type="text"
        placeholder="Enter brand name..."
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        className="brand-input"
      />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && medicines.length === 0 && brand && <p>No medicines found.</p>}

      <table className="medicines-table">
        <thead>
          <tr>
            <th>Brand</th>
            <th>Description</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Final Price</th>
            <th>Mfg Date</th>
            <th>Exp Date</th>
            <th>Medical Store</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((med) => (
            <tr key={med.id}>
              <td>{med.brand}</td>
              <td>{med.description}</td>
              <td>{med.stock}</td>
              <td>{med.price}</td>
              <td>{med.discount}</td>
              <td>{med.finalPrice}</td>
              <td>{med.mfgDate}</td>
              <td>{med.expDate}</td>
              <td>{med.medicalName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchMedicines;

import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import "./SearchMedicines.css";

const SearchMedicines = () => {
  const [brand, setBrand] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Filters
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minDiscount, setMinDiscount] = useState("");
  const [maxDiscount, setMaxDiscount] = useState("");
  const [inStock, setInStock] = useState(null); // null = all, true = available, false = out of stock

  const fetchMedicines = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.get("/customers/medicines/search", {
        params: {
          brand: brand || undefined,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
          minDiscount: minDiscount || undefined,
          maxDiscount: maxDiscount || undefined,
          inStock: inStock !== null ? inStock : undefined,
        },
      });
      setMedicines(res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 403) {
        setError("You are not authorized.");
      } else if (err.response?.status === 404) {
        setError("Endpoint not found.");
      } else {
        setError("Failed to fetch medicines.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch when brand or filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMedicines();
    }, 300); // debounce
    return () => clearTimeout(timer);
  }, [brand, minPrice, maxPrice, minDiscount, maxDiscount, inStock]);

  return (
    <div className="search-medicines-container">
      <h2>Search Medicines</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Discount %"
          value={minDiscount}
          onChange={(e) => setMinDiscount(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Discount %"
          value={maxDiscount}
          onChange={(e) => setMaxDiscount(e.target.value)}
        />
        <select
          value={inStock === null ? "" : inStock ? "true" : "false"}
          onChange={(e) => {
            if (e.target.value === "") setInStock(null);
            else setInStock(e.target.value === "true");
          }}
        >
          <option value="">All</option>
          <option value="true">Available</option>
          <option value="false">Out of stock</option>
        </select>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && medicines.length === 0 && <p>No medicines found.</p>}

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

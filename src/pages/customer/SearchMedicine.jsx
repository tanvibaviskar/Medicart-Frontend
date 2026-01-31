import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import "./SearchMedicines.css";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const SearchMedicines = () => {
  const { cartItems, addToCart } = useCart();
  const navigate = useNavigate();

  const [brand, setBrand] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Filters
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minDiscount, setMinDiscount] = useState("");
  const [maxDiscount, setMaxDiscount] = useState("");
  const [inStock, setInStock] = useState(null);

  useEffect(() => {
    console.log("🛒 Cart Items:", cartItems);
  }, [cartItems]);

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
      setError("Failed to fetch medicines.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (med) => {
    addToCart({
      medicineId: med.medicineId || med.id,
      medicalId: med.medicalId,
      brand: med.brand,
      price: med.finalPrice,
      quantity: 1,
    });

    alert("Added to cart");
  };

  useEffect(() => {
    const timer = setTimeout(fetchMedicines, 300);
    return () => clearTimeout(timer);
  }, [brand, minPrice, maxPrice, minDiscount, maxDiscount, inStock]);

  // 🔴 Cart count starts at 0 and sums quantity
  const cartCount =
    cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <div className="search-medicines-container">
      <div className="search-header">
        <h2>Search Medicines</h2>

        {/* 🔴 CART ICON WITH COUNT */}
        <div
          className="cart-icon-wrapper"
          onClick={() => navigate("/customer/cart")}
        >
          <div className="icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="26px"
              viewBox="0 -960 960 960"
              width="26px"
              className="cart-icon"
            >
              <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Z" />
            </svg>

            {/* 🔴 Badge */}
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>

          {/* 🔴 Text */}
          <span className="cart-text">Go to Cart</span>
        </div>
      </div>

      <div className="filters-card">
        <input
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min ₹"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max ₹"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min %"
          value={minDiscount}
          onChange={(e) => setMinDiscount(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max %"
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

      {loading && <p className="status">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && medicines.length === 0 && (
        <p className="status">No medicines found.</p>
      )}

      <div className="table-wrapper">
        <table className="medicines-table">
          <thead>
            <tr>
              <th>Brand</th>
              <th>Description</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Final</th>
              <th>Mfg</th>
              <th>Exp</th>
              <th>Store</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((med) => (
              <tr key={med.id}>
                <td>{med.brand}</td>
                <td>{med.description}</td>
                <td>{med.stock}</td>
                <td>₹{med.price}</td>
                <td>{med.discount}%</td>
                <td className="price">₹{med.finalPrice}</td>
                <td>{med.mfgDate}</td>
                <td>{med.expDate}</td>
                <td>{med.medicalName}</td>
                <td>
                  <button
                    className="add-btn"
                    disabled={med.stock === 0}
                    onClick={() => handleAddToCart(med)}
                  >
                    Add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchMedicines;

import axios from "axios";
import { useState } from "react";
import "./UpdateInventory.css";

const UpdateInventory = () => {
  const [formData, setFormData] = useState({
    medicineId: "",
    quantity: "",
    price: "",
    discount: "",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:8080/medicals/updateInventory",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMsg("✅ Inventory updated successfully");

      setFormData({
        medicineId: "",
        quantity: "",
        price: "",
        discount: "",
      });
    } catch (err) {
      console.error(err);
      setMsg("❌ Failed to update inventory");
    }
  };

  return (
    <div className="update-inventory-card">
      <h2>Update Medicine Inventory</h2>

      {msg && <p className="msg">{msg}</p>}

      <form onSubmit={handleSubmit} className="inventory-form">
        <div className="form-group">
          <label>Medicine ID</label>
          <input
            type="number"
            name="medicineId"
            value={formData.medicineId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Discount (%)</label>
            <input
              type="number"
              step="0.01"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn-primary">
          Update Inventory
        </button>
      </form>
    </div>
  );
};

export default UpdateInventory;

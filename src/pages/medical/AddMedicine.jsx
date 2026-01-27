import axios from "axios";
import { useState } from "react";
import "./AddMedicine.css";

const AddMedicine = () => {
  const [formData, setFormData] = useState({
    brand: "",
    description: "",
    mfgDate: "",
    expDate: "",
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

      await axios.post(
        "http://localhost:8080/medicals/addMedicine",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMsg("✅ Medicine added successfully");

      setFormData({
        brand: "",
        description: "",
        mfgDate: "",
        expDate: "",
        quantity: "",
        price: "",
        discount: "",
      });
    } catch (err) {
      setMsg("❌ Failed to add medicine");
      console.error(err);
    }
  };

  return (
    <div className="add-medicine-card">
      <h2>Add New Medicine</h2>

      {msg && <p className="msg">{msg}</p>}

      <form onSubmit={handleSubmit} className="medicine-form">
        <div className="form-group">
          <label>Brand</label>
          <input name="brand" value={formData.brand} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input name="description" value={formData.description} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>MFG Date</label>
            <input type="date" name="mfgDate" value={formData.mfgDate} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>EXP Date</label>
            <input type="date" name="expDate" value={formData.expDate} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Quantity</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Discount (%)</label>
            <input type="number" step="0.01" name="discount" value={formData.discount} onChange={handleChange} />
          </div>
        </div>

        <button type="submit" className="btn-primary">
          Add Medicine
        </button>
      </form>
    </div>
  );
};

export default AddMedicine;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerCustomer } from "../api/customerService";

function Register() {
  const [form, setForm] = useState({
    full_name: "",
    contact: "",
    email: "",
    password: "",
    pincode: "",
    latitude: "",
    longitude: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 BACKEND COMPATIBLE PAYLOAD (NO BACKEND CHANGE)
    const payload = {
      userDetails: {
        fullname: form.full_name,   // ✅ IMPORTANT FIX
        contact: form.contact,
        email: form.email,
        password: form.password
      },
      pincode: form.pincode,
      latitude: Number(form.latitude),
      longitude: Number(form.longitude)
    };

    try {
      const res = await registerCustomer(payload);
      alert(res?.data?.message || "Registration successful");
      navigate("/login");
    } catch (err) {
      alert(err?.response?.data?.message || "Customer registration failed");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Customer Registration</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="tel"
          name="contact"
          placeholder="Contact Number"
          value={form.contact}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="latitude"
          placeholder="Latitude"
          value={form.latitude}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="longitude"
          placeholder="Longitude"
          value={form.longitude}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;

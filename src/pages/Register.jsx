import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerCustomer } from "../api/customerService";
import logo from "../assets/medicart-logo.png";

function Register() {
  const [form, setForm] = useState({
    full_name: "",
    contact: "",
    email: "",
    password: "",
    pincode: "",
    latitude: "",
    longitude: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      userDetails: {
        fullname: form.full_name,
        contact: form.contact,
        email: form.email,
        password: form.password,
      },
      pincode: form.pincode,
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
    };

    try {
      const res = await registerCustomer(payload);
      alert(res?.data?.message || "Registration successful");
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>

      <div style={styles.card}>
        <p style={styles.back} onClick={() => navigate("/login")}>
          ← Back to Login
        </p>

        <div style={styles.logoBox}>
          <img src={logo} alt="MediCart" style={{ width: 36 }} />
        </div>

        <h2 style={styles.title}>Create Customer Account</h2>
        <p style={styles.subtitle}>
          Join thousands of customers using MediCart
        </p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div style={styles.grid}>
            <input
              name="full_name"
              placeholder="Full Name"
              onChange={handleChange}
              required
              style={styles.input}
            />

            <input
              name="contact"
              placeholder="Contact Number"
              onChange={handleChange}
              required
              style={styles.input}
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
              style={styles.input}
            />

            <input
              name="pincode"
              placeholder="Pincode"
              onChange={handleChange}
              required
              style={styles.input}
            />

            <input
              name="latitude"
              placeholder="Latitude"
              onChange={handleChange}
              required
              style={styles.input}
            />

            <input
              name="longitude"
              placeholder="Longitude"
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            style={{ ...styles.input, marginTop: 16 }}
          />

          <button type="submit" style={styles.primaryBtn}>
            Create Account
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/login")}>
            Sign in here
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage:
      "url('https://plus.unsplash.com/premium_photo-1672759455907-bdaef741cd88?q=80&w=1416&auto=format&fit=crop')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Segoe UI, sans-serif",
    position: "relative",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(15, 23, 42, 0.6)",
    backdropFilter: "blur(2px)",
  },

  card: {
    position: "relative",
    width: 420,
    padding: 28,
    background: "rgba(255,255,255,0.95)",
    borderRadius: 16,
    boxShadow:
      "0 30px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.6)",
  },

  logoBox: {
    width: 46,
    height: 46,
    background: "#e0f2fe",
    borderRadius: 10,
    margin: "0 auto 12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    textAlign: "center",
    marginBottom: 4,
    fontWeight: 700,
  },

  subtitle: {
    textAlign: "center",
    color: "#64748b",
    fontSize: 14,
    marginBottom: 18,
  },

  back: {
    cursor: "pointer",
    color: "#38bdf8",
    fontSize: 13,
    marginBottom: 10,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    columnGap: "16px",
    rowGap: "14px",
  },

  input: {
    width: "100%",
    boxSizing: "border-box", // 🔥 THIS FIXES THE MERGING
    padding: "11px 12px",
    borderRadius: 8,
    border: "1px solid #cbd5e1",
    fontSize: 14,
  },

  primaryBtn: {
    width: "100%",
    padding: "12px",
    marginTop: 20,
    background: "linear-gradient(180deg, #0ea5e9, #0284c7)",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontSize: 15,
    cursor: "pointer",
    boxShadow: "0 10px 22px rgba(14,165,233,0.35)",
  },

  footer: {
    marginTop: 16,
    fontSize: 13,
    textAlign: "center",
    color: "#475569",
  },

  link: {
    color: "#38bdf8",
    cursor: "pointer",
    fontWeight: 600,
  },

  error: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
    textAlign: "center",
    fontSize: 13,
  },
};

export default Register;
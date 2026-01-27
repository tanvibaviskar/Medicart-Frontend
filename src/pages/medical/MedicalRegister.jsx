import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerMedical } from "../../api/medicalService";
import logo from "../../assets/medicart-logo.png";

function MedicalRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    contact: "",
    license: "",
    latitude: "",
    longitude: "",
  });

  // Auto-fill latitude & longitude
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setForm((prev) => ({
            ...prev,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }));
        },
        (err) => console.error("Geolocation error:", err),
      );
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      userDetails: {
        fullname: form.fullname,
        email: form.email,
        password: form.password,
        contact: form.contact,
      },
      license: form.license,
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
    };

    try {
      const res = await registerMedical(payload);
      alert(res?.data?.message || "Medical registration successful!");
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Medical registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.cardoverlay}></div>

      <div style={styles.card}>
        <p style={styles.back} onClick={() => navigate("/login")}>
          ← Back to Login
        </p>

        <div style={styles.logoBox}>
          <img src={logo} alt="MediCart" style={{ width: 36 }} />
        </div>

        <h2 style={styles.title}>Register Medical Store</h2>
        <p style={styles.subtitle}>
          Register your medical store to start selling on MediCart
        </p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            name="fullname"
            placeholder="Medical Store Name"
            value={form.fullname}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="contact"
            type="tel"
            placeholder="Contact Number"
            value={form.contact}
            onChange={handleChange}
            pattern="\d{10}"
            title="Enter 10 digit contact number"
            required
            style={styles.input}
          />

          <input
            name="license"
            placeholder="Medical License Number"
            value={form.license}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <div style={styles.grid}>
            <input
              name="latitude"
              placeholder="Latitude"
              value={form.latitude}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              name="longitude"
              placeholder="Longitude"
              value={form.longitude}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.primaryBtn,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Registering..." : "Register Medical"}
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    backgroundImage:
      "url('https://plus.unsplash.com/premium_photo-1672759455907-bdaef741cd88?q=80&w=1416&auto=format&fit=crop')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center", // vertical center
    justifyContent: "center", // horizontal center
    fontFamily: "Segoe UI, sans-serif",
    position: "relative",
    margin: 0,
    padding: 0,
    overflow: "hidden", // remove extra scroll if any
  },

  overlay: {
    position: "fixed", // changed from absolute
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(15, 23, 42, 0.6)",
    backdropFilter: "blur(2px)",
    zIndex: 1, // make sure overlay stays behind card
  },

  card: {
    position: "relative",
    width: 360, // smaller card width
    padding: 20, // smaller padding
    background: "rgba(255,255,255,0.95)",
    borderRadius: 16,
    boxShadow:
      "0 20px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.6)",
  },

  cardoverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(15, 23, 42, 0.6)",
    backdropFilter: "blur(2px)",
  },

  back: {
    cursor: "pointer",
    color: "#38bdf8",
    fontSize: 13,
    marginBottom: 10,
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
    marginBottom: 4,
    fontSize: 20,
  },

  subtitle: {
    color: "#555",
    marginBottom: 16,
    fontSize: 13,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    columnGap: "12px",
    rowGap: "10px",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "9px 10px",
    borderRadius: 8,
    border: "1px solid #cbd5e1",
    fontSize: 13,
    marginBottom: 10,
  },

  primaryBtn: {
    width: "100%",
    padding: "10px",
    marginTop: 16,
    background: "linear-gradient(180deg, #0ea5e9, #0284c7)",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontSize: 14,
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(14,165,233,0.35)",
  },

  footer: {
    marginTop: 14,
    fontSize: 12,
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
    padding: 6,
    borderRadius: 8,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 12,
  },
};

export default MedicalRegister;
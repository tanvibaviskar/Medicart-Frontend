import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerMedical } from "../../api/medicalService";
import logo from "../../assets/logo.png"; // your logo

function MedicalRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    contact: "",
    license: "",
    latitude: "",
    longitude: ""
  });

  // Auto-fill latitude/longitude using browser location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setForm((prev) => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }));
        },
        (error) => console.error("Geolocation error:", error)
      );
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      userDetails: {
        fullname: form.fullname,
        email: form.email,
        password: form.password,
        contact: form.contact
      },
      license: form.license,
      latitude: Number(form.latitude),
      longitude: Number(form.longitude)
    };

    try {
      const res = await registerMedical(payload);
      alert(res.data.message || "Medical registration successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Medical registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
        boxSizing: "border-box",
        background: "url('https://plus.unsplash.com/premium_photo-1672759455907-bdaef741cd88?q=80&w=1416&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.95)",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          width: "100%",
          maxWidth: "500px",
          maxHeight: "90vh",
          overflowY: "auto",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        {/* Logo */}
        <img src={logo} alt="Medicart Logo" style={{ width: "80px", marginBottom: "15px" }} />
        <h2 style={{ marginBottom: "20px", color: "#2c3e50" }}>Medical Registration</h2>

        <form onSubmit={handleSubmit} style={{ marginTop: "15px", textAlign: "left" }}>
          {[
            { name: "fullname", placeholder: "Medical Name", type: "text" },
            { name: "email", placeholder: "Email", type: "email" },
            { name: "password", placeholder: "Password", type: "password" },
            { name: "contact", placeholder: "Contact Number", type: "tel", pattern: "\\d{10}", title: "Enter 10 digit contact number" },
            { name: "license", placeholder: "Medical License Number", type: "text" },
            { name: "latitude", placeholder: "Latitude", type: "text" },
            { name: "longitude", placeholder: "Longitude", type: "text" },
          ].map((field) => (
            <div key={field.name} style={{ marginBottom: "12px" }}>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
                required
                pattern={field.pattern}
                title={field.title}
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                  outline: "none",
                  transition: "0.3s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#3498db")}
                onBlur={(e) => (e.target.style.borderColor = "#ccc")}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: "#27ae60",
              color: "#fff",
              fontSize: "18px",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#1e8449")}
            onMouseOut={(e) => (e.target.style.background = "#27ae60")}
          >
            {loading ? "Registering..." : "Register Medical"}
          </button>
        </form>

        <p style={{ marginTop: "15px", textAlign: "center", color: "#555" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "#3498db", cursor: "pointer", fontWeight: "bold" }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default MedicalRegister;

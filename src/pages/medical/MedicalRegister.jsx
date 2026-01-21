import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerMedical } from "../../api/medicalService";

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

  // Optional: Auto-fill latitude/longitude using browser location
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

    setLoading(true);
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
    <div style={{ maxWidth: "400px", margin: "40px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center" }}>Medical Registration</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="fullname"
          placeholder="Medical Name"
          value={form.fullname}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="contact"
          placeholder="Contact Number"
          value={form.contact}
          onChange={handleChange}
          required
          pattern="\d{10}"
          title="Enter 10 digit contact number"
        />
        <br /><br />

        <input
          name="license"
          placeholder="Medical License Number"
          value={form.license}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="latitude"
          placeholder="Latitude"
          value={form.latitude}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="longitude"
          placeholder="Longitude"
          value={form.longitude}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit" disabled={loading} style={{ width: "100%", padding: "10px" }}>
          {loading ? "Registering..." : "Register Medical"}
        </button>
      </form>
    </div>
  );
}

export default MedicalRegister;

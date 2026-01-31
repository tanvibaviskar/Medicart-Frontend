import axios from "axios";
import { useState } from "react";
import "./UpdateMedicalDetails.css";

const UpdateMedicalDetails = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [contact, setContact] = useState("");
  const [locationError, setLocationError] = useState("");
  const [msg, setMsg] = useState("");

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLocationError("");
      },
      () => {
        setLocationError("Location access denied. Please enter manually.");
      },
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    const payload = {
      latitude: latitude ? Number(latitude) : null,
      longitude: longitude ? Number(longitude) : null,
      contact,
    };

    try {
      const token = localStorage.getItem("token");

      await axios.put("http://localhost:9090/medicals/update", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMsg("✅ Medical details updated successfully");
    } catch (err) {
      console.error(err);
      setMsg("❌ Failed to update details");
    }
  };

  return (
    <div className="inventory-card-wrapper">
      <div className="inventory-card">
        <h2>Update Medical Details</h2>
        <p className="card-subtitle">
          Update location coordinates and contact information
        </p>

        <button onClick={handleGetLocation} className="location-btn">
          📍 Use Current Location
        </button>

        {locationError && <p className="error-text">{locationError}</p>}
        {msg && <p className="msg">{msg}</p>}

        <form onSubmit={handleSubmit} className="inventory-form">
          <div className="form-row">
            <div className="form-group">
              <label>Latitude</label>
              <input
                type="number"
                step="any"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="Enter latitude"
              />
            </div>

            <div className="form-group">
              <label>Longitude</label>
              <input
                type="number"
                step="any"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="Enter longitude"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter contact number"
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            Update Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMedicalDetails;

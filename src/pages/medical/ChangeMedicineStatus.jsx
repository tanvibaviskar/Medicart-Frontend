import axios from "axios";
import { useEffect, useState } from "react";
import "./ChangeMedicineStatus.css";

const ChangeMedicineStatus = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [msg, setMsg] = useState("");

  // 🔹 Fetch all medicines for logged-in medical
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:8080/medicals/viewStatus",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("API Response:", res.data);

        // ✅ Handles:
        // 1) Direct array
        // 2) ApiResponse { data: [...] }
        // 3) ApiResponse { data: { medicines: [...] } }
        let medicinesArray = [];

        if (Array.isArray(res.data)) {
          medicinesArray = res.data;
        } else if (Array.isArray(res.data?.data)) {
          medicinesArray = res.data.data;
        } else if (Array.isArray(res.data?.data?.medicines)) {
          medicinesArray = res.data.data.medicines;
        }

        setMedicines(medicinesArray);
      } catch (err) {
        console.error(err);
        setMsg("❌ Failed to load medicines");
        setMedicines([]);
      }
    };

    fetchMedicines();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!selectedMedicine) {
      setMsg("❌ Please select a medicine");
      return;
    }

    const medicineId = Number(selectedMedicine);

    // 🔹 Avoid unnecessary update
    const currentStatus = medicines.find(
      (m) => m.id === medicineId
    )?.status;

    if (currentStatus === status) {
      setMsg("⚠️ Medicine already has this status");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:8080/medicals/changeMedicineStatus/${medicineId}`,
        null,
        {
          params: { status },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMsg("✅ Medicine status updated successfully");

      // 🔹 Update UI instantly
      setMedicines((prev) =>
        prev.map((med) =>
          med.id === medicineId ? { ...med, status } : med
        )
      );
    } catch (err) {
      console.error(err);
      setMsg("❌ Failed to update medicine status");
    }
  };

  return (
    <div className="update-status-container">
      <h2>Change Medicine Status</h2>

      {msg && <p className="msg-text">{msg}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Medicine</label>
          <select
            value={selectedMedicine}
            onChange={(e) => setSelectedMedicine(e.target.value)}
            required
          >
            <option value="">-- Select Medicine --</option>

            {medicines.map((med) => (
              <option key={med.id} value={med.id}>
                {med.brand} ({med.status})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
            <option value="EXPIRED">EXPIRED</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Update Status
        </button>
      </form>
    </div>
  );
};

export default ChangeMedicineStatus;

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/medicart-logo.png";
import { AuthContext } from "../../auth/AuthContext";

import AddMedicine from "./AddMedicine";
import ChangeMedicineStatus from "./ChangeMedicineStatus";
import "./MedicalDashboard.css";
import MedicalDashboardHome from "./MedicalDashboardHome";
import UpdateInventory from "./UpdateInventory";
import UpdateMedicalDetails from "./UpdateMedicalDetails";
import ViewOrders from "./ViewOrders";


import MedicalMedicineTable from "./MedicalMedicineTable"; // ✅ NEW



const MedicalDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="Medicart" />
          <div className="user-info">
  <span className="user-name">{user?.fullName}</span>
  
</div>

        </div>

        <ul className="menu">
          <li
            className={activeTab === "Dashboard" ? "active-tab" : ""}
            onClick={() => setActiveTab("Dashboard")}
          >
            Dashboard
          </li>
           <li
            className={activeTab === "AddMedicine" ? "active-tab" : ""}
            onClick={() => setActiveTab("AddMedicine")}
          >
            Add Medicine
          </li>

          <li
  className={activeTab === "UpdateInventory" ? "active-tab" : ""}
  onClick={() => setActiveTab("UpdateInventory")}
>
  Update Inventory
</li>
        <li
  className={activeTab === "UpdateMedical" ? "active-tab" : ""}
  onClick={() => setActiveTab("UpdateMedical")}
>
  Update Medical Details
</li>

<li
  className={activeTab === "ChangeStatus" ? "active-tab" : ""}
  onClick={() => setActiveTab("ChangeStatus")}
>
  Change Medicine Status
</li>
<li
            className={activeTab === "MyMedicines" ? "active-tab" : ""}
            onClick={() => setActiveTab("MyMedicines")}
          >
            My Medicines
          </li>
          <li
            className={activeTab === "ViewOrders" ? "active-tab" : ""}
            onClick={() => setActiveTab("ViewOrders")}
          >
            My Orders
          </li>


          <li onClick={handleLogout} style={{ color: "red", cursor: "pointer" }}>
            Logout
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1>Welcome, {user?.full_name}</h1>
        </header>

        {activeTab === "Dashboard" && <MedicalDashboardHome />}
        {activeTab === "AddMedicine" && <AddMedicine />}
        {activeTab === "UpdateInventory" && <UpdateInventory />}
        {activeTab === "UpdateMedical" && <UpdateMedicalDetails />}
        {activeTab === "ChangeStatus" && <ChangeMedicineStatus />}
        {activeTab === "MyMedicines" && <MedicalMedicineTable />} {/* ✅ */}
        {activeTab === "ViewOrders" && <ViewOrders />}


      </main>
    </div>
  );
};

export default MedicalDashboard;

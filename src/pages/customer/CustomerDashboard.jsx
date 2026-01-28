import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/medicart-logo.png";
import { AuthContext } from "../../auth/AuthContext";


import "./CustomerDashboard.css";

import CustomerDashboardHome from "./CustomerDashboardHome";

import NearbyMedicals from "./NearbyMedicals";




const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const { user, logoutUser } = useContext(AuthContext);
   console.log("USER OBJECT 👉", user); 
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
  className={activeTab === "Nearby" ? "active-tab" : ""}
  onClick={() => setActiveTab("Nearby")}
>
  Nearby Medicals
</li>


          <li onClick={handleLogout} style={{ color: "red", cursor: "pointer" }}>
            Logout
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1>Welcome, {user?.fullName}</h1>

        </header>

        {activeTab === "Dashboard" && <CustomerDashboardHome />}
       {activeTab === "Nearby" && <NearbyMedicals />}


      </main>
    </div>
  );
};

export default CustomerDashboard;

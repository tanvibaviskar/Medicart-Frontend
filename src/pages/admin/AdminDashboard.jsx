import { useState } from "react";
import logo from "../../assets/logo.png";
import "./AdminDashboard.css";

import ViewAllCustomers from "./ViewAllCustomers";
import ViewAllMedicals from "./ViewAllMedicals";
import ViewAllMedicines from "./ViewAllMedicines";
import ViewExpiringMedicines from "./ViewExpiringMedicines";
import ViewStoreWiseStock from "./ViewStoreWiseStock"; // ✅ NEW COMPONENT


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="MediCart" />
          <span>MediCart Admin</span>
        </div>

        <ul className="menu">
          {["Dashboard", "Customers", "Medicines", "Store Wise Stock","Expiring Medicines"].map((tab) => (
            <li
              key={tab}
              className={activeTab === tab ? "active-tab" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <h1>{activeTab}</h1>
        </header>

        {/* ================= DASHBOARD ================= */}
        {activeTab === "Dashboard" && <ViewAllMedicals />}

        {/* ================= CUSTOMERS ================= */}
        {activeTab === "Customers" && <ViewAllCustomers />}

        {/* ================= MEDICINES ================= */}
        {activeTab === "Medicines" && <ViewAllMedicines />}

        {/* ================= STORE WISE STOCK ================= */}
        {activeTab === "Store Wise Stock" && <ViewStoreWiseStock />}

        {activeTab === "Expiring Medicines" && <ViewExpiringMedicines />}

      </main>
    </div>
  );
};

export default AdminDashboard;

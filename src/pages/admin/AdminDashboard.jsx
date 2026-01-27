import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/medicart-logo.png";
import "./AdminDashboard.css";

import ViewAllCustomers from "./ViewAllCustomers";
import ViewAllMedicals from "./ViewAllMedicals";
import ViewAllMedicines from "./ViewAllMedicines";
import ViewExpiringMedicines from "./ViewExpiringMedicines";
import ViewStoreWiseStock from "./ViewStoreWiseStock";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const navigate = useNavigate(); //for logout

  const handleLogout = () => {
    alert("You have been logged out successfully.");

    localStorage.clear(); // clear auth/session data
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="admin-layout">
      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="MediCart" />
          <h2>
            MediCart
            <br />
            Admin
          </h2>
        </div>

        <ul className="sidebar-menu">
          {[
            {
              name: "Dashboard",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 -960 960 960"
                  width="20"
                  fill="currentColor"
                >
                  <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
                </svg>
              ),
            },
            {
              name: "Customers",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 -960 960 960"
                  width="20"
                  fill="currentColor"
                >
                  <path d="M200-246q54-53 125.5-83.5T480-360q83 0 154.5 30.5T760-246v-514H200v514Zm280-194q58 0 99-41t41-99q0-58-41-99t-99-41q-58 0-99 41t-41 99q0 58 41 99t99 41ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm69-80h422q-44-39-99.5-59.5T480-280q-56 0-112.5 20.5T269-200Zm211-320q-25 0-42.5-17.5T420-580q0-25 17.5-42.5T480-640q25 0 42.5 17.5T540-580q0 25-17.5 42.5T480-520Zm0 17Z" />
                </svg>
              ),
            },
            {
              name: "Medicines",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 -960 960 960"
                  width="20"
                  fill="currentColor"
                >
                  <path d="M345-120q-94 0-159.5-65.5T120-345q0-45 17-86t49-73l270-270q32-32 73-49t86-17q94 0 159.5 65.5T840-615q0 45-17 86t-49 73L504-186q-32 32-73 49t-86 17Zm266-286 107-106q20-20 31-47t11-56q0-60-42.5-102.5T615-760q-29 0-56 11t-47 31L406-611l205 205ZM345-200q29 0 56-11t47-31l106-107-205-205-107 106q-20 20-31 47t-11 56q0 60 42.5 102.5T345-200Z" />
                </svg>
              ),
            },
            {
              name: "Store Inventory",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 -960 960 960"
                  width="20"
                  fill="currentColor"
                >
                  <path d="M620-163 450-333l56-56 114 114 226-226 56 56-282 282Zm220-397h-80v-200h-80v120H280v-120h-80v560h240v80H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h167q11-35 43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 0 56.5 23.5T840-760v200ZM480-760q17 0 28.5-11.5T520-800q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800q0 17 11.5 28.5T480-760Z" />
                </svg>
              ),
            },
            {
              name: "Expiry Monitoring",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 -960 960 960"
                  width="20"
                  fill="currentColor"
                >
                  <path d="M480-240q100 0 170-70t70-170q0-100-70-170t-170-70v240L310-310q35 33 78.5 51.5T480-240Zm0 160q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                </svg>
              ),
            },
          ].map((item) => (
            <li
              key={item.name}
              className={activeTab === item.name ? "active" : ""}
              onClick={() => setActiveTab(item.name)}
            >
              <span className="menu-icon">{item.icon}</span>
              <span>{item.name}</span>
            </li>
          ))}
        </ul>

        <div className="logout">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="main">
        {/* ================= HEADER ================= */}
        <header className="topbar">
          <div>
            <h1>Dashboard Overview</h1>
            <p>Welcome back, monitor your platform activity</p>
          </div>

          <div className="topbar-right">
            <div className="bell">
              🔔
              <span />
            </div>

            <div className="admin-info">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                alt="admin"
              />
              <strong>Admin User</strong>
            </div>
          </div>
        </header>

        {/* ================= CONTENT (SCROLL ENABLED) ================= */}
        <div className="content">
          {activeTab === "Dashboard" && (
            <>
              <div className="cards">
                <div className="card">
                  <div className="icon blue">👥</div>
                  <h2>2,847</h2>
                  <p>Total Customers</p>
                  <span className="positive">+12.5% from last month</span>
                </div>

                <div className="card">
                  <div className="icon green">🏥</div>
                  <h2>342</h2>
                  <p>Medical Stores</p>
                  <span className="positive">+8.2% from last month</span>
                </div>

                <div className="card">
                  <div className="icon yellow">⏰</div>
                  <h2>23</h2>
                  <p>Pending Approvals</p>
                  <span className="warning">Requires action</span>
                </div>

                <div className="card">
                  <div className="icon blue">🛒</div>
                  <h2>1,456</h2>
                  <p>Orders This Month</p>
                  <span className="positive">+18.7% from last month</span>
                </div>
              </div>

              <ViewAllMedicals />
            </>
          )}

          {activeTab === "Customers" && <ViewAllCustomers />}
          {activeTab === "Medicines" && <ViewAllMedicines />}
          {activeTab === "Store Inventory" && <ViewStoreWiseStock />}
          {activeTab === "Expiry Monitoring" && <ViewExpiringMedicines />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
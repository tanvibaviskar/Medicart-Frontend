import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/medicart-logo.png";
import { AuthContext } from "../../auth/AuthContext";

import AddMedicine from "./AddMedicine";
import ChangeMedicineStatus from "./ChangeMedicineStatus";
import MedicalDashboardHome from "./MedicalDashboardHome";
import UpdateInventory from "./UpdateInventory";
import UpdateMedicalDetails from "./UpdateMedicalDetails";
import ViewOrders from "./ViewOrders";
import MedicalMedicineTable from "./MedicalMedicineTable";

import "./MedicalDashboard.css";

const MedicalDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    alert("You have been logged out successfully!"); // ✅ alert after logout
    navigate("/login");
  };

  return (
    <div className="admin-layout">
      {/* ========== SIDEBAR ========== */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="MediCart" />
          <h2>
            MediCart
            <br />
            Medical
          </h2>
        </div>

        <ul className="sidebar-menu">
          {/* Dashboard */}
          <li
            className={activeTab === "Dashboard" ? "active" : ""}
            onClick={() => setActiveTab("Dashboard")}
          >
            <span className="menu-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 -960 960 960"
                width="20"
                fill="currentColor"
              >
                <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
              </svg>
            </span>
            <span>Dashboard</span>
          </li>

          <li
            className={activeTab === "AddMedicine" ? "active" : ""}
            onClick={() => setActiveTab("AddMedicine")}
          >
            <span className="menu-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 -960 960 960"
                width="20"
                fill="currentColor"
              >
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
              </svg>
            </span>
            <span>Add Medicine</span>
          </li>

          <li
            className={activeTab === "Manage Inventory" ? "active" : ""}
            onClick={() => setActiveTab("Manage Inventory")}
          >
            <span className="menu-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 -960 960 960"
                width="20"
                fill="currentColor"
              >
                <path d="M620-163 450-333l56-56 114 114 226-226 56 56-282 282Zm220-397h-80v-200h-80v120H280v-120h-80v560h240v80H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h167q11-35 43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 0 56.5 23.5T840-760v200ZM480-760q17 0 28.5-11.5T520-800q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800q0 17 11.5 28.5T480-760Z" />
              </svg>
            </span>
            <span>Manage Inventory</span>
          </li>

          <li
            className={activeTab === "Update Store Info" ? "active" : ""}
            onClick={() => setActiveTab("Update Store Info")}
          >
            <span className="menu-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 -960 960 960"
                width="20"
                fill="currentColor"
              >
                <path d="M480-120q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-480q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q82 0 155.5 35T760-706v-94h80v240H600v-80h110q-41-56-101-88t-129-32q-117 0-198.5 81.5T200-480q0 117 81.5 198.5T480-200q105 0 183.5-68T756-440h82q-15 137-117.5 228.5T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z" />
              </svg>
            </span>
            <span>Update Store Info</span>
          </li>

          <li
            className={activeTab === "MyMedicines" ? "active" : ""}
            onClick={() => setActiveTab("MyMedicines")}
          >
            <span className="menu-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 -960 960 960"
                width="20"
                fill="currentColor"
              >
                <path d="M345-120q-94 0-159.5-65.5T120-345q0-45 17-86t49-73l270-270q32-32 73-49t86-17q94 0 159.5 65.5T840-615q0 45-17 86t-49 73L504-186q-32 32-73 49t-86 17Zm266-286 107-106q20-20 31-47t11-56q0-60-42.5-102.5T615-760q-29 0-56 11t-47 31L406-611l205 205ZM345-200q29 0 56-11t47-31l106-107-205-205-107 106q-20 20-31 47t-11 56q0 60 42.5 102.5T345-200Z" />
              </svg>
            </span>
            <span>My Medicines</span>
          </li>

          <li
            className={activeTab === "Manage Orders" ? "active" : ""}
            onClick={() => setActiveTab("Manage Orders")}
          >
            <span className="menu-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 -960 960 960"
                width="20"
                fill="currentColor"
              >
                <path d="M160-160v-516L82-846l72-34 94 202h464l94-202 72 34-78 170v516H160Zm240-280h160q17 0 28.5-11.5T600-480q0-17-11.5-28.5T560-520H400q-17 0-28.5 11.5T360-480q0 17 11.5 28.5T400-440ZM240-240h480v-358H240v358Zm0 0v-358 358Z" />
              </svg>
            </span>
            <span>Manage Orders</span>
          </li>
        </ul>

        <div className="logout">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </aside>

      {/* ========== MAIN ========== */}
      <div className="main">
        <header className="topbar">
          <div>
            <h1>Medical Dashboard</h1>
            <p>Welcome back, manage your store efficiently</p>
          </div>

          <div className="topbar-right">
            <div className="bell">
              🔔
              <span />
            </div>

            <div className="admin-info">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=medical"
                alt="medical"
              />
              <strong>{user?.fullName || "Medical User"}</strong>
            </div>
          </div>
        </header>

        <div className="content">
          {activeTab === "Dashboard" && (
            <>
              {/* ===== WELCOME MESSAGE ===== */}
              <MedicalDashboardHome />
              {/* ===== DASHBOARD CARDS ===== */}
              <div className="cards">
                <div className="card">
                  <div className="icon blue">💊</div>
                  <h2>1,284</h2>
                  <p>Total Medicines</p>
                  <span className="positive">Stock healthy</span>
                </div>

                <div className="card">
                  <div className="icon green">📦</div>
                  <h2>342</h2>
                  <p>Inventory Items</p>
                  <span className="positive">Updated today</span>
                </div>

                <div className="card">
                  <div className="icon yellow">⏳</div>
                  <h2>18</h2>
                  <p>Expiring Soon</p>
                  <span className="warning">Within 30 days</span>
                </div>

                <div className="card">
                  <div className="icon blue">🛒</div>
                  <h2>96</h2>
                  <p>Orders This Month</p>
                  <span className="positive">+14% growth</span>
                </div>
              </div>

              {/* ===== INFO SECTION ===== */}
              <div className="dashboard-info">
                <div className="info-card">
                  <h3>🏥 Store Overview</h3>
                  <p>
                    Manage medicines, monitor expiry dates, maintain inventory
                    levels and fulfill customer orders efficiently from one
                    place.
                  </p>
                </div>

                <div className="info-card">
                  <h3>⚡ Quick Responsibilities</h3>
                  <ul>
                    <li>Add & update medicines</li>
                    <li>Maintain real-time stock</li>
                    <li>Prevent expired medicine sales</li>
                    <li>Handle incoming orders</li>
                  </ul>
                </div>
              </div>
            </>
          )}

          {activeTab === "AddMedicine" && <AddMedicine />}
          {activeTab === "Manage Inventory" && <UpdateInventory />}
          {activeTab === "Update Store Info" && <UpdateMedicalDetails />}
          {activeTab === "ChangeStatus" && <ChangeMedicineStatus />}
          {activeTab === "MyMedicines" && <MedicalMedicineTable />}
          {activeTab === "Manage Orders" && <ViewOrders />}
        </div>
      </div>
    </div>
  );
};

export default MedicalDashboard;

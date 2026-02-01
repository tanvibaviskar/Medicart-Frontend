import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/medicart-logo.png";
import { AuthContext } from "../../auth/AuthContext";

import CustomerDashboardHome from "./CustomerDashboardHome";
import NearbyMedicals from "./NearbyMedicals";
import SearchMedicine from "./SearchMedicine";

import "./CustomerDashboard.css";

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    alert("Logged out successfully!");
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
            Customer
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

          {/* Nearby Medicals */}
          <li
            className={activeTab === "Nearby" ? "active" : ""}
            onClick={() => setActiveTab("Nearby")}
          >
            <span className="menu-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 -960 960 960"
                width="20"
                fill="currentColor"
              >
                <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-180q45-45 80-93 30-41 55-90t25-97q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 48 25 97t55 90q35 48 80 93Zm0-220q-25 0-42.5-17.5T420-540q0-25 17.5-42.5T480-600q25 0 42.5 17.5T540-540q0 25-17.5 42.5T480-480Z" />
              </svg>
            </span>
            <span>Nearby Medicals</span>
          </li>

          {/* Search Medicines */}
          <li
            className={activeTab === "Search" ? "active" : ""}
            onClick={() => setActiveTab("Search")}
          >
            <span className="menu-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 -960 960 960"
                width="20"
                fill="currentColor"
              >
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
              </svg>
            </span>
            <span>Order Medicines</span>
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
            <h1>Customer Dashboard</h1>
            <p>Find medicines and medical stores near you</p>
          </div>

          <div className="topbar-right">
            <div className="bell">🔔</div>

            <div className="admin-info">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.fullName}`}
                alt="customer"
              />
              <strong>{user?.fullName}</strong>
            </div>
          </div>
        </header>

        <div className="content">
          {activeTab === "Dashboard" && (
            <>
              <CustomerDashboardHome />

              <div className="cards">
                <div className="card">
                  <div className="icon blue">🏥</div>
                  <h2>24</h2>
                  <p>Nearby Medicals</p>
                  <span className="positive">Available now</span>
                </div>

                <div className="card">
                  <div className="icon green">💊</div>
                  <h2>112</h2>
                  <p>Medicines Found</p>
                  <span className="positive">Updated today</span>
                </div>

                <div className="card">
                  <div className="icon yellow">🕒</div>
                  <h2>6</h2>
                  <p>Recent Searches</p>
                  <span className="warning">Last 7 days</span>
                </div>

                <div className="card">
                  <div className="icon blue">🛒</div>
                  <h2>14</h2>
                  <p>Orders Placed</p>
                  <span className="positive">This month</span>
                </div>
              </div>

              <div className="dashboard-info">
                <div className="info-card">
                  <h3>👤 Customer Overview</h3>
                  <p>
                    Search medicines, compare prices across nearby medical
                    stores, and place orders quickly from one dashboard.
                  </p>
                </div>

                <div className="info-card">
                  <h3>⚡ Quick Actions</h3>
                  <ul>
                    <li>Search medicines instantly</li>
                    <li>Find nearby medical stores</li>
                    <li>Compare availability</li>
                    <li>Track your orders</li>
                  </ul>
                </div>
              </div>
            </>
          )}

          {activeTab === "Nearby" && <NearbyMedicals />}
          {activeTab === "Search" && <SearchMedicine />}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;

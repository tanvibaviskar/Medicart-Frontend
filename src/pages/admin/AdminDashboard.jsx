import React, { useState } from "react";
import "./AdminDashboard.css";
import logo from "../../assets/logo.png";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Sample customer data
  const customers = [
    {
      id: "CUS2847",
      name: "Sarah Williams",
      email: "sarah.williams@email.com",
      phone: "+1 555-0123",
      orders: 24,
      totalSpent: 3420,
      registered: "Jan 15, 2024",
      status: "Active",
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    {
      id: "CUS2846",
      name: "Michael Johnson",
      email: "michael.johnson@email.com",
      phone: "+1 555-0456",
      orders: 19,
      totalSpent: 2800,
      registered: "Jan 14, 2024",
      status: "Active",
      avatar: "https://i.pravatar.cc/40?img=2",
    },
    {
      id: "CUS2845",
      name: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "+1 555-0789",
      orders: 12,
      totalSpent: 1800,
      registered: "Jan 13, 2024",
      status: "Inactive",
      avatar: "https://i.pravatar.cc/40?img=3",
    },
  ];

  // Filter customers based on search and status
  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="MediCart Logo" />
          <span>MediCart Admin</span>
        </div>
        <ul className="menu">
          {[
            "Dashboard",
            "Products",
            "Orders",
            "Customers",
            "Inventory",
            "Reports",
            "Settings",
          ].map((tab) => (
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
        {/* Header */}
        <header className="header">
          <div>
            <h1>{activeTab}</h1>
            <p>
              {activeTab === "Dashboard"
                ? "Welcome back, monitor your platform activity"
                : `Manage and view all ${activeTab.toLowerCase()}`}
            </p>
          </div>
          <div className="user-info">
            <div className="notification">🔔</div>
            <div className="user">
              <img src={logo} alt="Admin" />
              <div>
                <p>John Anderson</p>
                <span>Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard */}
        {activeTab === "Dashboard" && (
          <>
            <div className="cards">
              <div className="card">
                <h3>Total Customers</h3>
                <p>2,847</p>
                <span className="growth">+12.5% from last month</span>
              </div>
              <div className="card">
                <h3>Medical Stores</h3>
                <p>342</p>
                <span className="growth">+8.2% from last month</span>
              </div>
              <div className="card">
                <h3>Pending Approvals</h3>
                <p>23</p>
                <span className="pending">Requires action</span>
              </div>
              <div className="card">
                <h3>Orders This Month</h3>
                <p>1,456</p>
                <span className="growth">+18.7% from last month</span>
              </div>
            </div>

            <section className="recent-registrations">
              <div className="section-header">
                <h2>Recent Medical Store Registrations</h2>
                <button>View All</button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Store Name</th>
                    <th>Owner</th>
                    <th>Location</th>
                    <th>License Number</th>
                    <th>Registration Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>HealthPlus Pharmacy</td>
                    <td>Dr. Sarah Mitchell</td>
                    <td>New York, NY</td>
                    <td>MED-NY-45892</td>
                    <td>Jan 15, 2025</td>
                    <td className="pending">Pending</td>
                    <td>
                      <button className="approve">Approve</button>
                      <button className="reject">Reject</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          </>
        )}

        {/* Customers */}
        {activeTab === "Customers" && (
          <>
            <div className="cards">
              <div className="card">
                <h3>Total Customers</h3>
                <p>{customers.length}</p>
                <span className="growth">+12.5% vs last month</span>
              </div>
              <div className="card">
                <h3>Active Today</h3>
                <p>{customers.filter((c) => c.status === "Active").length}</p>
                <span className="growth">+8.2% vs yesterday</span>
              </div>
              <div className="card">
                <h3>New This Week</h3>
                <p>89</p>
                <span className="growth">+15.3% vs last week</span>
              </div>
              <div className="card">
                <h3>Avg Order Value</h3>
                <p>$142</p>
                <span className="growth">+5.7% vs last month</span>
              </div>
            </div>

            <section className="recent-registrations">
              <div className="section-header">
                <h2>Customer List</h2>
                <button>Export Data</button>
              </div>

              <div className="filters">
                <input
                  type="text"
                  placeholder="Search customers by name, email or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Customer ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Orders</th>
                    <th>Total Spent</th>
                    <th>Registered</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((c) => (
                    <tr key={c.id}>
                      <td>#{c.id}</td>
                      <td className="customer-name">
                        <img src={c.avatar} alt={c.name} />
                        <span>{c.name}</span>
                      </td>
                      <td>{c.email}</td>
                      <td>{c.phone}</td>
                      <td>{c.orders}</td>
                      <td>${c.totalSpent.toLocaleString()}</td>
                      <td>{c.registered}</td>
                      <td className={c.status.toLowerCase()}>{c.status}</td>
                      <td>
                        <button className="more-actions">⋮</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
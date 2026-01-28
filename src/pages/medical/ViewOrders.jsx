import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import "./ViewOrders.css";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get("/medicals/orders");
      setOrders(res.data || []);
    } catch (err) {
      console.error("Failed to fetch orders", err);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      await axiosInstance.put(`/api/cart/${orderId}/status`, null, {
        params: { status },
      });
      setOrders((prev) =>
        prev.map((o) => (o.orderId === orderId ? { ...o, status } : o)),
      );
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  return (
    <div className="orders-wrapper">
      <div className="orders-header">
        <h2>Orders Received</h2>
        <p>Manage and update the status of incoming orders</p>
      </div>

      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Change Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.customerId}</td>
                  <td>{order.orderDate}</td>
                  <td>
                    <span
                      className={`status-badge ${(
                        order.status ?? "PENDING"
                      ).toLowerCase()}`}
                    >
                      {order.status ?? "PENDING"}
                    </span>
                  </td>
                  <td>
                    <select
                      className={`status-dropdown ${(
                        order.status ?? "PENDING"
                      ).toLowerCase()}`}
                      value={order.status ?? "PENDING"}
                      onChange={(e) =>
                        handleStatusChange(order.orderId, e.target.value)
                      }
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="REJECTED">REJECTED</option>
                      <option value="DISPATCHED">DISPATCHED</option>
                      <option value="DELIVERED">DELIVERED</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewOrders;

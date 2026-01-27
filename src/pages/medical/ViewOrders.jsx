import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get("/medicals/orders");
      console.log("ORDERS:", res.data);
      setOrders(res.data || []);
    } catch (err) {
      console.error("Failed to fetch orders", err);
      setOrders([]);
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await axiosInstance.put(
        `/api/cart/${orderId}/status`,
        null,
        { params: { status } }
      );
      setMsg("✅ Status updated successfully");
      fetchOrders();
    } catch (err) {
      console.error("Status update failed", err);
      setMsg("❌ Failed to update status");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Orders Received</h2>

      {msg && <p>{msg}</p>}

      <table border="1" cellPadding="8" cellSpacing="0" width="100%">
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
          {orders.length === 0 && (
            <tr>
              <td colSpan="5" align="center">
                No orders found
              </td>
            </tr>
          )}

          {orders.map(order => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.customerId}</td>
              <td>{order.orderDate}</td>
              <td>{order.status}</td>

              <td>
                <select
                  value={order.status}
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewOrders;

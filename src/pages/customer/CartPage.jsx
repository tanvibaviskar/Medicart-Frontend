import { useCart } from "../../context/CartContext";
import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import axiosInstance from "../../api/axios";
import { useNavigate } from "react-router-dom";
import "./SearchMedicines.css"; // reuse the same CSS

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🔹 PAYMENT HANDLER (UNCHANGED)
  const handlePlaceOrder = async () => {
    try {
      if (!user) {
        alert("Please login to continue");
        return;
      }

      const amount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      const paymentReq = {
        name: user.fullName || user.name,
        email: user.email,
        amount: amount,
        id: user.id,
      };

      const res = await axiosInstance.post(
        "/payment-service/generateLink",
        paymentReq,
      );

      const paymentUrl = res.data?.payment_url;

      if (!paymentUrl) {
        alert("Failed to generate payment link");
        return;
      }

      window.location.href = paymentUrl;
    } catch (error) {
      console.error("Payment error:", error);
      alert("Unable to initiate payment");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="search-medicines-container">
        <h2>Your cart is empty</h2>
        <button
          className="add-btn"
          onClick={() => navigate("/customer/")}
          style={{ marginTop: "10px" }}
        >
          Go Back to Search Medicines
        </button>
      </div>
    );
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="search-medicines-container">
      <div className="search-header">
        <h2>Your Cart</h2>

        <button
          className="add-btn"
          onClick={() => navigate("/customer/search-medicines")}
        >
          Back to Search Medicines
        </button>
      </div>

      <div className="table-wrapper">
        <table className="medicines-table">
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>{item.brand}</td>
                <td>₹{item.price}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price * item.quantity}</td>
                <td>
                  <button
                    className="add-btn remove-btn" // 🔴 CHANGED: added remove-btn
                    onClick={() => removeFromCart(item.medicineId)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>Total Amount: ₹{total}</h3>

      <div style={{ marginTop: "10px" }}>
        <button className="add-btn" onClick={clearCart}>
          Clear Cart
        </button>
        <button
          className="add-btn"
          style={{ marginLeft: "10px" }}
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CartPage;

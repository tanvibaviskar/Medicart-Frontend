import { useNavigate } from "react-router-dom";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-success-container">
      <div className="payment-success-card">
        <div className="success-icon">✅</div>

        <h2>Payment Successful</h2>

        <p className="success-msg">
          Thank you for using <strong>MediCart</strong>.
        </p>

        <p className="info-muted">Your payment was completed successfully.</p>

        <div className="action-buttons">
          <button onClick={() => navigate("/customer")}>Go to Dashboard</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import { CartProvider } from "./context/CartContext";
import PaymentSuccess from "./pages/customer/PaymentSuccess";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import CartPage from "./pages/customer/CartPage";
import MedicalDashboard from "./pages/medical/MedicalDashboard";
import MedicalRegister from "./pages/medical/MedicalRegister";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Medical */}
          <Route
            path="/medical"
            element={
              <ProtectedRoute role="MEDICAL">
                <MedicalDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/medical/register" element={<MedicalRegister />} />

          {/* Customer Dashboard */}
          <Route
            path="/customer"
            element={
              <ProtectedRoute role="CUSTOMER">
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Customer Cart */}
          <Route
            path="/customer/cart"
            element={
              <ProtectedRoute role="CUSTOMER">
                <CartPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;

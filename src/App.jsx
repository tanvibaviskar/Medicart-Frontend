import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import MedicalDashboard from "./pages/medical/MedicalDashboard";
import MedicalRegister from "./pages/medical/MedicalRegister";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />   {/* ✅ ADD */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Admin dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Medical dashboard */}
        <Route
          path="/medical"
          element={
            <ProtectedRoute role="MEDICAL">
              <MedicalDashboard />
            </ProtectedRoute>
          }
        />

        {/* Customer dashboard */}
        <Route
          path="/customer"
          element={
            <ProtectedRoute role="CUSTOMER">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/medical/register" element={<MedicalRegister />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;

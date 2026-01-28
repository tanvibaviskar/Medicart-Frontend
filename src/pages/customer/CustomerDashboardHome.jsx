import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";

const CustomerDashboardHome = () => {
  const { user } = useContext(AuthContext);

  return (
    <h2>Welcome, {user?.fullName} 👋</h2>
  );
};

export default CustomerDashboardHome;

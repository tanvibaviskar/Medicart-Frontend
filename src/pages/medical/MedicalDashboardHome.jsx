import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";

const MedicalDashboardHome = () => {
  const { user } = useContext(AuthContext);

  // Fallback: derive name from email if fullName not available
  let displayName = user?.fullName
    ? user.fullName
    : user?.email
      ? user.email.split("@")[0]
      : "Medical User";

  // Capitalize first letter
  displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

  return (
    <h2
      style={{
        marginBottom: "25px",
        color: "#2c3e50",
        fontWeight: 600,
        fontSize: "22px",
        marginLeft: "20px",
      }}
    >
      Welcome, {displayName} 👋
    </h2>
  );
};

export default MedicalDashboardHome;

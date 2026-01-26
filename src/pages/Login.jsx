import axios from "axios"; // ⚠️ plain axios (IMPORTANT)
import { jwtDecode } from "jwt-decode";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../auth/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:8080/users/signin",
        {
          email,
          password,
        }
      );

      // ✅ JWT token
      const token = res.data.jwt;

      // ✅ Save token & user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(res.data));

      // ✅ Decode JWT
      const decoded = jwtDecode(token);
      const role = decoded.role.replace("ROLE_", "");

      // ✅ Save to AuthContext
      loginUser({
        email: decoded.sub,
        role,
        token,
      });

      // ✅ Role based navigation
      if (role === "ADMIN") navigate("/admin");
      else if (role === "MEDICAL") navigate("/medical");
      else navigate("/customer");

    } catch (err) {
      console.error(err);

      if (err.response?.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("Server error. Please try again.");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background:
          "url('https://plus.unsplash.com/premium_photo-1672759455907-bdaef741cd88?q=80&w=1416&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.95)",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          width: "100%",
          maxWidth: "420px",
          textAlign: "center",
        }}
      >
        <img src={logo} alt="Medicart" style={{ width: "80px" }} />
        <h1 style={{ fontSize: "32px", margin: "20px 0" }}>Medicart</h1>

        {error && (
          <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "12px", marginBottom: "12px" }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "12px", marginBottom: "20px" }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#3498db",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>

        <hr style={{ margin: "20px 0" }} />

        <button
          style={{ width: "100%", marginBottom: "10px" }}
          onClick={() => navigate("/register")}
        >
          Register as Customer
        </button>

        <button
          style={{ width: "100%" }}
          onClick={() => navigate("/medical/register")}
        >
          Register as Medical
        </button>
      </div>
    </div>
  );
}

export default Login;

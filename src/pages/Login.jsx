import { jwtDecode } from "jwt-decode";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import logo from "../assets/logo.png"; // your uploaded logo
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
      const res = await axios.post("/users/signin", { email, password });

      const token = res.data.jwt;
      const decoded = jwtDecode(token);
      const role = decoded.role.replace("ROLE_", "");

      loginUser({
        email: decoded.sub,
        role,
        token,
      });

      if (role === "ADMIN") navigate("/admin");
      else if (role === "MEDICAL") navigate("/medical");
      else navigate("/customer");

    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "url('https://plus.unsplash.com/premium_photo-1672759455907-bdaef741cd88?q=80&w=1416&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
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
          position: "relative",
        }}
      >
        {/* Logo */}
        <img
          src={logo}
          alt="Medicart Logo"
          style={{ width: "80px", marginBottom: "15px" }}
        />

        {/* Stylish heading */}
        <h1
          style={{
            fontFamily: "'Pacifico', cursive",
            fontSize: "36px",
            color: "#2c3e50",
            marginBottom: "25px",
          }}
        >
          Medicart
        </h1>

        {error && (
          <p
            style={{
              color: "#ff4d4f",
              background: "#ffe6e6",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} style={{ marginTop: "20px" }}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "14px 18px",
              marginBottom: "15px",
              borderRadius: "12px",
              border: "1px solid #ccc",
              fontSize: "16px",
              outline: "none",
              transition: "0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#3498db")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "14px 18px",
              marginBottom: "20px",
              borderRadius: "12px",
              border: "1px solid #ccc",
              fontSize: "16px",
              outline: "none",
              transition: "0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#3498db")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              background: "#3498db",
              color: "#fff",
              fontSize: "18px",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#2980b9")}
            onMouseOut={(e) => (e.target.style.background = "#3498db")}
          >
            Login
          </button>
        </form>

        <hr style={{ margin: "25px 0", borderColor: "#eee" }} />

        <p style={{ marginBottom: "15px", color: "#555" }}>
          <b>New User?</b>
        </p>

        <button
          style={{
            marginBottom: "10px",
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #3498db",
            background: "#fff",
            color: "#3498db",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => {
            e.target.style.background = "#3498db";
            e.target.style.color = "#fff";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "#fff";
            e.target.style.color = "#3498db";
          }}
          onClick={() => navigate("/register")}
        >
          Register as Customer
        </button>

        <button
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #27ae60",
            background: "#fff",
            color: "#27ae60",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => {
            e.target.style.background = "#27ae60";
            e.target.style.color = "#fff";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "#fff";
            e.target.style.color = "#27ae60";
          }}
          onClick={() => navigate("/medical/register")}
        >
          Register as Medical
        </button>
      </div>
    </div>
  );
}

export default Login;

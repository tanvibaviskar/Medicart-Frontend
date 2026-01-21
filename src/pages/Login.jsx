import { jwtDecode } from "jwt-decode";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
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
      const res = await axios.post("/users/signin", {
        email,
        password,
      });

      const token = res.data.jwt;
      const decoded = jwtDecode(token);
      const role = decoded.role.replace("ROLE_", "");

      loginUser({
        email: decoded.sub,
        role,
        token,
      });

      // 🔐 Role based redirect
      if (role === "ADMIN") navigate("/admin");
      else if (role === "MEDICAL") navigate("/medical");
      else navigate("/customer");

    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px" }}>
      <h2>Medicart Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>

      <hr style={{ margin: "20px 0" }} />

      {/* 🔥 REGISTER OPTIONS */}
      <p><b>New User?</b></p>

      <button
        style={{ marginBottom: "10px", width: "100%" }}
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
  );
}

export default Login;

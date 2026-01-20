import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import axios from "../api/axios";
import { jwtDecode } from "jwt-decode"; // ✅ CORRECT IMPORT

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/signin", { email, password });
      console.log("Login response:", res.data);

      // ✅ Decode JWT correctly
      const decoded = jwtDecode(res.data.jwt);
      console.log("Decoded JWT:", decoded);

      const role = decoded.role.replace("ROLE_", "");

      // ✅ Save user
      loginUser({
        email: decoded.sub,
        role: role,
        token: res.data.jwt,
      });

      // ✅ Navigate based on role
      if (role === "ADMIN") navigate("/admin");
      else if (role === "MEDICAL") navigate("/medical");
      else navigate("/customer");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Medicart Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

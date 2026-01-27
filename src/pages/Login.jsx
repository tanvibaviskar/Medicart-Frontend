import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/medicart-logo.png";
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
      const res = await axios.post("http://localhost:8080/users/signin", {
        email,
        password,
      });

      const token = res.data.jwt;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(res.data));

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
      setError("Invalid email or password");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>

      <div style={styles.card}>
        <div style={styles.logoBox}>
          <img src={logo} alt="MediCart" style={{ width: 36 }} />
        </div>

        <h2 style={styles.title}>MediCart</h2>
        <p style={styles.subtitle}>Sign in to your account</p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleLogin}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            placeholder="admin@medicart.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <div style={styles.forgot}>Forgot password?</div>

          <button type="submit" style={styles.primaryBtn}>
            Sign In
          </button>
        </form>

        <div style={styles.divider}>OR</div>

        <button style={styles.outlineBtn} onClick={() => navigate("/register")}>
          Register as Customer
        </button>

        <button
          style={styles.secondaryBtn}
          onClick={() => navigate("/medical/register")}
        >
          Register Medical Store
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage:
      "url('https://plus.unsplash.com/premium_photo-1672759455907-bdaef741cd88?q=80&w=1416&auto=format&fit=crop')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Segoe UI, sans-serif",
    position: "relative",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(15, 23, 42, 0.6)",
    backdropFilter: "blur(2px)",
  },

  card: {
    position: "relative",
    width: 360,
    padding: "28px",
    background: "rgba(255,255,255,0.95)",
    borderRadius: 16,
    boxShadow:
      "0 30px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.6)",
    transform: "translateY(-10px)",
  },

  logoBox: {
    width: 46,
    height: 46,
    background: "#e0f2fe",
    borderRadius: 10,
    margin: "0 auto 12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.1)",
  },

  title: {
    textAlign: "center",
    marginBottom: 4,
    fontWeight: 700,
  },

  subtitle: {
    textAlign: "center",
    color: "#64748b",
    fontSize: 14,
    marginBottom: 18,
  },

  label: {
    fontSize: 13,
    fontWeight: 600,
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "6px 0 14px",
    borderRadius: 8,
    border: "1px solid #cbd5e1",
    fontSize: 14,
  },

  forgot: {
    textAlign: "right",
    fontSize: 12,
    color: "#3296cf",
    cursor: "pointer",
    marginBottom: 14,
  },

  primaryBtn: {
    width: "100%",
    padding: "11px",
    background: "linear-gradient(180deg, #0ea5e9, #0284c7)",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontSize: 15,
    cursor: "pointer",
    boxShadow: "0 10px 22px rgba(14,165,233,0.35)",
    marginBottom: 12,
  },

  secondaryBtn: {
    width: "100%",
    padding: "11px",
    background: "linear-gradient(180deg, #34d399, #10b981)",
    color: "#064e3b",
    border: "none",
    borderRadius: 10,
    fontSize: 14,
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(16, 185, 160, 0.35)",
  },

  outlineBtn: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(180deg, #34d399, #10b981)", // green gradient
    color: "#064e3b", // dark green text
    border: "none",
    borderRadius: 10,
    fontSize: 14,
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(16, 185, 160, 0.35)",
    marginBottom: 12,
  },

  divider: {
    textAlign: "center",
    fontSize: 12,
    color: "#94a3b8",
    margin: "14px 0",
  },

  error: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
    textAlign: "center",
    fontSize: 13,
  },
};

export default Login;
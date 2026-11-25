
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email.trim().toLowerCase() === "admin@eventra.com" &&
      password === "Eventra@123"
    ) {
      localStorage.setItem("eventra_admin", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid administrator credentials.");
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <ShieldCheck size={48} className="admin-icon" />

        <span className="section-tag">EVENTRA MANAGEMENT</span>
        <h1>Admin <span>Login</span></h1>
        <p>Sign in to manage your events.</p>

        <form onSubmit={handleLogin}>
          <label>Administrator Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="form-error">{error}</p>}

          <button className="primary-btn full-btn" type="submit">
            Access Dashboard
          </button>
        </form>

        <p className="auth-switch">
          <Link to="/">Return to Homepage</Link>
        </p>
      </div>
    </section>
  );
}

export default AdminLogin;

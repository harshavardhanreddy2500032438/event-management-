
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockKeyhole, Mail } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const users = JSON.parse(
      localStorage.getItem("eventra_users") || "[]"
    );

    const foundUser = users.find(
      (user) =>
        user.email.toLowerCase() === email.trim().toLowerCase() &&
        user.password === password
    );

    if (!foundUser) {
      setError("Invalid email or password. Please try again.");
      return;
    }

    localStorage.setItem("eventra_user", JSON.stringify(foundUser));
    navigate("/");
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <span className="section-tag">WELCOME BACK</span>
        <h1>Login to <span>EVENTRA</span></h1>
        <p>Continue your extraordinary journey.</p>

        <form onSubmit={handleLogin}>
          <label>Email Address</label>
          <div className="auth-input">
            <Mail />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <label>Password</label>
          <div className="auth-input">
            <LockKeyhole />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="primary-btn full-btn">
            Login
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Create Account</Link>
        </p>

        <Link to="/admin" className="admin-entry">
          Admin Portal
        </Link>
      </div>
    </section>
  );
}

export default Login;

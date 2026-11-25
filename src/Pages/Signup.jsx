
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    state: "",
    city: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("eventra_users") || "[]"
    );

    const exists = users.some(
      (user) => user.email.toLowerCase() === form.email.trim().toLowerCase()
    );

    if (exists) {
      setError("This email is already registered.");
      return;
    }

    const newUser = {
      id: crypto.randomUUID(),
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      country: form.country,
      state: form.state,
      city: form.city
    };

    users.push(newUser);

    localStorage.setItem("eventra_users", JSON.stringify(users));
    localStorage.setItem("eventra_user", JSON.stringify(newUser));

    navigate("/");
  };

  return (
    <section className="auth-page">
      <div className="auth-card signup-card">
        <span className="section-tag">JOIN OUR COMMUNITY</span>
        <h1>Create Your <span>Account</span></h1>
        <p>Register with EVENTRA and discover amazing events.</p>

        <form onSubmit={handleSignup}>
          <label>Full Name</label>
          <input
            name="name"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <div className="form-two-columns">
            <div>
              <label>Country</label>
              <input
                name="country"
                placeholder="Country"
                value={form.country}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>State</label>
              <input
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label>City</label>
          <input
            name="city"
            placeholder="Enter your city"
            value={form.city}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="primary-btn full-btn">
            Create Account
          </button>
        </form>

        <p className="auth-switch">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
}

export default Signup;

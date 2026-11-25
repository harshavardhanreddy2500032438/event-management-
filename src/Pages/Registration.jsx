
import React, { useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useEvents } from "../context/EventContext";

function Registration() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events } = useEvents();

  const event = events.find((item) => item.id === id);
  const user = JSON.parse(localStorage.getItem("eventra_user") || "null");

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    quantity: 1
  });

  if (!event) return <Navigate to="/explore" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    const registration = {
      eventId: event.id,
      eventName: event.name,
      eventImage: event.image,
      userEmail: user.email,
      name: form.name,
      phone: form.phone,
      quantity: Number(form.quantity),
      total: event.price * Number(form.quantity)
    };

    sessionStorage.setItem(
      "eventra_pending_booking",
      JSON.stringify(registration)
    );

    navigate("/payment");
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <span className="section-tag">EVENT REGISTRATION</span>
        <h1>Register for <span>{event.name}</span></h1>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />

          <label>Number of Tickets</label>
          <input
            type="number"
            min="1"
            max="10"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            required
          />

          <div className="booking-total">
            Total Amount: ₹{event.price * Number(form.quantity)}
          </div>

          <button type="submit" className="primary-btn full-btn">
            Continue to Payment
          </button>
        </form>
      </div>
    </section>
  );
}

export default Registration;

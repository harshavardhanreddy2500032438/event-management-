
import React from "react";
import { Link, Navigate } from "react-router-dom";
import { CheckCircle, Ticket } from "lucide-react";

function Success() {
  const ticket = JSON.parse(
    sessionStorage.getItem("eventra_latest_ticket") || "null"
  );

  if (!ticket) {
    return <Navigate to="/my-tickets" replace />;
  }

  return (
    <section className="success-page">
      <div className="success-card">
        <CheckCircle size={65} className="success-icon" />

        <h1>Booking <span>Confirmed!</span></h1>
        <p>Your event registration was completed successfully.</p>

        <div className="ticket-summary">
          <h3>{ticket.eventName}</h3>
          <p>Ticket ID: {ticket.ticketId}</p>
          <p>Attendee: {ticket.name}</p>
          <p>Number of Tickets: {ticket.quantity}</p>
          <h2>₹{ticket.total}</h2>
        </div>

        <Link to="/my-tickets" className="primary-btn">
          <Ticket size={18} /> View My Tickets
        </Link>

        <Link to="/explore" className="secondary-btn">
          Explore More Events
        </Link>
      </div>
    </section>
  );
}

export default Success;

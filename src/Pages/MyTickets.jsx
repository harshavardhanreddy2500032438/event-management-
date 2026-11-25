
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Ticket,
  CalendarDays,
  MapPin,
  Printer,
} from "lucide-react";

function MyTickets() {
  const [printingTicketId, setPrintingTicketId] = useState(null);

  const user = JSON.parse(
    localStorage.getItem("eventra_user") || "null"
  );

  const allTickets = JSON.parse(
    localStorage.getItem("eventra_tickets") || "[]"
  );

  const tickets = user
    ? allTickets.filter(
        (ticket) => ticket.userEmail === user.email
      )
    : [];

  const handlePrint = (ticketId) => {
    setPrintingTicketId(ticketId);

    setTimeout(() => {
      window.print();

      setPrintingTicketId(null);
    }, 100);
  };

  if (!user) {
    return (
      <section className="auth-page">
        <div className="auth-card">
          <h1>Login Required</h1>
          <p>Please login to view your tickets.</p>

          <Link to="/login" className="primary-btn">
            Login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="tickets-page">
      <div className="page-banner no-print">
        <span className="section-tag">YOUR EXPERIENCES</span>
        <h1>
          My <span>Tickets</span>
        </h1>
        <p>All your registered events in one place.</p>
      </div>

      <div className="tickets-container">
        {tickets.length === 0 ? (
          <div className="empty-tickets no-print">
            <Ticket size={55} />
            <h2>No Tickets Yet</h2>
            <p>You haven't registered for any events.</p>

            <Link to="/explore" className="primary-btn">
              Explore Events
            </Link>
          </div>
        ) : (
          tickets.map((ticket) => (
            <div
              className={`ticket-card ${
                printingTicketId === ticket.ticketId
                  ? "print-target"
                  : ""
              }`}
              key={ticket.ticketId}
            >
              {ticket.eventImage && (
                <img
                  src={ticket.eventImage}
                  alt={ticket.eventName}
                />
              )}

              <div className="ticket-info">
                <span className="ticket-status">
                  {ticket.status}
                </span>

                <h2>{ticket.eventName}</h2>

                <p>
                  <CalendarDays size={16} />
                  {ticket.bookingDate}
                </p>

                <p>
                  <MapPin size={16} />
                  {ticket.quantity} ticket(s)
                </p>

                <p>
                  Ticket ID: {ticket.ticketId}
                </p>

                <h3>₹{ticket.total}</h3>

                <button
                  className="primary-btn print-btn no-print"
                  onClick={() => handlePrint(ticket.ticketId)}
                >
                  <Printer size={17} />
                  Print Ticket
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default MyTickets;

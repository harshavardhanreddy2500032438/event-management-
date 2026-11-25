
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

function Payment() {
  const navigate = useNavigate();

  const booking = JSON.parse(
    sessionStorage.getItem("eventra_pending_booking") || "null"
  );

  const [method, setMethod] = useState("UPI");

  if (!booking) {
    return (
      <section className="auth-page">
        <div className="auth-card">
          <h2>No pending booking found.</h2>
          <button
            onClick={() => navigate("/explore")}
            className="primary-btn"
          >
            Explore Events
          </button>
        </div>
      </section>
    );
  }

  const demoQRData = [
    "EVENTRA DEMO PAYMENT",
    `Event: ${booking.eventName}`,
    `Amount: INR ${booking.total}`,
    `Tickets: ${booking.quantity}`,
    "DEMO ONLY - NO REAL PAYMENT"
  ].join(" | ");

  const handlePayment = () => {
    const tickets = JSON.parse(
      localStorage.getItem("eventra_tickets") || "[]"
    );

    const ticket = {
      ...booking,
      ticketId: "EVT-" + Date.now(),
      paymentMethod: method,
      bookingDate: new Date().toLocaleDateString(),
      status: "Confirmed"
    };

    tickets.push(ticket);

    localStorage.setItem(
      "eventra_tickets",
      JSON.stringify(tickets)
    );

    sessionStorage.removeItem("eventra_pending_booking");

    sessionStorage.setItem(
      "eventra_latest_ticket",
      JSON.stringify(ticket)
    );

    navigate("/success");
  };

  return (
    <section className="auth-page">
      <div className="auth-card">

        <span className="section-tag">
          SECURE CHECKOUT DEMO
        </span>

        <h1>
          Complete <span>Payment</span>
        </h1>

        <div className="payment-summary">
          <h3>{booking.eventName}</h3>
          <p>Tickets: {booking.quantity}</p>
          <h2>₹{booking.total}</h2>
        </div>

        <label>Select Payment Method</label>

        {["UPI", "Card", "Net Banking", "Cash"].map((item) => (
          <label className="payment-option" key={item}>
            <input
              type="radio"
              name="payment"
              value={item}
              checked={method === item}
              onChange={() => setMethod(item)}
            />
            {item}
          </label>
        ))}

        {/* UPI QR CODE */}
        {method === "UPI" && (
          <div className="upi-qr-section">
            <h3>Scan & Pay with UPI</h3>

            <p>
              Scan this QR code using Google Pay,
              PhonePe or Paytm.
            </p>

            <div className="upi-qr-box">
              <QRCodeSVG
                value={demoQRData}
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>

            <h4>₹{booking.total}</h4>

            <p className="payment-note">
              Demo QR code only. It does not initiate
              an actual UPI transaction.
            </p>
          </div>
        )}

        {method === "Card" && (
          <div className="payment-extra">
            <p>Card payment selected.</p>
            <p>Demo payment only.</p>
          </div>
        )}

        {method === "Net Banking" && (
          <div className="payment-extra">
            <p>Net Banking selected.</p>
            <p>Demo payment only.</p>
          </div>
        )}

        {method === "Cash" && (
          <div className="payment-extra">
            <p>Cash payment selected.</p>
            <p>Demo payment only.</p>
          </div>
        )}

        <button
          onClick={handlePayment}
          className="primary-btn full-btn"
        >
          Confirm Demo Payment – ₹{booking.total}
        </button>

        <p className="payment-note">
          Demonstration only. No actual money will be charged.
        </p>

      </div>
    </section>
  );
}

export default Payment;


import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-brand">
          <h2>EVENT<span>RA</span></h2>

          <p>
            Creating extraordinary experiences through
            unforgettable events.
          </p>

          <div className="social-links">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <span>◎</span>
            </a>

            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <span>f</span>
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Explore</h3>
          <Link to="/">Home</Link>
          <Link to="/explore">Events</Link>
          <Link to="/about">About Us</Link>
        </div>

        <div className="footer-column">
          <h3>Support</h3>
          <Link to="/contact">Contact</Link>
          <Link to="/my-tickets">My Tickets</Link>
          <Link to="/admin">Admin Portal</Link>
        </div>

        <div className="footer-column">
          <h3>Get in Touch</h3>
          <p>✉ support@eventra.com</p>
          <p>⌖ Vijayawada, India</p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 EVENTRA. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

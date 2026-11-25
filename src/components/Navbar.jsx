
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { CalendarDays, UserRound, Ticket } from "lucide-react";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("eventra_user") || "null");

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        EVENT<span>RA</span>
        <small> EXPERIENCE THE EXTRAORDINARY</small>
      </Link>

      <nav className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/explore">Explore Events</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      <div className="nav-actions">
        <Link to="/my-tickets" className="ticket-link">
          <Ticket size={17} />
          My Tickets
        </Link>

        {user ? (
          <Link to="/my-tickets" className="login-btn">
            <UserRound size={17} />
            {user.name}
          </Link>
        ) : (
          <Link to="/login" className="login-btn">
            <UserRound size={17} />
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;

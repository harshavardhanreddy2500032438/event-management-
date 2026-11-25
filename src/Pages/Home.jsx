
import React from "react";
import Hero from "../components/Hero";
import FeaturedEvents from "../components/FeaturedEvents";
import {
  Sparkles,
  ShieldCheck,
  Ticket,
  Headphones
} from "lucide-react";

function Home() {
  return (
    <div className="home-page">
      <Hero />

      <FeaturedEvents />

      <section className="benefits-section">
        <div className="section-heading centered">
          <span className="section-tag">WHY EVENTRA</span>
          <h2>Experience Events <span>Differently</span></h2>
          <p>Everything you need for an unforgettable experience.</p>
        </div>

        <div className="benefits-grid">
          <div className="benefit-card">
            <Sparkles />
            <h3>Unique Experiences</h3>
            <p>Discover extraordinary events and memorable moments.</p>
          </div>

          <div className="benefit-card">
            <ShieldCheck />
            <h3>Secure Booking</h3>
            <p>Enjoy a simple and convenient event booking experience.</p>
          </div>

          <div className="benefit-card">
            <Ticket />
            <h3>Digital Tickets</h3>
            <p>Access your registered events through My Tickets.</p>
          </div>

          <div className="benefit-card">
            <Headphones />
            <h3>Customer Support</h3>
            <p>Get assistance whenever you need help.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

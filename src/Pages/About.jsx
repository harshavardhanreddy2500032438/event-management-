
import React from "react";
import { Sparkles, Users, CalendarDays } from "lucide-react";

function About() {
  return (
    <section className="about-page">
      <div className="page-banner">
        <span className="section-tag">OUR STORY</span>
        <h1>About <span>EVENTRA</span></h1>
        <p>Bringing people together through extraordinary experiences.</p>
      </div>

      <div className="about-content">
        <h2>Creating Moments That <span>Matter</span></h2>

        <p>
          EVENTRA is an event management platform designed to make
          discovering, organizing and registering for events easier.
          From cultural celebrations to technology exhibitions,
          EVENTRA brings exciting experiences together in one place.
        </p>

        <p>
          Our goal is to provide a simple and convenient platform
          for event organizers and participants.
        </p>

        <div className="benefits-grid">
          <div className="benefit-card">
            <Sparkles />
            <h3>Our Vision</h3>
            <p>Make every event an extraordinary experience.</p>
          </div>

          <div className="benefit-card">
            <Users />
            <h3>Our Community</h3>
            <p>Connect organizers and participants.</p>
          </div>

          <div className="benefit-card">
            <CalendarDays />
            <h3>Our Mission</h3>
            <p>Simplify event discovery and registration.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

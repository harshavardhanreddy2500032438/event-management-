
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <span className="hero-tag">
            <Sparkles size={16} />
            WHERE MOMENTS BECOME MEMORIES
          </span>

          <h1>
            Discover Events.
            <br />
            <span>Experience Magic.</span>
          </h1>

          <p>
            Discover extraordinary experiences, connect with
            amazing people and create memories that last forever.
          </p>

          <div className="hero-buttons">
            <Link to="/explore" className="primary-btn">
              Explore Events <ArrowRight size={18} />
            </Link>

            <Link to="/about" className="secondary-btn">
              Discover More
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <h3>50+</h3>
              <span>Events</span>
            </div>
            <div>
              <h3>10K+</h3>
              <span>Attendees</span>
            </div>
            <div>
              <h3>100%</h3>
              <span>Experiences</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

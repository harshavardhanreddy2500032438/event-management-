
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEvents } from "../context/EventContext";
import EventCard from "./EventCard";

function FeaturedEvents() {
  const { events } = useEvents();

  return (
    <section className="featured-section">
      <div className="section-heading">
        <div>
          <span className="section-tag">CURATED EXPERIENCES</span>
          <h2>Featured <span>Events</span></h2>
          <p>Explore our handpicked extraordinary experiences.</p>
        </div>

        <Link to="/explore" className="view-all">
          View All Events <ArrowRight size={17} />
        </Link>
      </div>

      <div className="events-grid">
        {events.slice(0, 3).map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {events.length === 0 && (
        <p className="empty-message">No events available yet.</p>
      )}
    </section>
  );
}

export default FeaturedEvents;

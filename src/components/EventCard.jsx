
import React from "react";
import { Link } from "react-router-dom";
import { CalendarDays, MapPin, ArrowUpRight } from "lucide-react";

function EventCard({ event }) {
  return (
    <article className="event-card">
      <div className="event-image">
        <img src={event.image} alt={event.name} />

        <span className="event-category">
          {event.category}
        </span>
      </div>

      <div className="event-info">
        <h3>{event.name}</h3>

        <p className="event-description">
          {event.description}
        </p>

        <div className="event-meta">
          <span>
            <CalendarDays size={16} />
            {event.date}
          </span>

          <span>
            <MapPin size={16} />
            {event.venue}
          </span>
        </div>

        <div className="event-card-bottom">
          <div className="event-price">
            <small>Starting from</small>
            <h3>₹{event.price}</h3>
          </div>

          <Link
            to={`/event/${event.id}`}
            className="event-view-btn"
          >
            View Details <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default EventCard;


import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useEvents } from "../context/EventContext";
import {
  CalendarDays,
  Clock,
  MapPin,
  Ticket
} from "lucide-react";

function EventDetails() {
  const { id } = useParams();
  const { events } = useEvents();

  const event = events.find((item) => item.id === id);

  if (!event) {
    return <Navigate to="/explore" replace />;
  }

  return (
    <section className="details-page">
      <div className="details-image">
        <img src={event.image} alt={event.name} />
      </div>

      <div className="details-content">
        <span className="event-category">{event.category}</span>

        <h1>{event.name}</h1>

        <p className="details-description">
          {event.description}
        </p>

        <div className="details-information">
          <p><CalendarDays /> {event.date}</p>
          <p><Clock /> {event.time}</p>
          <p><MapPin /> {event.venue}</p>
          <p><Ticket /> ₹{event.price}</p>
        </div>

        <div className="details-booking">
          <div>
            <small>Registration Price</small>
            <h2>₹{event.price}</h2>
          </div>

          <Link to={`/register/${event.id}`} className="primary-btn">
            Register Now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default EventDetails;

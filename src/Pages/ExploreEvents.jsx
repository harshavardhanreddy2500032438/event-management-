
import React, { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useEvents } from "../context/EventContext";
import EventCard from "../components/EventCard";

function ExploreEvents() {
  const { events } = useEvents();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Technology",
    "Cultural",
    "Music",
    "Sports",
    "Workshop"
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(search.toLowerCase()) ||
      event.venue.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="explore-page">
      <div className="page-banner">
        <span className="section-tag">FIND YOUR NEXT EXPERIENCE</span>
        <h1>Explore <span>Events</span></h1>
        <p>Find events that inspire, entertain and connect you.</p>
      </div>

      <div className="explore-container">
        <div className="search-container">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search events or venues..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="category-container">
          <SlidersHorizontal size={19} />

          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "category-btn active" : "category-btn"}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="explore-result">
          <h2>Available Events</h2>
          <span>{filteredEvents.length} events found</span>
        </div>

        <div className="events-grid">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <p className="empty-message">
              No events found. Try another search.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ExploreEvents;

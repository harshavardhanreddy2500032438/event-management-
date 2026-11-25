
import React, { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventContext";

function AdminDashboard() {
  const navigate = useNavigate();
  const { events, addEvent, deleteEvent, updateEvent } = useEvents();

  const isAdmin = localStorage.getItem("eventra_admin") === "true";
  const fileRef = useRef(null);

  const [activeSection, setActiveSection] = useState("");
  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: "Technology",
    date: "",
    time: "",
    venue: "",
    price: "",
    description: ""
  });

  const tickets = JSON.parse(
    localStorage.getItem("eventra_tickets") || "[]"
  );

  if (!isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const openSection = (section) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      e.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size must be under 2MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!preview) {
      alert("Please upload an event image.");
      return;
    }

    addEvent({
      ...form,
      price: Number(form.price),
      image: preview,
      status: "Approved"
    });

    setForm({
      name: "",
      category: "Technology",
      date: "",
      time: "",
      venue: "",
      price: "",
      description: ""
    });

    setPreview("");

    if (fileRef.current) {
      fileRef.current.value = "";
    }

    setActiveSection("events");
    alert("Event created successfully!");
  };

  const changeEventStatus = (event, status) => {
    if (!updateEvent) {
      alert("Event status update is not available.");
      return;
    }

    updateEvent(event.id, { status });

    alert(`Event ${status.toLowerCase()} successfully!`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEvent(id);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("eventra_admin");
    navigate("/admin");
  };

  const totalRevenue = tickets.reduce(
    (sum, ticket) => sum + Number(ticket.total || 0),
    0
  );

  const sectionTitles = {
    events: "Manage Events",
    bookings: "Manage Bookings",
    registrations: "Event Registrations",
    create: "Create New Event"
  };

  return (
    <section className="admin-page">

      {/* HEADER */}

      <div className="admin-header">
        <div>
          <span className="section-tag">CONTROL CENTER</span>
          <h1>Admin <span>Dashboard</span></h1>
          <p>Manage your EVENTRA platform.</p>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          ↪ Logout
        </button>
      </div>

      {/* DASHBOARD STATISTICS */}

      <div className="admin-stats">
        <div className="admin-stat-card">
          <span>📅</span>
          <span>Total Events</span>
          <h2>{events.length}</h2>
        </div>

        <div className="admin-stat-card">
          <span>🎟️</span>
          <span>Total Registrations</span>
          <h2>{tickets.length}</h2>
        </div>

        <div className="admin-stat-card">
          <span>₹</span>
          <span>Total Booking Revenue</span>
          <h2>₹{totalRevenue}</h2>
        </div>
      </div>

      {/* FOUR MANAGEMENT CARDS */}

      <div className="admin-management-grid">

        <button
          className={`admin-management-card ${activeSection === "events" ? "selected" : ""}`}
          onClick={() => openSection("events")}
        >
          <span className="admin-card-icon">📅</span>
          <h2>Manage Events</h2>
          <p>Approve, reject and delete events.</p>
          <span className="admin-card-count">
            {events.length} Events →
          </span>
        </button>

        <button
          className={`admin-management-card ${activeSection === "bookings" ? "selected" : ""}`}
          onClick={() => openSection("bookings")}
        >
          <span className="admin-card-icon">🎟️</span>
          <h2>Manage Bookings</h2>
          <p>View all booked tickets and payment details.</p>
          <span className="admin-card-count">
            {tickets.length} Bookings →
          </span>
        </button>

        <button
          className={`admin-management-card ${activeSection === "registrations" ? "selected" : ""}`}
          onClick={() => openSection("registrations")}
        >
          <span className="admin-card-icon">👥</span>
          <h2>Event Registrations</h2>
          <p>View all registered participants.</p>
          <span className="admin-card-count">
            {tickets.length} Registrations →
          </span>
        </button>

        <button
          className={`admin-management-card ${activeSection === "create" ? "selected" : ""}`}
          onClick={() => openSection("create")}
        >
          <span className="admin-card-icon">＋</span>
          <h2>Create Event</h2>
          <p>Add a new event to EVENTRA.</p>
          <span className="admin-card-count">
            Add New Event →
          </span>
        </button>

      </div>

      {/* SELECTED SECTION */}

      {activeSection && (
        <div className="admin-content-section">

          <div className="admin-section-heading">
            <div>
              <span className="section-tag">EVENTRA MANAGEMENT</span>
              <h2>{sectionTitles[activeSection]}</h2>
            </div>

            <button
              className="logout-btn"
              onClick={() => setActiveSection("")}
            >
              ← Dashboard
            </button>
          </div>

          {/* MANAGE EVENTS */}

          {activeSection === "events" && (
            <div className="admin-event-list">

              {events.map((event) => (
                <div className="admin-event-item" key={event.id}>

                  <img src={event.image} alt={event.name} />

                  <div className="admin-event-details">
                    <h3>{event.name}</h3>
                    <p>{event.category} | {event.date}</p>
                    <p>{event.venue} | ₹{event.price}</p>
                    <p>
                      Status: <strong>{event.status || "Pending"}</strong>
                    </p>
                  </div>

                  <div className="admin-action-buttons">

                    <button
                      className="approve-btn"
                      onClick={() => changeEventStatus(event, "Approved")}
                    >
                      Approve
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() => changeEventStatus(event, "Rejected")}
                    >
                      Reject
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(event.id)}
                    >
                      Delete
                    </button>

                  </div>
                </div>
              ))}

              {events.length === 0 && (
                <p className="empty-message">No events available.</p>
              )}
            </div>
          )}

          {/* MANAGE BOOKINGS */}

          {activeSection === "bookings" && (
            <div className="admin-data-list">

              {tickets.map((ticket, index) => (
                <div className="admin-data-card" key={ticket.ticketId || index}>
                  <div>
                    <span className="section-tag">BOOKING DETAILS</span>
                    <h3>{ticket.eventName || "Event"}</h3>
                    <p>Ticket ID: {ticket.ticketId || "N/A"}</p>
                    <p>Quantity: {ticket.quantity || 1}</p>
                    <p>Payment: {ticket.paymentMethod || "N/A"}</p>
                    <p>Booking Date: {ticket.bookingDate || "N/A"}</p>
                  </div>

                  <div className="admin-data-right">
                    <h2>₹{ticket.total || 0}</h2>
                    <span className="admin-status">
                      {ticket.status || "Confirmed"}
                    </span>
                  </div>
                </div>
              ))}

              {tickets.length === 0 && (
                <p className="empty-message">No bookings available yet.</p>
              )}
            </div>
          )}

          {/* EVENT REGISTRATIONS */}

          {activeSection === "registrations" && (
            <div className="admin-data-list">

              {tickets.map((ticket, index) => (
                <div
                  className="admin-data-card"
                  key={ticket.ticketId || index}
                >
                  <div>
                    <span className="section-tag">PARTICIPANT</span>
                    <h3>
                      {ticket.userName ||
                       ticket.name ||
                       ticket.fullName ||
                       "Participant"}
                    </h3>
                    <p>
                      Email: {ticket.userEmail ||
                              ticket.email ||
                              "Not available"}
                    </p>
                    <p>Event: {ticket.eventName || "Event"}</p>
                    <p>Ticket ID: {ticket.ticketId || "N/A"}</p>
                    <p>Tickets: {ticket.quantity || 1}</p>
                  </div>

                  <div className="admin-data-right">
                    <span className="admin-status">
                      {ticket.status || "Confirmed"}
                    </span>
                  </div>
                </div>
              ))}

              {tickets.length === 0 && (
                <p className="empty-message">
                  No registrations available yet.
                </p>
              )}
            </div>
          )}

          {/* CREATE EVENT */}

          {activeSection === "create" && (
            <form className="event-form" onSubmit={handleSubmit}>

              <h2>Create New Event</h2>

              <label>Event Name</label>
              <input
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                placeholder="Enter event name"
                required
              />

              <label>Event Category</label>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              >
                <option>Technology</option>
                <option>Cultural</option>
                <option>Music</option>
                <option>Sports</option>
                <option>Workshop</option>
                <option>Education</option>
              </select>

              <div className="form-two-columns">
                <div>
                  <label>Event Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) =>
                      setForm({ ...form, date: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label>Event Time</label>
                  <input
                    type="time"
                    value={form.time}
                    onChange={(e) =>
                      setForm({ ...form, time: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <label>Venue</label>
              <input
                value={form.venue}
                onChange={(e) =>
                  setForm({ ...form, venue: e.target.value })
                }
                placeholder="Enter event venue"
                required
              />

              <label>Ticket Price (₹)</label>
              <input
                type="number"
                min="0"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
                placeholder="Enter ticket price"
                required
              />

              <label>Event Description</label>
              <textarea
                rows="4"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Describe your event"
                required
              />

              <label>Upload Event Image</label>

              <div
                className="image-upload-area"
                onClick={() => fileRef.current?.click()}
              >
                <h3>＋ Click to Upload Event Image</h3>
                <p>PNG, JPG or WEBP (Maximum 2MB)</p>

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImage}
                  hidden
                />
              </div>

              {preview && (
                <div className="upload-preview">
                  <img src={preview} alt="Event preview" />

                  <button
                    type="button"
                    onClick={() => {
                      setPreview("");
                      if (fileRef.current) {
                        fileRef.current.value = "";
                      }
                    }}
                  >
                    Remove Image
                  </button>
                </div>
              )}

              <button type="submit" className="primary-btn full-btn">
                Create Event
              </button>

            </form>
          )}

        </div>
      )}

    </section>
  );
}

export default AdminDashboard;

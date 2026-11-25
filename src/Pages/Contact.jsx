
import React, { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const messages = JSON.parse(
      localStorage.getItem("eventra_messages") || "[]"
    );

    messages.push({
      ...form,
      id: crypto.randomUUID(),
      date: new Date().toLocaleString()
    });

    localStorage.setItem("eventra_messages", JSON.stringify(messages));

    setForm({
      name: "",
      email: "",
      subject: "",
      message: ""
    });

    setSuccess("Your message has been submitted successfully!");
  };

  return (
    <section className="contact-page">
      <div className="page-banner">
        <span className="section-tag">WE ARE HERE TO HELP</span>
        <h1>Contact <span>Us</span></h1>
        <p>Have a question? Get in touch with our team.</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h2>Let's Connect</h2>
          <p>We would love to hear from you.</p>

          <p><Mail /> support@eventra.com</p>
          <p><Phone /> +91 98765 43210</p>
          <p><MapPin /> Vijayawada, India</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Your Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <label>Subject</label>
          <input
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            required
          />

          <label>Message</label>
          <textarea
            rows="5"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />

          {success && <p className="success-message">{success}</p>}

          <button type="submit" className="primary-btn">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;

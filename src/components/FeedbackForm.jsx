import { useState } from "react";

export default function FeedbackForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      setError("Please provide your name and a message.");
      return;
    }

    setError("");
    setStatus("success");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="feedback-section cyber-box">
      <div className="feedback-header">
        <p className="section-tag">// FEEDBACK</p>
        <h2 className="section-title">Contact the Dome</h2>
        <p className="section-desc">
          Leave a message to report a bug, share an idea, or request access to
          more content.
        </p>
      </div>

      <form className="feedback-form" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <label htmlFor="name">Your name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Ex: Alex"
            autoComplete="name"
          />
        </div>

        <div className="form-row">
          <label htmlFor="email">Your email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Ex: alex@domain.com"
            autoComplete="email"
          />
        </div>

        <div className="form-row form-row-full">
          <label htmlFor="message">Your message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            placeholder="Describe your feedback, bug report, or request..."
          />
        </div>

        {error && (
          <div className="form-feedback form-feedback-error">{error}</div>
        )}
        {status === "success" && (
          <div className="form-feedback form-feedback-success">
            Thanks, your message has been received.
          </div>
        )}

        <button type="submit" className="btn-primary form-submit">
          Send message
        </button>
      </form>
    </section>
  );
}

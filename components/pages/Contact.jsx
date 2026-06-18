import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message submitted successfully (demo UI)");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div style={styles.bg}>
      <div style={styles.container}>

        <h2 style={styles.title}>Contact Us</h2>
        <p style={styles.subtitle}>
          Send your message and we will get back to you soon
        </p>

        {/* GRID */}
        <div style={styles.grid}>

          {/* INFO CARD */}
          <div style={styles.card}>
            <h3>Support</h3>
            <p>We provide 24/7 assistance for OCR related issues.</p>
          </div>

          <div style={styles.card}>
            <h3>Email</h3>
            <p>support@mozhi.ai</p>
          </div>

          <div style={styles.card}>
            <h3>Response Time</h3>
            <p>Within 24 hours</p>
          </div>

        </div>

        {/* FORM */}
        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            style={styles.textarea}
            required
          />

          <button type="submit" style={styles.button}>
            Send Message
          </button>
        </form>

      </div>
    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  bg: {
    minHeight: "100vh",
    padding: "80px 20px",
    background:
      "linear-gradient(135deg, #6a11cb 0%, #ff758c 40%, #ff7e5f 70%, #ffcc70 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: "100%",
    maxWidth: "900px",
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(20px)",
    borderRadius: "20px",
    padding: "30px",
    color: "white",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },

  title: {
    textAlign: "center",
    marginBottom: "10px",
  },

  subtitle: {
    textAlign: "center",
    marginBottom: "30px",
    opacity: 0.8,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    marginBottom: "30px",
  },

  card: {
    background: "rgba(0,0,0,0.2)",
    padding: "20px",
    borderRadius: "15px",
    transition: "0.3s",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
  },

  textarea: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    minHeight: "120px",
  },

  button: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#111",
    color: "white",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default Contact;
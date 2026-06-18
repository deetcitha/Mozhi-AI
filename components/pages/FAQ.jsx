import { useState } from "react";

function FAQ() {
  const [suggestion, setSuggestion] = useState("");

  const faqs = [
    {
      q: "What is Mozhi AI?",
      a: "Mozhi AI is an OCR + translation system that converts image, voice, and text into Tamil output using AI."
    },
    {
      q: "How does OCR work?",
      a: "The uploaded image is processed using OCR engine, extracted text is converted into Tamil and Tanglish format."
    },
    {
      q: "Do I need login?",
      a: "Yes, authentication is required for OCR, voice OCR and history features."
    },
    {
      q: "Does voice OCR support all browsers?",
      a: "It works only in modern browsers like Chrome that support Web Speech API."
    },
    {
      q: "Is my data stored?",
      a: "Yes, OCR history is stored securely and you can delete it anytime."
    }
  ];

  const handleSubmit = () => {
    if (!suggestion) return;
    alert("Suggestion submitted");
    setSuggestion("");
  };

  return (
    <div style={styles.bg}>
      <div style={styles.container}>

        <h2 style={styles.title}>Frequently Asked Questions</h2>

        <div style={styles.grid}>
          {faqs.map((item, i) => (
            <div
              key={i}
              style={styles.card}
              onMouseEnter={(e) =>
                (e.currentTarget.children[0].style.transform = "rotateY(180deg)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.children[0].style.transform = "rotateY(0deg)")
              }
            >
              <div style={styles.inner}>

                {/* FRONT */}
                <div style={styles.front}>
                  {item.q}
                </div>

                {/* BACK (ANSWER FIXED HERE) */}
                <div style={styles.back}>
                  <p style={{ padding: "10px", lineHeight: "1.5" }}>
                    {item.a}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* SUGGESTION */}
        <div style={styles.suggestionBox}>
          <h3>Suggestion</h3>

          <textarea
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            style={styles.textarea}
            placeholder="Write your suggestion..."
          />

          <button onClick={handleSubmit} style={styles.button}>
            Submit
          </button>
        </div>

      </div>
    </div>
  );
}

/* ===== STYLES ===== */
const styles = {
  bg: {
    minHeight: "90vh",
    padding: "80px 20px",
    background: "linear-gradient(135deg,#0f0c29,#302b63,#24243e)",
    color: "white",
  },

  container: {
    maxWidth: "1100px",
    margin: "auto",
  },

  title: {
    textAlign: "center",
    marginBottom: "30px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
    justifyItems: "center",
  },

  card: {
    width: "200px",
    height: "140px",
    padding:"12px",
    perspective: "1200px",
    cursor: "pointer",
  },

  inner: {
    width: "100%",
    height: "100%",
    position: "relative",
    transformStyle: "preserve-3d",
    transition: "0.8s",
  },

  front: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "15px",
    textAlign: "center",
    fontWeight: "bold",
    background: "linear-gradient(135deg,#6a11cb,#2575fc)",
  },

  back: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    transform: "rotateY(180deg)",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    textAlign: "center",
    background: "linear-gradient(135deg,#ff512f,#dd2476)",
  },

  suggestionBox: {
    marginTop: "40px",
    padding: "20px",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "15px",
  },

  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    borderRadius: "10px",
    border: "none",
  },

  button: {
    marginTop: "10px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "10px",
    background: "#111",
    color: "white",
    cursor: "pointer",
  },
};

export default FAQ;
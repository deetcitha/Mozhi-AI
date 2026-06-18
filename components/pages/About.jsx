import { useEffect, useState } from "react";

function About() {
  return (
    <div style={styles.bg}>

      <div style={styles.container}>

        {/* HERO */}
        <div style={styles.hero}>
          <h1 style={styles.title}>About Tamiloli AI</h1>
          <p style={styles.subtitle}>
            AI powered OCR and Translation platform for Tanglish to Tamil conversion
          </p>
        </div>

        {/* IMAGE SECTION */}
        <div style={styles.imageBox}>
          <img
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
            alt="AI OCR"
            style={styles.image}
          />
        </div>

        {/* DESCRIPTION */}
        <div style={styles.textBox}>
          <p>
            Tamiloli AI is an intelligent system designed to convert
            handwritten or digital text into Tamil using advanced OCR
            and AI translation models.
          </p>

          <p>
            It supports multiple input modes including image upload,
            voice input, and live camera capture.
          </p>
        </div>
        {/* OCR WORKFLOW DIAGRAM */}
<div style={styles.workflowBox}>

  <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
    OCR Workflow
  </h3>

  <div style={styles.workflow}>

    <div style={{ ...styles.step, ...styles.step1 }}>
      Input Image
    </div>

    <div style={styles.arrow}>→</div>

    <div style={{ ...styles.step, ...styles.step2 }}>
      AI Processing
    </div>

    <div style={styles.arrow}>→</div>

    <div style={{ ...styles.step, ...styles.step3 }}>
      Text Extraction
    </div>

    <div style={styles.arrow}>→</div>

    <div style={{ ...styles.step, ...styles.step4 }}>
      Tamil Output
    </div>

  </div>

</div>

        {/* FEATURES GRID */}
        <div style={styles.grid}>

          <div style={styles.card}>
            Image OCR Processing
          </div>

          <div style={styles.card}>
            Voice to Text OCR
          </div>

          <div style={styles.card}>
            Camera Based Capture
          </div>

          <div style={styles.card}>
            History Tracking System
          </div>

        </div>

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
  },

  container: {
    width: "100%",
    maxWidth: "1000px",
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(20px)",
    borderRadius: "20px",
    padding: "30px",
    color: "white",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },

  hero: {
    textAlign: "center",
    marginBottom: "20px",
  },

  title: {
    fontSize: "32px",
    marginBottom: "10px",
  },

  subtitle: {
    opacity: 0.8,
  },

  imageBox: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
  },

  image: {
    width: "100%",
    maxWidth: "600px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
  },

  textBox: {
    marginTop: "20px",
    lineHeight: "1.6",
    opacity: 0.9,
  },

  grid: {
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
  },

  card: {
    background: "rgba(0,0,0,0.25)",
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center",
    transition: "0.3s",
    cursor: "pointer",
  },
  workflowBox: {
  marginTop: "40px",
  padding: "20px",
  borderRadius: "15px",
  background: "rgba(0,0,0,0.2)",
  backdropFilter: "blur(10px)",
},

workflow: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "10px",
},

step: {
  padding: "15px 20px",
  borderRadius: "12px",
  color: "white",
  fontWeight: "bold",
  textAlign: "center",
  minWidth: "140px",
  transition: "0.3s",
  cursor: "pointer",
  animation: "float 2s ease-in-out infinite",
},

step1: {
  background: "linear-gradient(135deg, #8e2de2, #4a00e0)",
},

step2: {
  background: "linear-gradient(135deg, #2193b0, #6dd5ed)",
  animationDelay: "0.2s",
},

step3: {
  background: "linear-gradient(135deg, #ff512f, #f09819)",
  animationDelay: "0.4s",
},

step4: {
  background: "linear-gradient(135deg, #00b09b, #96c93d)",
  animationDelay: "0.6s",
},

arrow: {
  fontSize: "22px",
  fontWeight: "bold",
  color: "white",
}
};

export default About;
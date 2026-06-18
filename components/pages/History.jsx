import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

function History() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchHistory = async () => {
    setLoading(true);

    try {
      const res = await axios.get("http://127.0.0.1:8000/history", {
        headers: { Authorization: "Bearer " + token },
      });

      setData(res.data.history || []);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const deleteItem = async (id) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/history/delete?id=${id}`,
        { headers: { Authorization: "Bearer " + token } }
      );

      fetchHistory();
    } catch (err) {
      console.log(err);
    }
  };

  const clearAll = async () => {
    try {
      await axios.delete(
        "http://127.0.0.1:8000/history/clear",
        { headers: { Authorization: "Bearer " + token } }
      );

      fetchHistory();
    } catch (err) {
      console.log(err);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text("OCR HISTORY REPORT", 10, 10);

    data.forEach((item, index) => {
      doc.text(`${index + 1}.`, 10, 20 + index * 30);
      doc.text(`Tanglish: ${item.tanglish}`, 10, 25 + index * 30);
      doc.text(`Tamil: ${item.tamil}`, 10, 30 + index * 30);
    });

    doc.save("ocr-history.pdf");
  };

  return (
    <div style={styles.bg}>
      <div style={styles.card}>

        <h2 style={{ marginBottom: "15px" }}>📜 OCR History</h2>

        {/* BUTTONS */}
        <div style={styles.btnRow}>
          <button style={styles.greenBtn} onClick={downloadPDF}>
            📄 Download PDF
          </button>

          <button style={styles.redBtn} onClick={clearAll}>
            Clear All
          </button>
        </div>

        {/* LOADING */}
        {loading && <p>⏳ Loading...</p>}

        {/* DATA */}
        {data.map((item) => (
          <div key={item._id} style={styles.item}>
            <p>📝 {item.tanglish}</p>
            <p>🇮🇳 {item.tamil}</p>
            <small>{item.created_at}</small>

            <br />

            <button
              onClick={() => deleteItem(item._id)}
              style={styles.deleteBtn}
            >
              Delete
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}

/* 🎨 FINAL STYLES */
const styles = {
  bg: {
    minHeight: "100vh",
    padding: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    background:
      "linear-gradient(135deg, #6a11cb 0%, #ff758c 40%, #ff7e5f 70%, #ffcc70 100%)",
    backgroundSize: "400% 400%",
  },

  card: {
    width: "100%",
    maxWidth: "750px",
    padding: "25px",
    borderRadius: "20px",

    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(18px)",
    color: "white",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },

  btnRow: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "15px",
  },

  item: {
    width: "100%",
    marginTop: "10px",
    padding: "12px",
    borderRadius: "10px",

    background: "rgba(0,0,0,0.25)",
    border: "1px solid rgba(255,255,255,0.3)",

    textAlign: "center",
  },

  greenBtn: {
    background: "green",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  redBtn: {
    background: "red",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  deleteBtn: {
    marginTop: "8px",
    background: "#111",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default History;
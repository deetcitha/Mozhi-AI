import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OCR() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  const [voiceText, setVoiceText] = useState("");
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);


  // ---------------- OCR ----------------
  const processFile = async (file) => {
    if (!file) {
      alert("Please select image");
      return;
    }

    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    setFilePreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/ocr",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ FIXED
          },
          timeout: 30000,
        }
      );

      setResult(res.data);
    } catch (err) {
      console.log("OCR ERROR:", err?.response?.data || err.message);
      alert("OCR Failed  (check backend token)");
    }

    setLoading(false);
  };

  // ---------------- DRAG DROP ----------------
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    processFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleFileSelect = (e) => {
    processFile(e.target.files[0]);
  };

  // ---------------- VOICE ----------------
  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.start();

    setListening(true);

    recognition.onresult = async (e) => {
      const text = e.results[0][0].transcript;

      setVoiceText(text);
      setListening(false);

      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/ocr-text",
          { text },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setResult(res.data);
      } catch (err) {
        console.log("VOICE ERROR:", err);
      }
    };

    recognition.onerror = () => {
      setListening(false);
    };
  };

  // ---------------- CAMERA ----------------
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      videoRef.current.srcObject = stream;
    } catch {
      alert("Camera denied");
    }
  };

  const captureImage = () => {
    if (!videoRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      const file = new File([blob], "camera.jpg", {
        type: "image/jpeg",
      });

      processFile(file);
    });
  };

  return (
    <div style={styles.bg}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2>Mozhi AI OCR</h2>

          <button
            style={styles.historyBtn}
            onClick={() => navigate("/history")}
          >
            History
          </button>
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          style={{
            ...styles.dropBox,
            border: dragActive
              ? "2px solid white"
              : "2px dashed white",
          }}
        >
          Drag & Drop Image Here
        </div>

        <div style={{ textAlign: "center", marginTop: 10 }}>
          <button
            style={styles.selectBtn}
            onClick={() => fileInputRef.current.click()}
          >
            Select File
          </button>

          <input
            type="file"
            hidden
            ref={fileInputRef}
            onChange={handleFileSelect}
          />
        </div>

        {filePreview && (
          <div style={styles.previewBox}>
            <img
              src={filePreview}
              alt="preview"
              style={styles.previewImg}
            />
          </div>
        )}

        <div style={styles.cardRow}>
          <div
            style={{ ...styles.cardBox, ...styles.blue }}
            onClick={startVoice}
          >
            {listening ? "Listening..." : "Voice"}
          </div>

          <div
            style={{ ...styles.cardBox, ...styles.orange }}
            onClick={startCamera}
          >
            Camera
          </div>

          <div
            style={{ ...styles.cardBox, ...styles.purple }}
            onClick={captureImage}
          >
            Capture
          </div>
        </div>

        {loading && <p style={{ textAlign: "center" }}>Processing...</p>}

        {voiceText && (
          <div style={styles.voiceBox}>{voiceText}</div>
        )}

        {result && (
          <div style={styles.result}>
            <h4>Result</h4>

            <p><b>Tanglish:</b> {result.tanglish}</p>
            <p><b>Tamil:</b> {result.tamil}</p>
          </div>
        )}

        <video ref={videoRef} autoPlay style={styles.video} />

        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </div>
  );
}

// ---------------- YOUR ORIGINAL UI (UNCHANGED) ----------------
const styles = {
  bg: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg,#6a11cb,#ff758c,#ffcc70)",
  },

  card: {
    width: "100%",
    maxWidth: 700,
    padding: 20,
    borderRadius: 20,
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(20px)",
    color: "white",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  historyBtn: {
    background: "#111",
    color: "white",
    border: "none",
    padding: 8,
    borderRadius: 8,
    cursor: "pointer",
  },

  dropBox: {
    marginTop: 15,
    padding: 25,
    textAlign: "center",
    borderRadius: 15,
  },

  selectBtn: {
    padding: 10,
    borderRadius: 10,
    background: "#2193b0",
    color: "white",
    border: "none",
    cursor: "pointer",
  },

  previewBox: {
    marginTop: 15,
    textAlign: "center",
  },

  previewImg: {
    width: "100%",
    maxHeight: 250,
    objectFit: "contain",
    borderRadius: 12,
  },

  cardRow: {
    display: "flex",
    gap: 10,
    marginTop: 15,
    justifyContent: "center",
    flexWrap: "wrap",
  },

  cardBox: {
    width: 120,
    height: 120,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    cursor: "pointer",
    fontWeight: "bold",
  },

  blue: {
    background: "linear-gradient(135deg,#2193b0,#6dd5ed)",
  },

  orange: {
    background: "linear-gradient(135deg,#ff512f,#f09819)",
  },

  purple: {
    background: "linear-gradient(135deg,#8e2de2,#4a00e0)",
  },

  voiceBox: {
    marginTop: 15,
    padding: 10,
    background: "rgba(0,0,0,0.3)",
    borderRadius: 10,
  },

  result: {
    marginTop: 15,
    padding: 15,
    background: "rgba(0,0,0,0.25)",
    borderRadius: 12,
  },

  video: {
    width: "100%",
    marginTop: 15,
    borderRadius: 12,
  },
};

export default OCR;
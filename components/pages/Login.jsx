import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setMessage("Enter username & password");
      return;
    }

    setLoading(true);

    try {
      const res = await loginUser({
        username,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      if (res.data.access_token) {
        localStorage.setItem("token", res.data.access_token);

        setMessage("Login Success ");

        // move to OCR page
        setTimeout(() => {
          navigate("/ocr");
        }, 800);
      } else {
        setMessage(res.data.message || "Login Failed");
      }
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      setMessage("Server Error / Backend not running");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#6a11cb 30%, #ff758c 70%, #ff7e5f 90%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "40px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          textAlign: "center",
          color: "white",
        }}
      >
        <h1 style={{ marginBottom: "10px", fontSize: "32px" }}>
          Mozhi AI
        </h1>

        <p style={{ marginBottom: "30px", opacity: 0.9 }}>
          Tanglish ➜ Tamil Translator
        </p>

        {/* USERNAME */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "15px",
            borderRadius: "12px",
            border: "none",
            outline: "none",
            fontSize: "15px",
            fontWeight: "bold",
          }}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "20px",
            borderRadius: "12px",
            border: "none",
            outline: "none",
            fontSize: "15px",
            fontWeight: "bold",
          }}
        />

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "none",
            background: "#fff",
            color: "#6a11cb",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* MESSAGE */}
        {message && (
          <p
            style={{
              marginTop: "20px",
              fontWeight: "bold",
              color: message.includes("Success") ? "#90EE90" : "#FFD1D1",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
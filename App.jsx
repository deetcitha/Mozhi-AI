import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./pages/Login";
import OCR from "./pages/OCR";
import History from "./pages/History";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorage = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />

      <div style={{ paddingTop: "70px", paddingBottom: "80px" }}>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/ocr"
            element={token ? <OCR /> : <Navigate to="/login" />}
          />

          <Route
            path="/history"
            element={token ? <History /> : <Navigate to="/login" />}
          />

          {/* PUBLIC PAGES */}
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
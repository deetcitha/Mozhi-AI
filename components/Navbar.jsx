function Navbar() {
  return (
    <div
      style={{
        width: "100%",
        height: "60px",
        padding: "0 20px",
        position: "fixed",
        top: 0,
        left: 0,
        background: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(12px)",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1000,
        boxSizing: "border-box",
      }}
    >
      {/* BRAND */}
      <h3 style={{ margin: 0, fontSize: "34px" }}>
          Mozhi-AI
      </h3>

      {/* LINKS */}
      <div
        style={{
          display: "flex",
          gap: "18px",
          alignItems: "center",
          flexWrap: "nowrap",
          overflow: "hidden",
        }}
      >
        <a href="/ocr" style={linkStyle}>OCR</a>
        <a href="/about" style={linkStyle}>About</a>
        <a href="/FAQ" style={linkStyle}>FAQ</a>
        <a href="/contact" style={linkStyle}>Contact</a>
        <a href="/History" style={linkStyle}>History</a>
        <a href="/login" style={linkStyle}>Login</a>
      </div>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "14px",
  padding: "6px 10px",
  borderRadius: "8px",
  transition: "0.3s",
};

export default Navbar;
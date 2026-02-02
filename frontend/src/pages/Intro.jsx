import { useNavigate } from "react-router-dom";

function Intro() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #1f1c2c, #928dab)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "48px" }}>SwipeHire</h1>

      <p style={{ fontSize: "18px", maxWidth: "400px" }}>
        Swipe your way to your next job.
        Smart matching. Faster hiring.
      </p>

      <button
        onClick={() => navigate("/swipe")}
        style={{
          marginTop: "30px",
          padding: "12px 30px",
          fontSize: "16px",
          borderRadius: "25px",
          border: "none",
          cursor: "pointer",
          background: "#4CAF50",
          color: "white",
        }}
      >
        Get Started
      </button>
    </div>
  );
}

export default Intro;

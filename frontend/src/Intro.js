import { useNavigate } from "react-router-dom";
import "./Intro.css";

function Intro() {

  const navigate = useNavigate();

  return (
    <div className="intro-container">

      <div className="glow glow1"></div>
      <div className="glow glow2"></div>
      <div className="glow glow3"></div>

      <div className="intro-card">

        <h1 className="logo">SwipeHire</h1>

        <p className="tagline">
          Swipe. Match. Get Hired.
        </p>

        <p className="subtitle">
          Where Talent Meets Opportunity
        </p>

        <button
          className="start-btn"
          onClick={() => navigate("/login")}
        >
          Get Started
        </button>

        <p className="creator">
          Created by <span>Shikhar Singh Rawat</span>
        </p>

      </div>

    </div>
  );
}

export default Intro;

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div
      style={{
        padding: "16px",
        background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)",
        display: "flex",
        justifyContent: "center",
        gap: "40px",
        boxShadow: "0px 5px 15px rgba(0,0,0,0.4)",
      }}
    >
      <Link
        style={{
          color: "#00e6ff",
          textDecoration: "none",
          fontSize: "18px",
          fontWeight: "bold",
        }}
        to="/"
      >
        Swipe Jobs
      </Link>

      <Link
        style={{
          color: "#00e6ff",
          textDecoration: "none",
          fontSize: "18px",
          fontWeight: "bold",
        }}
        to="/liked"
      >
        Liked Jobs
      </Link>

      <Link
        style={{
          color: "#00e6ff",
          textDecoration: "none",
          fontSize: "18px",
          fontWeight: "bold",
        }}
        to="/rejected"
      >
        Rejected Jobs
      </Link>

      <Link style={{ color: "#00e6ff", fontSize: "18px" }} to="/upload">
        Upload Resume
        </Link>

    </div>
  );
}

export default Navbar;

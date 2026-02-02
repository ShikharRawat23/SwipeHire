import { useEffect, useState } from "react";
import axios from "axios";

function LikedJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/swipes/liked/")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        ❤️ Liked Jobs
      </h2>

      {jobs.length === 0 && (
        <p style={{ textAlign: "center" }}>No liked jobs yet.</p>
      )}

      {jobs.map((job) => (
        <div
          key={job.id}
          style={{
            background: "white",
            color: "#333",
            padding: "15px",
            borderRadius: "12px",
            marginBottom: "12px",
            boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
          }}
        >
          <h3>{job.title}</h3>
          <p>{job.company}</p>
          <p>{job.location}</p>
        </div>
      ))}
    </div>
  );
}

export default LikedJobs;

import { useEffect, useState } from "react";
import "./LikedJobs.css";
import Navbar from "./Navbar";
import API_BASE_URL from "./api";

function LikedJobs(){

  const [jobs, setJobs] = useState([]);

  useEffect(() => {

    fetch(
  `${API_BASE_URL}/api/swipes/liked/?username=${localStorage.getItem("username")}`
)
      .then(res => res.json())
      .then(data => setJobs(data));

  }, []);

  return (
    <>
      <Navbar />

      <div className="liked-container">

        <h2>❤️ Jobs You Liked</h2>

        {jobs.length === 0 && <p>No liked jobs yet</p>}

        {jobs.map(job => (

          <div className="liked-card" key={job.id}>

            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <p>{job.salary}</p>

            {/* STATUS */}
            <span className="status">

              {job.status === "PENDING" && "⏳ Decision Pending"}
              {job.status === "ACCEPTED" && "✅ Accepted"}
              {job.status === "REJECTED" && "❌ Rejected"}

              {!job.status && "⏳ Decision Pending"}

            </span>

          </div>

        ))}

      </div>
    </>
  );
}

export default LikedJobs;

import { useEffect, useState } from "react";
import "./JobCards.css";
import "./LikedJobs.css";
import Navbar from "./Navbar";
import API_BASE_URL from "./api";


function JobCards() {

  const [jobs, setJobs] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const username = localStorage.getItem("username");

  // LOAD JOBS
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/jobs/?username=${username}`)

      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setIndex(0);
        setLoading(false);
      });
  }, [username]);

  // LIKE JOB
  const handleLike = () => {
    fetch(`${API_BASE_URL}/api/swipes/save/`, {

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        job_id: jobs[index].id,
        action: "LIKE",
        username: username
      })
    });

    setIndex(prev => prev + 1);
  };

  // REJECT JOB
  const handleReject = () => {
    fetch(`${API_BASE_URL}/api/swipes/save/`, {

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        job_id: jobs[index].id,
        action: "REJECT",
        username: username
      })
    });

    setIndex(prev => prev + 1);
  };

  // UI STATES
  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading jobs...</h2>;
  }

  if (jobs.length === 0) {
    return <h2 style={{ textAlign: "center" }}>No Jobs Available</h2>;
  }

  if (index >= jobs.length) {
    return <h2 style={{ textAlign: "center" }}>No more jobs</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="job-container">

        <div className="job-card">

          <h2>{jobs[index].title}</h2>

          <p><b>Company:</b> {jobs[index].company}</p>
          <p><b>Location:</b> {jobs[index].location}</p>
          <p><b>Salary:</b> {jobs[index].salary}</p>

          <div className="btn-group">

            <button className="reject" onClick={handleReject}>
              Reject
            </button>

            <button className="like" onClick={handleLike}>
              Like
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default JobCards;

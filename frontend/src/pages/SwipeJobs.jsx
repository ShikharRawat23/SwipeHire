import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../components/JobCard";

function SwipeJobs() {
  const [jobs, setJobs] = useState([]);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(null);

  // Temporary logged-in user
  const username = "shikhar";

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/jobs/matched/")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (jobs.length === 0) {
    return <p style={{ color: "white" }}>Loading jobs...</p>;
  }

  const job = jobs[index];

  const handleLike = () => {
    setAnimate("right");

    axios.post("http://127.0.0.1:8000/api/swipes/save/", {
      job_id: job.id,
      action: "liked",
      username: username,
    });

    setTimeout(() => {
      setAnimate(null);
      setIndex(index + 1);
    }, 400);
  };

  const handleReject = () => {
    setAnimate("left");

    axios.post("http://127.0.0.1:8000/api/swipes/save/", {
      job_id: job.id,
      action: "rejected",
      username: username,
    });

    setTimeout(() => {
      setAnimate(null);
      setIndex(index + 1);
    }, 400);
  };

  if (!job) {
    return <h2 style={{ color: "white" }}>No more jobs 🎉</h2>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <JobCard
        job={job}
        onLike={handleLike}
        onReject={handleReject}
        animate={animate}
      />
    </div>
  );
}

export default SwipeJobs;

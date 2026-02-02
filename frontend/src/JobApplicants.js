import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

function JobApplicants() {

  const { jobId } = useParams();
  const [users, setUsers] = useState([]);

  // Load applicants
  const loadUsers = useCallback(() => {
    fetch(`http://127.0.0.1:8000/api/swipes/job/${jobId}/likes/`)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.log("Fetch error:", err));
  }, [jobId]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // Accept / Reject
  const decide = (swipe_id, decision) => {
    fetch("http://127.0.0.1:8000/api/swipes/decision/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ swipe_id, decision })
    })
    .then(() => loadUsers());
  };

  return (
    <>
      <Navbar />

      <div className="center">

        <div style={{ width: "95%", maxWidth: "1000px" }}>

          <h2 style={{ marginBottom: "20px" }}>Applicants</h2>

          {users.length === 0 && (
            <p>No applicants yet</p>
          )}

          {users.map(u => (

            <div
              key={u.swipe_id}
              className="card"
              style={{
                marginTop: "20px",
                padding: "25px",
                borderRadius: "14px"
              }}
            >

              <h3>{u.username}</h3>
              <p>{u.email}</p>

              {/* SKILLS */}
              <div style={{ marginTop: "10px" }}>
                {u.skills.map((s, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "6px 12px",
                      background: "#1e293b",
                      borderRadius: "20px",
                      marginRight: "8px",
                      fontSize: "13px"
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* RESUME */}
              {u.resume && (
                <div style={{ marginTop: "15px" }}>
                  <a
                    href={`http://127.0.0.1:8000${u.resume}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button className="btn btn-outline">
                      📥 Download Resume
                    </button>
                  </a>
                </div>
              )}

              {/* STATUS */}
              <p
                style={{
                  marginTop: "15px",
                  fontWeight: "bold",
                  color:
                    u.status === "ACCEPTED"
                      ? "#22c55e"
                      : u.status === "REJECTED"
                      ? "#ef4444"
                      : "#facc15"
                }}
              >
                {u.status === "ACCEPTED" && "✅ Accepted"}
                {u.status === "REJECTED" && "❌ Rejected"}
                {u.status === "PENDING" && "⏳ Pending"}
              </p>

              {/* ACTION BUTTONS */}
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  marginTop: "15px"
                }}
              >
                <button
                  className="btn btn-primary"
                  onClick={() => decide(u.swipe_id, "ACCEPTED")}
                >
                  Accept
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => decide(u.swipe_id, "REJECTED")}
                >
                  Reject
                </button>
              </div>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}

export default JobApplicants;

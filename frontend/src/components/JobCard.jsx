function JobCard({ job, onLike, onReject }) {
  return (
    <div
      style={{
        width: "320px",
        height: "420px",
        background: "white",
        borderRadius: "18px",
        padding: "20px",
        boxShadow: "0px 10px 30px rgba(0,0,0,0.25)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>{job.title}</h2>

      <p><b>Company:</b> {job.company}</p>
      <p><b>Location:</b> {job.location}</p>

      <div
        style={{
          background: "#4CAF50",
          color: "white",
          padding: "6px 14px",
          borderRadius: "20px",
          marginBottom: "15px",
        }}
      >
        Match: {job.score}%
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={onReject} style={{ marginRight: "10px" }}>
          ❌ Reject
        </button>
        <button onClick={onLike}>❤️ Like</button>
      </div>
    </div>
  );
}

export default JobCard;

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UploadResume() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleUpload = () => {
    console.log("Upload button clicked");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("file", file);

    axios
      .post("http://127.0.0.1:8000/api/resume/upload/", formData)
      .then((res) => {
        console.log("Upload success", res.data);
        navigate("/success");
      })
      .catch((err) => {
        console.log("Upload error", err);
        alert("Upload failed");
      });
  };

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h2>Upload Resume</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleUpload}>
        Upload Resume
      </button>
    </div>
  );
}

export default UploadResume;

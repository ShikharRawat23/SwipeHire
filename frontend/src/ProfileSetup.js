import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "./api";




function ProfileSetup(){

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [file,setFile] = useState(null);
  const navigate = useNavigate();
 

  

  const handleSubmit = () => {

  const formData = new FormData();
  formData.append("username", localStorage.getItem("username"));
  formData.append("name", name);
  formData.append("email", email);
  formData.append("file", file);

  fetch(`${API_BASE_URL}/api/resume/upload/`, {

    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {

    alert("Profile saved successfully");
    navigate("/jobseeker");   // ✅ MyProfile

  });

};


  return(
    <div className="center">

      <div className="card" style={{width:"420px"}}>

        <h2>Complete Your Profile</h2>
        <p style={{color:"var(--muted)"}}>
          Upload resume & get matched faster
        </p>

        <input
          placeholder="Full Name"
          onChange={e=>setName(e.target.value)}
        />

        <input
          placeholder="Email"
          onChange={e=>setEmail(e.target.value)}
        />

        <input
          type="file"
          onChange={e=>setFile(e.target.files[0])}
        />

        <button
          className="btn btn-primary"
          style={{width:"100%",marginTop:"20px"}}
          onClick={handleSubmit}
        >
          Save & Continue
        </button>

      </div>

    </div>
  );
}

export default ProfileSetup;

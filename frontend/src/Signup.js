import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "./api";

function Signup(){

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState("jobseeker");
  const navigate = useNavigate();

  const handleSignup = () => {

    fetch(`${API_BASE_URL}/api/accounts/register/`,{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ username, password, role })
    })
    .then(res => res.json())
    .then(data => {

      if(data.error){
        alert(data.error);
        return;
      }

      alert("Account created!");
      navigate("/login");

    });

  };

  return(
    <div className="center">

      <div className="card" style={{ width:"380px" }}>

        {/* APP NAME */}
        <h1 style={{ textAlign:"center" }}>SwipeHire</h1>

        {/* SLOGAN */}
        <p style={{ 
          textAlign:"center",
          color:"#94a3b8",
          marginBottom:"25px"
        }}>
          Swipe. Match. Get Hired.
        </p>

        <h2>Create Account 🚀</h2>

        <input
          placeholder="Username"
          onChange={e=>setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e=>setPassword(e.target.value)}
        />

        <select onChange={e=>setRole(e.target.value)}>

          <option value="jobseeker">Job Seeker</option>
          <option value="recruiter">Recruiter</option>

        </select>

        <button 
          className="btn btn-primary"
          style={{ width:"100%", marginTop:"15px" }}
          onClick={handleSignup}
        >
          Create Account
        </button>

        {/* LOGIN LINK */}
        <p 
          style={{
            marginTop:"20px",
            textAlign:"center",
            color:"#94a3b8"
          }}
        >
          Already have an account?{" "}
          <span
            style={{ color:"#6366f1", cursor:"pointer" }}
            onClick={()=>navigate("/login")}
          >
            Login
          </span>
        </p>

      </div>

    </div>
  );
}

export default Signup;

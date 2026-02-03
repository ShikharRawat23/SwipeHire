import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "./api";


function Signup(){

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState("jobseeker");
  const navigate = useNavigate();

  const handleSignup = ()=>{
    fetch(`${API_BASE_URL}/api/accounts/register/`,{

      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({username,password,role})
    })
    .then(res=>res.json())
    .then(()=>{
      alert("Account created. Login now.");
      navigate("/login");
    });
  };

  return(
    <div className="center">

      <div className="card" style={{width:"380px"}}>

        <h2>Create Account 🚀</h2>
        <p style={{color:"var(--muted)"}}>Join SwipeHire</p>

        <input
          placeholder="Username"
          onChange={e=>setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e=>setPassword(e.target.value)}
        />

        <select
          style={{
            width:"100%",
            padding:"12px",
            marginTop:"12px",
            background:"#020617",
            color:"white",
            borderRadius:"14px",
            border:"none"
          }}
          onChange={e=>setRole(e.target.value)}
        >
          <option value="jobseeker">Job Seeker</option>
          <option value="recruiter">Recruiter</option>
        </select>

        <button
          className="btn btn-primary"
          style={{width:"100%",marginTop:"20px"}}
          onClick={handleSignup}
        >
          Sign Up
        </button>

        <p 
          style={{marginTop:"20px", textAlign:"center", color:"var(--muted)"}}
        >
          Already have account?{" "}
          <span
            style={{color:"var(--primary)",cursor:"pointer"}}
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

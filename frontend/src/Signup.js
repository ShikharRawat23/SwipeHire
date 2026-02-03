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

      <div className="card">

        <h2>Create Account</h2>

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

        <button onClick={handleSignup}>
          Sign Up
        </button>

      </div>

    </div>
  );
}

export default Signup;

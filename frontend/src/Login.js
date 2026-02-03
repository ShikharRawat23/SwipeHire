import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "./api";

function Login(){

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {

    fetch(`${API_BASE_URL}/api/users/login/`, {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {

      if(data.error){
        alert(data.error);
        return;
      }

      // Save session
      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.role);

      if(data.role === "jobseeker"){
        navigate("/jobseeker");
      }

      if(data.role === "recruiter"){
        navigate("/recruiter");
      }

    });

  };

  return(
    <div className="center">

      <div className="card">

        <h2>Login</h2>

        <input
          placeholder="Username"
          onChange={e=>setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e=>setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;

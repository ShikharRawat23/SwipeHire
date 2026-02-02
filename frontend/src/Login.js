import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = ()=>{

    fetch("http://127.0.0.1:8000/api/accounts/login/",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({username,password})
    })
    .then(res=>res.json())
    .then(data=>{

      if(!data.role){
        alert("Invalid credentials");
        return;
      }

      // ✅ Save session
      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.role);

      // -------------------
      // JOBSEEKER FLOW
      // -------------------
      if(data.role === "jobseeker"){

        fetch(`http://127.0.0.1:8000/api/resume/check/${data.username}/`)
          .then(res=>res.json())
          .then(r=>{
            if(r.hasProfile){
              navigate("/jobseeker");      // MyProfile
            }else{
              navigate("/profilesetup");  // Upload resume
            }
          });

      }

      // -------------------
      // RECRUITER FLOW
      // -------------------
      if(data.role === "recruiter"){
        navigate("/recruiter");
      }

    });

  };

  return(
    <div className="center">

      <div className="card" style={{width:"380px"}}>

        <h2 style={{marginBottom:"20px"}}>Welcome Back 👋</h2>
        <p style={{color:"#94a3b8"}}>Login to SwipeHire</p>

        <input
          placeholder="Username"
          onChange={e=>setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e=>setPassword(e.target.value)}
        />

        <button 
          className="btn btn-primary"
          style={{width:"100%", marginTop:"20px"}}
          onClick={handleLogin}
        >
          Login
        </button>

        <p style={{marginTop:"20px", textAlign:"center", color:"#94a3b8"}}>
          New user?{" "}
          <span
            style={{color:"#6366f1",cursor:"pointer"}}
            onClick={()=>navigate("/signup")}
          >
            Create account
          </span>
        </p>

      </div>

    </div>
  );
}

export default Login;

const handleLogin = ()=>{

  fetch(`${API_BASE_URL}/api/users/login/`, {
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

      fetch(`${API_BASE_URL}/api/resume/check/${data.username}/`)
        .then(res=>res.json())
        .then(r=>{
          if(r.hasProfile){
            navigate("/jobseeker");
          }else{
            navigate("/profilesetup");
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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function PostJob(){

  const [title,setTitle] = useState("");
  const [company,setCompany] = useState("");
  const [location,setLocation] = useState("");
  const [salary,setSalary] = useState("");
  const navigate = useNavigate();

  const postJob = ()=>{
    fetch("http://127.0.0.1:8000/api/jobs/create/",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({
        title,company,location,salary
      })
    })
    .then(res=>res.json())
    .then(()=>{
      alert("Job posted!");
      navigate("/recruiter");
    });
  };

  return(
    <>
    <Navbar/>
    
    <div className="center">

      <div className="card" style={{width:"420px"}}>

        <h2>Post New Job</h2>

        <input
          placeholder="Job Title"
          onChange={e=>setTitle(e.target.value)}
        />

        <input
          placeholder="Company"
          onChange={e=>setCompany(e.target.value)}
        />

        <input
          placeholder="Location"
          onChange={e=>setLocation(e.target.value)}
        />

        <input
          placeholder="Salary"
          onChange={e=>setSalary(e.target.value)}
        />

        <button
          className="btn btn-primary"
          style={{width:"100%",marginTop:"20px"}}
          onClick={postJob}
        >
          Post Job
        </button>

      </div>

    </div>
   </>
  );
}

export default PostJob;

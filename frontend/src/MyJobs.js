import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function MyJobs(){

  const [jobs,setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    fetch("http://127.0.0.1:8000/api/jobs/myjobs/")
      .then(res=>res.json())
      .then(data=>setJobs(data));
  },[]);

  return(
    <>
      <Navbar/>

      <div className="center">
        <div style={{width:"90%",maxWidth:"800px"}}>

          <h2>My Posted Jobs</h2>

          {jobs.map(job => (
            <div key={job.id} className="card" style={{marginTop:"20px"}}>

              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <p>{job.location}</p>

              <button
                className="btn btn-outline"
                onClick={() => navigate(`/applicants/${job.id}`)}
              >
                View Applicants
              </button>

            </div>
          ))}

        </div>
      </div>
    </>
  );
}

export default MyJobs;

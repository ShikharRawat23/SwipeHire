import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import API_BASE_URL from "./api";


function MyProfile(){

  const [profile,setProfile] = useState({});
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(()=>{
    fetch(`${API_BASE_URL}/api/resume/profile/${username}/`)

      .then(data=>setProfile(data));
  },[username]);

  return(
    <>
      <Navbar/>

      <div className="center">

        <div className="card" style={{width:"420px"}}>

          <h2>My Profile</h2>

          <p><b>Username:</b> {profile.username}</p>
          <p><b>Email:</b> {profile.email}</p>

          {profile.resume && (
            <a
              href={`${API_BASE_URL}${profile.resume}`}

              target="_blank"
              rel="noreferrer"
            >
              <button className="btn btn-outline">
                Download Resume
              </button>
            </a>
          )}

          <div style={{display:"flex",gap:"10px",marginTop:"25px"}}>

            <button
              className="btn btn-primary"
              onClick={()=>navigate("/jobcards")}
            >
              Start Swiping
            </button>

            <button
              className="btn btn-outline"
              onClick={()=>navigate("/liked")}
            >
              Liked Jobs
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default MyProfile;

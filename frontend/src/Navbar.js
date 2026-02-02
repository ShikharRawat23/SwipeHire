import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar(){

  const navigate = useNavigate();

  const role = localStorage.getItem("role");   // jobseeker / recruiter

  const logout = ()=>{
    localStorage.clear();
    navigate("/login");
  };

  return(
    <div className="navbar">

      <div className="logo" onClick={()=>navigate("/")}>
        SwipeHire
      </div>

      <div className="nav-links">

        {role === "jobseeker" && (
          <>
            <span onClick={()=>navigate("/jobseeker")}>Profile</span>
            <span onClick={()=>navigate("/jobcards")}>Swipe Jobs</span>
            <span onClick={()=>navigate("/liked")}>Liked Jobs</span>
          </>
        )}

        {role === "recruiter" && (
          <>
            <span onClick={()=>navigate("/recruiter")}>Add Job</span>
            <span onClick={()=>navigate("/myjobs")}>My Jobs</span>
          </>
        )}

        <span onClick={logout}>Logout</span>

      </div>

    </div>
  );
}

export default Navbar;

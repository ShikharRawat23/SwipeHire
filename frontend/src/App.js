import { BrowserRouter, Routes, Route } from "react-router-dom";

import Intro from "./Intro";
import Login from "./Login";
import Signup from "./Signup";

import ProfileSetup from "./ProfileSetup";
import JobCards from "./JobCards";
import LikedJobs from "./LikedJobs";
import MyProfile from "./MyProfile";

import PostJob from "./PostJob";
import JobApplicants from "./JobApplicants";
import MyJobs from "./MyJobs";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing */}
        <Route path="/" element={<Intro />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Job Seeker */}
        <Route path="/jobseeker" element={<MyProfile />} />
        <Route path="/profilesetup" element={<ProfileSetup />} />
        <Route path="/jobcards" element={<JobCards />} />
        <Route path="/liked" element={<LikedJobs />} />

        {/* Recruiter */}
        <Route path="/recruiter" element={<PostJob />} />
        <Route path="/applicants/:jobId" element={<JobApplicants />} />
        <Route path="/myjobs" element={<MyJobs />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

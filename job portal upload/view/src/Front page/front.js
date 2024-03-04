import React from 'react';
import './FrontPage.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home.js';
import JobRecruiterLogin from '../Recruiter/JobRecruiterLogin.js';
import JobSeekerLogin from '../Seeker/JobSeekerLogin.js';
import JobSeekerSignUp from '../Seeker/JobSeekerSignUp.js';
import JObRecruiterSignUp from '../Recruiter/JObRecruiterSignUp.js';
import RecruiterProfile from '../Recruiter/RecruiterProfile.js';
import ProfileUpdate from '../Recruiter/ProfileUpdate.js';
import PostJob from '../Recruiter/PostJob.js';
import ViewPostedJob from '../Recruiter/ViewPostedJob.js';
import About from './About.js';
import SeekerProfile from '../Seeker/SeekerProfile.js';
import SearchJob from '../Seeker/SearchJob.js';

const FrontPage = () => {
  return (
    <Router>
      <div>
        <header className="header">
          <div className="headerdiv">
            <img src="/job.jpg" alt="pht" />
            <div className="header-content">
              <h1 className="jobName">Job9Connect</h1>
              <span className="des">Where Opportunities and Talents Unite</span>
            </div>
            <nav className="navbar navbar-expand-lg navbar-light">
              <div className="container">
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to={'/home'}>
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={'/JobRecruiterLogin'}>
                        Post a Job
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={'/JobSeekerLogin'}>
                        Search a Job
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={'/about'}>
                        About Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </header>
        <div className="content">
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/JobRecruiterLogin" element={<JobRecruiterLogin />} />
                <Route path="/JobSeekerLogin" element={<JobSeekerLogin />} />
                <Route path="/about" element={<About />} />
                <Route path="/JobRecruiterSignUp" element={<JObRecruiterSignUp />} />
                <Route path="/JobSeekerSignUp" element={<JobSeekerSignUp />} />
                <Route path="/Recruiter/Profile/:id" element={<RecruiterProfile />} />
                <Route path="/Recruiter/Profile/Update/:id" element={<ProfileUpdate />} />
                <Route path="/Recruiter/PostJob/:id" element={<PostJob />} />
                <Route path="/Recruiter/ViewPostedJob/:id" element={<ViewPostedJob />} />
                <Route path="/Seeker/Profile/:seekerId" element={<SeekerProfile/>}/>
                <Route path="/Seeker/SearchJob/:seekerId" element={<SearchJob/>}/>
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default FrontPage;


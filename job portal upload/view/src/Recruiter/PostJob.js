import {React,useState} from 'react';
import './PostJob.css';
import axios from 'axios';
import NavigationPage from './NavigationPage.js'
import {useParams} from 'react-router-dom';
const PostJob = () => {
  const {id}=useParams();
  const [jobTitle, setJobTitle] = useState("");
  const [salary, setSalary] = useState("");
  const [vacancies, setVacancies] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobRequirement, setJobRequirement] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const handleSubmit = async(e) => {
    e.preventDefault();
   
    console.log(jobTitle, salary, vacancies, experience, location, jobDescription);
    if (jobTitle === '' || salary === '' || vacancies === '' || experience === '' || location === '' || jobDescription === '' || jobRequirement==='') {
      setError(true);
      setSubmitted(false);
    } else {
      try {
        const response = await axios.post(`http://localhost:3000/Recruiter/PostJob/${id}`, {
          recruiterId:id,
          jobTitle,
          salary,
          vacancies,
          experience,
          location,
          jobDescription,
          jobRequirement,
        }, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
          }
        });
        if(response.data.error==="Error saving job details")
        {
          setSubmitted(false);
          setError(true);
        }
        else
        {
          setSubmitted(true);
          setError(false);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h6>Successfully Uploaded!!</h6>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <h6>Please enter all the fields</h6>
      </div>
    );
  };

  return (
    <div>
      <NavigationPage/>
      <center>
      <div  class="postJobForm">
    <form onSubmit={handleSubmit}>
      <h3>Upload Job</h3>

      <div className="mb-3">
        <label>Job Title</label>
        <input
          type="text"
          className="form-control"
          placeholder="Job Title"
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Salary</label>
        <input
          type="number"
          className="form-control"
          placeholder="salary"
          onChange={(e) => setSalary(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Vacancies</label>
        <input
          type="number"
          className="form-control"
          placeholder="No of Vacancies"
          onChange={(e) => setVacancies(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Experience</label>
        <input
          type="text"
          className="form-control"
          placeholder="years of Experience"
          onChange={(e) => setExperience(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Location</label>
        <input
          type="text"
          className="form-control"
          placeholder="Location"
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Job Description</label>
        <input
          type="text"
          className="form-control"
          placeholder="Job Description"
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Job Requirement</label>
        <input
          type="text"
          className="form-control"
          placeholder="Job Requirement"
          onChange={(e) => setJobRequirement(e.target.value)}
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Upload
        </button>
        <br />
        {successMessage()}
        {errorMessage()}
      </div>

    </form>
    </div>
    </center>
    </div>
  );
};

export default PostJob;

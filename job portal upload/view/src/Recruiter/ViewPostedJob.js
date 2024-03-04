import React,{useState,useEffect} from 'react';
import NavigationPage from './NavigationPage.js'
import {useParams,Link} from 'react-router-dom';
import axios from 'axios';
import './ViewPostedJob.css'
const ViewPostedJob=()=>
{
  const [job,setJob]=useState([]);
  const {id}=useParams();
  useEffect(()=>
  {
    const fetchData=async()=>
    {
      try{
        const response=await axios.get(`http://localhost:3000/Recruiter/ViewPostedJob/${id}`);
        setJob(response.data);
      }
      catch(error)
      {
        console.error('Error fetching data:', error);
      }
      };
      fetchData();
    
  },[id]);
    return(
      <div>
        <NavigationPage/>
        <div>
        <div className="job-container">
  {job.length > 0 ? (
    job.map((j) => (
      <div key={j._id} className="job-box">
        <div className="job-title">{j.jobTitle}</div>
        <div className="job-details">
         <div id="sal"> Salary<br></br>${j.salary}</div>
          <div id="vacancies">Vacancies<br></br>{j.vacancies}</div>
          <div id="exp">Minimum Exp<br></br> {j.experience} years</div>
          <div id="loc">Location {j.location}</div>
          <div>
            <p><strong>Job Description:</strong></p>
            {j.jobDescription.split('.').map((point, index) => (
              <p key={index}>{point.trim()}</p>
            ))}
          </div>
          <div>
            <p><strong>Job Requirement:</strong></p>
            {j.jobRequirement.split('.').map((point, index) => (
              <p key={index}>{point.trim()}</p>
            ))}
          </div>
        </div>
       <center> <Link className="link" to="">Update</Link>
        <Link className="link" to="">Delete</Link></center>
      </div>
    ))
  ) : (
    <p>No jobs found</p>
  )}
</div>

    </div>
        </div>
       
    );
}
export default ViewPostedJob;
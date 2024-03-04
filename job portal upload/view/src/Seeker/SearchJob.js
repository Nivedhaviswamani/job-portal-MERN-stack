import React,{useState} from "react";
import axios from 'axios';
import {useParams} from 'react-router-dom';
import SeekerNavigationPage from './SeekerNavigationPage.js';
const SearchJob=()=>
{
    const [value,setValue]=useState('');
    const [title,setTitle]=useState('');
    const [searchResult, setSearchResult] = useState([]);
    const {seekerId}=useParams();
    const onChange=(event)=>
    {
        setValue(event.target.value);
    }
    const titleOnChange=(event)=>
    {
      setTitle(event.target.value);
    }
    const onSearch = async () => {
        try {
          const response = await axios.post(`http://localhost:3000/Seeker/SearchJob/${seekerId}`, {
            searchLocation:value,
            searchTitle:title,
          });
    
          console.log('Server response:', response.data);
          setSearchResult(response.data.data);
          console.log("he");
          console.log("hi"+response.data.data);
        } catch (error) {
          console.error('Error sending search input:', error);
        }
      };
    
return(
    <div class="main">
        <div>
            <SeekerNavigationPage/>
        </div>
   
<div className="search">
    <div className="search-container">
        <div className="search-inner">
            <input type="text" value={value} onChange={onChange} placeholder="location"/>
            <input type="text" value={title} onChange={titleOnChange}/>
            <button onClick={onSearch}>Search</button>
        </div>
    </div>
 <h1>Job Details</h1>
 <div className="job-container">
  {searchResult.length > 0 ? (
    searchResult.map((j) => (
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
export default SearchJob;
import React,{useState} from 'react';
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom';
const JobSeekerSignUp=()=>
{
    const [fullName,setFullName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [reenterPassword,setReenterPassword]=useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [location, setLocation] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [education, setEducation] = useState('');
    const [workExperience, setWorkExperience] = useState('');
    const [skills, setSkills] = useState('');
    const [resume, setResume] = useState(null);
    const [profilePhoto,setProfilePhoto]=useState(null);
    const [errors, setErrors] = useState({});
    const [submitted,setSubmitted]=useState(false);
    const [submittingError,setSubmittingError]=useState(false);
    const navigate=useNavigate();
    const successMessage = () => {
      return (
          <div
              className="success"
              style={{
                  display: submitted ? '' : 'none',
              }}>
              <h4>successfully registered!!</h4>
          </div>
      );
  };
  
   const errorMessage = () => {
      return (
          <div
              className="error"
              style={{
                  display:submittingError ? '' : 'none',
              }}>
              <h4>User Account Alread Exists</h4>
          </div>
      );
  };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setResume(file);
      };

      const handleImageChange = (e) => {

        const imageFile = e.target.files[0];
        setProfilePhoto(imageFile); 
      };


      const handleSubmit=async(e)=>
      {
        e.preventDefault();
        const errors={};
        if(!fullName.trim())
        errors.fullName="Name required";
        
    if (!email.trim()) {
        errors.email = 'Email is required';
      } 
      else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Email is invalid';
      }
        if(password.length<6)
        errors.password ="weak Password";
    if(password!==reenterPassword)
        errors.reenterPassword="Password doesn't match";
    if(phoneNumber.length>12)
        errors.phoneNumber="Enter valid phone no";
    if(!location.trim())
        errors.location="Locaion is required";
    if(Object.keys(errors).length<=0){
    try{
      console.log(resume);
      const formData = new FormData();
  formData.append('fullName', fullName);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('phoneNumber', phoneNumber);
  formData.append('location', location);
  formData.append('education', education);
  formData.append('yearsOfExperience', yearsOfExperience);
  formData.append('workExperience', workExperience);
  formData.append('skills', skills);
  formData.append('resume', resume);
  formData.append('profilePhoto', profilePhoto);
        const response=await axios.post('http://localhost:3000/JobSeekerSignUp',formData,{headers:{'Content-Type':'multipart/form-data'}});
        console.log(response.data.error);
        if( response.data.error==="user exists")
        {
            setSubmittingError(true);
            setSubmitted(false);
        }
        else{
            setSubmittingError(false);
            setSubmitted(true);
            const seekerId=response.data.id;
            console.log(seekerId);
            navigate(`/Seeker/Profile/${seekerId}`);
            
        }
      }
        catch(error)
        {
            console.log("error occured"+error.response.data);
        }
    }
    else{
        setSubmittingError(false);
        setSubmitted(false);
        setErrors(errors);
    }
      };
    return(
    <div>
        <div className="signUp">
    <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        {errors.fullName && <span class="errorHandling">{errors.fullName}</span>}
        <div>
          <label>Email Address:</label>
          <input type="email" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)}  />
        </div>
        {errors.email && <span class="errorHandling">{errors.email}</span>}
        <div>
          <label>Password:</label>
          <input type="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        {errors.password && <span class="errorHandling">{errors.password}</span>}
        <div>
          <label>Re-enter Password:</label>
          <input type="password" value={reenterPassword} placeholder="re-enter password" onChange={(e) => setReenterPassword(e.target.value)} />
        </div>{errors.reenterPassword && <span class="errorHandling">{errors.reenterPassword}</span>}
        <div>
          <label>Phone Number:</label>
          <input type="tel" value={phoneNumber} placeholder="phone no" onChange={(e) => setPhoneNumber(e.target.value)}  />
        </div>
        {errors.phoneNumber && <span class="errorHandling">{errors.phoneNumber}</span>}
        <div>
          <label>Location:</label>
          <input type="text" value={location} placeholder="location" onChange={(e) => setLocation(e.target.value)} />
        </div>
        {errors.location && <span class="errorHandling">{errors.location}</span>}
        <div>
          <label>Highest Education:</label>
          <select value={education} onChange={(e)=>setEducation(e.target.value)} >
            <option value="">Select</option>
            <option value="High School">High School</option>
            <option value="Associate's Degree">Associate's Degree</option>
            <option value="Bachelor's Degree">Bachelor's Degree</option>
            <option value="Master's Degree">Master's Degree</option>
            <option value="Doctoral Degree">Doctoral Degree</option>
          </select>
        </div>
        <div>
            <label>Yeas Of Experience:</label>
            <input type="number" placeholder="years Of Experience" value={yearsOfExperience} onChange={(e)=>setYearsOfExperience(e.target.value)}/>
        </div>
        <div>
          <label>Work Experience:</label>
          <textarea 
            value={workExperience} 
            onChange={(e) => setWorkExperience(e.target.value)} 
            rows={5} 
            placeholder="work Experience if any"
          />
        </div>
        <div>
          <label>Skills:</label>
          <textarea 
            value={skills} 
            onChange={(e) => setSkills(e.target.value)} 
            rows={5} 
            placeholder="skills"
          />
        </div>
        <div>
          <label>Upload Profile</label>
        <input
            type="file"
            accept="image/*"
            onChange={handleImageChange} // Handle image file selection
          />
        </div>
        <div>
          <label>Resume/CV Upload:</label>
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange}  />
        </div>
        <button type="submit">Submit</button>
        <div className="alreadyHaveAnAccountOrNot">{successMessage()}{errorMessage()}</div>
      </form>
      Already registered
      <Link to="/JobRecruiterLogin">LogIn?</Link>
      </div>
    </div>
    );
}
export default JobSeekerSignUp;
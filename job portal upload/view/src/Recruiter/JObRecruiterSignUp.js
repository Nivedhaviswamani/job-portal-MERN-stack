import React, { useState } from 'react';
import './JobRecruiterSignUp.css'
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
// Your component code

const JObRecruiterSignUp=() =>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyLogo, setCompanyLogo] = useState(null);
  const [headQuarters, setHeadQuarters] = useState('');
  const [companyDetails, setCompanyDetails] = useState('');
  const [contactNo, setContactNo] = useState('');
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
  const handleSubmit = async(e) => {
    e.preventDefault();
    const errors = {};

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

  
    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

 
    if (!companyName.trim()) {
      errors.companyName = 'Company Name is required';
    }

    if (!headQuarters.trim()) {
      errors.headQuarters = 'Company Address is required';
    }


    if (!contactNo.trim()) {
      errors.contactNo = 'Contact Number is required';
    } else if (!/^\d{7,10}$/.test(contactNo)) {
      errors.contactNo = 'Contact Number must be 7-10 digits';
    }

    if (Object.keys(errors).length === 0) {

      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('companyName', companyName);
      formData.append('companyLogo', companyLogo);
      formData.append('headQuarters',headQuarters );
      formData.append('contactNo', contactNo);
      formData.append('companyDetails', companyDetails);
      for (let pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
        console.log('Form submitted:', formData.email);
      }
      console.log(email);
      try {
        const response = await axios.post('http://localhost:3000/JobRecruiterSignUp', 
         {
          
          email,
          password,
          companyName,
          companyLogo,
          headQuarters,
          contactNo,
          companyDetails,

         },{headers:{"Content-Type":"multipart/form-data"},});
         if(response.data.error==="user exists"){
          console.log(response.data.error);
          setSubmitted(false);
          setSubmittingError(true);
         }
         else
         {
          const id=response.data.id;
          navigate(`/Recruiter/Profile/${id}`)
          setSubmitted(true);
          setSubmittingError(false);
         }
      } catch (error) {
        console.error('Error sending search input:', error);
      }
     
    } else {
      setErrors(errors);
    }
    
  };

  const handleImageChange = (e) => {

    const imageFile = e.target.files[0];
    setCompanyLogo(imageFile); 
  };

  return (
    <div>
       <center>
    <div className="signUp">
      <h2>Recruiter Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span  class="errorHandling">{errors.email}</span>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span  class="errorHandling">{errors.password}</span>}
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <span  class="errorHandling">{errors.confirmPassword}</span>}
        </div>
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          {errors.companyName && <span  class="errorHandling">{errors.companyName}</span>}
        </div>
        <div>
          <label>Head Quarters:</label>
          <input
            type="text"
            value={headQuarters}
            onChange={(e) => setHeadQuarters(e.target.value)}
          />
          {errors.headQuarters && <span  class="errorHandling">{errors.headQuarters}</span>}
        </div>
        <div>
          <label>Company Details:</label>
          <input
            type="text"
            value={companyDetails}
            onChange={(e) => setCompanyDetails(e.target.value)}
          />
          {errors.companyDetails && <span  class="errorHandling">{errors.companyDetails}</span>}
        </div>
        <div>
          <label>Contact Number:</label>
          <input
            type="text"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
          />
          {errors.contactNo && <span  class="errorHandling">{errors.contactNo}</span>}
        </div>
        <label>Company Logo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange} // Handle image file selection
          />
        <button type="submit">Sign Up</button>
        <div className="alreadyHaveAnAccountOrNot">{successMessage()}{errorMessage()}</div>
      </form>
      Already registered {/*<a href="/JobRecruiterLogin">LogIn?</a>*/}
      <Link to="/JobRecruiterLogin">LogIn?</Link>
      </div>
      </center>
    </div>
  );
}

export default JObRecruiterSignUp;

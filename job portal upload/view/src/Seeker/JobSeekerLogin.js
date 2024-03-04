import React, { useState } from 'react';

import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
function JobSeekerLogin() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted,setSubmitted]=useState(false);
  const [submittingError,setSubmittingError]=useState(false);
  const [userExist,setUserExist]=useState(false);
  const navigate=useNavigate();
  const successMessage = () => {
    return (
        <div
            className="success"
            style={{
                display: submitted &&userExist? '' : 'none',
            }}>
            <h4>successfully Logged In!!</h4>
        </div>
    );
};

 const errorMessage = () => {
    return (
        <div
            className="error"
            style={{
                display:submittingError&&userExist ? '' : 'none',
            }}>
            <h4>Invalid Password</h4>
        </div>
    );
};
const NotExist=()=>{
  return (
    <div
        className="error"
        style={{
            display:submittingError&&(!userExist) ? '' : 'none',
        }}>
        <h4>This Account Doesn't Exist!</h4>
    </div>
);
}
  const handleSubmit = async(e) => {
    e.preventDefault();
    const errors = {};
    
    // Basic email validation
    if (!email.trim()) {
      errors.email = 'Email is required';
    }

    // Basic password validation
    if (!password.trim()) {
      errors.password = 'Password is required';
    }

    if (Object.keys(errors).length === 0) {
      // Form is valid, submit data or perform other actions
      console.log('Form submitted:', { email, password });
      try {
        const response = await axios.post('http://localhost:3000/JobSeekerLogin', 
         {
          email,
          password,
         },{headers:{"Content-Type":'application/json', },});
         console.log(response.data);
         if(response.data.error==="user not found"){
          console.log(response.data.error);
          setSubmitted(false);
          setSubmittingError(true);
          setUserExist(false);
         }
         else if(response.data.error==="Invalid password")
         {
          setSubmitted(false);
          setSubmittingError(true);
          setUserExist(true);
         }
         else
         {
          setSubmitted(true);
          setSubmittingError(false);
          setUserExist(true);
          navigate(`/Seeker/Profile/${response.data.id}`)
         }
      } catch (error) {
        console.error('Error sending search input:', error);
      }
     
 
    } 
    else {
      setErrors(errors);
    }
  };

  return (
    <div>
       <center>
   
    <div className="signUp">
     
      <h2>User Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span>{errors.password}</span>}
        </div>
        <button type="submit">Sign In</button>
         <div className="alreadyHaveAnAccountOrNot">{successMessage()}{errorMessage()}{NotExist()}</div>

      </form>
      
      Don't Have an Account{/*<a href="/JobRecruiterSignUp">sign Up</a>*/}    <Link to="/JobSeekerSignUp">Sign Up?</Link>
    
 
    </div>
    </center>
    </div>
    
  );
}

export default JobSeekerLogin;

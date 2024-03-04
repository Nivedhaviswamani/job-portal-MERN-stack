import NavigationPage from './NavigationPage.js';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';
import './RecruiterProfile.css'
const RecruiterProfile = () => {
    const [recruiter, setRecruiter] = useState(null);
    const { id } = useParams(); // Use useParams to get the id parameter from the URL

    useEffect(() => {
        const fetchRecruiter = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/Recruiter/Profile/${id}`);
                setRecruiter(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchRecruiter();
    }, [id]); // Use id as the dependency for useEffect
    
    return (
        <div>
            <NavigationPage />
            <div className="container1">
             <div className="profile-container">
                {recruiter ? (
                    <div className="profile-details">
                    <div class="profile-header">
        <img src={require(`../uploads/${recruiter.companyLogo}`)} alt="im" height="10px" width="10px"/>
        <h1 class="con">{recruiter.companyName}</h1>
    </div>
                        <p class="detail email"><span class="icon">✉️</span><strong>Email: </strong> {recruiter.email}</p>
                        <p class="detail password"><span class="icon">✉️</span><strong>Password: </strong> ********</p>
                        <p class="detail company-name"><span class="icon">🏢</span><strong>Company Name: </strong> {recruiter.companyName}</p>
                        <p class="detail headquarters"><span class="icon">🏢</span><strong>Headquarters: </strong> {recruiter.headQuarters}</p>
                         <p class="detail contact-number"><span class="icon">📞</span><strong>Contact Number: </strong> {recruiter.contactNo}</p>
                         <p class="detail company-details"><span class="icon">&#x2139;</span><strong>Company Details:</strong> {recruiter.companyDetails}</p>

            <Link className="updateLink" to={`/Recruiter/Profile/Update/${id}`}>Update</Link>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className="imagecontainer">  </div>
            </div>
        </div>
    );
}

export default RecruiterProfile;

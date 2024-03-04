import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useParams,Link} from 'react-router-dom';
import SeekerNavigationPage from './SeekerNavigationPage.js';
import './SeekerProfile.css';
const SeekerProfile=()=>
{
    const [seeker, setSeeker] = useState({});
    const { seekerId } = useParams(); 

    useEffect(() => {
        const fetchSeeker = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/Seeker/Profile/${seekerId}`);
                setSeeker(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchSeeker();
    }, [seekerId]); 
  
    const showPdf = (pdfFileName) => {
        const pdfUrl = `http://localhost:3000/uploads/${pdfFileName}`;
        window.open(pdfUrl, "_blank", "noreferrer");
    }
    
    return(
        <div>
            <div>
                <SeekerNavigationPage/>
            </div>

            <div>
            <div className="profile-container">
                {seeker ? (
                    <div className="profile-details">
                    <div class="profile-header">
                        {seeker.profilePhoto ? <img src={require(`../uploads/${seeker.profilePhoto}`)} alt="im" height="10px" width="10px" /> : "nill"}
                        <h1 class="con">{seeker.fullName}</h1>
                </div>
                        <p className="detail email"><strong>Email: </strong> {seeker.email}</p>
                        <p className="detail password"><strong>Password: </strong> ********</p>
                        <p className="detail company-name"><strong>Highest Education: </strong> {seeker.education}</p>
                        <p className="detail headquarters"><strong>contac Number: </strong> {seeker.phoneNumber}</p>
                         <p className="detail contact-number"><strong>years of Experience: </strong> {seeker.yearsOfExperience}</p>
                         <p className="detail company-details"><strong>Work Experience:</strong> {seeker.workExperience}</p>
                         <p className="detail company-details"><strong>Skills:</strong></p>
                         <p className="skills-list">
                                {seeker.skills ? ( // Check if seeker.skills is defined
                                    seeker.skills.split('\r\n').map((skill, index) => (
                                        <React.Fragment key={index}>
                                            {skill}<br />
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <span>No skills found</span>
                                )}
                            </p>
            <button className="btn" onClick={()=>showPdf(seeker.resume)}>Show Pdf</button>
            <Link className="updateLink" to="">Update</Link>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>

            </div>
        </div>

    );
};
export default SeekerProfile;
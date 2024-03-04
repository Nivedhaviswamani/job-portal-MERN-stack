import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../Recruiter/NavigationPage.css';
const SeekerNavigationPage = () => {
    const { seekerId } = useParams();

    return (
        <div>
            <div className="container">
                <ul className="recruiterNav">
                  
                    <li><Link className="navi-bar" to={`/Seeker/SearchJob/${seekerId}`}>Search a Job</Link></li>

                    <li><Link className="navi-bar" to="">Notifications</Link></li>
                  
                    <li><Link className="navi-bar" to={`/Seeker/Profile/${seekerId}`}>Profile</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default SeekerNavigationPage;

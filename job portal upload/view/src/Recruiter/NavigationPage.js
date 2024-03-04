import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './NavigationPage.css';
const NavigationPage = () => {
    const { id } = useParams();

    return (
        <div>
            <div className="container">
                <ul className="recruiterNav">
                  
                    <li><Link className="navi-bar" to={`/Recruiter/PostJob/${id}`}>Post a Job</Link></li>

                    <li><Link className="navi-bar" to={`/Recruiter/ViewPostedJob/${id}`}>View the Posted Job</Link></li>
                  
                    <li><Link className="navi-bar" to={`/Recruiter/Profile/${id}`}>Profile</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default NavigationPage;

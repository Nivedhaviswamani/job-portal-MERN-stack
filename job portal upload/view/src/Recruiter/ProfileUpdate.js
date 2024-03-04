import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProfileUpdate.css'
const ProfileUpdate = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        email: '',
        companyName: '',
        companyDetails: '',
        headQuarters: '',
        newPassword: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/Recruiter/Profile/Update/${id}`);
                const { email, companyName, companyDetails, headQuarters } = response.data;
                setFormData({
                    email,
                    companyName,
                    companyDetails,
                    headQuarters,
                    newPassword: '',
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/Recruiter/Profile/Update/${id}`, formData);
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div><center>
        <div className="main">
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div>
                <label>Company Name:</label>
                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
            </div>
            <div>
                <label>Company Details:</label>
                <input type="text" name="companyDetails" value={formData.companyDetails} onChange={handleChange} />
            </div>
            <div>
                <label>Head Quarters:</label>
                <input type="text" name="headQuarters" value={formData.headQuarters} onChange={handleChange} />
            </div>
            <div>
                <label>New Password:</label>
                <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} />
            </div>
            <button type="submit">Update</button>
        </form>
        </div>
        </center>
        </div>
    );
};

export default ProfileUpdate;

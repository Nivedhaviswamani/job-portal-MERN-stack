import React, { useState, useEffect } from 'react';

import './Home.css';
const Review = ({ text, author }) => (
  <div className="review">
    <p>{`"${text}"`}</p>
    <p className="review-author">{`- ${author}`}</p>
  </div>
);

const Home = () => {
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const reviews = [
    { text: 'Job Connect has helped me find quality freelance work and build my portfolio.', author: 'John Doe, Graphic Designer' },
    { text: 'As a business owner, Job Connect has made it easy to find skilled freelancers for my projects.', author: 'Jane Smith, Small Business Owner' },
    { text: 'Job Connect is the best platform for freelancers and clients to connect and collaborate.', author: 'Michael Johnson, Web Developer' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReviewIndex(prevIndex => (prevIndex + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <div>
      <div className="header">
        <h1>Welcome to Job Connect</h1>
        <p>Your Freelance Marketplace</p>
      </div>

      <div className="hero-section">
        <div className="container">
          <h1>Hire Freelancers. Find Work.</h1>
          <p>Join thousands of businesses and freelancers on Job Connect.</p>
          <a href="#" className="button">Get Started</a>
        </div>
      </div>

      <div className="container">
        <div className="feature-list">
          <div className="feature">
            <h2>Find Talent</h2>
            <p>Access a pool of talented freelancers from around the world.</p>
          </div>
          <div className="feature">
            <h2>Post Jobs</h2>
            <p>Create job postings to attract top talent to your projects.</p>
          </div>
          <div className="feature">
            <h2>Secure Payments</h2>
            <p>Pay freelancers with confidence using our secure payment system.</p>
          </div>
        </div>

        <div className="review-section">
          <h2>What Our Users Are Saying</h2>
          <div className="review-container">
            {reviews.map((review, index) => (
              <Review key={index} text={review.text} author={review.author} className={index === activeReviewIndex ? 'active' : ''} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

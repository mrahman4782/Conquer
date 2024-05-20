import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css';
import banner from './banner.png';
import communityIcon from './community.png';
import p2pIcon from './p2p.png';
import optimismIcon from './confidence.png';

function Landing() {
  let navigate = useNavigate();

  function navigateToLogin() {
    navigate('/login');
  }

  return (
    <div className="landing">
      <div className="banner-container">
        <img src={banner} alt="Banner" className="banner" />
        <div className="banner-text-box">
          <h1 className="tagline">The journey of a thousand miles begins with just one step</h1>
          <button className="ready-button" onClick={navigateToLogin}>I'm ready!</button>
        </div>
      </div>
      <div className="support-section">
        <h2 className="support-heading">You're not ALONE!</h2>
        <p className="support-text">It's tough to ask for help – we understand that. That's why we made this place for you. It's where you meet others who get what you're going through. No judging, just folks helping each other, like friends do. With a team behind you, you're stronger. There's nothing you can't beat.</p>
        <div className="features">
          <div className="feature">
            <img src={communityIcon} alt="Community" className="feature-icon" />
            <h3>Circles</h3>
            <p>Provides a judgment-free moderated community space where you can openly share your story and speak your mind.</p>
          </div>
          <div className="feature">
            <img src={p2pIcon} alt="Peer to Peer" className="feature-icon" />
            <h3>Peer 2 Peer</h3>
            <p>Whether you want to vent or feel heard? We got you covered. Speak to a friend or a specialist, we are there to help you get better!</p>
          </div>
          <div className="feature">
            <img src={optimismIcon} alt="Optimism" className="feature-icon" />
            <h3>Optimism</h3>
            <p>Surround yourself with optimism and hope, that’s the community we aim to grow. Boost your confidence by surrounding yourself with the brightest people.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;

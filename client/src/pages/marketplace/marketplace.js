import React from 'react';
import './marketplace.css';

const instructors = [
  { id: 1, image: 'https://via.placeholder.com/150', name: 'Instructor 1' },
  { id: 2, image: 'https://via.placeholder.com/150', name: 'Instructor 2' },
  { id: 3, image: 'https://via.placeholder.com/150', name: 'Instructor 3' },
  { id: 4, image: 'https://via.placeholder.com/150', name: 'Instructor 4' },
  { id: 5, image: 'https://via.placeholder.com/150', name: 'Instructor 5' },
  { id: 6, image: 'https://via.placeholder.com/150', name: 'Instructor 6' },
];

function Marketplace() { // Rename the component to Marketplace
  return (
    <div className="container">
      <Sidebar />
      <MainContent />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Conquer</h2>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#friends">Friends</a></li>
          <li><a href="#groups">Groups</a></li>
          <li><a href="#marketplace">Marketplace</a></li>
          <li><a href="#categories">Categories</a></li>
          <li><a href="#private-sessions">Private Sessions</a></li>
          <li><a href="#meditation-resources">Meditation Resources</a></li>
        </ul>
      </nav>
    </div>
  );
}

function MainContent() {
  return (
    <div className="main-content">
      <h1>Pick Your Private Session Instructor</h1>
      <div className="instructor-grid">
        {instructors.map(instructor => (
          <InstructorCard key={instructor.id} image={instructor.image} name={instructor.name} />
        ))}
      </div>
    </div>
  );
}

function InstructorCard({ image, name }) {
  return (
    <div className="instructor-card">
      <img src={image} alt={name} />
      <div className="instructor-info">
        <h2>{name}</h2>
      </div>
    </div>
  );
}

export default Marketplace; // Export the Marketplace component

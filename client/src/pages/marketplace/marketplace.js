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

const Marketplace = () => {
  return (
    <div className="content">
      <h1>Pick Your Private Session Instructor</h1>
      <div className="instructor-grid">
        {instructors.map(instructor => (
          <InstructorCard key={instructor.id} image={instructor.image} name={instructor.name} />
        ))}
      </div>
    </div>
  );
}

const InstructorCard = ({ image, name }) => {
  return (
    <div className="instructor-card">
      <img src={image} alt={name} />
      <div className="instructor-info">
        <h2>{name}</h2>
      </div>
    </div>
  );
}

export default Marketplace;

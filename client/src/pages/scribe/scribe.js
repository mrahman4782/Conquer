import React from 'react';
import './scribe.css';

const Scribe = () => {
  return (
    <div className="content">
      <h1>Scribe Page</h1>
      <div className="resources-page">
        <header className="resources-header">
          <h1>Resources</h1>
          <p>Here you'll find useful downloads as well as links to external information about mindfulness,mental health, and overcoming addiction.</p>
        </header>
        
        <div className="resources-content">
          <a href="https://meditofoundation.org/resources/mental-health-resources" className="resource-item">
            <img src="https://meditofoundation.org/media/pages/resources/mental-health-resources/a34d9f32f5-1620759820/marc-olivier-jodoin-tstnu7h4uee-unsplash-1-2880x.jpg" alt="Mental Health Resources" />
            <h2>Mental health resources</h2>
            <p>Medito Foundation was founded with the aim of making meditation and mindfulness accessible for everyone.</p>
          </a>
          <a href="https://meditofoundation.org/resources/what-is-meditation" className="resource-item">
            <img src="https://meditofoundation.org/media/pages/resources/what-is-meditation/6bcb33e262-1620759820/daniel-mingook-kim-uxr-t8cz1u-unsplash-1-2880x.jpg" alt="What is meditation?" />
            <h2>What is meditation?</h2>
            <p>There are many forms of meditation, most of which help to calm the mind and promote overall well-being.</p>
          </a>
          <a href="https://meditofoundation.org/resources/what-is-mindfulness" className="resource-item">
            <img src="https://meditofoundation.org/media/pages/resources/what-is-mindfulness/4144f53332-1620759820/sergey-shmidt-koy6flccy5s-unsplash-2880x.jpg" alt="Battling addiction" />
            <h2>What is mindfulness?</h2>
            <p>Mindfulness is being fully aware of whatever is going on in your current experience, with acceptance and without judgement. A way of practicing being mindful …</p>
          </a>
        </div>

        <div className="resources-content">
          <a href="https://www.samhsa.gov/find-help/national-helpline" className="resource-item">
            <img src="https://www.samhsa.gov/sites/default/files/samhsa-national-helpline-thumb.png" alt="Free Meditation Apps" />
            <h2>SAMHSA’s National Helpline</h2>
            <p>SAMHSA’s National Helpline is a confidential, free, 24-hour-a-day, 365-day-a-year, information service, in English and Spanish, for individuals and family members facing mental and/or substance use disorders.</p>
          </a>
          
        </div>

      </div>
    </div>
  );
}

export default Scribe;

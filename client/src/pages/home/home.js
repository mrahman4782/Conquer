import React from 'react';
import './home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <input type="text" placeholder="Search for friends, spaces, groups" className="search-bar" />
      </header>
      <aside className="sidebar">
        <ul>
          <li>Home</li>
          <li>Friends</li>
          <li>Groups</li>
          <li>Marketplace</li>
          <li>My Spaces</li>
          <li>Join Space</li>
          <li>Active Space 1</li>
          <li>Active Space 2</li>
          <li>Active Space 3</li>
        </ul>
      </aside>
      <main className="content">
        <div className="post">
          <div className="post-header">
            <span>User One</span>
            <span>...</span>
          </div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut</p>
          <div className="post-footer">
            <span>❤️ 400</span>
            <span>💬 30</span>
            <span>🔄 2</span>
          </div>
        </div>
      </main>
      <aside className="right-sidebar">
        <div className="pinned-events">
          <h3>Pinned Events</h3>
          <ul>
            <li>Event 1</li>
          </ul>
        </div>
        <div className="friends-list">
          <h3>My Friends</h3>
          <ul>
            <li>Friend 1</li>
            <li>Friend 2</li>
            <li>Friend 3</li>
            <li>Friend 4</li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Home;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './home.css';
import logo from './assets/logo.png';
import messagesIcon from './assets/messages.png';
import notificationsIcon from './assets/notifications.png';
import profileIcon from './assets/profile.png';

const Home = () => {
    let navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/home');
    };

    return (
        <div className="home-container">
            <div className="navbar">
                <img src={logo} alt="Conquer Logo" className="logo" onClick={handleLogoClick} />
                <input type="text" placeholder="Search for friends, spaces, groups" className="search-bar" />
                <div className="nav-icons">
                    <Link to="/messages">
                        <img src={messagesIcon} alt="Messages" className="nav-icon" />
                    </Link>
                    <div className="notifications">
                        <img src={notificationsIcon} alt="Notifications" className="nav-icon" />
                        <div className="dropdown-content">
                            <p>No new notifications</p>
                        </div>
                    </div>
                    <Link to="/profile">
                        <img src={profileIcon} alt="Profile" className="nav-icon" />
                    </Link>
                </div>
            </div>
            <div className="main-wrapper">
                <div className="sidebar">
                    <nav className="menu">
                        <Link to="/home" className="menu-item">Home</Link>
                        <Link to="/friends" className="menu-item">Friends</Link>
                        <Link to="/groups" className="menu-item">Groups</Link>
                        <Link to="/marketplace" className="menu-item">Marketplace</Link>
                        <Link to="/join-space" className="menu-item">Join Space</Link>
                    </nav>
                </div>
                <div className="main-content">
                    <div className="status-update">
                        <textarea placeholder="What's on your mind?"></textarea>
                        <div className="status-actions">
                            <button>Video</button>
                            <button>Photo</button>
                            <button>Feeling</button>
                        </div>
                    </div>
                    <div className="posts">
                        <div className="post">
                            <div className="post-header">
                                <img src="/path/to/user-avatar.png" alt="User" className="user-avatar" />
                                <div className="user-info">
                                    <span className="username">User One</span>
                                    <span className="timestamp">Just now</span>
                                </div>
                            </div>
                            <div className="post-content">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <img src="/path/to/attachment.png" alt="Attachment" className="post-attachment" />
                            </div>
                            <div className="post-actions">
                                <button>Like</button>
                                <button>Comment</button>
                                <button>Share</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-sidebar">
                    <div className="pinned-events">
                        <h3>Pinned Events</h3>
                        <div className="event">Event 1</div>
                    </div>
                    <div className="friends-list">
                        <h3>My Friends</h3>
                        <div className="friend">Friend 1</div>
                        <div className="friend">Friend 2</div>
                        <div className="friend">Friend 3</div>
                        <div className="friend">Friend 4</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

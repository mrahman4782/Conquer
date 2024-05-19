import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import messagesIcon from '../assets/messages.png';
import notificationsIcon from '../assets/notifications.png';
import profileIcon from '../assets/profile.png';
import homeIcon from '../assets/home.png';
import friendsIcon from '../assets/friends.png';
import groupsIcon from '../assets/groups.png';
import marketplaceIcon from '../assets/marketplace.png';
import locationIcon from '../assets/location.png';
import resourcesIcon from '../assets/resources.png';
import './layout.css';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = React.useState(false);

    const getActiveClass = (path) => {
        return window.location.pathname === path ? 'active' : '';
    };

    return (
        <div className="outer-container">
            <nav className="navbar">
                <img src={logo} alt="Logo" className="logo" onClick={() => navigate('/home')} />
                <input type="text" placeholder="Search for friends, spaces, groups" className="search-bar" />
                <div className="nav-icons">
                    <img src={messagesIcon} alt="Messages" className="icon" onClick={() => navigate('/messages')} />
                    <div className="notification-wrapper">
                        <img src={notificationsIcon} alt="Notifications" className="icon" onClick={() => setShowNotifications(!showNotifications)} />
                        {showNotifications && (
                            <div className="notifications-dropdown">
                                <p>Notification 1</p>
                                <p>Notification 2</p>
                                <p>Notification 3</p>
                            </div>
                        )}
                    </div>
                    <img src={profileIcon} alt="Profile" className="icon" onClick={() => navigate('/profile')} />
                </div>
            </nav>
            <div className="container">
                <aside className="sidebar">
                    <ul className="menu">
                        <li className={getActiveClass('/home')}>
                            <Link to="/home"><img src={homeIcon} alt="Home" className="menu-icon" />Home</Link>
                        </li>
                        <li className={getActiveClass('/friends')}>
                            <Link to="/friends"><img src={friendsIcon} alt="Friends" className="menu-icon" />Friends</Link>
                        </li>
                        <li className={getActiveClass('/groups')}>
                            <Link to="/groups"><img src={groupsIcon} alt="Groups" className="menu-icon" />Groups</Link>
                        </li>
                        <li className={getActiveClass('/marketplace')}>
                            <Link to="/marketplace"><img src={marketplaceIcon} alt="Marketplace" className="menu-icon" />Marketplace</Link>
                        </li>
                    </ul>
                    <div className="groups">
                        <h4 className="groups-header">My Groups</h4>
                        <ul>
                            <li onClick={() => navigate('/groups')}>+ Add Groups</li>
                        </ul>
                    </div>
                </aside>
                <div className="content">
                    {children}
                </div>
                <aside className="sidebar right-sidebar">
                    <div className="pinned-events">
                        <h4>Resources</h4>
                        <ul>
                            <li className={getActiveClass('/findhelp')} onClick={() => navigate('/findhelp')}>
                                <img src={locationIcon} alt="Help Center" className="menu-icon" />Find a Help Center
                            </li>
                            <li className={getActiveClass('/scribe')} onClick={() => navigate('/scribe')}>
                                <img src={resourcesIcon} alt="Resources" className="menu-icon" />Scribe
                            </li>
                        </ul>
                    </div>
                    <div className="friends">
                        <h4>My Friends</h4>
                        <ul>
                            <li>Friend 1</li>
                            <li>Friend 2</li>
                            <li>Friend 3</li>
                            <li>Friend 4</li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Layout;

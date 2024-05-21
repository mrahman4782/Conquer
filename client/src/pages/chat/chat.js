import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './chat.css';
import profileIcon from '../../assets/profile.png';
import messageIcon from '../../assets/messages.png';
import notificationIcon from '../../assets/notifications.png';
import logoIcon from '../../assets/logo.png';
import groupsIcon from '../../assets/groups.png';
import addGroupIcon from '../../assets/add_group.png';
import photoIcon from '../../assets/photo.png';
import videoIcon from '../../assets/video.png';

const Chat = () => {
    const [activeTab, setActiveTab] = useState('messages');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handlePhotoClick = () => {
        // Trigger file input for photo
        document.getElementById('photo-input').click();
    };

    const handleVideoClick = () => {
        // Trigger file input for video
        document.getElementById('video-input').click();
    };

    return (
        <div className="outer-container">
            <div className="navbar">
                <img src={logoIcon} alt="Logo" className="logo" />
                <input type="text" className="search-bar" placeholder="Search for friends, spaces, groups" />
                <div className="nav-icons">
                    <Link to="/chat">
                        <img src={messageIcon} alt="Messages" className="icon" />
                    </Link>
                    <img src={notificationIcon} alt="Notifications" className="icon" />
                    <img src={profileIcon} alt="Profile" className="icon" />
                </div>
            </div>
            <div className="container">
                <div className="left-section">
                    <input type="text" className="user-search" placeholder="Search..." />
                    <div className="left-icons">
                        <div 
                            className={`icon-wrapper ${activeTab === 'messages' ? 'active' : ''}`} 
                            onClick={() => handleTabClick('messages')}
                        >
                            <img src={messageIcon} alt="Messages" className="icon centered" />
                        </div>
                        <div 
                            className={`icon-wrapper ${activeTab === 'groups' ? 'active' : ''}`} 
                            onClick={() => handleTabClick('groups')}
                        >
                            <img src={groupsIcon} alt="Groups" className="icon centered" />
                        </div>
                        <div 
                            className="icon-wrapper"
                            onClick={() => alert('Add Group clicked')}
                        >
                            <img src={addGroupIcon} alt="Add Group" className="icon centered" />
                        </div>
                    </div>
                    <div className="user-list">
                        {/* Example user list items */}
                        {activeTab === 'messages' && (
                            <div className="user-item">
                                <img src={profileIcon} alt="User" className="user-profile-icon" />
                                <div className="user-info">
                                    <p className="user-name">Friend Name</p>
                                    <p className="user-message">Message</p>
                                    <p className="timestamp">time:stamp</p>
                                </div>
                            </div>
                        )}
                        {activeTab === 'groups' && (
                            <div className="user-item">
                                <img src={profileIcon} alt="Group" className="user-profile-icon" />
                                <div className="user-info">
                                    <p className="user-name">Group Name</p>
                                    <p className="user-message">Last message</p>
                                    <p className="timestamp">time:stamp</p>
                                </div>
                            </div>
                        )}
                        {/* Repeat for other users or groups */}
                    </div>
                    <div className="logged-in-user">
                        <img src={profileIcon} alt="User" className="user-profile-icon" />
                        <p className="user-name">Username</p>
                    </div>
                </div>
                <div className="right-section">
                    <div className="chat-header">
                        <img src={profileIcon} alt="User" className="user-profile-icon" />
                        <p className="chat-user-name">Friend Name</p>
                    </div>
                    <div className="chat-messages">
                        {/* Example message bubbles */}
                        <div className="message-bubble recipient">
                            Recipient message
                            <div className="timestamp">time:stamp</div>
                        </div>
                        <div className="message-bubble sender">
                            Sender message
                            <div className="timestamp">time:stamp</div>
                        </div>
                        {/* Repeat for other messages */}
                    </div>
                    <div className="message-input-container">
                        <textarea
                            placeholder="Type your message here"
                            className="message-input"
                        />
                        <div className="message-options">
                            <button className="attachment-button" onClick={handlePhotoClick}>
                                <img src={photoIcon} alt="Photo" className="message-option-icon" />
                            </button>
                            <button className="attachment-button" onClick={handleVideoClick}>
                                <img src={videoIcon} alt="Video" className="message-option-icon" />
                            </button>
                        </div>
                        <button className="send-button">Send</button>
                    </div>
                    <input type="file" id="photo-input" style={{ display: 'none' }} accept="image/*" />
                    <input type="file" id="video-input" style={{ display: 'none' }} accept="video/*" />
                </div>
            </div>
        </div>
    );
};

export default Chat;

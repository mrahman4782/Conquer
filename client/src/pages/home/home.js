import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './home.css';
import logo from './assets/logo.png';
import messagesIcon from './assets/messages.png';
import notificationsIcon from './assets/notifications.png';
import profileIcon from './assets/profile.png';
import homeIcon from './assets/home.png';
import friendsIcon from './assets/friends.png';
import groupsIcon from './assets/groups.png';
import marketplaceIcon from './assets/marketplace.png';
import photoIcon from './assets/photo.png';
import videoIcon from './assets/video.png';
import likeIcon from './assets/like.png';
import commentIcon from './assets/comment.png';
import shareIcon from './assets/share.png';
import locationIcon from './assets/location.png';
import resourcesIcon from './assets/resources.png';
import guyImage from './assets/guy.jpg';
import QuoteOfTheDay from './QuoteOfTheDay';

const Home = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showGroups, setShowGroups] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [commentText, setCommentText] = useState('');
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState(0);
    const [shares, setShares] = useState(0);
    const [showCommentBox, setShowCommentBox] = useState(false);
    const navigate = useNavigate();

    const handleTextareaChange = (e) => {
        setStatusText(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const handleCommentTextareaChange = (e) => {
        setCommentText(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const handleLike = () => {
        setLikes(likes + 1);
    };

    const handleComment = () => {
        setShowCommentBox(!showCommentBox);
    };

    const handleShare = () => {
        setShares(shares + 1);
    };

    const handlePostComment = () => {
        if (commentText) {
            setComments(comments + 1);
            setCommentText('');
            setShowCommentBox(false);
        }
    };

    return (
        <div className="outer-container">
            <nav className="navbar">
                <img src={logo} alt="Logo" className="logo" />
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
                        <li className="active"><Link to="/"><img src={homeIcon} alt="Home" className="menu-icon" />Home</Link></li>
                        <li><Link to="/friends"><img src={friendsIcon} alt="Friends" className="menu-icon" />Friends</Link></li>
                        <li><Link to="/groups"><img src={groupsIcon} alt="Groups" className="menu-icon" />Groups</Link></li>
                        <li><Link to="/marketplace"><img src={marketplaceIcon} alt="Marketplace" className="menu-icon" />Marketplace</Link></li>
                    </ul>
                    <div className="groups">
                        <h4 onClick={() => setShowGroups(!showGroups)} className="groups-header">My Groups <span className={`arrow ${showGroups ? 'up' : 'down'}`}></span></h4>
                        {showGroups && (
                            <ul>
                                <li onClick={() => navigate('/groups')}>+ Add Groups</li>
                            </ul>
                        )}
                    </div>
                </aside>
                <div className="content">
                    <div className={`status ${statusText ? 'expanded' : ''}`}>
                        <div className="status-header">
                            <img src={profileIcon} alt="Profile" className="status-profile-icon" />
                            <div className="status-input-container">
                                <textarea
                                    placeholder="What's on your mind"
                                    value={statusText}
                                    onChange={handleTextareaChange}
                                    className="status-input"
                                    rows="1"
                                />
                            </div>
                        </div>
                        <div className={`status-footer ${statusText ? 'with-text' : ''}`}>
                            <label className="status-option-label">
                                <input type="file" accept="image/*" style={{ display: 'none' }} />
                                <img src={photoIcon} alt="Photo" className="status-option-icon" />
                                <span>Photo</span>
                            </label>
                            <label className="status-option-label">
                                <input type="file" accept="video/*" style={{ display: 'none' }} />
                                <img src={videoIcon} alt="Video" className="status-option-icon" />
                                <span>Video</span>
                            </label>
                            {statusText && <button className="post-button">Post</button>}
                        </div>
                    </div>
                    <QuoteOfTheDay />
                    <div className="post">
                        <div className="post-header">
                            <img src={profileIcon} alt="Profile" className="post-profile-icon" />
                            <div>
                                <p>John Carter</p>
                                <span>4 hours ago</span>
                            </div>
                        </div>
                        <div className="post-content">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            <img src={guyImage} alt="Post" className="post-image" />
                        </div>
                        <div className="post-actions">
                            <button className="post-action" onClick={handleLike}><img src={likeIcon} alt="Like" className="action-icon" /> {likes}</button>
                            <button className="post-action" onClick={handleComment}><img src={commentIcon} alt="Comment" className="action-icon" /> {comments}</button>
                            <button className="post-action" onClick={handleShare}><img src={shareIcon} alt="Share" className="action-icon" /> {shares}</button>
                        </div>
                        {showCommentBox && (
                            <div className="comment-box-container">
                                <label className="status-option-label">
                                    <input type="file" accept="image/*" style={{ display: 'none' }} />
                                    <img src={photoIcon} alt="Photo" className="status-option-icon" />
                                </label>
                                <textarea
                                    placeholder="Write your comment"
                                    value={commentText}
                                    onChange={handleCommentTextareaChange}
                                    className="comment-box"
                                    rows="1"
                                />
                                {commentText && <button className="post-button comment-post-button" onClick={handlePostComment}>Post</button>}
                            </div>
                        )}
                    </div>
                </div>
                <aside className="sidebar right-sidebar">
                    <div className="pinned-events">
                        <h4>Resources</h4>
                        <ul>
                            <li onClick={() => navigate('/help-center')}><img src={locationIcon} alt="Help Center" className="menu-icon" />Find a Help Center</li>
                            <li onClick={() => navigate('/resources')}><img src={resourcesIcon} alt="Resources" className="menu-icon" />Scribe</li>
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
}

export default Home;

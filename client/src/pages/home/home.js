import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './home.css';
import profileIcon from './assets/profile.png';
import photoIcon from './assets/photo.png';
import videoIcon from './assets/video.png';
import likeIcon from './assets/like.png';
import commentIcon from './assets/comment.png';
import shareIcon from './assets/share.png';
import guyImage from './assets/guy.jpg';
import QuoteOfTheDay from './QuoteOfTheDay';

const Home = () => {
    const [statusText, setStatusText] = useState('');
    const [commentText, setCommentText] = useState('');
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState(0);
    const [shares, setShares] = useState(0);
    const [showCommentBox, setShowCommentBox] = useState(false);

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
                    <p>I'm so excited to be part of this journey!</p>
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
    );
}

export default Home;

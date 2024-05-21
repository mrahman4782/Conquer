import React, { useState } from 'react';
import './status.css';
import profileIcon from '../../assets/profile.png';
import likeIcon from '../../assets/like.png';
import commentIcon from '../../assets/comment.png';
import shareIcon from '../../assets/share.png';
import photoIcon from '../../assets/photo.png';

const Status = ({ user, text, image, timestamp, likes, comments, shares, onLike, onComment, onShare }) => {
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [commentText, setCommentText] = useState('');

    const handleCommentClick = () => {
        setShowCommentBox(!showCommentBox);
    };

    const handleCommentTextareaChange = (e) => {
        setCommentText(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const handlePostComment = () => {
        if (commentText) {
            onComment();
            setCommentText('');
            setShowCommentBox(false);
        }
    };

    return (
        <div className="post">
            <div className="post-header">
                <img src={profileIcon} alt="Profile" className="post-profile-icon" />
                <div>
                    <p>{user}</p>
                    <span>{timestamp}</span>
                </div>
            </div>
            <div className="post-content">
                <p>{text}</p>
                {image && <img src={image} alt="Post" className="post-image" />}
            </div>
            <div className="post-actions">
                <button className="post-action" onClick={onLike}><img src={likeIcon} alt="Like" className="action-icon" /> {likes}</button>
                <button className="post-action" onClick={handleCommentClick}><img src={commentIcon} alt="Comment" className="action-icon" /> {comments}</button>
                <button className="post-action" onClick={onShare}><img src={shareIcon} alt="Share" className="action-icon" /> {shares}</button>
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
    );
}

export default Status;

import React, { useState } from 'react';
import './profile.css';
import defaultProfilePic from '../../assets/profile.png';

const Profile = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [bio, setBio] = useState('');
    const [posts, setPosts] = useState([
        { id: 1, text: "First post!", timestamp: "2024-05-21 12:00" },
        { id: 2, text: "Hello world!", timestamp: "2024-05-20 15:30" },
    ]);

    const handleProfilePicChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setProfilePic(URL.createObjectURL(e.target.files[0]));
            setShowDropdown(false);
        }
    };

    const handleBioChange = (e) => {
        if (e.key === 'Enter') {
            setBio(e.target.value);
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-pic-container">
                    <img src={profilePic || defaultProfilePic} alt="Profile" className="profile-pic" />
                    <div className="edit-profile-pic" onClick={() => setShowDropdown(!showDropdown)}>Edit</div>
                    {showDropdown && (
                        <div className="dropdown-menu">
                            <input type="file" id="profile-pic-upload" accept="image/*" onChange={handleProfilePicChange} />
                            <label htmlFor="profile-pic-upload" className="dropdown-item">Change profile pic</label>
                        </div>
                    )}
                </div>
                <div className="username">John Doe</div>
                <div className="bio-container">
                    <textarea
                        placeholder="Edit your bio..."
                        defaultValue={bio}
                        onKeyDown={handleBioChange}
                        className="bio-input"
                    />
                </div>
            </div>
            <div className="posts-container">
                <h2>Your Posts</h2>
                {posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map(post => (
                    <div key={post.id} className="post">
                        <p>{post.text}</p>
                        <small>{new Date(post.timestamp).toLocaleString()}</small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;

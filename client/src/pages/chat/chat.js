import React, { useState } from 'react';
import './chat.css';

const Chat = () => {
    const [friends, setFriends] = useState([
        { name: 'John Doe', message: 'Hey, how are you?', timestamp: '2:30 PM', profilePic: 'path/to/profilePic.jpg' },
        { name: 'Jane Smith', message: 'Did you get my message?', timestamp: '1:45 PM', profilePic: 'path/to/profilePic.jpg' },
        { name: 'Alex Johnson', message: 'Let’s catch up later.', timestamp: '12:15 PM', profilePic: 'path/to/profilePic.jpg' },
    ]);
    const [selectedFriend, setSelectedFriend] = useState(friends[0]);

    const handleFriendClick = (friend) => {
        setSelectedFriend(friend);
    };

    return (
        <div className="chat-container">
            <div className="chat-sidebar">
                <input type="text" className="search-bar" placeholder="Search..." />
                <div className="chat-options">
                    <div className="chat-option" onClick={() => handleFriendClick(friends[0])}>Messages</div>
                    <div className="chat-option">Groups</div>
                    <div className="chat-option">Create Group</div>
                </div>
                <div className="friend-list">
                    {friends.map((friend, index) => (
                        <div key={index} className="friend-item" onClick={() => handleFriendClick(friend)}>
                            <img src={friend.profilePic} alt="Profile" className="friend-profile-pic" />
                            <div className="friend-info">
                                <div className="friend-name">{friend.name}</div>
                                <div className="friend-message">{friend.message}</div>
                                <div className="friend-timestamp">{friend.timestamp}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="chat-main">
                <div className="chat-header">
                    <img src={selectedFriend.profilePic} alt="Profile" className="chat-profile-pic" />
                    <div className="chat-friend-name">{selectedFriend.name}</div>
                </div>
                <div className="chat-messages">
                    <div className="message received">Hello!</div>
                    <div className="message sent">Hi, how are you?</div>
                </div>
                <div className="chat-input-container">
                    <input type="text" className="chat-input" placeholder="Type a message..." />
                </div>
            </div>
        </div>
    );
};

export default Chat;

import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './chat.css';
import getMessages from '../../functions/getMessages';
import sendMessages from '../../functions/sendMessage';
import getUser from '../../functions/getUser';

const Chat = () => {
  const { groupId } = useParams();
  const [messages, setMessages] = useState([
    { text: 'Hello!', sent: false },
    { text: 'Hi, how are you?', sent: true },
    { text: 'I am good, thank you!', sent: false },
    { text: 'What about you?', sent: false },
    { text: 'I am doing well, too.', sent: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    let output = '';
    let user = '';
    const getAllMessages = async () => {
      output = getMessages(groupId);
      
    }

    getAllMessages()
  }, [inputValue]);
  
  const handleSendMessage = async () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, { text: inputValue, sent: true }]);
      setInputValue('');
      try {
        await sendMessages(groupId, inputValue);
      } catch (error) {
        
      }
    } 
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        {/* Sidebar content can be added here */}
      </div>
      <div className="chat-main">
        <div className="chat-header">
          <div className="chat-profile-pic"></div>
          <div className="chat-friend-name">{`Group Chat: ${groupId}`}</div>
        </div>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sent ? 'sent' : 'received'}`}>
              {message.text}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            className="chat-input"
            placeholder="Type a message..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <button onClick={handleSendMessage} className="chat-send-button">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;//agwgagawgawgag

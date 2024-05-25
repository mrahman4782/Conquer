import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './chat.css';
import getMessages from '../../functions/getMessages';
import sendMessages from '../../functions/sendMessage';
import getUser from '../../functions/getUser';
import Message from './../../components/alertMessage/alertMessage';
import { FIREBASE_AUTH } from '../../functions/fireBaseConfig';

const Chat = () => {
  const { groupId } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef(null);
  const [showErrMsg, setShowErrMsg] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);
  const [oldMessages, setOldMessages] = useState([]);

  useEffect(() => {
    const getUserHandler = async () => {
      try {
        const currentUser = FIREBASE_AUTH.currentUser;
        if (currentUser) {
          setUser(currentUser.uid);
        } else {
          throw new Error('No user is signed in');
        }
      } catch (error) {
        console.log('Failed to retrieve user:', error);
      }
    };

    getUserHandler();
  }, []);

  useEffect(() => {
    const getAllMessages = async () => {
      try {
        const output = await getMessages(groupId);
        const fetchedMessages = output.data.messages.map(msg => ({
          text: msg.text,
          sent: msg.senderId === user,
        }));
        setMessages(fetchedMessages);
        return output.data;
      } catch (error) {
        setErrorMessage(`Failed to retrieve chats. Error: ${error.message}`);
        setShowErrMsg(true);
        setTimeout(() => {
          setShowErrMsg(false);
        }, 2000);
        console.log(error);
      }
    };

    if (user) {
      const previousMessages = getAllMessages();
      setOldMessages(previousMessages);
    }
  }, [groupId, user]);

  const handleSendMessage = async () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, { text: inputValue, sent: true }]);
      setInputValue('');
      try {
        await sendMessages(groupId, inputValue);
      } catch (error) {
        console.log(error);
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
      {showErrMsg && <Message show={showErrMsg} message={errorMessage} />}

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

export default Chat;

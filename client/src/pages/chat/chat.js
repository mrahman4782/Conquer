import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './chat.css';
import getMessages from '../../functions/getMessages';
import sendMessages from '../../functions/sendMessage';
import getUser from '../../functions/getUser';
import Message from './../../components/alertMessage/alertMessage';

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
  const [showErrMsg, setShowErrMsg] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState('');
  const [oldMessages, setOldMessages] = useState([]);


  useEffect(() => {
    const getAllMessages = async () => {
      try {
        const output = await getMessages(groupId);
        return output.data;
        // You might want to update the messages state here with the fetched messages
        // setMessages(output);
      } catch (error) {
        console.log("boo");
        setErrorMessage(`Failed to retrieve chats. Error: ${error.message}`);
        setShowErrMsg(true);
        setTimeout(() => {
            setShowErrMsg(false);
        }, 2000);
        console.log(error);
      }
    }

    const previousMessages = getAllMessages();
    setOldMessages(previousMessages);
  }, [groupId]);

  useEffect(() => {

    const getUserHandler = async () => {
      try {
        const user = await getUser();
        console.log(user)
        return user.data;
      } catch (error) {
        setErrorMessage(`Failed to retrieve user. Error: ${error.message}`);
        setShowErrMsg(true);
        setTimeout(() => {
            setShowErrMsg(false);
        }, 2000);
        console.log(error);
      }
    }
    
    const userInfo = getUserHandler();
    setUser(userInfo);

  }, []);
  
  const handleSendMessage = async () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, { text: inputValue, sent: true }]);
      setInputValue('');
      try {
        await sendMessages(groupId, inputValue);
      } catch (error) {
        // Handle send message error
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
      {showErrMsg ? <Message show={showErrMsg} message={errorMessage}/> : null}

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

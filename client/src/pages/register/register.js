import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './register.css';
import conquerLogoBgRemoved from './conquerLogoBgRemoved.png'; 
import userRegister from '../../functions/registerHandler.js';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    let navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value); // Updating the email state with each input
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value); // Updating the password state with each input
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value); // Updating the username state with each input
    };

    const navigateToLogin = () => {
        navigate('/login');
    };

    const onRegisterPressed = async (e) => {
        await userRegister(username, email, password);
        e.preventDefault(); // Prevent default form submission behavior
        // Implement the registration logic here
        navigate('/home'); // Redirect to login after registration
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <img src={conquerLogoBgRemoved} alt="Conquer Logo" className="logo" /> {/* Use the correct path for your logo */}
                <h2>Sign Up</h2>
                <form onSubmit={onRegisterPressed}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <button type="submit">JOIN</button>
                </form>
                <p>
                    Have an account? <a href="/login" onClick={navigateToLogin}>Login here!</a>
                </p>
            </div>
        </div>
    );
}

export default Register;

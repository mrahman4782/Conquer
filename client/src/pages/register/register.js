import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './register.css';
import logo from '../../assets/logo.png';
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
        e.preventDefault(); 

        try {
          const register = await userRegister(username, email, password);
          navigate('/home'); 
        } catch (error) {
          console.error("Registration failed:", error);
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
            <img src={logo} alt="Conquer Logo" style={{ width: '100px', marginBottom: '20px', margin: '0 auto' }} />
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
                    <button type="submit">Sign Up</button>
                </form>
                <p>
                    Have an account? <a href="/login" onClick={navigateToLogin}>Login here!</a>
                </p>
            </div>
        </div>
    );
}

export default Register;

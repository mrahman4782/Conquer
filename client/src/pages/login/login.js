import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import './login.css';
import userLogin from '../../functions/loginHandler.js';
import logo from '../../assets/logo.png';
import Message from './../../components/alertMessage/alertMessage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import sessionStorage from "../../functions/sessionStorage.js";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAYlLI68xf6gx_XMozZPL8SDpGv2cHQH-U",
    authDomain: "conquer-app.firebaseapp.com",
    projectId: "conquer-app",
    storageBucket: "conquer-app.appspot.com",
    messagingSenderId: "157009161196",
    appId: "1:157009161196:web:5ded913fc0c390996f6ec9",
    measurementId: "G-D4Y81M8DYR"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showErrMsg, setShowErrMsg] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    let navigate = useNavigate();

    async function onSignInPressed(e) {
        e.preventDefault(); // Prevent default form submission behavior
        if (email === "" || password === "") {
            console.log("Missing Input");
        } else {
            try {
                await userLogin(email, password);
                navigate('/home'); // Redirect to home page after successful login
                return;
            } catch (error) {
                setErrorMessage(`Failed to login. Error: ${error.code}`);
                setShowErrMsg(true);
                setTimeout(() => {
                    setShowErrMsg(false);
                }, 2000);
                console.log(error);
            }
        }
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);  // Updating the password state with each input
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);  // Updating the email state with each input
    };

    const handleGoogleSignIn = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
            const result = await firebase.auth().signInWithPopup(provider);
            const user = result.user;
            const token = await user.getIdToken();
            console.log('User signed in: ', user);
            console.log('Session Key (ID Token): ', token);
            sessionStorage.setSessionKey(token);
            navigate('/home');
        } catch (error) {
            setErrorMessage(`Failed to login with Google. Error: ${error.message}`);
            setShowErrMsg(true);
            setTimeout(() => {
                setShowErrMsg(false);
            }, 2000);
            console.log(error);
        }
    };

    function navigateToRegister() {
        navigate('/register');
    }

    return (
        <div className="login-container">
            <div className="login-box">
                {showErrMsg ? <Message show={showErrMsg} message={errorMessage}/> : null}
                <img src={logo} alt="Conquer Logo" style={{ width: '100px', marginBottom: '20px', margin: '0 auto' }} /> 
                <h2>Sign In</h2>
                <form onSubmit={onSignInPressed}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <button type="submit">Sign In</button>
                </form>
                <button style={{width: '300px'}}onClick={handleGoogleSignIn}>Sign in with Google</button>
                <p>
                    Don’t have an account? <a href="/register" onClick={navigateToRegister}>Sign up.</a>
                </p>
            </div>
        </div>
    );
}

export default Login;

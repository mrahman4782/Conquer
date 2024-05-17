//import {useNavigate} from "react-router-dom";
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import './register.css';
//import userLogin from '../../functions/loginHandler.js';

function Register(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);  // Updating the password state with each input
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);  // Updating the password state with each input
    };

    const handleUsernameChange = (event) => {
        setEmail(event.target.value);  // Updating the password state with each input
    };

    function navigateToRegister(){
        navigate('/login');
    }

    return(
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <div className="headerText">
                Welcome!
            </div>
        </Grid>
        <Grid item xs={12}>
            <div className="Email">
            <TextField
                required
                id="emailField"
                label="Email"
                value={email}
                onChange={handleEmailChange}
                />
            </div>
        </Grid>
        <Grid item xs={12}>
            <div className="Username">
            <TextField
                required
                id="passwordField"
                label="Username"
                type="password"
                value={username}
                onChange={handleUsernameChange}
                />
            </div>
        </Grid>
        <Grid item xs={12}>
            <div className="Password">
            <TextField
                required
                id="passwordField"
                label="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                />
            </div>
        </Grid>
        
        <Grid xs={12}>
            <div className="Submit">
            <Button variant="contained" size="large" onClick={onSignInPressed}>
                Register
            </Button>
            </div>
        </Grid>
        <Grid xs={12}>
            <div className="register">
                
                <Button size="small" onClick={navigateToRegister} >Have an account? Login Here!</Button>
            </div>
        </Grid>
    </Grid>
    )
}

export default Register;
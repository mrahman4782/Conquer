import {useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import './landing.css';

function Landing(){

    let navigate = useNavigate();

    function navigateToLogin(){
        navigate('/login');
    }

    return(
        
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <div className="heading">
                    <h1>CONQUER</h1>
                    <p>The journey of a thousand miles begins with just one step</p>
                    <Button variant="contained" color="primary" onClick={navigateToLogin}>
                    I'm ready!
                    </Button>
                </div>
            </Grid>
            
            <Grid item xs={12}>
                <div className="sub-heading">
                    <h2>You're not ALONE!</h2>
                    <p>It's tough to ask for help – we understand that. That's why we made this place for you. It's where you meet others who get what you're going through. No judging, just folks helping each other, like friends do. With a team behind you, you're stronger. There's nothing you can't beat.</p>
                </div>
            </Grid>
            
            <Grid item xs={12} container spacing={1}>
                <Grid item xs={12} sm={4}>
                    <div className="feature">
                    <div className="icon"></div>
                    <h3>Circles</h3>
                    <p>Provides a judgment-free moderated community space where you can openly share your story and speak your mind.</p>
                    </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <div className="feature">
                    <div className="icon"></div>
                    <h3>Peer 2 Peer</h3>
                    <p>Whether you want to vent or feel heard? We got you covered. Speak to a friend or a specialist, we are there to help you get better!</p>
                    </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <div className="feature">
                    <div className="icon"></div>
                    <h3>Optimism</h3>
                    <p>Surround yourself with optimism and hope, that's the community we aim to grow. Boost your confidence by surrounding yourself with the brightest people.</p>
                    </div>
                </Grid>
            </Grid>
        </Grid>


    );
}

export default Landing;
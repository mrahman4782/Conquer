import express from 'express';
import cors from 'cors';

import initializeFirebaseApp from './functions/firebaseInit.js';
initializeFirebaseApp();

import {createUser} from './functions/register.js';
import {loginVerify} from './functions/loginVerify.js';


const app = express();
const port = 5000;
app.use(cors());

app.use(express.json());

// GET Requests
app.get('/', (req, res) => {
    res.status(200).send(`<h1>Successfully Connected to the Conquer Server</h1>`)
})


// POST Requests
app.post('/api/login', async(req, res) => {

    console.log(req);
    let token = req.body.token;
    let checkUserLogin = await loginVerify(token);
    
    console.log(checkUserLogin);
    res.status(checkUserLogin.status).send(`Logged in! Expiration time: ${checkUserLogin.data.exp}`);
    
})

app.post('/api/registerUser', async(req, res) => {

    console.log(req);
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;
    let checkUserLogin = await createUser(email, password, username);
    
    console.log(checkUserLogin);
    res.status(checkUserLogin.status).send(`Registered!`);
    
})

app.listen(port, () => console.log(`Listening on port ${port}`));
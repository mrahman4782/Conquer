import express from 'express';
import { createUser } from '../functions/register.js';
import {updateProfile} from '../functions/updateProfile.js'
import { loginVerify } from '../functions/loginVerify.js';

const router = express.Router();

// GET Requests
router.get('/', (req, res) => {
    res.status(200).send(`<h1>Successfully Connected to the Conquer Server</h1>`)
})

//POST Requests
router.post('/api/loginUser', async (req, res) => {
    console.log(req);
    let token = req.body.token;
    let checkUserLogin = await loginVerify(token);

    console.log(checkUserLogin);
    res.status(checkUserLogin.status).send(`Logged in! Expiration time: ${checkUserLogin.data.exp}`);
});

router.post('/api/registerUser', async (req, res) => {
    console.log(req);
    let email = req.body.email;
    let token = req.body.token;
    let username = req.body.username;
    let checkUserLogin = await createUser(token, email, username);

    console.log(checkUserLogin);
    res.status(checkUserLogin.status).send(`Registered!`);
});

router.post('/api/updateProfile', async (req, res) => {
    console.log(req);
    let data = req.body.data;
    let token = req.body.token;
    let userUpdateRes = await updateProfile(data, token);

    console.log(userUpdateRes);
    res.status(userUpdateRes.status).send(`Profile Updated!`);
});

export default router;

import express from 'express';
import { createUser } from '../functions/register.js';
import {updateProfile} from '../functions/updateProfile.js'
import { loginVerify } from '../functions/loginVerify.js';
import {retrieveUserData} from '../functions/getUser.js';
import {getAllGroups} from '../functions/getAllGroups.js';
import {sendMessage} from '../functions/sendMessage.js';
import { getAllMessages } from '../functions/getMessages.js';
import {createGroup} from '../functions/createGroup.js';

const router = express.Router();

// GET Requests
router.get('/', (req, res) => {
    res.status(200).send(`<h1>Successfully Connected to the Conquer Server</h1>`)
})

//POST Requests
router.post('/api/loginUser', async (req, res) => {
    console.log(req);
    let token = req.body.token || req.query.token;
    let checkUserLogin = await loginVerify(token);

    console.log(checkUserLogin);
    res.status(checkUserLogin.status).send(`Logged in! Expiration time: ${checkUserLogin.data.exp}`);
});

router.post('/api/registerUser', async (req, res) => {
    console.log(req);
    let email = req.body.email || req.query.email;
    let token = req.body.token || req.query.token;
    let username = req.body.username || req.query.username;
    let checkUserLogin = await createUser(token, email, username);

    console.log(checkUserLogin);
    res.status(checkUserLogin.status).send(`Registered!`);
});

router.post('/api/updateProfile', async (req, res) => {
    console.log(req);
    let data = req.body.data || req.query.data;
    let token = req.body.token || req.query.token;
    let userUpdateRes = await updateProfile(data, token);

    console.log(userUpdateRes);
    res.status(userUpdateRes.status).send(`Profile Updated!`);
});

router.post('/api/getUser', async (req, res) => {
    console.log(req);
    let token = req.body.token || req.query.token;
    let userData = await retrieveUserData(token);

    console.log(userData);
    res.status(userData.status).send(userData.data);
});

router.post('/api/getAllGroups', async (req, res) => {
    //console.log(req);
    let token = req.body.token || req.query.token;
    let groupData = await getAllGroups(token);
    console.log(groupData);
    res.status(groupData.status).send(groupData.data);
});

router.post('/api/sendMessage', async (req, res) => {
    console.log(req);
    let token = req.body.token || req.query.token;
    let message = req.body.message || req.query.message;
    let chatId = req.body.chatId || req.query.chatId;
    let messageStatus = await sendMessage(message, token, chatId);
    console.log(messageStatus);
    res.status(messageStatus.status).send(messageStatus.data);
});

router.post('/api/getAllMessages', async (req, res) => {
    console.log(req);
    let token = req.body.token || req.query.token;
    let chatId = req.body.chatId || req.query.chatId;
    let messageStatus = await getAllMessages(token, chatId);
    console.log(messageStatus);
    res.status(messageStatus.status).send(messageStatus.data);
});

router.post('/api/createGroup', async (req, res) => {
    
    let token = req.body.token || req.query.token;
    let name = req.body.name || req.query.name;
    let createStatus = await createGroup(token, name);
    console.log(createStatus);
    res.status(createStatus.status).send(createStatus.data);
});

export default router;

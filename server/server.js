import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import { middlewareInit, logRequests, logSuccess, logFailure } from './middleware/config.js';
import routes from './middleware/routes.js'; 
dotenv.config({ path: "./.env" });

import initializeFirebaseApp from './functions/firebaseInit.js';
initializeFirebaseApp(process.env.FIREBASE_SERVICE_ACCOUNT);

import {createUser} from './functions/register.js';
import {loginVerify} from './functions/loginVerify.js';


const app = express();
const port = 5000;

middlewareInit(app);
app.use(logRequests);
app.use(logSuccess);
app.use(logFailure);
app.use(cors()); 
app.use(express.json());


app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));
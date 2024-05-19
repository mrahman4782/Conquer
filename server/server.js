import express from 'express';
import dotenv from "dotenv";

import initializeFirebaseApp from './functions/firebaseInit.js';
async () => await initializeFirebaseApp();
import { getFirestore } from 'firebase-admin/firestore';

import { middlewareInit, logRequests, logSuccess, logFailure } from './middleware/config.js';
import routes from './middleware/routes.js'; 
dotenv.config({ path: "./.env" });


const db = getFirestore();
db.settings({
    ignoreUndefinedProperties: true,
  });
  

const app = express();
const port = 5000;

// Middleware setup
middlewareInit(app);
app.use(logRequests);
app.use(logSuccess);
app.use(logFailure);

// Routes setup
app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));
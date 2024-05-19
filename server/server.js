import express from 'express';
import dotenv from "dotenv";
import { middlewareInit, logRequests, logSuccess, logFailure } from './middleware/config.js';
import routes from './middleware/routes.js'; 
dotenv.config({ path: "./.env" });

import initializeFirebaseApp from './functions/firebaseInit.js';
initializeFirebaseApp(process.env.FIREBASE_SERVICE_ACCOUNT);

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
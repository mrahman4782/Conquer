import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; 
import express from 'express'; 

// Get the directory name from the current module URL
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Initialize middleware setup
export const middlewareInit = (app) => {
    app.use(cors());
    app.use(express.json());
}

// Setup log directory
const logDir = path.join(__dirname, 'logs');

// Check if log directory exists and create if not
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// Logger to capture all requests to server
export const logRequests = morgan('combined', {
    stream: fs.createWriteStream(path.join(logDir, 'requests.log'), { flags: 'a' })
})

// Logger to capture valid responses from the server
export const logSuccess = morgan('combined', {
    skip: (req, res) => res.statusCode >= 400,
    stream: fs.createWriteStream(path.join(logDir, 'responses.log'), { flags: 'a' })
})

// Logger to capture error responses from the server
export const logFailure = morgan('combined', {
    skip: (req, res) => res.statusCode < 400,
    stream: fs.createWriteStream(path.join(logDir, 'errors.log'), { flags: 'a' })
})

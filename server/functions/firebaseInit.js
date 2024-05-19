import { initializeApp, cert, getApps } from 'firebase-admin/app';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, './../.env') });
//Created separate initialization module to prevent reinitialization for every single firebase call. Import as needed.
//import FIREBASE_SERVICE_ACCOUNT from './../config/conquer-app-firebase-adminsdk-mb3jf-2740155e9e.json' assert { type: 'json' };

function initializeFirebaseApp(){

    if (getApps().length === 0) {
        
        //console.log(FIREBASE_SERVICE_ACCOUNT);
        const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
        initializeApp({
        credential: cert(serviceAccount)
    });

    }
}

export default initializeFirebaseApp;
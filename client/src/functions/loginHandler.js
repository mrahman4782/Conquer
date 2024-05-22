import { signInWithEmailAndPassword, getIdToken } from "firebase/auth";
import axios from 'axios';
import sessionStorage from './sessionStorage.js';
import { FIREBASE_APP, FIREBASE_AUTH } from "./fireBaseConfig.js";


// Logs in via Firebase Authentication. Updates user session & sends token to backend for token storage & session verification
export async function userLogin(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
    const user = userCredential.user;
    console.log(user);

    const token = await getIdToken(user, true);
    console.log(token);

    // Make request to backend. Response handling needed
    const response = await axios.post('https://api.medconnectapp.org/api/loginUser', { token: token });

    // Store Async session token to Async Storage
    sessionStorage.setSessionKey(token);
    console.log(`AHHHHHHHHHHHHHHHHHHHH: ${JSON.stringify(response)}`);
    return response;

  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.name;
    console.log("Error Code: ", errorCode);
    console.log("Error Msg: ", errorMessage);
    throw error;
  }
}

export default userLogin;
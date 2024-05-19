import { signInWithEmailAndPassword, getIdToken } from "firebase/auth";
import axios from 'axios';
import sessionStorage from './sessionStorage.js';
import { FIREBASE_APP, FIREBASE_AUTH } from "./fireBaseConfig.js";


export async function userLogin(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);

    const user = userCredential.user;
    console.log(user);

    const token = await getIdToken(user, true);
    // console.log(token);

    // Make request to backend. Response handling needed
    const response = await axios.post('http://localhost:5000/api/login', { token: token });

    // Store Async session token to Async Storage
    sessionStorage.setSessionKey(token);
    console.log(`AHHHHHHHHHHHHHHHHHHHH: ${JSON.stringify(response)}`);
    return response;

  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error Code: ", errorCode);
    console.log("Error Msg: ", errorMessage);
    throw error;
  }
}

export default userLogin;
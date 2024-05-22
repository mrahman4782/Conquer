import { getAuth, createUserWithEmailAndPassword, getIdToken } from "firebase/auth";
import axios from 'axios';
import sessionStorage from './sessionStorage.js';
import { FIREBASE_APP, FIREBASE_AUTH } from "./fireBaseConfig.js";

  export async function userRegister(username, email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
  
      const user = userCredential.user;
      console.log(user);
  
      const token = await getIdToken(user, true);
      console.log(token);
  
      // Make request to backend
      const response = await axios.post('https://api.medconnectapp.org/api/registerUser', { token: token, username: username, email: email });
  
      // Store Async session token to Async Storage
      sessionStorage.setSessionKey(token);

      return response;
  
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error Code: ", errorCode);
      console.log("Error Msg: ", errorMessage);
      throw error;
    }

  }

  export default userRegister;
import { initializeApp } from "@firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAYlLI68xf6gx_XMozZPL8SDpGv2cHQH-U",
    authDomain: "conquer-app.firebaseapp.com",
    projectId: "conquer-app",
    storageBucket: "conquer-app.appspot.com",
    messagingSenderId: "157009161196",
    appId: "1:157009161196:web:5ded913fc0c390996f6ec9",
    measurementId: "G-D4Y81M8DYR"
  };

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
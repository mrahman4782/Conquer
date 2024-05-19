import admin from 'firebase-admin'; 
import 'firebase/auth';
import { getFirestore } from "firebase-admin/firestore";

import initializeFirebaseApp from './firebaseInit.js';
initializeFirebaseApp(process.env.FIREBASE_SERVICE_ACCOUNT);

let response = {
  status: '',
  data: ''
}

const db = getFirestore();
db.settings({
  ignoreUndefinedProperties: true,
});

/*
// Verifies that the user is logged in. If logged in, adds current 
// active token to user profile in firebase.
*/

export async function loginVerify(token){

  try {
    let updateObjFields = {
      activeSessionToken: token,
    }

    let decodedToken = await admin.auth().verifyIdToken(token);
    console.log(decodedToken);
    
    let updateToken = await db
    .collection("userProfile")
    .doc(decodedToken.uid)
    .update(updateObjFields);

    response.status = 200;
    response.data = decodedToken;

    return response;

  } catch (error) {
    console.error("Unable to verify token. Error: ", error.message);
    // Handle errors here, such as showing an alert to the user
    response.status = 403;
    response.data = error.message;
    return response;
  }
}


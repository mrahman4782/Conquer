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
// Verifies that the user is logged in.
*/

export async function loginVerify(token){

  try {
    let decodedToken = await admin.auth().verifyIdToken(token);
    console.log(decodedToken);
    
    // if (updateSession == true){
    //   let updateToken = await db
    //   .collection("userProfile")
    //   .doc(decodedToken.uid)
    //   .update(updateObjFields);
    // }

    response.status = 200;
    response.data = decodedToken;

    return response;

  } catch (error) {
    console.error("Unable to verify token. Error: ", error.message);
    response.status = 403;
    response.data = error.message;
    return response;
  }
}


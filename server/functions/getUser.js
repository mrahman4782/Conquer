import { getFirestore } from "firebase-admin/firestore";
import admin from "firebase-admin"; // Import the default export for auth
import { loginVerify } from './loginVerify.js';

const db = getFirestore();

let response = {
  status: "",
  data: "",
};

export async function retrieveUserData(session) {
  // verify the user is logged in
  let checkUserLogin = await loginVerify(session);
  console.log(session);
  if (checkUserLogin.status == 200) {
    try {
      let docRef = await db.collection("userProfile").doc(checkUserLogin.data.uid);
      const doc = await docRef.get();
      console.log("Data received", doc.data());
      response.status = 200;
      response.data = { ...doc.data(), uid: checkUserLogin.data.uid }; // Add uid to the data object
    } catch (error) {
      response.status = 408;
      response.data = "Request timeout";
      console.log(error);
    }
  } else {
    response.status = 403;
    response.data = "Unable to authorize user";
  }
  return response;
}

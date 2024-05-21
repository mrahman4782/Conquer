import { getFirestore } from "firebase-admin/firestore";
import admin from "firebase-admin"; // Import the default export for auth
import { loginVerify } from './loginVerify.js';

const db = getFirestore();

let response = {
  status: "",
  data: "",
};

export async function getAllMessages(session, chatId) {
  // Verify the user is logged in
  console.log(session);
  let checkUserLogin = await loginVerify(session);
  console.log(session);
  if (checkUserLogin.status === 200) {
    try {
      // Retrieve the specific document in the "chats" collection
      const snapshot = db.collection("chats").doc(chatId);
      const doc = await snapshot.get();
      if (doc.exists) {
        response.status = 200;
        response.data = doc.data();
        console.log(`Chats data: ${JSON.stringify(doc.data())}`);
      } else {
        response.status = 404;
        response.data = "Document not found";
        console.log("No such document!");
      }
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

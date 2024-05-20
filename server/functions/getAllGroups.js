import { getFirestore } from "firebase-admin/firestore";
import admin from "firebase-admin"; // Import the default export for auth
import { loginVerify } from './loginVerify.js';

const db = getFirestore();

let response = {
  status: "",
  data: "",
};

export async function getAllGroups(session) {
  // verify the user is logged in
  console.log(session);
  let checkUserLogin = await loginVerify(session);
  console.log(session);
  if (checkUserLogin.status === 200) {
    try {
      // Retrieve all documents in the "users" collection
      const snapshot = await db.collection("chats").get();
      let users = [];

      // Iterate through the documents and add their data to the users array
      snapshot.forEach(doc => {
        users.push({ id: doc.id, ...doc.data() });
      });

      console.log("Data received", users);
      response.status = 200;
      response.data = users;
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

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import admin from 'firebase-admin'; // Import the default export for auth
import { loginVerify } from './loginVerify.js';

const db = getFirestore();

let response = {
  status: '',
  data: ''
}

export async function joinGroup(token, chatId) {
  try {
    // Get user uid
    let checkUserLogin = await loginVerify(token);
    let userId = checkUserLogin.data.uid;

    // Update the chats collection
    try {
      await db.collection('chats').doc(chatId).update({
        userList: FieldValue.arrayUnion(userId)
      });
    } catch (error) {
      console.error('Error updating chats collection:', error);
      response.status = 500;
      response.data = `Error updating chats collection: ${error.message}`;
      return response;
    }

    // Update the userProfile collection
    try {
      await db.collection('userProfile').doc(userId).update({
        userOfChatGroupId: FieldValue.arrayUnion(chatId)
      });
    } catch (error) {
      console.error('Error updating userProfile collection:', error);
      response.status = 500;
      response.data = `Error updating userProfile collection: ${error.message}`;
      return response;
    }

    response.status = 200;
    response.data = 'Successfully joined group!';
  } catch (error) {
    console.error('Error joining group:', error);
    response.status = 500;
    response.data = `General error: ${error.message}`;
  }
  return response;
}
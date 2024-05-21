import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import admin from 'firebase-admin'; // Import the default export for auth
import { loginVerify } from './loginVerify.js';

const db = getFirestore();

let response = {
  status: '',
  data: ''
}

export async function createGroup(token, name) {

    let newObjFields = {
        adminList: [],
        chatName: '',
        createdAt: '',
        createdBy: '',
        messages: [],
        userList: [],
    }
  
    
    try {
  
        // Get user uid
        let checkUserLogin = await loginVerify(token);
        let userId = checkUserLogin.data.uid;
            
        let today = new Date();
        newObjFields.createdAt = today;
        newObjFields.userList.push(userId);
        newObjFields.chatName = name;
        newObjFields.createdBy = userId;

        let docRef = await db.collection('chats').add(newObjFields);
    
        response.status = 201;
        response.data = 'Successfully created group chat!';
    
        console.log('Successfully created group chat:', name);
        return response;
  
    } catch (error) {
        console.error('Error creating group:', error);
        response.status = 500;
        response.data = error;
        return response;
    }
  }
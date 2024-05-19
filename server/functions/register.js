import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import admin from 'firebase-admin'; // Import the default export for auth
import { loginVerify } from './loginVerify.js';

const db = getFirestore();

let response = {
  status: '',
  data: ''
}

function passwordValid(password){
  
  // Ensure that the password has at least 8 characters and a number
  if (password.length < 8) {
    return false;
  }
  let containsNumber = /\d/.test(password);
  if (!containsNumber) {
      return false;
  }
  return true;  
}

/*
// Function to create a profile for the user after they successfully 
// register. Should fill with their respective sessionToken, email & username
*/

export async function createUser(token, email, username) {

  let newObjFields = {
    activeSessionToken: token,
    accountCreated: '',
    adminOfChatGroupId: [],
    email: email,
    firstName: '',
    friendsList: [],
    lastName: '',
    username: username,
    userOfChatGroupId: [],
    userType: 'standard'
  }


  // No need for this now
  // if (!passwordValid(password)){
  //   response.status = 403;
  //   response.data = 'Password does not meet requirements';
  //   return response;
  // }
  
  try {

    // Get user uid
    let checkUserLogin = await loginVerify(token);
    let userId = checkUserLogin.data.uid;

    let docRef = db.collection('userProfile').doc(userId);

    await docRef.set(newObjFields);

    response.status = 201;
    response.data = docRef;

    console.log('Successfully created profile for user:', userId);
    return response;

  } catch (error) {
    console.error('Error creating user:', error);
    response.status = 500;
    response.data = error;
    return response;
  }
}


//console.log(passwordValid('66666a66'));
// let output = await createUser('jooe@gmdail.com', 'joe12345');
// console.log(output.providerData);

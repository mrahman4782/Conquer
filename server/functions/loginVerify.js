import admin from 'firebase-admin'; 
import initializeFirebaseApp from './firebaseInit.js';
initializeFirebaseApp();

// Function to verify login
export async function loginVerify(token) {
  let response = {
    status: '',
    data: ''
  };

  try {
    let decodedToken = await admin.auth().verifyIdToken(token);
    console.log('Decoded token:', decodedToken);

    response.status = 200;
    response.data = decodedToken;
  } catch (error) {
    console.error('Unable to verify token. Error:', error.message);
    response.status = 403;
    response.data = error.message;
  }

  return response;
}

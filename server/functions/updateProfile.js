import { getFirestore } from 'firebase-admin/firestore';
import { loginVerify } from './loginVerify.js';

// Initialize Firestore
const db = getFirestore();

// Response template
let response = {
  status: '',
  data: '',
};

// Function to update profile
export async function updateProfile(userData, session) {
  // Verify the user is logged in
  let checkUserLogin = await loginVerify(session);
  console.log(checkUserLogin.data.uid);

  if (checkUserLogin.status === 200) {
    try {
      console.log(userData); // Corrected logging
      await db.collection('userProfile').doc(checkUserLogin.data.uid).update(userData);

      response.status = 200;
      response.data = 'Successfully updated user';
    } catch (error) {
      response.status = 408;
      response.data = 'Request timeout';
      console.log(error);
    }
  } else {
    response.status = 403;
    response.data = 'Unable to authorize user';
  }

  return response;
}

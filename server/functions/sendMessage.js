import { getFirestore } from 'firebase-admin/firestore';
import { loginVerify } from './loginVerify.js';
import {retrieveUserData} from './getUser.js';


// Initialize Firestore
const db = getFirestore();

// Response template
let response = {
  status: '',
  data: '',
};

// Function to update profile
export async function sendMessage(message, session, chatId) {
  // Verify the user is logged in
  let checkUserProfile = await retrieveUserData(session);
  console.log(checkUserProfile.data);


  if (checkUserProfile.status === 200) {

    try {
      //console.log(userData); // Corrected logging
      //await db.collection('userProfile').doc(checkUserLogin.data.uid).update(userData);

      let checkUserLogin = await loginVerify(session);
      console.log(checkUserLogin.data.uid);

      let today = new Date();
      let messageObj = {
        createdDateTime: today,
        photoUrl: '',
        senderId: checkUserLogin.data.uid,
        senderUsername: checkUserProfile.data.username,
        text: message,
      }

      const ref = db.ref(`/chats/${chatId}`);
      let messageRef = ref.child("messages");

      const snapshot = await messageRef.once('value');
      const messages = snapshot.val() || [];


      if (!checkUserProfile.data.userOfChatGroupId.includes(chatId)){
        response.status = 403;
        response.data = 'User not in groupchat';
      }
      else {
        //db.collection('chats').doc(chatId).update(message);
        messages.push(messageObj);
        await messageRef.set(messages)
        response.status = 200;
        response.data = checkUserLogin;
      }

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


//await sendMessage('awd0', 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjNjOTNjMWEyNGNhZjgyN2I4ZGRlOWY4MmQyMzE1MzY1MDg4YWU2MTIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY29ucXVlci1hcHAiLCJhdWQiOiJjb25xdWVyLWFwcCIsImF1dGhfdGltZSI6MTcxNjI2NDIxMywidXNlcl9pZCI6IlVQOFJwYnBPQVdoMkRrQmpLU2pnaXc0Nnk3STMiLCJzdWIiOiJVUDhScGJwT0FXaDJEa0JqS1NqZ2l3NDZ5N0kzIiwiaWF0IjoxNzE2MjY0MjEzLCJleHAiOjE3MTYyNjc4MTMsImVtYWlsIjoid2lsc29uNUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsid2lsc29uNUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.Ijoca9KPZZNSlK1d_PXloX5wzzguY-oiU_F9KBqKD6wdm_5zlCNzBe0B5XOt4fGBWnQzBV0IpC5jp5hKk4n2dqXMMJRMQUN1p1GWD1KKFxSUSnBzvER7JQ4ntgXBWg6M3CZPv3tCN8K1Ozx9Kf_Q1-iHy9mUNJhqMqkXJ89D2T-Pxt-JJ2TTq2cJhXthRGMHx60QqTUyMca9LAzw-Mi4Y3hGkDvTwzd5YkcEbpJOQXUv4uaQ1dr_qAas6qDQZtLx9VthLGIJZlVKml4TWM9HylQsbBffFOtaTuSoRg70Hpv-dEYRycAv-O3LTjL-gDESQtmt3Y0HGJHwlTMteQ5yXg', 'sss');
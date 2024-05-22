import axios from 'axios';
import sessionStorage from './sessionStorage.js';

export async function getMessages(chatId) {
    try {

        let token = sessionStorage.sessionKey;
        const response = await axios.post(`https://api.medconnectapp.org/api/getAllMessages`, { token: token, chatId: chatId});
        console.log("Received all messages");
        return response;

    } catch (error) {
        
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        throw error;
    }
}


export default getMessages;
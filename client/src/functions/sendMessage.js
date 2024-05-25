import axios from 'axios';
import sessionStorage from './sessionStorage.js';

export async function sendMessages(chatId, message) {
    console.log("hi");
    try {

        let token = sessionStorage.sessionKey;
        const response = await axios.post(`http://localhost:5000/api/sendMessage`, { token: token, chatId: chatId, message: message});
        console.log("Sent messages successfully");
        return response;

    } catch (error) {
        
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        throw error;
    }
}


export default sendMessages;
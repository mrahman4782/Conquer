import axios from 'axios';
import sessionStorage from './sessionStorage.js';

export async function createGroup(name) {
    try {

        let token = sessionStorage.sessionKey;
        const response = await axios.post(`https://api.medconnectapp.org/api/createGroup`, { token: token, name: name});
        console.log("Successfully created group!");
        return response;

    } catch (error) {
        
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        throw error;
    }
}


export default createGroup;
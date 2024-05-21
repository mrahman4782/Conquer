import axios from 'axios';
import sessionStorage from './sessionStorage.js';

export async function getAllGroups() {
    try {

        let token = sessionStorage.sessionKey;
        const response = await axios.post(`http://localhost:5000/api/getAllGroups`, { token: token});
        console.log("Successfully received groups!");
        return response;

    } catch (error) {
        
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        return error;
    }
}


export default getAllGroups;
import axios from 'axios';
import sessionStorage from './sessionStorage.js';

export async function getUser() {
    try {

        let token = sessionStorage.sessionKey;
        const response = await axios.post(`http://localhost:5000/api/getUser`, { token: token});
        console.log("Got user");
        return response;

    } catch (error) {
        
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        throw error;
    }
}


export default getUser;
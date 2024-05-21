import axios from 'axios';
import sessionStorage from './sessionStorage.js';

export async function joinGroup(groupId) {
    try {

        let response = '';
        let token = sessionStorage.sessionKey;
        const user = await axios.post(`http://localhost:5000/api/getUser`, {token: token})
        let userGroups = user.data.userOfChatGroupId;
        if (!userGroups.includes(groupId)){
            response = await axios.post(`http://localhost:5000/api/joinGroup`, { token: token, chatId: groupId});
            console.log("Successfully joined group!");
        }
        else {
            response = 'User already in group';
            console.log(response);
        }

        return response;

    } catch (error) {
        
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        throw error;
    }
}


export default joinGroup;
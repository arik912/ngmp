import { v4 as uuidv4 } from 'uuid';
import {setCachingHeaders, sendJSONResponse} from '../helpers/index.js';

let users = [];

// Function to handle GET /api/users
export function getUsers(req, res) {
    setCachingHeaders(res);
    sendJSONResponse(res, 200, users);
}

export function createUser(req, res) {
    let newUser = { id: uuidv4() };
    users.push(newUser);
    sendJSONResponse(res, 201, newUser);
}

export function deleteUser(req, res, userId) {
    const index = users.findIndex(user => user.id === userId);
    if (index !== -1) {
        users.splice(index, 1);
        sendJSONResponse(res, 200, { message: 'User deleted successfully' });
    } else {
        sendJSONResponse(res, 404, { message: 'User not found' });
    }
}

export function getUserHobbies(req, res, userId) {
    setCachingHeaders(res);
    const user = users.find(user => user.id === userId);
    if (user) {
        sendJSONResponse(res, 200, user.hobbies || []);
    } else {
        sendJSONResponse(res, 404, { message: 'User not found' });
    }
}

export function updateUserHobbies(req, res, userId) {
    let user = users.find(user => user.id === userId);
    if (user) {
        let { hobbies } = req.body;
        if (!user.hobbies) {
            user.hobbies = [];
        }
        hobbies.forEach(hobby => {
            if (!user.hobbies.includes(hobby)) {
                user.hobbies.push(hobby);
            }
        });
        sendJSONResponse(res, 200, { message: 'Hobbies updated successfully', hobbies: user.hobbies });
    } else {
        sendJSONResponse(res, 404, { message: 'User not found' });
    }
}
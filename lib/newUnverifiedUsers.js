import crypto from 'crypto'
import prisma from './prisma'

let unverifiedUsers = {};
async function sendVerificationEmail(user) {
    console.log(user.verificationCode);
}
function userIsOverdue(user) {
    return new Date() - user.date > 10e3 * 60 * 5 // If difference is bigger than 5 minutes
}
function deleteOverdueUsers() {
    for (let userKey in Object.keys(unverifiedUsers)) {
        if (userIsOverdue(unverifiedUsers[userKey]))
            delete unverifiedUsers[userKey];
    }
}
export function addUser(userData) {
    let verificationCode = crypto.randomInt(10e6, 10e7).toString();
    deleteOverdueUsers();
    unverifiedUsers[userData.email] = {
        data: userData,
        date: new Date(),
        verificationCode
    };
    sendVerificationEmail(unverifiedUsers[userData.email]);
}

export function verifyUser(email, verificationCodeFromEmail) {
    let user = unverifiedUsers[email];
    if (user === undefined) {
        throw Error('User not found.');
    }
    else if (verificationCode === user.verificationCode) {
        prisma.users.create({ data: user.data });
        return true;
    }
    else {
        return false;
    }
}

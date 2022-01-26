import crypto from 'crypto'
import prisma from './prisma'

let unverifiedUsers = {}

function getUnverifiedUsersArray() {
    return global.unverifiedUsers || unverifiedUsers;
}

async function sendVerificationEmail(user) {
    console.log(user.verificationCode);
}
function userIsOverdue(user) {
    return new Date() - user.date > 10e3 * 60 * 5 // If difference is bigger than 5 minutes
}
function deleteOverdueUsers() {
    let unverifiedUsers = getUnverifiedUsersArray();
    for (let userKey of Object.keys(unverifiedUsers)) {
        console.log(userKey);
        if (userIsOverdue(unverifiedUsers[userKey]))
            delete unverifiedUsers[userKey];
    }
}
export function addUser(userData) {
    let unverifiedUsers = getUnverifiedUsersArray();
    let verificationCode = crypto.randomInt(10e6, 10e7).toString();
    deleteOverdueUsers();
    unverifiedUsers[userData.email] = {
        data: userData,
        date: new Date(),
        verificationCode
    };
    sendVerificationEmail(unverifiedUsers[userData.email]);
}

export function verifyUser({email, verificationCodeFromEmail} = {}) {
    let unverifiedUsers = getUnverifiedUsersArray();
    let user = unverifiedUsers[email];
    if (user === undefined) {
        throw Error('User not found.');
    }
    else if (verificationCodeFromEmail === user.verificationCode) {
        prisma.users.create({ data: user.data }).then(
            null,
            (err) => {
                console.log(err);
            }
        )
        delete unverifiedUsers[email];
        return true;
    }
    else {
        return false;
    }
}

if (process.env.NODE_ENV !== 'production') global.unverifiedUsers = getUnverifiedUsersArray();
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import getHash from './hash';
import prismaClient from './prisma';

export function createJWTToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '10000' });
}

export default function validateJWTToken(handler, allowExpired = false) {
    return async (request, response) => {
        const token = request.headers.authorization?.replace?.(/Bearer\s+/, '');
        let tokenPayload = jwt.decode(token);
        try {
            jwt.verify(token, process.env.JWT_SECRET);
        } catch (e) {
            if (e instanceof TokenExpiredError) {
                if (!allowExpired) {
                    response.status(400).json({
                        message:
                            'Your token has been expired. Please refresh it.',
                        errors: ['ExpiredJWTToken'],
                    });
                    return;
                }
            } else {
                response.status(400).json({
                    message: 'Invalid JWT token.',
                    errors: ['InvalidJWTToken'],
                });
                return;
            }
        }
        await handler(request, response, token, tokenPayload);
    };
}

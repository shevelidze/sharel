import jwt from 'jsonwebtoken';
import getHash from './hash';
import prismaClient from './prisma';

export function createJWTToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

export default function validateJWTToken(handler) {
    return async (request, response) => {
        const token = request.headers.authorization?.replace?.(/Bearer\s+/, '');
        let tokenPayload;
        try {
            tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
        } catch (e) {
            response.status(400).json({
                message: 'Invalid JWT token.',
                errors: ['InvalidJWTToken'],
            });
            return;
        }
        await handler(request, response, token, tokenPayload);
    };
}

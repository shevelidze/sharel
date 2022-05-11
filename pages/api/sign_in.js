import prisma from '../../lib/prisma';
import validateData from '../../lib/requestDataValidator';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export default validateData(
    async (request, response) => {
        let passwordHash = crypto
            .createHash('sha256')
            .update(request.body.password)
            .digest('base64');
        let userData = await prisma.users.findFirst({
            where: {
                password_hash: passwordHash,
                email: request.body.email,
            },
        });
        if (userData) {
            const token = jwt.sign(
                {
                    userId: userData.id,
                },
                process.env.JWT_SECRET,
                { expiresIn: '30d' }
            );
            const tokenHash = crypto
                .createHash('sha256')
                .update(token)
                .digest('base64');
            await prisma.sessions.create({
                data: {
                    user_id: userData.id,
                    access_token_hash: tokenHash,
                    user_agent: request.headers['user-agent'],
                    ip_address: request.headers.host,
                },
            });
            response.json({
                JWTAccessToken: token,
            });
        } else {
            response.status(400).json({
                message: 'Wrong email or password.',
                errors: ['wrongUserData'],
            });
        }
    },
    {
        properties: {
            password: {
                type: 'string',
            },
            email: {
                type: 'string',
            },
        },
    }
);

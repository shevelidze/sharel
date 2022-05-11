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
            response.json({
                JWTAccessToken: jwt.sign(
                    {
                        userId: userData.id,
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: '30d' }
                ),
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

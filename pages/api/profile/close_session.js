import validateJWTToken from '../../../lib/requestJWTValidator';
import validateData from '../../../lib/requestDataValidator';
import prismaClient from '../../../lib/prisma';
import { prisma } from '@prisma/client';

export default validateJWTToken(
    validateData(
        async (request, response) => {
            try {
                await prismaClient.sessions.delete({
                    where: {
                        access_token_hash: request.body.accessTokenHash,
                    },
                });
            } catch (e) {
                if (e.code === 'P2025') {
                    response.status(400).json({
                        message:
                            'Faliled to find session with a such token hash.',
                        errors: ['InvalidAccessTokenHash'],
                    });
                    return;
                }
                throw e;
            }
            response.end();
        },
        {
            properties: {
                accessTokenHash: {
                    type: 'string',
                },
            },
        }
    )
);

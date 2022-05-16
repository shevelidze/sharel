import validateJWTToken from '../../../lib/requestJWTValidator';
import validateData from '../../../lib/requestDataValidator';
import prismaClient from '../../../lib/prisma';

export default validateJWTToken(
    validateData(async (request, response) => {
        await prismaClient.posts.create({
            data: {
                content: request.body.content,
            },
        });
        response.end();
    }),
    {
        properties: {
            content: 'string',
        },
    }
);

import validateJWTToken from '../../../lib/requestJWTValidator';
import prismaClient from '../../../lib/prisma';

export default validateJWTToken(async (request, response) => {
    let ids = await prismaClient.posts.findMany({
        select: {
            id: true,
        },
        where: {
            user_id: request.tokenPayload.userId,
        },
    });
    response.json({ ids });
});

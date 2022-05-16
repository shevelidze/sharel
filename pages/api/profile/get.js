import validateJWTToken from '../../../lib/requestJWTValidator';
import prismaClient from '../../../lib/prisma';

export default validateJWTToken(
    async (request, response, token, tokenPayload) => {
        const user = await prismaClient.users.findUnique({
            select: { id: true, first_name: true, last_name: true },
            where: { id: tokenPayload.userId },
        });
        response.json({
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
        });
    }
);

import validateJWTToken from '../../lib/requestJWTValidator';
import getHash from '../../lib/hash';
import { createJWTToken } from '../../lib/requestJWTValidator';

export default validateJWTToken(
    async (request, response, token, tokenPayload) => {
        const tokenHash = getHash(token);
        const userData = await prismaClient.sessions.findUnique({
            select: {
                user_id: true,
            },
            where: {
                access_token_hash: tokenHash,
            },
        });
        if (tokenPayload.userId !== userData?.user_id) {
            response.status(400).json({
                message: 'Invalid userId in JWT token.',
                errors: ['InvalidJWTToken'],
            });
            return;
        }
        const refreshedToken = createJWTToken(userData.user_id);
        await prismaClient.sessions.update({
            data: {
                access_token_hash: getHash(refreshedToken),
                last_used_timestamp: new Date().toISOString(),
            },
            where: { access_token_hash: tokenHash },
        });
        response.json({
            JWTAccessToken: refreshedToken,
        });
    },
    true
);

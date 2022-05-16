import validateJWTToken from '../../../lib/requestJWTValidator';
import prismaClient from '../../../lib/prisma';

export default validateJWTToken(
    async (request, response, token, tokenPayload) => {
        const sessions = await prismaClient.sessions.findMany({
            select: {
                ip_address: true,
                last_used_timestamp: true,
                user_agent: true,
                access_token_hash: true,
            },
            where: {
                user_id: tokenPayload.userId,
            },
        });
        const reformatedSessions = [];
        for (let session of sessions) {
            reformatedSessions.push({
                accessTokenHash: session.access_token_hash,
                ipAdress: session.ip_address,
                lastUsedTimestamp: session.last_used_timestamp,
                userAgent: session.user_agent,
            });
        }
        response.json({ sessions: reformatedSessions });
    }
);

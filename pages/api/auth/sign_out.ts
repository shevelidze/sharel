import { NextApiHandler } from 'next';
import { UserRefreshTokenPayload } from '../../../lib/generateUserTokensPair';
import { authorizationMiddleware } from '../../../lib/middlewares';
import prisma from '../../../lib/prisma';

const signOut: NextApiHandler = async (req, res) => {
  const tokenPayload = authorizationMiddleware(req, res, 'refresh');
  if (tokenPayload === undefined) return;

  const userRefreshTokenPayload = tokenPayload as UserRefreshTokenPayload;
  await prisma.sessions.delete({
    where: {
      id: userRefreshTokenPayload.sessionId,
    },
  });

  res.end();
};

export default signOut;

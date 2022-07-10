import { NextApiHandler } from 'next';
import { InvalidSessionApiError } from '../../../lib/apiErrors';
import generateUserTokensPair, {
  UserRefreshTokenPayload,
} from '../../../lib/generateUserTokensPair';
import { authorizationMiddleware } from '../../../lib/middlewares';
import prisma from '../../../lib/prisma';

const refresh: NextApiHandler = async (req, res) => {
  const oldRefreshPayload = authorizationMiddleware(
    req,
    res,
    'refresh'
  ) as UserRefreshTokenPayload;
  if (oldRefreshPayload === undefined) return;

  const userId = (
    await prisma.sessions.findFirst({
      select: {
        user_id: true,
      },
      where: {
        refresh_token_id: oldRefreshPayload.id,
        id: oldRefreshPayload.sessionId,
      },
    })
  )?.user_id;

  if (!userId) return new InvalidSessionApiError().send(res);

  const newRefreshTokenId = (
    await prisma.sessions.update({
      select: {
        refresh_token_id: true,
      },
      data: {
        refresh_token_id: oldRefreshPayload.id + 1,
      },
      where: {
        id: oldRefreshPayload.sessionId,
      },
    })
  ).refresh_token_id;

  res.json(
    generateUserTokensPair(
      userId,
      newRefreshTokenId,
      oldRefreshPayload.sessionId
    )
  );
};

export default refresh;

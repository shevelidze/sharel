import prisma from './prisma';
import generateUserTokensPair, { TokensPair } from './generateUserTokensPair';

export async function createUserSession(
  userId: number,
  ipAddress?: string,
  userAgent?: string
): Promise<TokensPair> {
  const prismaFetchResult = await prisma.sessions.create({
    select: { refresh_token_id: true, id: true },
    data: {
      user_id: userId,
      ip_address: ipAddress,
      user_agent: userAgent,
    },
  });
  return generateUserTokensPair(
    userId,
    prismaFetchResult.refresh_token_id,
    prismaFetchResult.id
  );
}

class InvalidSessionError extends Error {
  constructor() {
    super('Invalid session. Try to sign in again.');
  }
}

export async function refreshUserSession(
  userId: number,
  refreshTokenId: number
): Promise<TokensPair> {
  const prismaFetchResult = await prisma.sessions.findFirst({
    select: { refresh_token_id: true, id: true },
    where: {
      user_id: userId,
      refresh_token_id: refreshTokenId,
    },
  });
  if (prismaFetchResult === null) throw new InvalidSessionError();

  const newRefreshTokenId = prismaFetchResult.refresh_token_id + 1;
  await prisma.sessions.update({
    data: {
      refresh_token_id: newRefreshTokenId,
    },
    where: {
      id: prismaFetchResult.id,
    },
  });

  return generateUserTokensPair(
    userId,
    newRefreshTokenId,
    prismaFetchResult.id
  );
}

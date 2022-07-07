import jwt from 'jsonwebtoken';
import JWTSecretKey from './JWTSecretKey';
import type { UserId } from './middlewares/authorizationMiddleware';

export interface TokensPair {
  access: string;
  refresh: string;
}

export interface UserTokenPayload {
  type: 'access' | 'refresh';
}

export interface UserAccessTokenPayload extends UserTokenPayload {
  type: 'access';
  userId: number;
}

export interface UserRefreshTokenPayload extends UserTokenPayload {
  type: 'refresh';
  id: number;
  sessionId: number;
}

export default function generateUserTokensPair(
  userId: UserId,
  refreshTokenId: number,
  sessionId: number
): TokensPair {
  const accessPayload: UserAccessTokenPayload = { userId, type: 'access' };
  const refreshPayload: UserRefreshTokenPayload = {
    type: 'refresh',
    id: refreshTokenId,
    sessionId: sessionId,
  };
  return {
    access: jwt.sign(accessPayload, JWTSecretKey, {
      expiresIn: '5m',
    }),
    refresh: jwt.sign(refreshPayload, JWTSecretKey, { expiresIn: '30d' }),
  };
}

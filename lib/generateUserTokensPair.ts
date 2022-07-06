import jwt from 'jsonwebtoken';
import JWTSecretKey from './JWTSecretKey';
import type { UserId } from './middlewares/authorizationMiddleware';

export interface TokensPair {
  access: string;
  refresh: string;
}

export default function generateUserTokensPair(
  userId: UserId,
  refreshTokenId: number
): TokensPair {
  return {
    access: jwt.sign({ userId }, JWTSecretKey, {
      expiresIn: '5m',
    }),
    refresh: jwt.sign({ userId, id: refreshTokenId }, JWTSecretKey),
  };
}

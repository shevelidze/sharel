import jwt from 'jsonwebtoken';
import JWTSecretKey from './JWTSecretKey';
import type { UserId } from './middlewares/authorizationMiddleware';

export default function generateUserTokensPair(id: UserId) {
  return {
    access: jwt.sign({ id }, JWTSecretKey, {
      expiresIn: '5m',
    }),
    refresh: jwt.sign({ id }, JWTSecretKey),
  };
}

import jwt from 'jsonwebtoken';
import JWTSecretKey from './JWTSecretKey';
import type { UserId } from './middlewares/authorizationMiddleware';

export default function createUserToken(id: UserId) {
  return jwt.sign({ id }, JWTSecretKey);
}

import jwt, {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from 'jsonwebtoken';
import JWTSecretKey from '../JWTSecretKey';
import {
  TokenExpiredApiError,
  InvalidTokenApiError,
  InvalidTokenTypeApiError,
} from '../apiErrors';
import Middleware from './Middleware';
import { type UserTokenPayload } from '../generateUserTokensPair';

export type UserId = number;

export function getTokenFromAuthorization(authorization: string) {
  return /^Bearer (.*)$/.exec(authorization)?.[1];
}

const authorizationMiddleware: Middleware<
  UserTokenPayload,
  ['access' | 'refresh' | undefined]
> = (req, res, tokenType = 'access') => {
  if (req.headers.authorization === undefined) {
    new InvalidTokenApiError(tokenType).send(res);
    return;
  }

  const token = getTokenFromAuthorization(req.headers.authorization);

  if (token === undefined) {
    new InvalidTokenApiError(tokenType).send(res);
    return;
  }

  try {
    const decoded = jwt.verify(token, JWTSecretKey);
    if (typeof decoded === 'string')
      new InvalidTokenApiError(tokenType).send(res);
    else if (decoded.type !== tokenType)
      new InvalidTokenTypeApiError(tokenType, decoded.type);
    else return decoded as UserTokenPayload;
  } catch (e) {
    if (e instanceof TokenExpiredError)
      new TokenExpiredApiError(tokenType).send(res);
    else if (e instanceof JsonWebTokenError || e instanceof NotBeforeError)
      new InvalidTokenApiError(tokenType).send(res);
    else throw e;
  }
};

export default authorizationMiddleware;

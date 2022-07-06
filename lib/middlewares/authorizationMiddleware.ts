import jwt, {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from 'jsonwebtoken';
import JWTSecretKey from '../JWTSecretKey';
import {
  AccessTokenExpiredApiError,
  InvalidAccessTokenApiError,
} from '../apiErrors';
import Middleware from './Middleware';
import { type UserTokenPayload } from '../generateUserTokensPair';

export type UserId = number;

export function getTokenFromAuthorization(authorization: string) {
  return /^Bearer (.*)$/.exec(authorization)?.[1];
}

const authorizationMiddleware: Middleware<
  UserTokenPayload,
  [string | undefined]
> = (req, res, tokenType = 'access') => {
  if (req.headers.authorization === undefined) {
    new InvalidAccessTokenApiError().send(res);
    return;
  }

  const token = getTokenFromAuthorization(req.headers.authorization);

  if (token === undefined) {
    new InvalidAccessTokenApiError().send(res);
    return;
  }

  try {
    const decoded = jwt.verify(token, JWTSecretKey);
    if (typeof decoded === 'string' || decoded.type !== tokenType)
      new InvalidAccessTokenApiError().send(res);
    else return decoded as UserTokenPayload;
  } catch (e) {
    if (e instanceof TokenExpiredError)
      new AccessTokenExpiredApiError().send(res);
    else if (e instanceof JsonWebTokenError || e instanceof NotBeforeError)
      new InvalidAccessTokenApiError().send(res);
    else throw e;
  }
};

export default authorizationMiddleware;

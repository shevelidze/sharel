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

export type UserId = number;

export function getTokenFromAuthorization(authorization: string) {
  return /^Bearer (.*)$/.exec(authorization)?.[1];
}

const authorizationMiddleware: Middleware<UserId, []> = (req, res) => {
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
    if (typeof decoded === 'string') new InvalidAccessTokenApiError().send(res);
    else return decoded.id as number;
  } catch (e) {
    if (e instanceof TokenExpiredError)
      new AccessTokenExpiredApiError().send(res);
    else if (e instanceof JsonWebTokenError || e instanceof NotBeforeError)
      new InvalidAccessTokenApiError().send(res);
    else throw e;
  }
};

export default authorizationMiddleware;

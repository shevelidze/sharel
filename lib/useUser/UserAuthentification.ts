import jwt from 'jsonwebtoken';
import sendJson from '../sendJson';
import saveTokens from './saveTokens';

export class UnauthorizedError extends Error {
  constructor() {
    super('The client is not authorized.');
  }
}

export class ErrorOnRefreshing extends Error {
  constructor(response: Response) {
    super('Unkown error on the tokens refreshing.');
    this.response = response;
  }
  response: Response;
}

export default class UserAuthentification {
  static getAuthentification() {
    const accessTokenLocalValue = localStorage.getItem('userAccessToken');
    const refreshTokenLocalValue = localStorage.getItem('userRefreshToken');

    if (accessTokenLocalValue === null || refreshTokenLocalValue === null)
      return null;

    return new UserAuthentification(
      accessTokenLocalValue,
      refreshTokenLocalValue
    );
  }
  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    try {
      const decoded = jwt.decode(this.refreshToken, { json: true });
      if (decoded === null || typeof decoded.sessionId !== 'number')
        throw new UnauthorizedError();

      this.id = decoded.id;
    } catch (e) {
      if (
        e instanceof jwt.JsonWebTokenError ||
        e instanceof jwt.NotBeforeError ||
        e instanceof jwt.TokenExpiredError
      )
        throw new UnauthorizedError();
      else throw e;
    }

    this.refreshingPromise = null;
  }
  async fetch(input: RequestInfo | URL, init?: RequestInit | undefined) {
    const dataFetch = () =>
      fetch(input, {
        ...init,
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

    if (this.refreshingPromise) {
      const refreshResponse = await this.refreshingPromise;
      if (!refreshResponse.ok) throw new ErrorOnRefreshing(refreshResponse);
    }

    const dataResponse = await dataFetch();
    if (dataResponse.status === 403) {
      this.refreshingPromise = fetch('/api/auth/refresh', {
        headers: {
          Authorization: `Bearer ${this.refreshToken}`,
        },
      });
      const refreshResponse = await this.refreshingPromise;
      this.refreshingPromise = null;
      if (refreshResponse.ok) {
        console.log('Tokens have been successfully refreshed.');
        const newTokens = await refreshResponse.json();
        saveTokens(newTokens);
        this.accessToken = newTokens.access;
        this.refreshToken = newTokens.refresh;
        return await dataFetch();
      } else if (refreshResponse.status === 401) {
        localStorage.removeItem('JWTAccessToken');
        localStorage.removeItem('JWTRefreshToken');
        console.log('Session is not already valid.');
      } else throw new ErrorOnRefreshing(refreshResponse);
    }

    return dataResponse;
  }
  sendJson(input: RequestInfo, body: any, init?: RequestInit) {
    return sendJson(input, body, init, this.fetch.bind(this));
  }
  id: number;
  accessToken: string;
  refreshToken: string;
  refreshingPromise: Promise<Response> | null;
}

import jwt from 'jsonwebtoken';
import sendJson from '../sendJson';

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

export type LogoutHandler = () => void;

export default class UserAuthentification {
  static getAuthentification(onLogout: LogoutHandler) {
    const accessTokenLocalValue = localStorage.getItem('userAccessToken');
    const refreshTokenLocalValue = localStorage.getItem('userRefreshToken');

    if (accessTokenLocalValue === null || refreshTokenLocalValue === null)
      return null;

    return new UserAuthentification(
      accessTokenLocalValue,
      refreshTokenLocalValue,
      onLogout
    );
  }
  constructor(
    accessToken: string,
    refreshToken: string,
    onLogout: LogoutHandler
  ) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    try {
      const decoded = jwt.decode(this.refreshToken, { json: true });
      if (decoded === null || typeof decoded.id !== 'number')
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

    this.onLogout = onLogout;
  }
  async fetch(input: RequestInfo | URL, init?: RequestInit | undefined) {
    const dataFetch = () =>
      fetch(input, {
        ...init,
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

    const dataResponse = await dataFetch();
    if (dataResponse.status === 403) {
      const refreshResponse = await fetch('/api/auth/refresh', {
        headers: {
          Authorization: this.refreshToken,
        },
      });
      if (refreshResponse.ok) {
        ({ accessToken: this.accessToken, refreshToken: this.refreshToken } =
          await refreshResponse.json());
        return await dataFetch();
      } else if (refreshResponse.status === 401) {
        localStorage.removeItem('JWTAccessToken');
        localStorage.removeItem('JWTRefreshToken');

        this.onLogout();
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
  onLogout: LogoutHandler;
}

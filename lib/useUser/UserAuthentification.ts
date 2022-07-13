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
  static getAuthentification(onInvalidSession: () => void = () => {}) {
    const accessTokenLocalValue = localStorage.getItem('userAccessToken');
    const refreshTokenLocalValue = localStorage.getItem('userRefreshToken');

    if (accessTokenLocalValue === null || refreshTokenLocalValue === null)
      return null;

    return new UserAuthentification(
      accessTokenLocalValue,
      refreshTokenLocalValue,
      onInvalidSession
    );
  }
  constructor(
    accessToken: string,
    refreshToken: string,
    onInvalidSession: () => void
  ) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.onInvalidSession = onInvalidSession;

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

    const dataResponse = await dataFetch();

    if (dataResponse.status === 403) {
      await this.refreshTokens();
      return await dataFetch();
    }

    return dataResponse;
  }
  sendJson(input: RequestInfo, body: any, init?: RequestInit) {
    return sendJson(input, body, init, this.fetch.bind(this));
  }
  async refreshTokens() {
    const refreshTask = async () => {
      const refreshResponse = await fetch('/api/auth/refresh', {
        headers: {
          Authorization: `Bearer ${this.refreshToken}`,
        },
      });
      if (refreshResponse.ok) {
        console.log('Tokens have been successfully refreshed.');
        const newTokens = await refreshResponse.json();
        saveTokens(newTokens);
        this.accessToken = newTokens.access;
        this.refreshToken = newTokens.refresh;
      } else if (refreshResponse.status === 401) {
        console.log('Session is already not valid.');
        this.onInvalidSession();
      } else throw new ErrorOnRefreshing(refreshResponse);
    };

    if (this.refreshingPromise !== null) await this.refreshingPromise;
    else {
      this.refreshingPromise = refreshTask();
      await this.refreshingPromise;
      this.refreshingPromise = null;
    }
  }
  id: number;
  accessToken: string;
  refreshToken: string;
  refreshingPromise: Promise<void> | null;
  onInvalidSession: () => void;
}

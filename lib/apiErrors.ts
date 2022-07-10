import EasyRest from '@shevelidze/easyrest';
import { NextApiResponse } from 'next';

export class ApiError {
  constructor(httpCode: number, internalCode: number, message: string) {
    this.httpCode = httpCode;
    this.internalCode = internalCode;
    this.message = message;
  }
  static fromEasyRestError(error: EasyRest.errors.EasyRestError) {
    return new ApiError(error.httpCode, 2, error.message);
  }
  send(res: NextApiResponse) {
    res
      .status(this.httpCode)
      .json({ code: this.internalCode, message: this.message });
  }

  httpCode: number;
  internalCode: number;
  message: string;
}

type TokenType = 'access' | 'refresh';

export class InvalidTokenApiError extends ApiError {
  constructor(type: TokenType) {
    super(401, 0, `Invalid ${type} token.`);
  }
}

export class InvalidSessionApiError extends ApiError {
  constructor() {
    super(401, 6, `Invalid session. Your refresh token is not valid.`);
  }
}

export class TokenExpiredApiError extends ApiError {
  constructor(type: TokenType) {
    super(403, 1, `Your ${type} token has been expired.`);
  }
}

export class InvalidTokenTypeApiError extends ApiError {
  constructor(expected: TokenType, got: TokenType) {
    super(400, 5, `Invalid token type. Expected ${expected}, but got ${got}.`);
  }
}

export class InvalidRequestBodyApiError extends ApiError {
  constructor(message: string) {
    super(400, 3, message);
  }
}

export class MethodNotAllowedApiError extends ApiError {
  constructor(allowedMethods?: string[]) {
    super(
      405,
      4,
      `Method not allowed.${
        allowedMethods === undefined ? '' : ` Try ${allowedMethods.join(', ')}.`
      }`
    );
  }
}

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

export class InvalidAccessTokenApiError extends ApiError {
  constructor() {
    super(401, 0, 'Invalid access token.');
  }
}

export class AccessTokenExpiredApiError extends ApiError {
  constructor() {
    super(403, 1, 'Your access token has been expired.');
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

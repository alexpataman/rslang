import { AxiosError, AxiosRequestHeaders } from 'axios';

import { Tokens, GetTokens, SetTokens } from '../../types/RSLangApi';
import { AlreadyExistsError } from '../../utils/errors/AlreadyExistsError';
import { ForbiddenError } from '../../utils/errors/ForbiddenError';
import { NotFoundError } from '../../utils/errors/NotFoundError';
import { UnauthorizedError } from '../../utils/errors/UnauthorizedError';
import { ValidationError } from '../../utils/errors/ValidationError';

const emptyTokens = {
  token: '',
  refreshToken: '',
};

export abstract class RSLangApi {
  public API_HOST = process.env.REACT_APP_API_URL;

  protected getLocalTokens: GetTokens | undefined;

  protected setLocalTokens: SetTokens | undefined;

  protected defaultHeaders: AxiosRequestHeaders;

  public ERROR_CODES = {
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    AlREADY_EXISTS: 417,
    VALIDATION_ERROR: 422,
    NOT_FOUND: 404,
  };

  constructor(getTokens?: GetTokens, setTokens?: SetTokens) {
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
    this.getLocalTokens = getTokens;
    this.setLocalTokens = setTokens;
  }

  getTokens() {
    if (this.getLocalTokens) {
      return this.getLocalTokens();
    }
    return emptyTokens;
  }

  setTokens(tokens: Tokens) {
    if (this.setLocalTokens) {
      this.setLocalTokens(tokens);
    }
  }

  getException(error: AxiosError): Error {
    if (!error.response) {
      // return new Error('Something went wrong');
      return error;
    }

    const { status, data } = error.response;

    switch (status) {
      case this.ERROR_CODES.VALIDATION_ERROR:
        return new ValidationError(data);
      case this.ERROR_CODES.AlREADY_EXISTS:
        return new AlreadyExistsError(data);
      case this.ERROR_CODES.UNAUTHORIZED:
        return new UnauthorizedError(data);
      case this.ERROR_CODES.FORBIDDEN:
        return new ForbiddenError(data);
      case this.ERROR_CODES.NOT_FOUND:
        return new NotFoundError(data);
      default:
        return new Error(data);
    }
  }
}

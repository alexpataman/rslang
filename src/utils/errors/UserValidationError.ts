import { ErrorData } from '../../types/RSLangApi';

export class UserValidationError extends Error {
  public data: ErrorData | undefined;

  constructor(data: ErrorData, ...params: string[]) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UserValidationError);
    }

    this.name = 'UserValidationError';
    this.data = data;
  }
}

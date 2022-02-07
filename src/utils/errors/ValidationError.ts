import { ErrorData } from '../../types/RSLangApi';

export class ValidationError extends Error {
  public data: ErrorData | undefined;

  constructor(data: ErrorData, ...params: string[]) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }

    this.name = 'ValidationError';
    this.data = data;
  }
}

export class OtherApiError extends Error {
  public message: string;

  constructor(message: string, ...params: string[]) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, OtherApiError);
    }

    this.name = 'OtherApiError';
    this.message = message;
  }
}

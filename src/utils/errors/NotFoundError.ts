export class CancelError extends Error {
  constructor(...params: string[]) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CancelError);
    }

    this.name = 'CancelError';
  }
}

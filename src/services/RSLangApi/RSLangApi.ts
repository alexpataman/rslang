import { AxiosRequestHeaders } from 'axios';

import { Tokens, GetTokens, SetTokens } from '../../types/RSLangApi';

const emptyTokens = {
  token: '',
  refreshToken: '',
};

export abstract class RSLangApi {
  protected API_HOST = process.env.REACT_APP_API_URL;

  protected getLocalTokens: GetTokens | undefined;

  protected setLocalTokens: SetTokens | undefined;

  protected API_PATH = '';

  protected defaultHeaders: AxiosRequestHeaders;

  public ERROR_CODES = {
    AlREADY_EXISTS: 417,
    VALIDATION_ERROR: 422,
  };

  constructor(getTokens?: GetTokens, setTokens?: SetTokens) {
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
    this.getLocalTokens = getTokens;
    this.setLocalTokens = setTokens;
  }

  getApiUrl() {
    return `${this.API_HOST}/${this.API_PATH}`;
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
}

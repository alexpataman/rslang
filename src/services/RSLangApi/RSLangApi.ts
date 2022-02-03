import { AxiosRequestHeaders } from 'axios';

export class RaceApi {
  protected API_HOST = process.env.REACT_APP_API_URL;

  protected API_PATH = '';

  protected defaultHeaders: AxiosRequestHeaders;

  constructor() {
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  getApiUrl() {
    return `${this.API_HOST}/${this.API_PATH}`;
  }
}

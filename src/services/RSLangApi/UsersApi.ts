import axios, { AxiosError } from 'axios';

import { Tokens, User } from '../../types/RSLangApi';
import { OtherApiError } from '../../utils/errors/OtherApiError';
import { UserValidationError } from '../../utils/errors/UserValidationError';
import { RSLangApi } from './RSLangApi';

export class UsersApi extends RSLangApi {
  protected API_PATH = 'users';

  async createUser(
    data: Pick<User, 'name' | 'email' | 'password'>
  ): Promise<User> {
    try {
      const result = await axios.post(
        this.getApiUrl(),
        data,
        this.defaultHeaders
      );
      return result.data;
    } catch (error) {
      const err = error as AxiosError;
      switch (err.response?.status) {
        case this.ERROR_CODES.VALIDATION_ERROR:
          throw new UserValidationError(err.response?.data);
        case this.ERROR_CODES.AlREADY_EXISTS:
        default:
          throw new OtherApiError(err.response?.data);
      }
    }
  }

  async getUser(id: User['id']): Promise<User | null> {
    const instance = this.getAuthInstance(id);

    try {
      const result = await instance.get(`${this.getApiUrl()}/${id}`);
      return result.data;
    } catch {
      throw new Error('err');
    }
  }

  getAuthInstance(id: User['id']) {
    const instance = axios.create({
      baseURL: this.getApiUrl(),
      headers: this.defaultHeaders,
    });

    // Add a request interceptor
    instance.interceptors.request.use(
      (config) => {
        const tokens = this.getTokens();
        config.headers = {
          ...this.defaultHeaders,
          Authorization: `Bearer ${tokens.token}`,
        };
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    // Add a response interceptor
    instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const tokens = this.getTokens();
        const originalConfig = { retried: false, ...error.config };
        if (originalConfig.url !== '/signin' && error.response) {
          if (error.response?.status === 401 && !originalConfig.retried) {
            originalConfig.retried = true;

            try {
              const newTokens = await this.refreshToken(
                id,
                tokens.refreshToken
              );
              this.setTokens(newTokens);
              return instance(originalConfig);
            } catch (_error) {
              return Promise.reject(_error);
            }
          }
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }

  async refreshToken(
    id: User['id'],
    refreshToken: Tokens['refreshToken']
  ): Promise<Tokens> {
    const headers = {
      ...this.defaultHeaders,
      Authorization: `Bearer ${refreshToken}`,
    };
    try {
      const result = await axios.get(`${this.getApiUrl()}/${id}/tokens`, {
        headers,
      });
      return result.data;
    } catch {
      throw new Error('unauthorized');
    }
  }
}

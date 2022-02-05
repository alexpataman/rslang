import axios, { AxiosError } from 'axios';

import { User } from '../../types/RSLangApi';
import { OtherApiError } from '../../utils/errors/OtherApiError';
import { UserValidationError } from '../../utils/errors/UserValidationError';
import { RSLangApi } from './RSLangApi';

const ERROR_CODES = {
  USER_EXISTS: 417,
  VALIDATION_ERROR: 422,
};

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
        case ERROR_CODES.VALIDATION_ERROR:
          throw new UserValidationError(err.response?.data);
        case ERROR_CODES.USER_EXISTS:
        default:
          throw new OtherApiError(err.response?.data);
      }
    }
  }

  async getUser(id: User['id']): Promise<User | null> {
    try {
      const result = await axios.get(`${this.getApiUrl()}/${id}`);
      return result.data;
    } catch {
      return null;
    }
  }
}

import axios, { AxiosError } from 'axios';

import { User, Authorization } from '../../types/RSLangApi';
import { OtherApiError } from '../../utils/errors/OtherApiError';
import { RSLangApi } from './RSLangApi';

const ERROR_CODES = {
  NOT_FOUND: 404,
};

export class SigninApi extends RSLangApi {
  protected API_PATH = 'signin';

  async signin(data: Pick<User, 'email' | 'password'>): Promise<Authorization> {
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
        case ERROR_CODES.NOT_FOUND:
        default:
          throw new OtherApiError(err.response?.data);
      }
    }
  }
}

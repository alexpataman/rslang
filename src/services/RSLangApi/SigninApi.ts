import axios, { AxiosError } from 'axios';

import { User, Authorization } from '../../types/RSLangApi';
import { RSLangApi } from './RSLangApi';

export class SigninApi extends RSLangApi {
  private API_PATH_SIGNIN = `${this.API_HOST}/signin`;

  async signin(data: Pick<User, 'email' | 'password'>): Promise<Authorization> {
    try {
      const result = await axios.post(
        this.API_PATH_SIGNIN,
        data,
        this.defaultHeaders
      );
      return result.data;
    } catch (error) {
      throw this.getException(error as AxiosError);
    }
  }
}

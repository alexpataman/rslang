import { AxiosError } from 'axios';

import { GetTokens, SetTokens, User, Word } from '../../types/RSLangApi';
import { UsersApi } from './UsersApi';

export class UsersStatisticsApi extends UsersApi {
  protected userId: User['id'];

  public API_PATH_USERS_STATISTICS: string;

  constructor(
    userId: User['id'],
    getTokens?: GetTokens,
    setTokens?: SetTokens
  ) {
    super(getTokens, setTokens);
    this.userId = userId;
    this.API_PATH_USERS_STATISTICS = `${this.API_HOST}/users/${userId}/statistics`;
  }

  get = async () => {
    const instance = this.getAuthInstance(this.userId);

    try {
      const result = await instance.get(this.API_PATH_USERS_STATISTICS);
      return result.data;
    } catch (error) {
      throw this.getException(error as AxiosError);
    }
  };

  set = async (payload: {}) => {
    const instance = this.getAuthInstance(this.userId);
    const data = {
      optional: {
        ...payload,
      },
    };

    try {
      const result = await instance.put(this.API_PATH_USERS_STATISTICS, data);
      return result.data;
    } catch (error) {
      throw this.getException(error as AxiosError);
    }
  };
}

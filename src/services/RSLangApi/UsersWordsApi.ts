import { AxiosError } from 'axios';

import { GetTokens, SetTokens, User, Word } from '../../types/RSLangApi';
import { AlreadyExistsError } from '../../utils/errors/AlreadyExistsError';
import { UsersApi } from './UsersApi';

export class UsersWords extends UsersApi {
  protected userId: User['id'];

  constructor(
    userId: User['id'],
    getTokens?: GetTokens,
    setTokens?: SetTokens
  ) {
    super(getTokens, setTokens);
    this.userId = userId;
    this.API_PATH = `users/${userId}/words`;
  }

  getAllWords = async () => {
    const instance = this.getAuthInstance(this.userId);

    try {
      const result = await instance.get(`${this.getApiUrl()}`);
      // console.log(result.data);
      return result.data;
    } catch {
      throw new Error('err');
    }
  };

  getWord = async (wordId: Word['id']) => {
    const instance = this.getAuthInstance(this.userId);

    try {
      const result = await instance.get(`${this.getApiUrl()}/${wordId}`);
      return result.data;
    } catch {
      throw new Error('err');
    }
  };

  createWord = async (
    wordId: Word['id'],
    payload: { isDifficult?: boolean; isKnown?: boolean }
  ) => {
    const instance = this.getAuthInstance(this.userId);
    const data = {
      optional: {
        ...payload,
      },
    };

    try {
      const result = await instance.post(`${this.getApiUrl()}/${wordId}`, data);
      return result.data;
    } catch (error) {
      const err = error as AxiosError;
      switch (err.response?.status) {
        case this.ERROR_CODES.AlREADY_EXISTS:
          throw new AlreadyExistsError(err.response?.data);
        default:
          throw err;
      }
    }
  };

  updateWord = async (
    wordId: Word['id'],
    payload: { isDifficult?: boolean; isKnown?: boolean }
  ) => {
    const instance = this.getAuthInstance(this.userId);
    const data = {
      optional: {
        ...payload,
      },
    };

    try {
      const result = await instance.put(`${this.getApiUrl()}/${wordId}`, data);
      return result.data;
    } catch (error) {
      const err = error as AxiosError;
      switch (err.response?.status) {
        case this.ERROR_CODES.AlREADY_EXISTS:
          throw new AlreadyExistsError(err.response?.data);
        default:
          throw err;
      }
    }
  };
}

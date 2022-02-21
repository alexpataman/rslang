import { AxiosError } from 'axios';

import {
  GetTokens,
  SetTokens,
  User,
  UserWord,
  UserWordPayload,
  Word,
} from '../../types/RSLangApi';
import { UsersApi } from './UsersApi';

export class UsersWordsApi extends UsersApi {
  protected userId: User['id'];

  public API_PATH_USERS_WORDS: string;

  constructor(
    userId: User['id'],
    getTokens?: GetTokens,
    setTokens?: SetTokens
  ) {
    super(getTokens, setTokens);
    this.userId = userId;
    this.API_PATH_USERS_WORDS = `${this.API_HOST}/users/${userId}/words`;
  }

  getAll = async () => {
    const instance = this.getAuthInstance(this.userId);

    try {
      const result = await instance.get(`${this.API_PATH_USERS_WORDS}`);
      return result.data;
    } catch (error) {
      throw this.getException(error as AxiosError);
    }
  };

  get = async (wordId: Word['id']): Promise<UserWord> => {
    const instance = this.getAuthInstance(this.userId);

    try {
      const result = await instance.get(
        `${this.API_PATH_USERS_WORDS}/${wordId}`
      );
      return result.data;
    } catch (error) {
      throw this.getException(error as AxiosError);
    }
  };

  create = async (
    wordId: Word['id'],
    payload?: UserWordPayload
  ): Promise<UserWord> => {
    const instance = this.getAuthInstance(this.userId);
    const data = {
      optional: {
        ...payload,
      },
    };

    try {
      const result = await instance.post(
        `${this.API_PATH_USERS_WORDS}/${wordId}`,
        data
      );
      return result.data;
    } catch (error) {
      throw this.getException(error as AxiosError);
    }
  };

  update = async (
    wordId: Word['id'],
    payload: UserWordPayload
  ): Promise<UserWord> => {
    const instance = this.getAuthInstance(this.userId);
    const data = {
      optional: {
        ...payload,
      },
    };

    try {
      const result = await instance.put(
        `${this.API_PATH_USERS_WORDS}/${wordId}`,
        data
      );
      return result.data;
    } catch (error) {
      throw this.getException(error as AxiosError);
    }
  };
}

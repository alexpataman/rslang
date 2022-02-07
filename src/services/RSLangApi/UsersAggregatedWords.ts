import axios, { AxiosError } from 'axios';

import {
  Tokens,
  GetTokens,
  SetTokens,
  User,
  Word,
} from '../../types/RSLangApi';
import { wordAdapter } from '../../utils/helpers/wordAdapter';
import { UsersApi } from './UsersApi';

export class UsersAggregatedWords extends UsersApi {
  protected userId: User['id'];

  constructor(
    userId: User['id'],
    getTokens?: GetTokens,
    setTokens?: SetTokens
  ) {
    super(getTokens, setTokens);
    this.userId = userId;
    this.API_PATH = `users/${userId}/aggregatedWords`;
  }

  getWords = async (group?: number, page?: number) => {
    const instance = this.getAuthInstance(this.userId);
    const filter = {
      $and: [{ page }, { group }],
    };
    const params = { wordsPerPage: 30, filter };

    try {
      const result = await instance.get(`${this.getApiUrl()}`, { params });
      return result.data[0].paginatedResults.map(wordAdapter);
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
}

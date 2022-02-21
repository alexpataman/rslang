import { AxiosError } from 'axios';

import { GetTokens, SetTokens, User, Word } from '../../types/RSLangApi';
import { WORDS_PER_PAGE } from '../../utils/constants/common.constants';
import { wordAdapter } from '../../utils/helpers/wordAdapter';
import { UsersApi } from './UsersApi';

export class UsersAggregatedWords extends UsersApi {
  protected userId: User['id'];

  public API_PATH_USERS_AGGREGATED_WORDS: string;

  constructor(
    userId: User['id'],
    getTokens?: GetTokens,
    setTokens?: SetTokens
  ) {
    super(getTokens, setTokens);
    this.userId = userId;
    this.API_PATH_USERS_AGGREGATED_WORDS = `${this.API_HOST}/users/${userId}/aggregatedWords`;
  }

  getWords = async (group?: number, page?: number, filter?: {}) => {
    const instance = this.getAuthInstance(this.userId);
    const defaultFilter = {
      $and: [{ page }, { group }],
    };

    filter = filter || defaultFilter;

    const params = { wordsPerPage: WORDS_PER_PAGE, filter };

    try {
      const result = await instance.get(
        `${this.API_PATH_USERS_AGGREGATED_WORDS}`,
        { params }
      );
      return result.data[0].paginatedResults.map(wordAdapter);
    } catch (error) {
      throw this.getException(error as AxiosError);
    }
  };

  getWord = async (wordId: Word['id']) => {
    const instance = this.getAuthInstance(this.userId);

    try {
      const result = await instance.get(
        `${this.API_PATH_USERS_AGGREGATED_WORDS}/${wordId}`
      );
      return result.data;
    } catch (error) {
      throw this.getException(error as AxiosError);
    }
  };
}

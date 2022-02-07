import axios, { AxiosError } from 'axios';

import { Word } from '../../types/RSLangApi';
import { RSLangApi } from './RSLangApi';

export class WordsApi extends RSLangApi {
  public API_PATH_WORDS = `${this.API_HOST}/words`;

  async getWords(group?: number | string, page?: number): Promise<Word[]> {
    const params = { group, page };
    const result = await axios.get(this.API_PATH_WORDS, { params });
    return result.data;
  }

  async getWord(id: Word['id']): Promise<Word | null> {
    try {
      const result = await axios.get(`${this.API_PATH_WORDS}/${id}`);
      return result.data;
    } catch (error) {
      throw this.getException(error as AxiosError);
    }
  }
}

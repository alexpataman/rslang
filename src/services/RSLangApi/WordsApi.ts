import axios from 'axios';

import { Word } from '../../types/RSLangApi';
import { RSLangApi } from './RSLangApi';

export class WordsApi extends RSLangApi {
  protected API_PATH = 'words';

  async getWords(group?: number, page?: number): Promise<Word[]> {
    const params = { group, page };
    const result = await axios.get(this.getApiUrl(), { params });
    return result.data;
  }

  async getSound(id: Word['id']): Promise<Word | null> {
    try {
      const result = await axios.get(`${this.getApiUrl()}/${id}`);
      return result.data;
    } catch {
      return null;
    }
  }



  async getWord(id: Word['id']): Promise<Word | null> {
    try {
      const result = await axios.get(`${this.getApiUrl()}/${id}`);
      return result.data;
    } catch {
      return null;
    }
  }
}

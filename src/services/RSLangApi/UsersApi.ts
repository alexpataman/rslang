import axios from 'axios';

import { User } from '../../types/RSLangApi';
import { RSLangApi } from './RSLangApi';

export class WordsApi extends RSLangApi {
  protected API_PATH = 'users';

  async createUser(
    data: Pick<User, 'name' | 'email' | 'password'>
  ): Promise<User> {
    const result = await axios.post(
      this.getApiUrl(),
      data,
      this.defaultHeaders
    );

    return result.data;
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

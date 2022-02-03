import axios from 'axios';

import { User, Authorization } from '../../types/RSLangApi';
import { RSLangApi } from './RSLangApi';

export class WordsApi extends RSLangApi {
  protected API_PATH = 'signin';

  async request(
    data: Pick<User, 'email' | 'password'>
  ): Promise<Authorization> {
    const result = await axios.post(
      this.getApiUrl(),
      data,
      this.defaultHeaders
    );

    return result.data;
  }
}

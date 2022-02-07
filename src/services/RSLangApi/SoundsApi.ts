import axios from 'axios';

import { Word } from '../../types/RSLangApi';
import { RSLangApi } from './RSLangApi';

export class SoundsApi extends RSLangApi {
  protected API_PATH = '';

  getSoundPath(src: Word['audio']): string {
    const result = `${this.getApiUrl()}${src}`;
    return result;
  }

}









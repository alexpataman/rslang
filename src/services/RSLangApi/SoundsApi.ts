import { Word } from '../../types/RSLangApi';
import { RSLangApi } from './RSLangApi';

export class SoundsApi extends RSLangApi {
  private API_PATH = this.API_HOST;

  getSoundPath(src: Word['audio']): string {
    const result = `${this.API_PATH}${src}`;
    return result;
  }
}

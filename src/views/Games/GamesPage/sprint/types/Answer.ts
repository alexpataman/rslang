import { Word } from '../../../../../types/RSLangApi';

export type Answer = {
  word: Word;
  ans: boolean;
}
export type propAnswer = {
  ansList: Answer[],
}
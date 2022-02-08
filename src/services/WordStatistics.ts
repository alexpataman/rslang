import { GAME_ID } from '../types/common';
import { Word } from '../types/RSLangApi';

export const WordStatistics = {
  process(wordId: Word['id'], isCorrectAnswer: boolean, gameId: GAME_ID) {
    console.log('collected', { wordId, isCorrectAnswer, gameId });
  },
};

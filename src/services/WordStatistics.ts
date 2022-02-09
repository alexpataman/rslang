import { GAME_ID } from '../types/common';
import { Word } from '../types/RSLangApi';
import {
  difficultWordKnownThreshold,
  regularWordKnownThreshold,
} from '../utils/constants/common.constants';
import { NotFoundError } from '../utils/errors/NotFoundError';
import { UsersStatisticsApi } from './RSLangApi/UsersStatisticsApi';
import { UsersWordsApi } from './RSLangApi/UsersWordsApi';
import { User } from './User';

export const WordStatistics = {
  async process(wordId: Word['id'], isCorrectAnswer: boolean, gameId: GAME_ID) {
    await this.processWord(wordId, isCorrectAnswer);

    const userStatistics = new UsersStatisticsApi(
      User.getId(),
      User.getTokens,
      User.setTokens
    );
  },
  async processWord(wordId: Word['id'], isCorrectAnswer: boolean) {
    const usersWords = new UsersWordsApi(
      User.getId(),
      User.getTokens,
      User.setTokens
    );

    const word = await (async () => {
      try {
        return await usersWords.get(wordId);
      } catch (error) {
        if (error instanceof NotFoundError) {
          return usersWords.create(wordId);
        }
      }
      return null;
    })();

    if (word) {
      const { optional } = word;
      let counter = optional?.progress?.counter || 0;
      let totalMistakes = optional?.progress?.totalMistakes || 0;
      let totalCorrect = optional?.progress?.totalCorrect || 0;

      let isKnown = optional?.isKnown || false;
      let isDifficult = optional?.isDifficult || false;

      if (!isCorrectAnswer) {
        counter = 0;
        isKnown = false;
        totalMistakes += 1;
      } else {
        counter += 1;
        totalCorrect += 1;
        if (
          (!isDifficult && counter === regularWordKnownThreshold) ||
          (isDifficult && counter === difficultWordKnownThreshold)
        ) {
          isKnown = true;
          isDifficult = false;
        }
      }

      const lastChange = new Date().toISOString();
      const payload = {
        isKnown,
        isDifficult,
        progress: {
          counter,
          lastChange,
          totalMistakes,
          totalCorrect,
        },
      };
      usersWords.update(wordId, payload);
    }
  },
};

// const result = await userStatistics.get();

// const handleClick2 = async (type: GAME_ID, result: boolean) => {
//   const payload = {
//     test: Math.random(),
//   };
//   const result = await userStatistics.set(payload);
//   console.log('correct', result);
// };

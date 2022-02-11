import { GAME_ID } from '../types/common';
import { IUserStatistics, UserWord, Word } from '../types/RSLangApi';
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
    if (User.isGuest()) {
      return;
    }

    const usersWords = new UsersWordsApi(
      User.getId(),
      User.getTokens,
      User.setTokens
    );

    const { isNew, word } = await (async () => {
      try {
        const word = await usersWords.get(wordId);
        return { isNew: false, word };
      } catch (error) {
        if (error instanceof NotFoundError) {
          const word = await usersWords.create(wordId);
          return { isNew: true, word };
        }
      }
      return {};
    })();

    if (word) {
      const wordUpdated = await this.processWord(word, isCorrectAnswer);
      await this.processGeneral(
        word,
        wordUpdated,
        isCorrectAnswer,
        !!isNew,
        gameId
      );
    }
  },
  async processGeneral(
    word: UserWord,
    wordUpdated: UserWord,
    isCorrectAnswer: boolean,
    isNew: boolean,
    gameId: GAME_ID
  ) {
    const userStatistics = new UsersStatisticsApi(
      User.getId(),
      User.getTokens,
      User.setTokens
    );
    const statistics = await userStatistics.get();
    const currentDate = new Date().toISOString().slice(0, 10);
    const isNewKnown = !!(
      wordUpdated.optional.isKnown &&
      word.optional.isKnown !== wordUpdated.optional.isKnown
    );

    const gameStatistics = prepareGameStatistics(
      statistics,
      gameId,
      currentDate,
      isNew,
      isCorrectAnswer
    );

    const wordsStatistics = prepareWordsStatistics(
      statistics,
      currentDate,
      isNewKnown,
      isNew,
      isCorrectAnswer
    );

    const payload = {
      daily: {
        ...statistics?.optional?.daily,
        [currentDate]: {
          games: {
            ...statistics?.optional?.daily?.[currentDate]?.games,
            ...gameStatistics,
          },
          words: wordsStatistics,
        },
      },
    };
    return userStatistics.set(payload);
  },
  async processWord(word: UserWord, isCorrectAnswer: boolean) {
    const usersWords = new UsersWordsApi(
      User.getId(),
      User.getTokens,
      User.setTokens
    );
    const { wordId, optional } = word;
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
    return usersWords.update(wordId, payload);
  },
};

const prepareGameStatistics = (
  statistics: IUserStatistics,
  gameId: GAME_ID,
  currentDate: string,
  isNew: boolean,
  isCorrectAnswer: boolean
) => {
  let {
    totalNewWords = 0,
    totalMistakes = 0,
    totalCorrect = 0,
    currentSequence = 0,
    maxSequence = 0,
  } = statistics?.optional.daily?.[currentDate]?.games?.[gameId] || {};

  if (isNew) {
    totalNewWords += 1;
  }
  if (isCorrectAnswer) {
    totalCorrect += 1;
    currentSequence += 1;
  } else {
    totalMistakes += 1;
    currentSequence = 0;
  }
  maxSequence = Math.max(maxSequence, currentSequence);
  const correctAnswersRatio = totalCorrect / (totalCorrect + totalMistakes);

  return {
    [gameId]: {
      totalNewWords,
      totalMistakes,
      totalCorrect,
      currentSequence,
      maxSequence,
      correctAnswersRatio,
    },
  };
};

const prepareWordsStatistics = (
  statistics: IUserStatistics,
  currentDate: string,
  isNewCompleted: boolean,
  isNew: boolean,
  isCorrectAnswer: boolean
) => {
  let {
    totalNewWords = 0,
    totalMistakes = 0,
    totalCompleted = 0,
    totalCorrect = 0,
  } = statistics?.optional.daily?.[currentDate]?.words || {};

  if (isNew) {
    totalNewWords += 1;
  }

  if (isNewCompleted) {
    totalCompleted += 1;
  }

  if (isCorrectAnswer) {
    totalCorrect += 1;
  } else {
    totalMistakes += 1;
  }

  const correctAnswersRatio = totalCorrect / (totalCorrect + totalMistakes);

  return {
    totalCompleted,
    totalNewWords,
    totalMistakes,
    totalCorrect,
    correctAnswersRatio,
  };
};

import { GAME_ID } from './common';

export type UserWordPayload = {
  isDifficult?: boolean;
  isKnown?: boolean;
  progress?: {
    counter: number;
    lastChange: string;
    totalMistakes: number;
    totalCorrect: number;
  };
};

export type UserWord = {
  wordId: Word['id'];
  optional: UserWordPayload;
};

export type Word = {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  userWord?: UserWord;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
};

export type UserInfo = Omit<User, 'password'>;

export type Authorization = {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
};

type Error = {
  message: string;
  path: string[];
};

export type ErrorData = {
  error: {
    errors: Error[];
    status: string;
  };
};

export type Tokens = {
  token: string;
  refreshToken: string;
};

export type GetTokens = () => Tokens;
export type SetTokens = (tokens: Tokens) => void;

export interface IWordsStatistics {
  totalNewWords: number;
  totalCompleted: number;
  totalMistakes: number;
  totalCorrect: number;
  correctAnswersRatio: number;
}
export interface IGameStatistics {
  totalNewWords: number;
  totalMistakes: number;
  totalCorrect: number;
  correctAnswersRatio: number;
  maxSequence: number;
  currentSequence: number;
}
export interface IUserStatistics {
  optional: {
    daily: {
      [key: string]: {
        games: {
          [key in GAME_ID]: IGameStatistics;
        };
        words: IWordsStatistics;
      };
    };
  };
}

export type UserWord = {
  optional: {
    isDifficult: boolean;
    isKnown: boolean;
  };
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

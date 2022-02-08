import { MouseEvent } from 'react';

export enum SORT_ORDER {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface IAuthForm {
  toggleView: (event: MouseEvent) => void;
}

export type ValidationErrors = {
  [key: string]: string;
};

export enum GAME_ID {
  AUDIO = 'audio',
  SPRINT = 'sprint',
}

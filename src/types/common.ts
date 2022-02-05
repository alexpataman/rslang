export enum SORT_ORDER {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface IAuthForm {
  toggleView: () => void;
}

export type ValidationErrors = {
  [key: string]: string;
};

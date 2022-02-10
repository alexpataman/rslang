import { Word } from "./RSLangApi";

type round = {
  isAnswered: boolean,
  roundNum: number,
  audio: HTMLAudioElement,
  next: HTMLAudioElement | null,
  choices: Array<string> | []
};

interface ILevelBtnProps {
  id: string,
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

interface IAudioBtnProps {
  id: string | undefined,
  className: string,
  dataSrc: string | undefined,
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  text: string | undefined
}

interface IAudioGameProps {
  result: string[]
  words: Word[] | undefined,
  handleAudioClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

interface IGameProps extends IAudioGameProps {
  roundState: round | undefined,
  handleChoiceBtnClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  handleNextRoundBtnClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

interface IWordCardProps {
  words: Word[] | undefined,
  roundState: round | undefined,
  handleAudioClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

interface IResultProps extends IAudioGameProps {}

interface IResultBlockProps extends IAudioGameProps {
  text: string,
  condition: string
}

export type {
  round,
  ILevelBtnProps,
  IAudioBtnProps,
  IGameProps,
  IWordCardProps,
  IResultProps,
  IResultBlockProps
};

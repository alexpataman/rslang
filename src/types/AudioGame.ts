type round = {
  isAnswered: boolean,
  wordInd: number,
  audio: HTMLAudioElement,
  next: HTMLAudioElement | null,
  choices: Array<string> | []
};

export type {
  round
};

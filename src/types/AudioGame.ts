type round = {
  isAnswered: boolean,
  roundNum: number,
  audio: HTMLAudioElement,
  next: HTMLAudioElement | null,
  choices: Array<string> | []
};

export type {
  round
};

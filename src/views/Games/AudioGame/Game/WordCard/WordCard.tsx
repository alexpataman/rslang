import './WordCard.scss';

import { IWordCardProps } from '../../../../../types/AudioGame';
import { Word } from '../../../../../types/RSLangApi';
import { AudioButton } from '../../AudioButton/AudioButton';

export const WordCard = (props: IWordCardProps) => {
  const { roundState, words, handleAudioClick } = props;
  const word = (words as Word[])[roundState?.roundNum as number];

  return (
    <div className="word-card">
      <img
        src={`https://rslang-project.herokuapp.com/${word.image}`}
        alt="correct answer"
      />
      <p>
        {word.word} <span>{word.transcription}</span>
      </p>
      <p>
        {word.wordTranslate}
      </p>
      <AudioButton
        id={undefined}
        className="audio-btn"
        dataSrc={word.audioExample}
        onClick={handleAudioClick}
        text={undefined}
      />
      <p>{word.textExample}</p>
      <p>{word.textExampleTranslate}</p>
    </div>
  );
};

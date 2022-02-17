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
        className="word-card__img"
        src={`https://rslang-project.herokuapp.com/${word.image}`}
        alt="correct answer"
      />
      <div className="word-card__description">
        <div className="word-card__flex">
          <p className="word-card__text">
            <i>{word.word}</i> <span>{word.transcription}</span>
          </p>
          <p className="word-card__text">{word.wordTranslate}</p>
        </div>
        <div className="word-card__flex">
          <AudioButton
            id={undefined}
            className="audio-btn"
            dataSrc={word.audioExample}
            onClick={handleAudioClick}
          />
          <p className="word-card__text">{word.textExample.toString()}</p>
        </div>
        <p className="word-card__text">{word.textExampleTranslate}</p>
      </div>
    </div>
  );
};

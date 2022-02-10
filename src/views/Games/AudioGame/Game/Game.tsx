import './Game.scss';

import { IGameProps } from '../../../../types/AudioGame';
import { AudioButton } from '../AudioButton/AudioButton';
import { WordCard } from './WordCard/WordCard';

export const Game = (props: IGameProps) => {
  const {
    roundState,
    result,
    words,
    handleAudioClick,
    handleChoiceBtnClick,
    handleNextRoundBtnClick,
  } = props;

  return (
    <div className="game">
      <ul className="game__progress">
        {result.map((item, ind) => (
          <li key={ind} className={item}></li>
        ))}
      </ul>
      <AudioButton
        id="wordAudio"
        className="game__audio-btn"
        dataSrc={undefined}
        onClick={handleAudioClick}
        text="Повторить"
      />
      {roundState?.isAnswered && words && (
        <WordCard
          roundState={roundState}
          words={words}
          handleAudioClick={handleAudioClick}
        />
      )}
      <div className="game__choices">
        {roundState?.choices.map((choice, ind) => (
          <button
            className="choice"
            key={ind}
            data-choice={choice}
            onClick={handleChoiceBtnClick}
          >
            {choice}
          </button>
        ))}
      </div>
      <button
        onClick={
          roundState?.isAnswered
            ? handleNextRoundBtnClick
            : handleChoiceBtnClick
        }
      >
        {roundState?.isAnswered ? '->' : 'не знаю'}
      </button>
    </div>
  );
};

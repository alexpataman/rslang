import './Game.scss';

import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  useEffect(() => {
    // const onKeyPress = (e: Event) => console.log(e);

    const onKeyPress = (e: KeyboardEvent) => {
      if (parseInt(e.key, 10) >= 1 && parseInt(e.key, 10) <= 5) {
        const btn = document.getElementById(e.key);
        btn?.click();
      }

      if (e.key === 'Enter') {
        const btn = document.getElementById('next');
        btn?.click();
      }

      if (e.key === 'q') {
        const btn = document.getElementById('unknown');
        btn?.click();
      }

      if (e.key === 'r') {
        const btn = document.getElementById('wordAudio');
        btn?.click();
      }
    };

    document.addEventListener('keypress', onKeyPress);

    return () => {
      document.removeEventListener('keypress', onKeyPress);
    };
  }, []);

  return (
    <>
      <button
        className="return-btn"
        type="button"
        onClick={() => navigate('/games')}
      >
        {'<-'}
      </button>
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
              id={String(ind + 1)}
              className="choice"
              key={ind}
              data-choice={choice}
              onClick={handleChoiceBtnClick}
            >
              <span className="game__choice-num">{ind + 1}</span> {choice}
            </button>
          ))}
        </div>
        <button
          id={roundState?.isAnswered ? 'next' : 'unknown'}
          onClick={
            roundState?.isAnswered
              ? handleNextRoundBtnClick
              : handleChoiceBtnClick
          }
        >
          {roundState?.isAnswered ? '->' : 'не знаю'}
        </button>
      </div>
    </>
  );
};

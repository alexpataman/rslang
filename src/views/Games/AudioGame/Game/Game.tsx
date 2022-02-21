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
    const onKeyPress = (e: KeyboardEvent) => {
      e.preventDefault();

      if (parseInt(e.key, 10) >= 1 && parseInt(e.key, 10) <= 5) {
        const btn = document.getElementById(e.key);
        btn?.click();
        btn?.blur();
      }

      if (e.key === 'Enter') {
        [1, 2, 3, 4, 5].forEach((key) => {
          const choice = document.getElementById(key.toString());
          choice?.blur();
        });
        const btn = document.getElementById('next');
        setTimeout(() => {
          btn?.click();
          btn?.blur();
        }, 0);
      }

      if (e.key === 'q' || e.key === 'й') {
        const btn = document.getElementById('unknown');
        btn?.click();
        btn?.blur();
      }

      if (e.key === 'r' || e.key === 'к') {
        const btn = document.getElementById('wordAudio');
        btn?.click();
        btn?.blur();
      }
    };

    document.addEventListener('keypress', onKeyPress);

    return () => {
      document.removeEventListener('keypress', onKeyPress);
    };
  }, []);

  return (
    <div className="game">
      <button
        className="return-btn"
        type="button"
        onClick={() => navigate('/games')}
      >
        &#8592;
      </button>
      <ul className="game__progress">
        {result.map((item, ind) => (
          <li key={ind} className={item}></li>
        ))}
      </ul>
      <div className="game__flex">
        <AudioButton
          id="wordAudio"
          className="game__audio-btn"
          dataSrc={undefined}
          onClick={handleAudioClick}
        />
        {roundState?.isAnswered && words && (
          <WordCard
            roundState={roundState}
            words={words}
            handleAudioClick={handleAudioClick}
          />
        )}
      </div>
      <div className="game__choices">
        {roundState?.choices.map((choice, ind) => (
          <button
            id={String(ind + 1)}
            className="choice"
            key={ind}
            data-choice={choice}
            onClick={handleChoiceBtnClick}
          >
            <span className="choice-num">{ind + 1}</span>
            {choice}
          </button>
        ))}
      </div>
      <button
        id={roundState?.isAnswered ? 'next' : 'unknown'}
        className="unknown-choice"
        onClick={
          roundState?.isAnswered
            ? handleNextRoundBtnClick
            : handleChoiceBtnClick
        }
      >
        {roundState?.isAnswered ? '→' : 'не знаю'}
      </button>
    </div>
  );
};

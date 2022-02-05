import "./AudioGame.scss";

import React, { useMemo, useEffect, useState } from 'react';

import { WordsApi } from '../../../services/RSLangApi/WordsApi';
import { Word } from '../../../types/RSLangApi';

export const AudioGame = () => {
  const [gameStatus, setGameStatus] = useState<boolean>(false);
  const [result, setResult] = useState<Array<string>>(new Array(20).fill(''));
  const [words, setWords] = useState<Word[]>();
  const wordsApi = useMemo(() => new WordsApi(), []);

  const MIN_PAGE = 0;
  const MAX_PAGE = 29;

  const handleLevelBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const group = parseInt(e.currentTarget.id, 10);
    const page = Math.floor(Math.random() * (MAX_PAGE - MIN_PAGE + 1) + MIN_PAGE);

    (async () => {
      const wordsArray = await wordsApi.getWords(group, page);
      setWords(wordsArray);
      setGameStatus(true);
    })();
  }

  if (gameStatus) {
    return (
      <div className="audio-game">
        <div className="game">
          <ul className="game__progress">
            {result.map((item, ind) => <li key={ind} className={item}></li>)}
          </ul>

        </div>
      </div>
    );
  }

  return (
    <div className="audio-game">
      <div className="start-page">
        <h2 className="start-page__title">Аудиовызов</h2>
        <p className="start-page__subtitle">Ваша задача - прослушать аудио и выбрать соответствующее ему слово</p>
        <p className="start-page__subtitle">Выберите уровень сложности</p>
        <div className="start-page__btn-cont">
          <button id="0" className="start-page__lvl-btn" onClick={handleLevelBtnClick}>1</button>
          <button id="1" className="start-page__lvl-btn" onClick={handleLevelBtnClick}>2</button>
          <button id="2" className="start-page__lvl-btn" onClick={handleLevelBtnClick}>3</button>
          <button id="3" className="start-page__lvl-btn" onClick={handleLevelBtnClick}>4</button>
          <button id="4" className="start-page__lvl-btn" onClick={handleLevelBtnClick}>5</button>
          <button id="5" className="start-page__lvl-btn" onClick={handleLevelBtnClick}>6</button>
        </div>
      </div>
    </div>
  );
};

import "./AudioGame.scss";

import React, { useMemo, useEffect, useState } from 'react';

import { WordsApi } from '../../../services/RSLangApi/WordsApi';
import { round } from '../../../types/AudioGame';
import { Word } from '../../../types/RSLangApi';
import {
  MIN_PAGE,
  MAX_PAGE,
  MIN_WORD_IND,
  MAX_WORD_IND
} from '../../../utils/constants/AudioGame.constants';
import { getRandomNum } from "../../../utils/helpers/randomNum";

export const AudioGame = () => {
  const [gameStatus, setGameStatus] = useState<boolean>(false);
  const [roundState, setRoundState] = useState<round>();
  const [result, setResult] = useState<Array<string>>(new Array(20).fill(''));
  const [words, setWords] = useState<Word[]>();
  const wordsApi = useMemo(() => new WordsApi(), []);

  const handleAudioClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    roundState?.audio.play();
  }

  const getChoicesArray = (correctId: number): Array<number> => {
    let array = new Array(5).fill(1);
    array = array.map((index) => getRandomNum(MIN_WORD_IND, MAX_WORD_IND));
    const randomInd = getRandomNum(0, 4);
    array[randomInd] = correctId;
    return array;
  }
  
  const assignRoundState = (wordsArray: Word[]) => {
    const firstWord = wordsArray[0];
    const firstAudio = new Audio(`https://rslang-project.herokuapp.com/${firstWord.audio}`);
    const nextWord = wordsArray[1];
    const nextAudio = new Audio(`https://rslang-project.herokuapp.com/${nextWord.audio}`);

    const arr = getChoicesArray(0);
    const choicesArr = arr.map((index) => wordsArray[index].wordTranslate);

    setRoundState({
      isAnswered: false,
      roundNum: 0,
      audio: firstAudio,
      next: nextAudio,
      choices: choicesArr
    });
  }

  const handleLevelBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const group = parseInt(e.currentTarget.id, 10);
    const page = getRandomNum(MIN_PAGE, MAX_PAGE);

    (async () => {
      const wordsArray = await wordsApi.getWords(group, page);
      setWords(wordsArray);
      setGameStatus(true);
      assignRoundState(wordsArray);
    })();
  }

  const handleChoiceBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (roundState?.isAnswered) return;

    const btn = e.target as HTMLButtonElement;
    const correctWord = words !== undefined && words[roundState?.roundNum as number].wordTranslate;
    const { choice } = btn.dataset;
    const updResult = result.slice();
    if (choice === correctWord) {
      updResult[roundState?.roundNum as number] = 'correct';
      // btn.className = 'correct';
    } else if (!choice) {
      updResult[roundState?.roundNum as number] = 'unknown';
    } else {
      updResult[roundState?.roundNum as number] = 'wrong';
      // btn.className = 'wrong';
    }
    setResult(updResult);
    
    const newRoundState = { ...(roundState as round) };
    newRoundState.isAnswered = true;
    setRoundState(newRoundState);
  }

  const handleNextRoundBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const wordsArray = words?.slice() as Word[];
    const round = (roundState?.roundNum as number) + 1;

    if (round > 19) {
      console.log('end');
      return;
    }

    const currAudio = roundState?.next as HTMLAudioElement;
    let nextAudio = null;
    if (round < MAX_WORD_IND) {
      const nextWord = wordsArray[round + 1];
      nextAudio = new Audio(`https://rslang-project.herokuapp.com/${nextWord.audio}`);
    }

    const arr = getChoicesArray(round);
    const choicesArr = arr.map((index) => wordsArray[index].wordTranslate);

    const nextRoundState = { 
      isAnswered: false,
      roundNum: round,
      audio: currAudio,
      next: nextAudio,
      choices: choicesArr
     };
    setRoundState(nextRoundState);
  }

  if (gameStatus) {
    return (
      <div className="audio-game">
        <div className="game">
          <ul className="game__progress">
            {result.map((item, ind) => <li key={ind} className={item}></li>)}
          </ul>
          <button id="wordAudio" className="game__audio-btn" onClick={handleAudioClick}>
            Повторить
          </button>
          {roundState?.isAnswered && words &&
            <div className="word-card">
              <img src={`https://rslang-project.herokuapp.com/${words[roundState.roundNum].image}`} alt="photo: correct answer" />
              <p>{words[roundState.roundNum].word} <span>{words[roundState.roundNum].transcription}</span></p>
              <p>{words[roundState.roundNum].textExample}</p>
              <p>{words[roundState.roundNum].textExampleTranslate}</p>
            </div>
          }
          <div className="game__choices">
            {roundState?.choices.map((choice, ind) => <button key={ind} data-choice={choice} onClick={handleChoiceBtnClick}>{choice}</button>)}
          </div>
          <button onClick={roundState?.isAnswered ? handleNextRoundBtnClick : handleChoiceBtnClick}>
            {roundState?.isAnswered ? '->' : 'не знаю'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="audio-game">
      <div className="start-page">
        <h2 className="start-page__title">Аудиовызов</h2>
        <p className="start-page__subtitle">Ваша задача - прослушать аудио и выбрать соответствующий ему перевод</p>
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

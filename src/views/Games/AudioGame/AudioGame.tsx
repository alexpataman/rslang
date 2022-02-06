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
    const choicesArr = arr.map((index) => wordsArray[index].word);

    setRoundState({
      isAnswered: false,
      wordInd: 0,
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

    const btn = e.target as HTMLButtonElement;
    const correctWord = words !== undefined && roundState?.wordInd !== undefined && words[roundState.wordInd].word;
    const { choice } = btn.dataset;
    if (choice === correctWord) {
      console.log('correct', correctWord, choice);
    } else {
      console.log('wrong', correctWord, choice);
    }
    
    const newRoundState = { ...(roundState as round) };
    newRoundState.isAnswered = true;
    setRoundState(newRoundState);
  }

  const handleNextRoundBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    console.log('next round click');
  }

  if (gameStatus) {
    return (
      <div className="audio-game">
        <div className="game">
          <ul className="game__progress">
            {result.map((item, ind) => <li key={ind} className={item}></li>)}
          </ul>
          <button className="game__audio-btn" onClick={handleAudioClick}>
            Повторить
          </button>
          {roundState?.isAnswered && words &&
            <div className="word-card">
              <img src={`https://rslang-project.herokuapp.com/${words[roundState.wordInd].image}`} alt="photo: correct answer" />
              <p>{words[roundState.wordInd].word} <span>{words[roundState.wordInd].transcription}</span></p>
              <p>{words[roundState.wordInd].textExample}</p>
              <p>{words[roundState.wordInd].textExampleTranslate}</p>
            </div>
          }
          <div className="game__choices">
            {roundState?.choices.map((choice, ind) => <button key={ind} data-choice={choice} onClick={handleChoiceBtnClick}>{choice}</button>)}
          </div>
          <button className="game__choice-btn" onClick={roundState?.isAnswered ? handleNextRoundBtnClick : handleChoiceBtnClick}>
            {roundState?.isAnswered ? '->' : 'Не знаю'}
          </button>
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

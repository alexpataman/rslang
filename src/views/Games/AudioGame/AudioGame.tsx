import './AudioGame.scss';

import React, { useMemo, useState, useEffect } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';

import { WordsApi } from '../../../services/RSLangApi/WordsApi';
import { WordStatistics } from '../../../services/WordStatistics';
import { round } from '../../../types/AudioGame';
import { GAME_ID } from '../../../types/common';
import { Word } from '../../../types/RSLangApi';
import {
  MIN_WORD_IND,
  MAX_WORD_IND,
  API_PATH,
} from '../../../utils/constants/AudioGame.constants';
import { getRandomNum } from '../../../utils/helpers/randomNum';
import { Game } from './Game/Game';
import { Result } from './Result/Result';

export const AudioGame = () => {
  const categoryId = Number(useParams()?.categoryId) || 0;
  const page = Number(useParams()?.page) || 0;
  const [isLoading, setLoading] = useState<boolean>(true);
  const [gameStatus, setGameStatus] = useState<boolean>(true);
  const [roundState, setRoundState] = useState<round>();
  const [words, setWords] = useState<Word[]>();
  const wordsApi = useMemo(() => new WordsApi(), []);
  const [result, setResult] = useState<Array<string>>(new Array(20).fill(''));

  const assignRoundState = (wordsArray: Word[]) => {
    const firstWord = wordsArray[0];
    const firstAudio = new Audio(`${API_PATH}${firstWord.audio}`);
    const nextWord = wordsArray[1];
    const nextAudio = new Audio(`${API_PATH}${nextWord.audio}`);

    const arr = getChoicesArray(0);
    const choicesArr = arr.map((index) => wordsArray[index].wordTranslate);

    setRoundState({
      isAnswered: false,
      roundNum: 0,
      audio: firstAudio,
      next: nextAudio,
      choices: choicesArr,
    });

    firstAudio.play();
  };
  
  useEffect(() => {
    (async () => {
      const wordsArray = await wordsApi.getWords(categoryId, page);
      setWords(wordsArray);
      assignRoundState(wordsArray);
      setLoading(false);
    })();
  }, [wordsApi]);

  const handleAudioClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const btn = e.target as HTMLButtonElement;
    if (btn.id === 'wordAudio') {
      roundState?.audio.play();
      return;
    }
    const { src } = btn.dataset;
    const audio = new Audio(`${API_PATH}${src}`);
    audio?.play();
  };

  const removeArrayDubplicates = (array: Array<number>): Array<number> => {
    const arr = array.slice();
    arr.forEach((item, ind) => {
      if (ind === arr.length - 1) {
        return;
      }

      while (arr.indexOf(item, ind + 1) > -1) {
        item = getRandomNum(MIN_WORD_IND, MAX_WORD_IND);
      }
      arr[ind] = item;
    });
    return arr;
  }

  const getChoicesArray = (correctId: number): Array<number> => {
    let array = new Array(5).fill(99);
    array = array.map((index) => {
      let num;
      do {
        num = getRandomNum(MIN_WORD_IND, MAX_WORD_IND);
      } while (num === correctId);
      return num;
    });
    const randomInd = getRandomNum(0, 4);
    array[randomInd] = correctId;
    array = removeArrayDubplicates(array);
    return array;
  };

  const getRoundResult = (btn: HTMLButtonElement) => {
    // TODO: обернуть вызов process в проверку авторизации
    const correctWord =
      words !== undefined && words[roundState?.roundNum as number];
    const correctTranslation = (correctWord as Word).wordTranslate;
    const correctWordId = (correctWord as Word).id;
    const { choice } = btn.dataset;
    const updResult = result.slice();
    if (choice === correctTranslation) {
      updResult[roundState?.roundNum as number] = 'correct';
      btn.classList.add('correct');
      WordStatistics.process(correctWordId, true, GAME_ID.AUDIO);
    } else if (!choice) {
      updResult[roundState?.roundNum as number] = 'unknown';
      WordStatistics.process(correctWordId, false, GAME_ID.AUDIO);
    } else {
      updResult[roundState?.roundNum as number] = 'wrong';
      WordStatistics.process(correctWordId, false, GAME_ID.AUDIO);
      btn.classList.add('wrong');
    }
    return updResult;
  };

  const handleChoiceBtnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (roundState?.isAnswered) return;

    const btn = e.target as HTMLButtonElement;
    const updResult = getRoundResult(btn);

    setResult(updResult);

    const newRoundState = { ...(roundState as round) };
    newRoundState.isAnswered = true;
    setRoundState(newRoundState);
  };

  const toggleChoiceBtn = () => {
    const choiceBtns = document.querySelectorAll('.choice');
    choiceBtns.forEach((item) => {
      if (item.classList.contains('correct')) {
        item.classList.remove('correct');
      }
      if (item.classList.contains('wrong')) {
        item.classList.remove('wrong');
      }
    });
  };

  const handleNextRoundBtnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    toggleChoiceBtn();

    const round = (roundState?.roundNum as number) + 1;

    if (round > 19) {
      setGameStatus(false);
      return;
    }

    const wordsArray = words?.slice() as Word[];
    const currAudio = roundState?.next as HTMLAudioElement;
    let nextAudio = null;
    if (round < MAX_WORD_IND) {
      const nextWord = wordsArray[round + 1];
      nextAudio = new Audio(`${API_PATH}${nextWord.audio}`);
    }

    const arr = getChoicesArray(round);
    const choicesArr = arr.map((index) => wordsArray[index].wordTranslate);

    const nextRoundState = {
      isAnswered: false,
      roundNum: round,
      audio: currAudio,
      next: nextAudio,
      choices: choicesArr,
    };
    setRoundState(nextRoundState);
    if (roundState?.next) {
      roundState?.next.play();
    }
  };

  if (isLoading) {
    return (
      <div className="loading">
        <CircularProgress />
      </div>
    );
  }

  if (!gameStatus) {
    return (
      <div className="audio-game">
        <Result
          result={result}
          words={words}
          handleAudioClick={handleAudioClick}
        />
      </div>
    );
  }

  return (
    <div className="audio-game">
      <Game
        roundState={roundState}
        result={result}
        words={words}
        handleAudioClick={handleAudioClick}
        handleChoiceBtnClick={handleChoiceBtnClick}
        handleNextRoundBtnClick={handleNextRoundBtnClick}
      />
    </div>
  );
};

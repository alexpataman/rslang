import './AudioGame.scss';

import React, { useMemo, useState, useEffect } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';

import { UsersWordsApi } from '../../../services/RSLangApi/UsersWordsApi';
import { WordsApi } from '../../../services/RSLangApi/WordsApi';
import { User } from '../../../services/User';
import { WordStatistics } from '../../../services/WordStatistics';
import { round } from '../../../types/AudioGame';
import { GAME_ID } from '../../../types/common';
import { Word } from '../../../types/RSLangApi';
import {
  MIN_WORD_IND,
  MAX_WORD_IND,
  MIN_PAGE,
  MAX_PAGE,
  API_PATH,
} from '../../../utils/constants/AudioGame.constants';
import { WORDS_PER_PAGE } from '../../../utils/constants/common.constants';
import { getRandomNum } from '../../../utils/helpers/randomNum';
import { Game } from './Game/Game';
import { Result } from './Result/Result';

export const AudioGame = () => {
  const categoryId = Number(useParams()?.categoryId);
  const page = Number(useParams()?.page);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [gameStatus, setGameStatus] = useState<boolean>(true);
  const [roundState, setRoundState] = useState<round>();
  const [words, setWords] = useState<Word[]>([]);
  const wordsApi = useMemo(() => new WordsApi(), []);
  const [result, setResult] = useState<Array<string>>([]);
  const templateWords = [
    // заглушка на варианты, где меньше 5-ти слов в игре
    '',
    'дуга',
    'ядро',
    'провинция',
    'громкость',
    'комбинировать',
    'привлекательный',
    'великий',
    'вызывать',
    'состояние',
    'колонка',
    'вина',
    'знакомый',
    'пруд',
    'рука',
    'поведение',
    'кабель',
    'широкий',
    'корень',
    'сравнивать',
  ];

  const assignRoundState = (wordsArray: Word[]) => {
    const firstWord = wordsArray[0];
    const firstAudio = new Audio(`${API_PATH}${firstWord.audio}`);
    let nextAudio = null;
    if (wordsArray.length > 1) {
      const { audio } = wordsArray[1];
      nextAudio = new Audio(`${API_PATH}${audio}`);
    }

    const arr = getChoicesArray(0);
    const choicesArr = arr.map((index) => {
      if (index > wordsArray.length - 1) {
        return templateWords[index];
      }
      return wordsArray[index].wordTranslate;
    });

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
      let words: Word[] = [];
      if (isNaN(page)) {
        // anyone from menu
        const pageNum = getRandomNum(MIN_PAGE, MAX_PAGE);
        words = await wordsApi.getWords(categoryId, pageNum);
      } else if (User.isGuest()) {
        // guest from textbook
        words = await wordsApi.getWords(categoryId, page);
      } else {
        // user from textbook
        const userWords = new UsersWordsApi(
          User.getId(),
          User.getTokens,
          User.setTokens
        );
        let currPage = page;
        while (currPage >= 0 && words.length < WORDS_PER_PAGE) {
          // eslint-disable-next-line no-await-in-loop
          const currWord = await wordsApi.getWords(categoryId, currPage);
          for (const item of currWord) {
            try {
              // eslint-disable-next-line no-await-in-loop
              const uWord = await userWords.get(item.id);
              if (!uWord.optional.isKnown) {
                words.push(item);
              }
            } catch (err) {
              words.push(item);
            }
            if (words.length === WORDS_PER_PAGE) {
              break;
            }
          }
          currPage -= 1;
        }
      }

      setWords(words);
      setResult(new Array(words.length).fill(''));
      assignRoundState(words);
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
  };

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

  const isRoundTheLast = (): boolean => {
    const lastInd = result.length - 1;
    return result[lastInd] !== '';
  };

  const handleNextRoundBtnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    toggleChoiceBtn();

    if (isRoundTheLast()) {
      setGameStatus(false);
      return;
    }

    const round = (roundState?.roundNum as number) + 1;
    const wordsArray = words?.slice() as Word[];
    const currAudio = roundState?.next as HTMLAudioElement;
    let nextAudio = null;
    if (round < words.length - 1) {
      const { audio } = wordsArray[round + 1];
      nextAudio = new Audio(`${API_PATH}${audio}`);
    }

    const arr = getChoicesArray(round);
    const choicesArr = arr.map((index) => {
      if (index > wordsArray.length - 1) {
        return templateWords[index];
      }
      return wordsArray[index].wordTranslate;
    });

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
      <Result
        result={result}
        words={words}
        handleAudioClick={handleAudioClick}
      />
    );
  }

  return (
    <div className="container">
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

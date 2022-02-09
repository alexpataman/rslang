import { useEffect, useMemo, useState } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';

import { WordsApi } from '../../../../services/RSLangApi/WordsApi';
import { Word } from '../../../../types/RSLangApi';
import { Result } from './result/result';
import { Answer } from './types/Answer';
import { WordCard } from './word-card/word-card';

import './app-sprint.css';

export const AppSprint = () => {
  const categoryId = Number(useParams()?.categoryId) || 0;
  const page = Number(useParams()?.page) || 0;

  const [words, setWords] = useState<Word[]>([]);
  const wordsApi = useMemo(() => new WordsApi(), []);
  const [ans, setAns] = useState<Answer[]>([]);
  const [cur, setcur] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    if (cur >= words.length) {
      stopGame();
    }
  });

  function see(a: Word, b: boolean, score: number) {
    if (cur < words.length) {
      const aa: Answer = { ans: b, word: a };
      const newarr: Answer[] = [...ans, aa];
      setAns(newarr);
      setcur(cur + 1);
      setScore(score);
    }
  }
  function getRandom(): Word {
    return words[Math.floor(Math.random() * words.length)];
  }
  function startGame() {
    setGameStatus(true);
  }

  function stopGame() {

    setGameStatus(false);
  }

  useEffect(() => {
    (async () => {
      console.log(categoryId, page);
      let words = [];
             words = await wordsApi.getWords(categoryId, page);
        setWords(words);
      setcur(0);
      startGame();
    })();
  }, [wordsApi]);

  if (words.length !== 0) {
    if (gameStatus) {
      return (
        <div className="appSprint">
          <WordCard
            cWord={words[cur]}
            getAnswer={see}
            random={getRandom()}
            stop={stopGame}
          />
        </div>
      );
    }
    return (
      <>
        <Result ansList={ans} score={score} />
      </>
    );
  }
  return (
    <div>
      <h5>
        ID категории {categoryId}, страница {page}
      </h5>
      loading... <CircularProgress />
    </div>
  );
};

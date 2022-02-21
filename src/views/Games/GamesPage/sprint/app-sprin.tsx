import { useEffect, useMemo, useState } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';

import { UsersWordsApi } from '../../../../services/RSLangApi/UsersWordsApi';
import { WordsApi } from '../../../../services/RSLangApi/WordsApi';
import { User } from '../../../../services/User';
import { Word } from '../../../../types/RSLangApi';
import {
  MAX_PAGE_NUMBER,
  WORDS_PER_PAGE,
} from '../../../../utils/constants/common.constants';
import { getRandomNum } from '../../../../utils/helpers/randomNum';
import { Result } from './result/result';
import { Answer } from './types/Answer';
import { WordCard } from './word-card/word-card';

import './app-sprint.css';

const RND_WORD = 0.5;

export const AppSprint = () => {
  const categoryId = Number(useParams()?.categoryId) || 0;
  const page = useParams()?.page;

  const [words, setWords] = useState<Word[]>([]);
  const wordsApi = useMemo(() => new WordsApi(), []);
  const [answerList, setAnswerList] = useState<Answer[]>([]);
  const [cur, setcur] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    if (cur >= words.length) {
      stopGame();
    }
  });

  function see(activeWord: Word, isCorrect: boolean, score: number) {
    if (cur < words.length) {
      const currentAnswer: Answer = { ans: isCorrect, word: activeWord };
      const newarr: Answer[] = [...answerList, currentAnswer];
      setAnswerList(newarr);
      setcur(cur + 1);
      setScore(score);
    }
  }
  function getRandom(): Word {
    if (Math.random() > RND_WORD) {
      return words[cur];
    }
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
      let words: Word[] = [];
      if (page === undefined) {
        // run from menu
        // TODO: 29 const
        words = await wordsApi.getWords(
          categoryId,
          getRandomNum(0, MAX_PAGE_NUMBER - 1)
        );
      } else if (!User.isGuest()) {
        const userWords = new UsersWordsApi(
          User.getId(),
          User.getTokens,
          User.setTokens
        );
        let cPage = Number(page);
        while (cPage >= 0 && words.length < WORDS_PER_PAGE) {
          // eslint-disable-next-line no-await-in-loop
          const cWord = await wordsApi.getWords(categoryId, cPage);
          for (const item of cWord) {
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
          cPage -= 1;
        }
      } else {
        words = await wordsApi.getWords(categoryId, Number(page));
      }
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
        <Result ansList={answerList} score={score} />
      </>
    );
  }
  return (
    <div className="loading">
      <CircularProgress />
    </div>
  );
};

import { useEffect, useMemo, useState } from 'react';

import { useParams } from 'react-router-dom';

import { WordsApi } from '../../../../services/RSLangApi/WordsApi';
import { Word } from '../../../../types/RSLangApi';
import { Result } from './result/result';
import { Answer } from './types/Answer';
import { GameType } from './types/gametypes';
import { WordCard } from './word-card/word-card';

import './app-sprint.css';

export const AppSprint = () => {
  const par = useParams<{gameType: GameType}>();
  const [words, setWords] = useState<Word[]>([]);
  const wordsApi = useMemo(() => new WordsApi(), []);
  const [ans, setAns] = useState<Answer[]>([]);
  const [cur, setcur] =  useState<number>(0);
  const [gameStatus, setGameStatus] = useState<boolean>(true);
  useEffect(() => {
    if (cur >= words.length) {
     stopGame();
    }
  });


  function see(a: Word, b: boolean) {
   if (cur < words.length) {
    const aa:Answer = {ans:b, word: a}  
    const newarr: Answer[] =[...ans, aa];
    setAns(newarr);
    setcur(cur + 1);
   
  }  
  }
  function getRandom(): Word {
    return words[Math.floor(Math.random()*words.length)]
  }
  function  startGame() {
    setGameStatus(true);
  }

  function stopGame() {
    setGameStatus(false);
  }

  useEffect(() => {
    (async () => {
      let words=[];
      if (par.gameType === GameType.fromMenu) {
        words = await wordsApi.getWords();
        console.log('from menu');
      } else {
        words = await wordsApi.getWords(Number(par.gameType)-1);
        console.log('from cat', par.gameType);
      }
      setWords(words);
      setcur(0);
      startGame();
    })();
  }, [par.gameType, wordsApi]);

if (words.length !== 0) {
  if (gameStatus) {
  return (
    <div className='appSprint'>
      <WordCard cWord={words[cur]} getAnswer={see} random={getRandom()} stop={stopGame}/>
    </div>
  )
  } 
    return (
      <><Result ansList={ans} /></>
  )
}
return (<div>loading...</div>);
}

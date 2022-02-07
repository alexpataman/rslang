import { KeyboardEvent, SyntheticEvent, useEffect, useRef, useState } from 'react'

import { Word } from '../../../../../types/RSLangApi'
import { Answer } from '../types/Answer';
import './word-card.css';

type WordParam = {
  cWord: Word;
  getAnswer: (a: Word, b: boolean) => void;
  random: Word,
  stop: () => void,
}
const TIME_TO_PLAY = 10;

export const WordCard = (word: WordParam) => {
  const [ww, setww] = useState<Word>();
  const [rn, setRn] = useState<Word>();
  const score = useRef<HTMLDivElement>(null);
  const multRef = useRef<HTMLDivElement>(null);
  const [mult, setMult] = useState<number>(1);
  const [seconds, setSeconds ] =  useState(TIME_TO_PLAY);
  const [ timerActive, setTimerActive ] = useState(false);
  
  
   useEffect(() => {
    (() => {
      setww(word.cWord);
      setRn(word.random);
      setTimerActive(true);
      if (seconds===0)  word.stop();
     })();
  });

  useEffect(() => {
   
    if (seconds > 0 && timerActive) {
      setTimeout(setSeconds, 1000, seconds - 1);
    } else {
      console.log('timer',seconds);
      setTimerActive(false);
      }
  }, [ seconds, timerActive ]);

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  },);

  function check(userWord: Word, b: boolean, rndWord: Word) {
    let res: boolean;
    if ((userWord.word === rndWord.word) === b) {
      res=true;
      setMult(mult + 1);
      score.current!.textContent = (Number(score.current!.textContent) +10 * mult).toString();
      multRef.current!.textContent = mult.toString();
    } else {
      setMult(1);
      res = false;
    }
    word.getAnswer(userWord, res);
  }

  const keyDownHandler = (event: Event) => {
    if (event.type=== 'keydown') {
      const e = event as unknown as KeyboardEvent;
      console.log(e.key);
      if (e.key ==='ArrowRight') {
        check(ww!, true, rn!);
      }
      if (e.key ==='ArrowLeft') {
        check(ww!, true, rn!);
      }
    }
  };

  if (ww!==undefined) {
  
 return (
    <div tabIndex={-1}>
      <div className="card">        
        <div className='card__stat'>
          <div className='score' >
            <span>Очки:</span>
            <span ref={score}>0</span>
          </div>
          <div className='mult'>
            <span  >Множитель:</span>
            <span ref={multRef}>1</span>
          </div>
          <div className='timer'>
          <span>Осталось:</span>
          <span>{seconds}</span>
            
            </div>
        </div>
        <div className='cards__words'>
        {ww.word} это {rn?.wordTranslate}
        </div>
      
      <div className='cards__buttons'>
        <button type='button'onClick={() => {check(ww, true, rn!)}} > Да</button>
        <button type='button'onClick={() => {check(ww, false, rn!)}} > Нет</button>
      </div>
     
      </div>
    
    </div>
  )}
  return (<div>undef</div>)
}

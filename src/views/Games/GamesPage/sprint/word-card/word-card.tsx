import { KeyboardEvent, useEffect, useRef, useState } from 'react'

import { WordStatistics } from '../../../../../services/WordStatistics';
import { GAME_ID } from '../../../../../types/common';
import { Word } from '../../../../../types/RSLangApi'
import { Control } from '../control/control';
import './word-card.css';

type WordParam = {
  cWord: Word;
  getAnswer: (a: Word, b: boolean, score: number) => void;
  random: Word,
  stop: () => void,
}
const TIME_TO_PLAY = 100;

export const WordCard = (word: WordParam) => {
  const [ww, setww] = useState<Word>();
  const [rn, setRn] = useState<Word>();
  const score = useRef<HTMLDivElement>(null);
  const multRef = useRef<HTMLDivElement>(null);
  const [mult, setMult] = useState<number>(1);
  const [seconds, setSeconds] =  useState(TIME_TO_PLAY);
  const [timerActive, setTimerActive] = useState(false);
  const [isSound, setIsSound] = useState(true);
  // TODO: нужно как-то иначе
  const [correctAudio, setCorrectAudio] = useState<HTMLAudioElement>();
  const [errorAudio, setErrorAudio] = useState<HTMLAudioElement>();

   useEffect(() => {
    (() => {
      setww(word.cWord);
      setRn(word.random);
      setTimerActive(true);
      if (seconds===0)  word.stop();
     })();
  });

  useEffect(() => {
    setCorrectAudio(new Audio(`${process.env.PUBLIC_URL}/sprint/sound/correct.mp3`));
    setErrorAudio(new Audio(`${process.env.PUBLIC_URL}/sprint/sound/error.mp3`));
  },[]);

  useEffect(() => {
   let timer: NodeJS.Timeout; 
    if (seconds > 0 && timerActive) {
      timer = setTimeout(setSeconds, 1000, seconds - 1);
    } else {
      console.log('timer',seconds);
      setTimerActive(false);
      }
    return () => {clearTimeout(timer)} 
  }, [ seconds, timerActive ]);

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    // correctAudio.load();
    // errorAudio.load();
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  });

  async function play(value: boolean) {
    if (isSound) {
      if (value) {
        // const correctAudio = new Audio(`${process.env.PUBLIC_URL}/sprint/sound/correct.mp3`);
      await correctAudio?.play();
      } else {
       await errorAudio?.play();
      }
    }
  }
  
  function toggleSound() {
    setIsSound(!isSound);
  }

  function check(userWord: Word, b: boolean, rndWord: Word) {
    let res: boolean;
    console.log(b, userWord.word, rndWord.word,(userWord.word === rndWord.word) === b);

    if ((userWord.word === rndWord.word) === b) {
      res=true;
      setMult(mult + 1);
      score.current!.textContent = (Number(score.current!.textContent) +10 * mult).toString();
      multRef.current!.textContent = mult.toString();
    } else {
      setMult(1);
      res = false;
    }
    play(res);
    WordStatistics.process(ww!.id, b, GAME_ID.SPRINT);
    word.getAnswer(userWord, res, Number(score.current!.textContent));
  }

  const keyDownHandler = (event: Event) => {
    if (event.type=== 'keydown') {
      const e = event as unknown as KeyboardEvent;
      if (e.key ==='ArrowRight') {
        check(ww!, false, rn!);
      }
      if (e.key ==='ArrowLeft') {
        check(ww!, true, rn!);
      }
    }
  };

  if (ww!==undefined) {
  
 return (
    <div>
      <Control stop={word.stop} toggleSound={toggleSound} isSound={isSound}/>
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

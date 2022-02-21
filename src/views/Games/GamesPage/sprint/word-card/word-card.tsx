import { KeyboardEvent, useEffect, useRef, useState } from 'react';

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import {
  Badge,
  Button,
  createTheme,
  Paper,
  ThemeProvider,
} from '@mui/material';

import { WordStatistics } from '../../../../../services/WordStatistics';
import { GAME_ID } from '../../../../../types/common';
import { Word } from '../../../../../types/RSLangApi';
import { TIME_TO_PLAY } from '../../../../../utils/constants/common.constants';
import { Control } from '../control/control';

import './word-card.scss';

type WordParam = {
  cWord: Word;
  getAnswer: (userWord: Word, b: boolean, score: number) => void;
  random: Word;
  stop: () => void;
};

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#363271;',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});

export const WordCard = (word: WordParam) => {
  const [ww, setww] = useState<Word>();
  const [rn, setRn] = useState<Word>();
  const score = useRef<HTMLDivElement>(null);
  const [mult, setMult] = useState<number>(1);
  const [seconds, setSeconds] = useState(TIME_TO_PLAY);
  const [timerActive, setTimerActive] = useState(false);
  const [isSound, setIsSound] = useState(true);
  const [isFull, setIsFull] = useState(true);

  const [correctAudio, setCorrectAudio] = useState<HTMLAudioElement>();
  const [errorAudio, setErrorAudio] = useState<HTMLAudioElement>();

  useEffect(() => {
    (() => {
      setww(word.cWord);
      setRn(word.random);
      setTimerActive(true);
      if (seconds === 0) word.stop();
    })();
  });

  useEffect(() => {
    setCorrectAudio(
      new Audio(`${process.env.PUBLIC_URL}/sprint/sound/correct.mp3`)
    );
    setErrorAudio(
      new Audio(`${process.env.PUBLIC_URL}/sprint/sound/error.mp3`)
    );
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (seconds > 0 && timerActive) {
      timer = setTimeout(setSeconds, 1000, seconds - 1);
    } else {
      setTimerActive(false);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [seconds, timerActive]);

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);
    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  });

  function play(value: boolean) {
    if (isSound) {
      if (value) {
        correctAudio!.currentTime = 0;
        errorAudio!.pause();
        correctAudio?.play();
      } else {
        errorAudio!.currentTime = 0;
        correctAudio?.pause();
        errorAudio?.play();
      }
    }
  }

  function toggleSound() {
    setIsSound(!isSound);
  }

  function toggleFull() {
    setIsFull(!isFull);
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  function check(userWord: Word, b: boolean, rndWord: Word) {
    let res: boolean;

    if ((userWord.word === rndWord.word) === b) {
      res = true;
      setMult(mult + 1);
      score.current!.textContent = (
        Number(score.current!.textContent) +
        10 * mult
      ).toString();
    } else {
      setMult(1);
      res = false;
    }
    play(res);
    WordStatistics.process(ww!.id, res, GAME_ID.SPRINT);
    word.getAnswer(userWord, res, Number(score.current!.textContent));
  }

  const keyDownHandler = (event: Event) => {
    if (event.type === 'keydown') {
      const e = event as unknown as KeyboardEvent;
      if (e.key === 'ArrowRight') {
        check(ww!, false, rn!);
      }
      if (e.key === 'ArrowLeft') {
        check(ww!, true, rn!);
      }
    }
  };

  if (ww !== undefined) {
    return (
      <div>
        <h3>Спринт</h3>
        <h4>
          Спринт - тренировка на скорость. Попробуй угадать как можно больше
          слов
        </h4>
        <Paper
          elevation={8}
          sx={{
            padding: '20px',
          }}
        >
          <Control
            stop={word.stop}
            toggleSound={toggleSound}
            isSound={isSound}
            isFull={isFull}
            toggleFull={toggleFull}
          />
          <div className="card">
            <div className="card__stat">
              <div className="score">
                <span>Очки: </span>
                <span ref={score}>0</span>
              </div>
              <div className="mult">
                <Badge badgeContent={mult - 1} color="primary">
                  <ThumbUpAltIcon />
                </Badge>
              </div>
              <div className="timer">
                <span>Осталось: </span>
                <span>{seconds}</span>
              </div>
            </div>
            <div className="cards__words">
              <span className="word__item">{ww.word}</span>{' '}
              <span className="word__item-s"> это </span>{' '}
              <span className="word__item">{rn?.wordTranslate}</span>
            </div>

            <div className="cards__buttons">
              <ThemeProvider theme={theme}>
                <Button
                  color="primary"
                  variant="contained"
                  type="button"
                  onClick={() => {
                    check(ww, true, rn!);
                  }}
                >
                  &#8592; Верно
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  type="button"
                  onClick={() => {
                    check(ww, false, rn!);
                  }}
                >
                  Неверно &#8594;
                </Button>
              </ThemeProvider>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
  return <div>undef</div>;
};

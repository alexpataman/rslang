import './Result.scss';

import { useNavigate } from 'react-router-dom';

import { IResultProps } from '../../../../types/AudioGame';
import { ResultBlock } from './ResultBlock/ResultBlock';

export const Result = (props: IResultProps) => {
  const { result, words, handleAudioClick } = props;
  const navigate = useNavigate();

  return (
    <>
      <button
        className="return-btn"
        type="button"
        onClick={() => navigate('/games')}
      >
        {'<-'}
      </button>
      <div className="result">
        <h2 className="result__title">Результаты:</h2>
        <ResultBlock
          result={result}
          words={words}
          text="Ошибки"
          condition="wrong"
          handleAudioClick={handleAudioClick}
        />
        <ResultBlock
          result={result}
          words={words}
          text="Неизвестные"
          condition="unknown"
          handleAudioClick={handleAudioClick}
        />
        <ResultBlock
          result={result}
          words={words}
          text="Изученные"
          condition="correct"
          handleAudioClick={handleAudioClick}
        />
      </div>
    </>
  );
};

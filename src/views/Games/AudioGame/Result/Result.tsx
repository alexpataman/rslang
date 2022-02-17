import './Result.scss';

import { useNavigate } from 'react-router-dom';

import { IResultProps } from '../../../../types/AudioGame';
import { ResultBlock } from './ResultBlock/ResultBlock';

export const Result = (props: IResultProps) => {
  const { result, words, handleAudioClick } = props;
  const navigate = useNavigate();

  return (
    <div className="result">
      <button
        className="return-btn"
        type="button"
        onClick={() => navigate('/games')}
      >
        &#8592;
      </button>
      <h2 className="result__title">Результаты</h2>
      <div className="result__flex">
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
    </div>
  );
};

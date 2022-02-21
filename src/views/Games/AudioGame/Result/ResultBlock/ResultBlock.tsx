import './ResultBlock.scss';

import { IResultBlockProps } from '../../../../../types/AudioGame';
import { Word } from '../../../../../types/RSLangApi';
import { AudioButton } from '../../AudioButton/AudioButton';

export const ResultBlock = (props: IResultBlockProps) => {
  const { result, words, handleAudioClick } = props;

  const numClass = `result__answer-num answer-${props.condition}`;

  return (
    <div className="result__block">
      <h3 className="result__subtitle">
        {props.text}{' '}
        <span className={numClass}>
          {result.filter((item) => item === props.condition).length}
        </span>
      </h3>
      <ul className="result__list">
        {result.map((item, ind) => {
          if (item === props.condition) {
            const { word, wordTranslate } = (words as Word[])[ind];
            return (
              <li key={word} className="result__item">
                <AudioButton
                  id={undefined}
                  className="result__audio audio-btn"
                  dataSrc={(words as Word[])[ind].audio}
                  onClick={handleAudioClick}
                />
                <i>{word}</i> - <span className="item-translate">{wordTranslate}</span>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
};

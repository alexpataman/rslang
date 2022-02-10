import './StartPage.scss';

import { IStartPageProps } from '../../../../types/AudioGame';
import { WORD_GROUP_IDS } from '../../../../utils/constants/common.constants';
import { LevelButton } from '../LevelButton/LevelButton';

export const StartPage = (props: IStartPageProps) => (
  <div className="start-page">
    <h2 className="start-page__title">Аудиовызов</h2>
    <p className="start-page__subtitle">
      Ваша задача - прослушать аудио и выбрать соответствующий ему перевод
    </p>
    <p className="start-page__subtitle">Выберите уровень сложности</p>
    <div className="start-page__btn-cont">
      {WORD_GROUP_IDS.map((num) => <LevelButton id={String(num + 1)} onClick={props.handleButtonClick} />)}
    </div>
  </div>
);

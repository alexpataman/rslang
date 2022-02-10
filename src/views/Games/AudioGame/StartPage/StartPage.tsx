import './StartPage.scss';

import { useNavigate } from 'react-router-dom';

import {
  MIN_PAGE,
  MAX_PAGE,
} from '../../../../utils/constants/AudioGame.constants';
import { WORD_GROUP_IDS } from '../../../../utils/constants/common.constants';
import { getRandomNum } from '../../../../utils/helpers/randomNum';
import { LevelButton } from '../LevelButton/LevelButton';

export const StartPage = () => {
  const navigate = useNavigate();

  const handleLevelBtnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const categoryNum = parseInt(e.currentTarget.id, 10);
    const pageNum = getRandomNum(MIN_PAGE, MAX_PAGE);

    navigate(`/games/audio/category/${categoryNum}/page/${pageNum}`);
  };

  return (
    <div className="start-page">
      <h2 className="start-page__title">Аудиовызов</h2>
      <p className="start-page__subtitle">
        Ваша задача - прослушать аудио и выбрать соответствующий ему перевод
      </p>
      <p className="start-page__subtitle">Выберите уровень сложности</p>
      <div className="start-page__btn-cont">
        {WORD_GROUP_IDS.map((num) => (
          <LevelButton
            key={num}
            id={String(num)}
            onClick={handleLevelBtnClick}
          />
        ))}
      </div>
    </div>
  );
};

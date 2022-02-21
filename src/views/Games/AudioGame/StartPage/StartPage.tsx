import './StartPage.scss';

import { useNavigate } from 'react-router-dom';

import { WORD_GROUP_IDS } from '../../../../utils/constants/common.constants';
import { LevelButton } from '../LevelButton/LevelButton';

export const StartPage = () => {
  const navigate = useNavigate();

  const handleLevelBtnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const categoryNum = parseInt(e.currentTarget.id, 10);

    navigate(`/games/audio/category/${categoryNum}`);
  };

  return (
    <div className="start-page">
      <h2 className="start-page__title">Аудиовызов</h2>
      <p className="start-page__subtitle">
        Поддерживается управление с клавиатуры
      </p>
      <p className="start-page__subtitle">
        (<i>R</i> - повторить, цифры 1-5 - варианты, <i>Enter</i> - продолжить,{' '}
        <i>Q</i> - "не знаю")
      </p>
      <p className="start-page__subtitle subtitle-level">Выберите уровень сложности</p>
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

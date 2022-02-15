import './GamesPage.scss';

import { useNavigate } from 'react-router-dom';

import audioImg from '../../../assets/svg/audio.svg';
import sprintImg from '../../../assets/svg/sprint.svg';

export const GamesPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="games-page">
        <button
          className="games-page__tab"
          type="button"
          onClick={() => navigate('/games/sprint/levels')}
        >
          <img
            src={sprintImg}
            alt="sprint game"
            className="games-page__img"
          />
          <h3 className="games-page__title">Спринт</h3>
          <h4 className="games-page__subtitle">Спринт - тренировка на скорость. Попробуй угадать как можно больше слов</h4>
        </button>
        <button
          className="games-page__tab"
          type="button"
          onClick={() => navigate('/games/audio/levels')}
        >
          <img
            src={audioImg}
            alt="audio game"
            className="games-page__img"
          />
          <h3 className="games-page__title">Аудиовызов</h3>
          <h4 className="games-page__subtitle">Ваша задача - прослушать аудио и выбрать соответствующий ему перевод</h4>
        </button>
      </div>
    </>
  );
};

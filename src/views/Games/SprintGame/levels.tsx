import { useNavigate } from 'react-router-dom';

import { WORD_GROUP_IDS } from '../../../utils/constants/common.constants';

export const Levels = () => {
  const navigate = useNavigate();
  return (
    <div className="start-page">
      <h2 className="start-page__title">Спринт</h2>
      <p className="start-page__subtitle">
        Поддерживается управление с клавиатуры
      </p>
      <p className="start-page__subtitle">(&#8592; Да, &#8594; Нет)</p>
      <p className="start-page__subtitle subtitle-level">Выберите категорию</p>
      <div className="start-page__btn-cont">
        {WORD_GROUP_IDS.map((e, i) => (
          <button
            className="start-page__lvl-btn"
            key={i}
            onClick={() => navigate(`/games/sprint/category/${e}`)}
          >
            {e + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

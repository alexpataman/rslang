import { Link } from 'react-router-dom';

import { User } from '../../services/User';
import { useAppSelector } from '../../store/hooks';
import { selectUserData } from '../../store/user/user.slice';
import './Header.scss';

export const Header = () => {
  const { isGuest } = useAppSelector(selectUserData);
  return (
    <header className="Header">
      <div className="container">
        <nav className="nav">
          <Link to="/">Главная</Link>
          <Link to="/textbook">Учебник</Link>
          <Link to="/games">Игры</Link>
          <Link to="/statistics">Статистика</Link>
        </nav>
        <div className="username">{isGuest ? 'Гость' : User.getName()}</div>
      </div>
    </header>
  );
};

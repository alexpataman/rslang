import { Link } from 'react-router-dom';

import { UserProfile } from '../UserProfile/UserProfile';
import './Header.scss';

export const Header = () => (
  <header className="Header">
    <div className="container">
      <Link to="/" className="logo">
        RSLang
      </Link>
      <nav className="nav">
        <Link to="/textbook">Учебник</Link>
        <Link to="/games">Игры</Link>
        <Link to="/statistics">Статистика</Link>
      </nav>
      <UserProfile />
    </div>
  </header>
);

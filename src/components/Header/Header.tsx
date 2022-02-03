import { Link } from 'react-router-dom';

import './Header.scss';

export const Header = () => (
  <header className='Header'>
    <div className="container">
      <nav className="nav">
        <Link to="/">Главная</Link>
        <Link to="/textbook">Учебник</Link>
        <Link to="/games">Игры</Link>
        <Link to="/statistics">Статистика</Link>
      </nav>
    </div>
  </header>
);

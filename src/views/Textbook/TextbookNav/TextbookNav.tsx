import { Link } from 'react-router-dom';

import { AuthorisedOnly } from '../../../components/AuthorisedOnly/AuthorisedOnly';

export const TextbookNav = () => (
  <AuthorisedOnly>
    <nav>
      <ul>
        <li>
          <Link to="/textbook">Все категории</Link>
        </li>
        <li>
          <Link to="/textbook/difficult">Сложные</Link>
        </li>
        <li>
          <Link to="/textbook/known">Изученные</Link>
        </li>
      </ul>
    </nav>
  </AuthorisedOnly>
);

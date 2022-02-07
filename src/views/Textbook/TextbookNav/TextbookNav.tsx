import { Link } from 'react-router-dom';

import { useUserIsGuest } from '../../../hooks/useUserIsGuest';

export const TextbookNav = () => {
  const isGuest = useUserIsGuest();

  if (isGuest) {
    return <></>;
  }

  return (
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
  );
};

import { Outlet } from 'react-router-dom';

import { TextbookNav } from '../TextbookNav/TextbookNav';

export const TextbookPage = () => (
  <>
    <div className="container">
      <TextbookNav />
      <Outlet />
    </div>
  </>
);

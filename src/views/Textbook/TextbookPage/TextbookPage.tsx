import { Outlet } from 'react-router-dom';

import { TextbookNav } from '../TextbookNav/TextbookNav';

export const TextbookPage = () => (
  <>
    <TextbookNav />
    <Outlet />
  </>
);

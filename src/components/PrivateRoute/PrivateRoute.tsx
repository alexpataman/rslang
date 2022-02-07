import { Navigate } from 'react-router-dom';

import { useUserIsGuest } from '../../hooks/useUserIsGuest';

interface IPrivateRoute {
  children: JSX.Element;
}

export const PrivateRoute = ({ children }: IPrivateRoute) => {
  const isGuest = useUserIsGuest();

  return !isGuest ? children : <Navigate to="/login" />;
};

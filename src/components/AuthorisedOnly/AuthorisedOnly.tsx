import { useUserIsGuest } from '../../hooks/useUserIsGuest';

interface IAuthorised {
  children: JSX.Element;
}

export const AuthorisedOnly = ({ children }: IAuthorised) => {
  const isGuest = useUserIsGuest();

  return <>{!isGuest && children}</>;
};

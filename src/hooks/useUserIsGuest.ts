import { useAppSelector } from '../store/hooks';
import { selectUserData } from '../store/user/user.slice';

export const useUserIsGuest = () => {
  const { isGuest } = useAppSelector(selectUserData);

  return isGuest;
};

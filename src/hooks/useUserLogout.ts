import { useAppDispatch } from '../store/hooks';
import * as userSlice from '../store/user/user.slice';

export const useUserLogout = () => {
  const dispatch = useAppDispatch();

  return () => dispatch(userSlice.logout());
};

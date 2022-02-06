import { useState, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectUserData } from '../store/user/user.slice';
import * as userSlice from '../store/user/user.slice';

export const useUserAuthState = (action: () => any) => {
  const [result, setResult] = useState();
  const { isGuest } = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isGuest) {
      Promise.resolve(action())
        .then((result) => setResult(result))
        .catch(() => dispatch(userSlice.logout()));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return result;
};

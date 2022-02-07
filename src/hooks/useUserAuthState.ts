import { useState, useEffect } from 'react';

import { useAppDispatch } from '../store/hooks';
import * as userSlice from '../store/user/user.slice';
import { useUserIsGuest } from './useUserIsGuest';

export const useUserAuthState = (action: () => any) => {
  const [result, setResult] = useState();
  const isGuest = useUserIsGuest();
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

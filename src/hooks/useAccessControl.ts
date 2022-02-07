import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useUserIsGuest } from './useUserIsGuest';

export const useAccessControl = () => {
  const navigate = useNavigate();
  const isGuest = useUserIsGuest();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isGuest) {
      console.log('z');
      return navigate('/');
    }
  }, [isGuest, navigate]);
};

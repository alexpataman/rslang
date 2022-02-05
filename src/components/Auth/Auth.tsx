import { useState } from 'react';

import { useAppSelector } from '../../store/hooks';
import { selectUserData } from '../../store/user/user.slice';
import { SignIn } from '../SignIn/SignIn';
import { SignOut } from '../SignOut/SignOut';
import { SignUp } from '../SignUp/SignUp';

enum STATES {
  SIGN_IN,
  SIGN_UP,
}

export const Auth = () => {
  const [action, setAction] = useState(STATES.SIGN_IN);
  const { isGuest } = useAppSelector(selectUserData);

  let View;
  if (isGuest) {
    const GuestView = action === STATES.SIGN_IN ? SignIn : SignUp;
    const toggleView = () => {
      setAction((prev) =>
        prev === STATES.SIGN_IN ? STATES.SIGN_UP : STATES.SIGN_IN
      );
    };
    View = <GuestView toggleView={toggleView} />;
  } else {
    View = <SignOut />;
  }

  return <>{View}</>;
};

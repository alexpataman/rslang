import { useEffect, useState, MouseEvent } from 'react';

import { useAppSelector } from '../../store/hooks';
import { selectUserData } from '../../store/user/user.slice';
import { SignIn } from '../SignIn/SignIn';
import { SignUp } from '../SignUp/SignUp';

enum STATES {
  SIGN_IN,
  SIGN_UP,
}

interface IAuth {
  successfulCallback?: () => void;
}

export const Auth = (props: IAuth) => {
  const { successfulCallback } = props;
  const [action, setAction] = useState(STATES.SIGN_IN);
  const { isGuest } = useAppSelector(selectUserData);

  let View = <></>;

  if (isGuest) {
    const GuestView = action === STATES.SIGN_IN ? SignIn : SignUp;
    const toggleView = (event: MouseEvent) => {
      event.preventDefault();
      setAction((prev) =>
        prev === STATES.SIGN_IN ? STATES.SIGN_UP : STATES.SIGN_IN
      );
    };
    View = <GuestView toggleView={toggleView} />;
  }

  useEffect(() => {
    if (!isGuest && successfulCallback) {
      successfulCallback();
    }
  });

  return <>{View}</>;
};

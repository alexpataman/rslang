import { useState } from 'react';

import { SignIn } from '../SignIn/SignIn';
import { SignUp } from '../SignUp/SignUp';

enum STATES {
  SIGN_IN,
  SIGN_UP,
}

export const Auth = () => {
  const [view, setView] = useState(STATES.SIGN_IN);
  const RenderView = view === STATES.SIGN_IN ? SignIn : SignUp;
  const toggleView = () => {
    setView((prev) =>
      prev === STATES.SIGN_IN ? STATES.SIGN_UP : STATES.SIGN_IN
    );
  };

  return (
    <>
      <RenderView toggleView={toggleView} />
    </>
  );
};

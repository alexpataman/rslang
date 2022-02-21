import { useNavigate } from 'react-router-dom';

import { Auth } from '../../../components/Auth/Auth';

export const LoginPage = () => {
  const navigate = useNavigate();
  const successfulCallback = () => {
    navigate('/');
  };
  return (
    <>
      <Auth successfulCallback={successfulCallback} />
    </>
  );
};

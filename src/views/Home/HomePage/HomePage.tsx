import { useUserAuthState } from '../../../hooks/useUserAuthState';
import { User } from '../../../services/User';
import { UserInfo } from '../../../types/RSLangApi';

export const HomePage = () => {
  const result = useUserAuthState(() => User.getData()) as UserInfo | undefined;

  return (
    <>
      <p>Демо обращения к методу апи, требующему аутентификации. </p>
      <p>Если токен просрочен - делается повторный запрос.</p>
      <p>В случае неудачи - разлогинивание.</p>
      <div>
        <b>{result?.name}</b>
      </div>
    </>
  );
};

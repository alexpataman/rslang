import { useNavigate } from 'react-router-dom';

export const GamesPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <h3>Games Page</h3>
      <button type="button" onClick={() => navigate('/games/sprint/levels')}>
        Sprint Game
      </button>
      <br />
      <button type="button" onClick={() => navigate('/games/audio/levels')}>
        Audio Game
      </button>
    </>
  );
};

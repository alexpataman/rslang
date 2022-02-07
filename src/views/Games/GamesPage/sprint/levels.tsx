import { useNavigate } from 'react-router-dom';

import { GameType, LEVELS } from './types/gametypes';

export const Levels = () =>{
  const navigate = useNavigate();
  return (
  <>
  <div>
    Выберите уровень
  </div>
  <div>
  {LEVELS.map((e, i)=> (
    <button key={i} onClick={()=> navigate(`/games/sprint/${e}`)}>{e}</button>
  ))}
  </div>
  </>
)

}
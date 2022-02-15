import { useNavigate } from 'react-router-dom';

import { getRandomNum } from '../../../../utils/helpers/randomNum';
import { LEVELS } from './types/gametypes';

export const Levels = () =>{
  const navigate = useNavigate();
  return (
  <>
  <div>
    Выберите уровень
  </div>
  <div>
  {LEVELS.map((e, i)=> (
    <button key={i} onClick={()=> navigate(`/games/sprint/category/${e}`)}>{e}</button>
  ))}
  </div>
  </>
)

}

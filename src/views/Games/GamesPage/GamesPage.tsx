import { useNavigate } from 'react-router-dom';

import { AppSprint } from './sprint/app-sprin';
import { GameType } from './sprint/types/gametypes';

export const GamesPage = () => {
  const navigate = useNavigate();

  return (
    
    <button type='button' onClick={()=> navigate('/games/sprint/levels')} >Start sprint</button>
    
  )

}

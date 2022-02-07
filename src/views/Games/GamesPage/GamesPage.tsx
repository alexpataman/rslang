import { useNavigate } from 'react-router-dom';

import { AudioGame } from '../AudioGame/AudioGame';
import { AppSprint } from './sprint/app-sprin';
import { GameType } from './sprint/types/gametypes';

export const GamesPage = () => {
  const navigate = useNavigate();

  return (    
    <>
      Games Page
      <button type='button' onClick={()=> navigate('/games/sprint/levels')} >Start sprint</button>
      <br /><AudioGame />
    </>    
  )

}

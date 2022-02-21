import './LevelButton.scss';

import { ILevelBtnProps } from '../../../../types/AudioGame';

export const LevelButton = (props: ILevelBtnProps) => (
  <button id={props.id} className="start-page__lvl-btn" onClick={props.onClick}>
    {parseInt(props.id, 10) + 1}
  </button>
);

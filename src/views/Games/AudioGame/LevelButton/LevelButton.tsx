import './LevelButton.scss';

import { ILevelBtnProps } from '../../../../types/AudioGame';

export const LevelButton = (props: ILevelBtnProps) => (
  <button id={props.id} className="start-page__lvl-btn" onClick={props.onClick}>
    {props.id}
  </button>
);

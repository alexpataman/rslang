import './AudioButton.scss';

import { IAudioBtnProps } from '../../../../types/AudioGame';

export const AudioButton = (props: IAudioBtnProps) => (
  <button id={props.id} className={props.className} data-src={props.dataSrc} onClick={props.onClick}>
    {props.text}
  </button>
);

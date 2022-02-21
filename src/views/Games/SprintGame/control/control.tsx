import { Icon } from '@mui/material'

type controlProps = {
  stop: () => void,
  toggleSound: () => void,
  toggleFull: () => void,
  isSound: boolean,
  isFull: boolean,
}

export const Control = (a: controlProps) => (
  <div className='controls'>
    <button type='button' onClick={a.stop}> <Icon>close</Icon></button>
    <button type='button' onClick={a.toggleSound}> {a.isSound? <Icon>volume_up</Icon>: <Icon>volume_off</Icon>}</button>
    <button type='button' onClick={a.toggleFull}> {a.isFull? <Icon>fullscreen</Icon>: <Icon>fullscreen_exit</Icon>}</button>
  </div>
)

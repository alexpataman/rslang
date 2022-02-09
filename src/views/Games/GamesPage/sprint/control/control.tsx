type controlProps = {
  stop: () => void,
  toggleSound: () => void,
  toggleFull?: () => void,
  isSound: boolean,
}

export const Control = (a: controlProps) => (
  <>
    <div> controls</div>
    <button type='button' onClick={a.stop}> X </button>
    <button type='button' onClick={a.toggleSound}> S </button>
  </>
)

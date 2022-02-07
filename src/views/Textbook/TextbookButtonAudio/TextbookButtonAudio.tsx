import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { Word } from '../../../types/RSLangApi';

interface ITextbookButtonDifficult {
  word: Word;
}

export const TextbookButtonAudio = (props: ITextbookButtonDifficult) => {
  const { audio, audioMeaning, audioExample } = props.word;
  const playlist = [audio, audioExample, audioMeaning];

  const handleClick = async () => {
    const items = await Promise.all(
      playlist.map((el) => {
        const item = new Audio(`${process.env.REACT_APP_API_URL}/${el}`);
        return item;
      })
    );

    let currentItem = 0;

    const playNext = () => {
      currentItem += 1;
      play(currentItem);
    };

    const play = (currentItem = 0) => {
      if (currentItem < items.length) {
        items[currentItem].onended = playNext;
        items[currentItem].play();
      }
    };

    play();
  };

  return (
    <Tooltip title="Проиграть">
      <IconButton aria-label="Проиграть" onClick={handleClick}>
        <VolumeUpIcon />
      </IconButton>
    </Tooltip>
  );
};

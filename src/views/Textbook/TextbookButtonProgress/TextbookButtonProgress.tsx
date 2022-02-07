import { useContext } from 'react';

import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { ModalContext } from '../../../components/context/ModalContext';
import { Word } from '../../../types/RSLangApi';

interface ITextbookButtonDifficult {
  word: Word;
}

export const TextbookButtonProgress = (props: ITextbookButtonDifficult) => {
  const { word } = props.word;
  const modal = useContext(ModalContext);

  const handleClick = async () => {
    modal.setModalData({
      title: 'Прогресс изучения слова',
      content: `Статистика по слову ${word} ...`,
    });
    modal.setModalOpen(true);
  };

  return (
    <Tooltip title="Прогресс изучения">
      <IconButton aria-label="Прогресс изучения" onClick={handleClick}>
        <LeaderboardIcon />
      </IconButton>
    </Tooltip>
  );
};

import { useContext, useMemo } from 'react';

import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { ModalContext } from '../../../context/ModalContext';
import { UsersWordsApi } from '../../../services/RSLangApi/UsersWordsApi';
import { User } from '../../../services/User';
import { UserWord, Word } from '../../../types/RSLangApi';
import {
  difficultWordKnownThreshold,
  regularWordKnownThreshold,
} from '../../../utils/constants/common.constants';

interface ITextbookButtonDifficult {
  word: Word;
}

export const TextbookButtonProgress = (props: ITextbookButtonDifficult) => {
  const { id } = props.word;
  const modal = useContext(ModalContext);

  const usersWordsApi = useMemo(
    () => new UsersWordsApi(User.getId(), User.getTokens, User.setTokens),
    []
  );

  const handleClick = async () => {
    const userWord = (await (async () => {
      try {
        return await usersWordsApi.get(id);
      } catch {
        return null;
      }
    })()) as UserWord | null;

    const isDifficult = userWord?.optional?.isDifficult || false;
    const progress = userWord?.optional?.progress;

    const counter = progress?.counter || 0;
    const totalMistakes = progress?.totalMistakes || 0;
    const totalCorrect = progress?.totalCorrect || 0;

    const total = isDifficult
      ? difficultWordKnownThreshold
      : regularWordKnownThreshold;
    const left = isDifficult ? total - counter : total - counter;

    const counterText = `Тренировок без ошибок (подряд): ${counter}`;
    const leftText =
      left > 0 ? `Тренировок до полного изучения: ${left}` : `Слово изучено!`;

    modal.setModalData({
      title: 'Прогресс изучения слова',
      content: (
        <>
          <p>{counterText}</p>
          <p>{leftText}</p>
          {totalCorrect > 0 && <p>Всего успешных тренировок: {totalCorrect}</p>}
          {totalMistakes > 0 && <p>Всего ошибок: {totalMistakes}</p>}
        </>
      ),
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

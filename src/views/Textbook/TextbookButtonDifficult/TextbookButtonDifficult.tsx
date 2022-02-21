import { useMemo, useState } from 'react';

import NewReleasesIcon from '@mui/icons-material/NewReleases';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { UsersWordsApi } from '../../../services/RSLangApi/UsersWordsApi';
import { User } from '../../../services/User';
import { UserWord, Word } from '../../../types/RSLangApi';
import { AlreadyExistsError } from '../../../utils/errors/AlreadyExistsError';

interface ITextbookButtonDifficult {
  word: Word;
  onClick?: () => void;
  refreshPageItems?: () => void;
}

export const TextbookButtonDifficult = (props: ITextbookButtonDifficult) => {
  const { onClick, word, refreshPageItems } = props;
  const { id, userWord } = word;
  const [isActive, setIsActive] = useState(userWord?.optional?.isDifficult);

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

    const payload = { ...userWord?.optional, isDifficult: !isActive };

    try {
      await usersWordsApi.create(id, payload);
    } catch (error) {
      if (error instanceof AlreadyExistsError) {
        await usersWordsApi.update(id, payload);
      }
    }
    setIsActive(!isActive);

    if (onClick) {
      onClick();
    }

    if (refreshPageItems) {
      refreshPageItems();
    }
  };

  return (
    <Tooltip title="Добавить в сложные">
      <IconButton aria-label="Добавить в сложные" onClick={handleClick}>
        <NewReleasesIcon sx={isActive ? { color: 'red' } : {}} />
      </IconButton>
    </Tooltip>
  );
};

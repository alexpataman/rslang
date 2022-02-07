import { useMemo, useState } from 'react';

import NewReleasesIcon from '@mui/icons-material/NewReleases';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { UsersWords } from '../../../services/RSLangApi/UsersWordsApi';
import { User } from '../../../services/User';
import { Word } from '../../../types/RSLangApi';
import { AlreadyExistsError } from '../../../utils/errors/AlreadyExistsError';

interface ITextbookButtonDifficult {
  word: Word;
}

export const TextbookButtonDifficult = (props: ITextbookButtonDifficult) => {
  const { id, userWord } = props.word;
  const [isActive, setIsActive] = useState(userWord?.optional?.isDifficult);

  const usersWordsApi = useMemo(
    () => new UsersWords(User.getId(), User.getTokens, User.setTokens),
    []
  );
  const handleClick = async () => {
    const payload = { ...userWord?.optional, isDifficult: !isActive };

    try {
      await usersWordsApi.createWord(id, payload);
    } catch (error) {
      if (error instanceof AlreadyExistsError) {
        await usersWordsApi.updateWord(id, payload);
      }
    }
    setIsActive(!isActive);
  };

  return (
    <Tooltip title="Добавить в сложные">
      <IconButton aria-label="Добавить в сложные" onClick={handleClick}>
        <NewReleasesIcon sx={isActive ? { color: 'red' } : {}} />
      </IconButton>
    </Tooltip>
  );
};

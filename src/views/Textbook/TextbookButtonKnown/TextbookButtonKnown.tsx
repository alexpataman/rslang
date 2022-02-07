import { useMemo, useState } from 'react';

import SchoolIcon from '@mui/icons-material/School';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { UsersWords } from '../../../services/RSLangApi/UsersWordsApi';
import { User } from '../../../services/User';
import { Word } from '../../../types/RSLangApi';
import { AlreadyExistsError } from '../../../utils/errors/AlreadyExistsError';

interface ITextbookButtonKnown {
  word: Word;
  onClick?: () => void;
}

export const TextbookButtonKnown = (props: ITextbookButtonKnown) => {
  const { onClick, word } = props;
  const { id, userWord } = word;
  const [isActive, setIsActive] = useState(userWord?.optional?.isKnown);

  const usersWordsApi = useMemo(
    () => new UsersWords(User.getId(), User.getTokens, User.setTokens),
    []
  );
  const handleClick = async () => {
    const payload = { ...userWord?.optional, isKnown: !isActive };

    try {
      await usersWordsApi.createWord(id, payload);
    } catch (error) {
      if (error instanceof AlreadyExistsError) {
        await usersWordsApi.updateWord(id, payload);
      }
    }
    setIsActive(!isActive);

    if (onClick) {
      onClick();
    }
  };

  return (
    <Tooltip title="Добавить в изученные" onClick={handleClick}>
      <IconButton aria-label="Изученное">
        <SchoolIcon sx={isActive ? { color: 'green' } : {}} />
      </IconButton>
    </Tooltip>
  );
};

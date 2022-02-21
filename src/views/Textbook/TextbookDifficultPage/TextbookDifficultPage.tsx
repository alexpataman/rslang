import { useMemo, useEffect, useState } from 'react';

import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { Avatar, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import { Loader } from '../../../components/Loader/Loader';
import { UsersAggregatedWords } from '../../../services/RSLangApi/UsersAggregatedWords';
import { User } from '../../../services/User';
import { Word } from '../../../types/RSLangApi';
import { TextbookWordItem } from '../TextbookWordItem/TextbookWordItem';

export const TextbookDifficultPage = () => {
  const [words, setWords] = useState<Word[]>();
  const [isLoading, setIsLoading] = useState(true);

  const wordsApi = useMemo(
    () =>
      new UsersAggregatedWords(User.getId(), User.getTokens, User.setTokens),
    []
  );

  const filter = useMemo(
    () => ({
      $and: [{ 'userWord.optional.isDifficult': true }],
    }),
    []
  );

  const getItems = useMemo(
    () => async () => {
      const words = await wordsApi.getWords(0, 0, filter);
      setWords(words);
      setIsLoading(false);
    },
    [filter, wordsApi]
  );

  useEffect(() => {
    getItems();
  }, [getItems]);

  const difficultClickHandler = () => {
    getItems();
  };

  let content;

  if (words && words.length > 0) {
    content = (
      <Grid container spacing={2} alignItems="stretch">
        {words?.map((word) => (
          <Grid item xs={12} sm={6} md={3} key={word.id}>
            <TextbookWordItem
              item={word}
              clickHandlers={{ difficultClickHandler }}
            />
          </Grid>
        ))}
      </Grid>
    );
  } else {
    content = <Typography>Список сложных слов пуст</Typography>;
  }

  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }} className="head-with-image">
        <Avatar>
          <NewReleasesIcon />
        </Avatar>
        Сложные слова
      </Typography>
      <Loader isLoading={isLoading}>{content}</Loader>
    </>
  );
};

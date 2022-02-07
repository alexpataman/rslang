import { useMemo, useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';

import { UsersAggregatedWords } from '../../../services/RSLangApi/UsersAggregatedWords';
import { User } from '../../../services/User';
import { Word } from '../../../types/RSLangApi';
import { TextbookWordItem } from '../TextbookWordItem/TextbookWordItem';

export const TextbookKnownPage = () => {
  const [words, setWords] = useState<Word[]>();
  const wordsApi = useMemo(
    () =>
      new UsersAggregatedWords(User.getId(), User.getTokens, User.setTokens),
    []
  );

  const filter = useMemo(
    () => ({
      $and: [{ 'userWord.optional.isKnown': true }],
    }),
    []
  );

  const getItems = useMemo(
    () => async () => {
      const words = await wordsApi.getWords(0, 0, filter);
      setWords(words);
    },
    [filter, wordsApi]
  );

  useEffect(() => {
    getItems();
  }, [getItems]);

  const knownClickHandler = () => {
    getItems();
  };

  return (
    <>
      <h2>Изученные слова</h2>

      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="stretch"
      >
        {words?.map((word) => (
          <Grid item xs={3} key={word.id}>
            <TextbookWordItem
              item={word}
              clickHandlers={{ knownClickHandler }}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

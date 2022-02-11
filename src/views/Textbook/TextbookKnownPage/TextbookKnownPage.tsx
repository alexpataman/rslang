import { useMemo, useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';

import { Loader } from '../../../components/Loader/Loader';
import { UsersAggregatedWords } from '../../../services/RSLangApi/UsersAggregatedWords';
import { User } from '../../../services/User';
import { Word } from '../../../types/RSLangApi';
import { TextbookWordItem } from '../TextbookWordItem/TextbookWordItem';

export const TextbookKnownPage = () => {
  const [words, setWords] = useState<Word[]>();
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(false);
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

      <Loader isLoading={isLoading}>
        <Grid container spacing={2} alignItems="stretch">
          {words?.map((word) => (
            <Grid item xs={12} sm={6} md={4} key={word.id}>
              <TextbookWordItem
                item={word}
                clickHandlers={{ knownClickHandler }}
              />
            </Grid>
          ))}
        </Grid>
      </Loader>
    </>
  );
};

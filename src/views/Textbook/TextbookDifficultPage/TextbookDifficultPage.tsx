import { useMemo, useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';

import { useUserIsGuest } from '../../../hooks/useUserIsGuest';
import { UsersAggregatedWords } from '../../../services/RSLangApi/UsersAggregatedWords';
import { User } from '../../../services/User';
import { Word } from '../../../types/RSLangApi';
import { TextbookWordItem } from '../TextbookWordItem/TextbookWordItem';

export const TextbookDifficultPage = () => {
  const [words, setWords] = useState<Word[]>();
  const isGuest = useUserIsGuest();
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

  useEffect(() => {
    (async () => {
      const words = await wordsApi.getWords(0, 0, filter);
      setWords(words);
    })();
  }, [wordsApi, filter]);

  return (
    <>
      <h2>Сложные слова</h2>

      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="stretch"
      >
        {words?.map((word) => (
          <Grid item xs={3} key={word.id}>
            <TextbookWordItem item={word} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

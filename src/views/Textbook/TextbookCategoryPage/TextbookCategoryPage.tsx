import { useMemo, useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';

import {
  Pagination,
  PAGINATION_DIRECTIONS,
} from '../../../components/Pagination/Pagination';
import { useUserIsGuest } from '../../../hooks/useUserIsGuest';
import { UsersAggregatedWords } from '../../../services/RSLangApi/UsersAggregatedWords';
import { WordsApi } from '../../../services/RSLangApi/WordsApi';
import { User } from '../../../services/User';
import { Word } from '../../../types/RSLangApi';
import { MAX_PAGE_NUMBER } from '../../../utils/constants/common.constants';
import { wordAdapter } from '../../../utils/helpers/wordAdapter';
import { TextbookWordItem } from '../TextbookWordItem/TextbookWordItem';

export const TextbookCategoryPage = () => {
  const categoryId = useParams()?.categoryId || 0;
  const [words, setWords] = useState<Word[]>();
  const [page, setPage] = useState<number>(0);
  const isGuest = useUserIsGuest();
  const wordsApi = useMemo(
    () =>
      isGuest
        ? new WordsApi()
        : new UsersAggregatedWords(
            User.getId(),
            User.getTokens,
            User.setTokens
          ),
    [isGuest]
  );

  useEffect(() => {
    (async () => {
      const words = await wordsApi.getWords(+categoryId, page);
      setWords(words);
    })();
  }, [wordsApi, categoryId, page, isGuest]);

  const changePageHandler = (direction: PAGINATION_DIRECTIONS) => {
    setPage((prev) => {
      if (direction === PAGINATION_DIRECTIONS.PREV) {
        return prev - 1;
      }
      return prev + 1;
    });
  };

  const disableConditions = {
    [PAGINATION_DIRECTIONS.NEXT]: page === MAX_PAGE_NUMBER - 1,
    [PAGINATION_DIRECTIONS.PREV]: page === 0,
  };

  return (
    <>
      <h2>Категория #{+categoryId + 1}</h2>
      <Pagination
        changePageHandler={changePageHandler}
        disableConditions={disableConditions}
      />

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

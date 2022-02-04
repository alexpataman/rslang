import { useMemo, useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';

import {
  Pagination,
  PAGINATION_DIRECTIONS,
} from '../../../components/Pagination/Pagination';
import { WordsApi } from '../../../services/RSLangApi/WordsApi';
import { Word } from '../../../types/RSLangApi';
import { MAX_PAGE_NUMBER } from '../../../utils/constants/common.constants';
import { TextbookWordItem } from '../TextbookWordItem/TextbookWordItem';

export const TextbookCategoryPage = () => {
  const categoryId = useParams()?.categoryId || 0;
  const [words, setWords] = useState<Word[]>();
  const [page, setPage] = useState<number>(0);
  const wordsApi = useMemo(() => new WordsApi(), []);

  useEffect(() => {
    (async () => {
      const words = await wordsApi.getWords(categoryId, page);
      setWords(words);
    })();
  }, [wordsApi, categoryId, page]);

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

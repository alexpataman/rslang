import { useMemo, useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';

import { WordsApi } from '../../../services/RSLangApi/WordsApi';
import { Word } from '../../../types/RSLangApi';
import { WORD_GROUP_IDS } from '../../../utils/constants/common.constants';
import { TextbookCategoryItem } from '../TextbookCategoryItem/TextbookCategoryItem';

export const TextbookPage = () => {
  const [categories, setCategories] = useState<Word[]>([]);
  const wordsApi = useMemo(() => new WordsApi(), []);

  useEffect(() => {
    (async () => {
      const firstWords = await Promise.all(
        WORD_GROUP_IDS.map((el) => wordsApi.getWords(el))
      );
      setCategories(firstWords.map((el) => el[0]));
    })();
  }, [wordsApi]);

  return (
    <>
      <h2>Textbook Page</h2>
      <Grid container spacing={2} justifyContent="space-between">
        {categories.map((category, index) => (
          <Grid item xs={4} key={index}>
            <TextbookCategoryItem id={index} img={category.image} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

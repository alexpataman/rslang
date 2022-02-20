import { useMemo, useEffect, useState } from 'react';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Avatar, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import { Loader } from '../../../components/Loader/Loader';
import { WordsApi } from '../../../services/RSLangApi/WordsApi';
import { Word } from '../../../types/RSLangApi';
import { WORD_GROUP_IDS } from '../../../utils/constants/common.constants';
import { TextbookCategoryItem } from '../TextbookCategoryItem/TextbookCategoryItem';

export const TextbookCategoriesPage = () => {
  const [categories, setCategories] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const wordsApi = useMemo(() => new WordsApi(), []);

  useEffect(() => {
    (async () => {
      const firstWords = await Promise.all(
        WORD_GROUP_IDS.map((el) => wordsApi.getWords(el))
      );
      setCategories(firstWords.map((el) => el[0]));
      setIsLoading(false);
    })();
  }, [wordsApi]);

  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }} className="head-with-image">
        <Avatar>
          <MenuBookIcon />
        </Avatar>
        Учебник
      </Typography>
      <Loader isLoading={isLoading}>
        <Grid container spacing={3}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <TextbookCategoryItem id={index} img={category.image} />
            </Grid>
          ))}
        </Grid>
      </Loader>
    </>
  );
};

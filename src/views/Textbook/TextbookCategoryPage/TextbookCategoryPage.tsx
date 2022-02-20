import { useMemo, useEffect, useState, useCallback } from 'react';

import CheckIcon from '@mui/icons-material/Check';
import { Avatar, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useParams, useNavigate } from 'react-router-dom';

import { GameButtons } from '../../../components/GameButtons/GameButtons';
import { Loader } from '../../../components/Loader/Loader';
import { PaginationNumbers } from '../../../components/PaginationNumbers/PaginationNumbers';
import { useUserIsGuest } from '../../../hooks/useUserIsGuest';
import { UsersAggregatedWords } from '../../../services/RSLangApi/UsersAggregatedWords';
import { WordsApi } from '../../../services/RSLangApi/WordsApi';
import { User } from '../../../services/User';
import { Word } from '../../../types/RSLangApi';
import { MAX_PAGE_NUMBER } from '../../../utils/constants/common.constants';
import { TextbookWordItem } from '../TextbookWordItem/TextbookWordItem';

import './TextbookCategoryPage.scss';

export const TextbookCategoryPage = () => {
  const categoryId = Number(useParams()?.categoryId) || 0;
  const page = Number(useParams()?.page) || 0;
  const [words, setWords] = useState<Word[]>();
  const [categoryImage, setCategoryImage] = useState<string>();
  const [isKnownPage, setIsKnownPage] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(true);
  const isGuest = useUserIsGuest();
  const navigate = useNavigate();
  const pageNavigatePath = `/textbook/category/${categoryId}/page`;

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

  const refreshPageItems = useCallback(async () => {
    const words = (await wordsApi.getWords(categoryId, page)) as Word[];
    setWords(words);
    setIsKnownPage(
      words.every((el) => el?.userWord?.optional?.isKnown === true)
    );
  }, [wordsApi, categoryId, page]);

  useEffect(() => {
    setIsLoading(true);
  }, [page]);

  useEffect(() => {
    (async () => {
      const firstWords = await wordsApi.getWords(categoryId, 0);
      if (firstWords.length) {
        const categoryImage = `${process.env.REACT_APP_API_URL}/${firstWords[0].image}`;
        setCategoryImage(categoryImage);
      }

      await refreshPageItems();

      setIsLoading(false);
    })();
  }, [wordsApi, categoryId, page, isGuest, refreshPageItems]);

  const changePageHandler = (page: number) =>
    navigate(`${pageNavigatePath}/${page}`);

  return (
    <div className="TextbookCategoryPage">
      <Typography variant="h4" sx={{ mb: 3 }} className="category-title">
        {categoryImage && (
          <Avatar src={categoryImage} alt={`Категория #${categoryId + 1}`} />
        )}
        Категория #{categoryId + 1}
        {isKnownPage && (
          <Tooltip title="Категория полностью изучена">
            <Avatar className="known-category">
              <CheckIcon />
            </Avatar>
          </Tooltip>
        )}
      </Typography>

      <Grid
        container
        alignItems="center"
        sx={{ mb: 3 }}
        spacing={2}
        justifyContent="space-between"
      >
        <Grid item>
          <GameButtons
            categoryId={categoryId}
            page={page}
            isKnownPage={isKnownPage}
          />
        </Grid>
        <Grid item>
          <PaginationNumbers
            changePageHandler={changePageHandler}
            count={MAX_PAGE_NUMBER}
            page={page}
            color={isKnownPage ? 'secondary' : 'primary'}
          />
        </Grid>
      </Grid>
      <Loader isLoading={isLoading}>
        <Grid container spacing={3} alignItems="stretch">
          {words?.map((word) => (
            <Grid item xs={12} sm={6} md={3} key={word.id}>
              <TextbookWordItem
                item={word}
                refreshPageItems={refreshPageItems}
              />
            </Grid>
          ))}
        </Grid>
      </Loader>
    </div>
  );
};

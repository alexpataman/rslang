import { Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { GAME_ID } from '../../../types/common';
import {
  IGameStatistics,
  IUserStatistics,
  IWordsStatistics,
} from '../../../types/RSLangApi';
import { STATISTICS_LABELS } from '../../../utils/constants/common.constants';

import './StatisticsDaily.scss';

interface IStatisticsDaily {
  data: IUserStatistics | undefined;
}

export const StatisticsDaily = ({ data }: IStatisticsDaily) => {
  const currentDate = new Date().toISOString().slice(0, 10);
  const { games, words } = data?.optional?.daily?.[currentDate] || {};

  return (
    <Box className="StatisticsDaily" sx={{ mb: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Краткосрочная статистика за сегодня
      </Typography>
      <Grid container spacing={2}>
        {games &&
          Object.keys(games).map((gameId) => (
            <Grid item xs={12} sm={4} key={gameId}>
              <GameStats gameId={gameId} data={games[gameId as GAME_ID]} />
            </Grid>
          ))}

        {words && (
          <Grid item xs={12} sm={4}>
            <WordStats data={words} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

interface IGameStats {
  gameId: string;
  data: IGameStatistics;
}

export const GameStats = ({ gameId, data }: IGameStats) => (
  <Paper sx={{ width: 1, p: 2 }}>
    <Typography variant="h6">
      {STATISTICS_LABELS[gameId as keyof typeof STATISTICS_LABELS]}
    </Typography>
    <ul>
      <li>Всего новых слов: {data.totalNewWords}</li>
      <li>
        Процент правильных ответов: {Math.round(data.correctAnswersRatio * 100)}
        %{' '}
      </li>
      <li>Самая длинная серия правильных ответов: {data.maxSequence}</li>
    </ul>
  </Paper>
);

interface IWordStats {
  data: IWordsStatistics;
}

export const WordStats = ({ data }: IWordStats) => (
  <Paper sx={{ width: 1, p: 2 }}>
    <Typography variant="h6">Статистика по словам</Typography>
    <ul>
      <li>Всего новых слов: {data.totalNewWords}</li>
      <li>Изученных слов за день: {data.totalCompleted}</li>
      <li>
        Процент правильных ответов: {Math.round(data.correctAnswersRatio * 100)}
        %{' '}
      </li>
    </ul>
  </Paper>
);

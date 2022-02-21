import { Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Chart from 'react-apexcharts';

import { CHART_TYPES, GAME_ID } from '../../../types/common';
import { IUserStatistics } from '../../../types/RSLangApi';
import { STATISTICS_LABELS } from '../../../utils/constants/common.constants';

interface IStatisticsLongTerm {
  data: IUserStatistics | undefined;
}

type newWordsSeries = { [key: string]: number[] };

export const StatisticsLongTerm = ({ data }: IStatisticsLongTerm) => {
  const { daily = {} } = data?.optional || {};
  const categories = Object.keys(daily);
  const newWordsSeries: newWordsSeries = {};
  const newWordsByDayCharts: React.ReactNode[] = [];
  const newWordsByDayChartsAcc: React.ReactNode[] = [];

  categories.forEach((date) => {
    const { games, words } = data?.optional?.daily?.[date] || {};
    if (games) {
      Object.keys(games).forEach((game) => {
        if (!newWordsSeries[game as GAME_ID]) {
          newWordsSeries[game as GAME_ID] = [];
        }
        newWordsSeries[game as GAME_ID].push(
          games[game as GAME_ID].totalNewWords
        );
      });
    }
    if (words) {
      if (!newWordsSeries.total) {
        newWordsSeries.total = [];
      }
      newWordsSeries.total.push(words.totalNewWords);
    }
  });
  Object.keys(newWordsSeries).forEach((game) => {
    newWordsByDayCharts.push(
      getWordsByDayChart(
        CHART_TYPES.BAR,
        'Изучено слов',
        game,
        categories,
        newWordsSeries[game]
      )
    );
    newWordsByDayChartsAcc.push(
      getWordsByDayChart(
        CHART_TYPES.LINE,
        'Изучено слов',
        game,
        categories,
        newWordsSeries[game].reduce((acc, el, index) => {
          const current = index ? el + acc[index - 1] : el;
          acc.push(current);
          return acc;
        }, [] as number[])
      )
    );
  });

  return (
    <Box className="StatisticsLongTerm" sx={{ mb: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Долгосрочная статистика
      </Typography>
      {!newWordsByDayCharts.length && (
        <Typography>
          Долгосрочная статистика пока недоступна. Для начала попробуйте
          потренировать слова.
        </Typography>
      )}

      {newWordsByDayCharts.length > 0 && (
        <>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Количество новых слов за каждый день изучения
          </Typography>
          <Grid container spacing={2} sx={{ mb: 5 }}>
            {newWordsByDayCharts.map((el, index) => (
              <Grid item key={index} xs={12} sm={4}>
                {el}
              </Grid>
            ))}
          </Grid>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Увеличение общего количества изученных слов за весь период обучения
            по дням
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            {newWordsByDayChartsAcc.map((el, index) => (
              <Grid item key={index} xs={12} sm={4}>
                {el}
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

const getWordsByDayChart = (
  type: CHART_TYPES,
  id: string,
  title: string,
  categories: string[],
  series: number[]
) => {
  const data = {
    options: {
      chart: {
        id,
        toolbar: {
          show: false,
          tools: {
            download: false,
          },
        },
      },
      xaxis: {
        categories,
      },
    },
    series: [
      {
        name: id,
        data: series,
      },
    ],
  };
  return (
    <Paper sx={{ width: 1, p: 2 }}>
      <Typography variant="h6">
        {STATISTICS_LABELS[title as keyof typeof STATISTICS_LABELS]}
      </Typography>
      <Chart options={data.options} series={data.series} type={type} />
    </Paper>
  );
};

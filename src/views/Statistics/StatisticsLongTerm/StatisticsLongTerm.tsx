import Chart from 'react-apexcharts';

import { CHART_TYPES, GAME_ID } from '../../../types/common';
import { IUserStatistics } from '../../../types/RSLangApi';

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
        game,
        game,
        categories,
        newWordsSeries[game]
      )
    );
    newWordsByDayChartsAcc.push(
      getWordsByDayChart(
        CHART_TYPES.LINE,
        game,
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
    <>
      <h4>Долгосрочная статистика</h4>
      <h3>Количество новых слов за каждый день изучения</h3>
      <div>
        {newWordsByDayCharts.map((el, index) => (
          <div key={index}>{el}</div>
        ))}
      </div>
      <h3>
        Увеличение общего количества изученных слов за весь период обучения по
        дням
        <div>
          {newWordsByDayChartsAcc.map((el, index) => (
            <div key={index}>{el}</div>
          ))}
        </div>
      </h3>
    </>
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
    <>
      <h4>{title}</h4>
      <Chart
        options={data.options}
        series={data.series}
        type={type}
        width={500}
        height={320}
      />
    </>
  );
};

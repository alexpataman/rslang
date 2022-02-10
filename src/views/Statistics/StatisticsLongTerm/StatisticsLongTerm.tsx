import { useState } from 'react';

import Chart from 'react-apexcharts';

import { IUserStatistics } from '../../../types/RSLangApi';

interface IStatisticsLongTerm {
  data: IUserStatistics | undefined;
}

export const StatisticsLongTerm = ({ data }: IStatisticsLongTerm) => {
  const [state, setState] = useState(tmp);
  const currentDate = new Date().toISOString().slice(0, 10);
  const { games, words } = data?.optional?.daily?.[currentDate] || {};

  return (
    <>
      <h4>Долгосрочная статистика (заглушка)</h4>
      <Chart
        options={state.options}
        series={state.series}
        type="bar"
        width={500}
        height={320}
      />
    </>
  );
};

const tmp = {
  options: {
    chart: {
      id: 'apexchart-example',
      toolbar: {
        show: false,
        tools: {
          download: false,
        },
      },
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  },
  series: [
    {
      name: 'series-1',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
  ],
};

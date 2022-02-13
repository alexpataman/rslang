import { useState } from 'react';

// import Chart from 'react-apexcharts';

import { GAME_ID } from '../../../types/common';
import {
  IGameStatistics,
  IUserStatistics,
  IWordsStatistics,
} from '../../../types/RSLangApi';

interface IStatisticsDaily {
  data: IUserStatistics | undefined;
}

export const StatisticsDaily = ({ data }: IStatisticsDaily) => {
  const currentDate = new Date().toISOString().slice(0, 10);
  const { games, words } = data?.optional?.daily?.[currentDate] || {};

  return (
    <>
      <h4>Краткосрочная статистика за сегодня ({currentDate})</h4>
      {games &&
        Object.keys(games).map((gameId) => (
          <GameStats
            key={gameId}
            gameId={gameId}
            data={games[gameId as GAME_ID]}
          />
        ))}
      {words && <WordStats data={words} />}
    </>
  );
};

interface IGameStats {
  gameId: string;
  data: IGameStatistics;
}

export const GameStats = ({ gameId, data }: IGameStats) => (
  <div>
    <b>{gameId}</b>
    <ul>
      <li>Всего новых слов: {data.totalNewWords}</li>
      <li>
        Процент правильных ответов: {Math.round(data.correctAnswersRatio * 100)}
        %{' '}
      </li>
      <li>Самая длинная серия правильных ответов: {data.maxSequence}</li>
    </ul>
  </div>
);

interface IWordStats {
  data: IWordsStatistics;
}

export const WordStats = ({ data }: IWordStats) => (
  <div>
    <b>Статистика по словам</b>
    <ul>
      <li>Всего новых слов: {data.totalNewWords}</li>
      <li>Изученных слов за день: {data.totalCompleted}</li>
      <li>
        Процент правильных ответов: {Math.round(data.correctAnswersRatio * 100)}
        %{' '}
      </li>
    </ul>
  </div>
);

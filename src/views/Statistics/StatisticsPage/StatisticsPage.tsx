import { useEffect, useMemo, useState } from 'react';

import { Loader } from '../../../components/Loader/Loader';
import { UsersStatisticsApi } from '../../../services/RSLangApi/UsersStatisticsApi';
import { User } from '../../../services/User';
import { IUserStatistics } from '../../../types/RSLangApi';
import { StatisticsDaily } from '../StatisticsDaily/StatisticsDaily';
import { StatisticsLongTerm } from '../StatisticsLongTerm/StatisticsLongTerm';

export const StatisticsPage = () => {
  const [data, setData] = useState<IUserStatistics>();
  const [isLoading, setIsLoading] = useState(true);
  const userStatistics = useMemo(
    () => new UsersStatisticsApi(User.getId(), User.getTokens, User.setTokens),
    []
  );
  useEffect(() => {
    (async () => {
      const statistics = await userStatistics.get();
      setData(statistics);
      setIsLoading(false);
    })();
  }, [userStatistics]);

  return (
    <>
      <div className="container">
        <Loader isLoading={isLoading}>
          <StatisticsDaily data={data} />
          <StatisticsLongTerm data={data} />
        </Loader>
      </div>
    </>
  );
};

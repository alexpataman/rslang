import { useEffect, useMemo, useState } from 'react';

import { Loader } from '../../../components/Loader/Loader';
import { useUserLogout } from '../../../hooks/useUserLogout';
import { UsersStatisticsApi } from '../../../services/RSLangApi/UsersStatisticsApi';
import { User } from '../../../services/User';
import { IUserStatistics } from '../../../types/RSLangApi';
import { ForbiddenError } from '../../../utils/errors/ForbiddenError';
import { StatisticsDaily } from '../StatisticsDaily/StatisticsDaily';
import { StatisticsLongTerm } from '../StatisticsLongTerm/StatisticsLongTerm';

export const StatisticsPage = () => {
  const [data, setData] = useState<IUserStatistics>();
  const [isLoading, setIsLoading] = useState(true);
  const userStatistics = useMemo(
    () => new UsersStatisticsApi(User.getId(), User.getTokens, User.setTokens),
    []
  );
  const userLogout = useUserLogout();

  useEffect(() => {
    (async () => {
      try {
        try {
          const statistics = await userStatistics.get();
          setData(statistics);
        } catch (error) {
          if (error instanceof ForbiddenError) {
            userLogout();
          }
        }
      } catch {
        // do nothing
      }
      setIsLoading(false);
    })();
  }, [userStatistics, userLogout]);

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

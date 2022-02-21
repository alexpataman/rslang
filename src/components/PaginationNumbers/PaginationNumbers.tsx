import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import './PaginationNumbers.scss';

export enum PAGINATION_DIRECTIONS {
  'PREV',
  'NEXT',
}

interface IPaginationNumbers {
  changePageHandler: (direction: PAGINATION_DIRECTIONS) => void;
  count: number;
  page: number;
  color: 'primary' | 'secondary' | 'standard' | undefined;
}

export const PaginationNumbers = ({
  changePageHandler,
  count,
  page,
  color,
}: IPaginationNumbers) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    changePageHandler(value - 1);
  };

  return (
    <div className="PaginationNumbers">
      <Stack spacing={2}>
        <Pagination
          count={count}
          page={page + 1}
          onChange={handleChange}
          color={color}
        />
      </Stack>
    </div>
  );
};

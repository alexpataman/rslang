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
}

export const PaginationNumbers = ({
  changePageHandler,
  count,
  page,
}: IPaginationNumbers) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    changePageHandler(value);
  };

  return (
    <div className="PaginationNumbers">
      <Stack spacing={2}>
        <Pagination
          count={count}
          page={page}
          onChange={handleChange}
          color="primary"
        />
      </Stack>
    </div>
  );
};

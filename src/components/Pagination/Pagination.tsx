import './Pagination.scss';

export enum PAGINATION_DIRECTIONS {
  'PREV',
  'NEXT',
}

interface IPagination {
  changePageHandler: (direction: PAGINATION_DIRECTIONS) => void;
  disableConditions: {
    [PAGINATION_DIRECTIONS.NEXT]: boolean;
    [PAGINATION_DIRECTIONS.PREV]: boolean;
  };
}

export const Pagination = ({
  changePageHandler,
  disableConditions,
}: IPagination) => (
  <div className="Pagination">
    <button
      className="PaginationButton"
      onClick={() => changePageHandler(PAGINATION_DIRECTIONS.PREV)}
      disabled={disableConditions[PAGINATION_DIRECTIONS.PREV]}
    >
      Prev
    </button>
    <button
      className="PaginationButton"
      onClick={() => changePageHandler(PAGINATION_DIRECTIONS.NEXT)}
      disabled={disableConditions[PAGINATION_DIRECTIONS.NEXT]}
    >
      Next
    </button>
  </div>
);

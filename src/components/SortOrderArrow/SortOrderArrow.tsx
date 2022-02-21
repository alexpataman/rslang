import { SORT_ORDER } from '../../types/common';

export const SortOrderArrow = <SORT_FIELD extends {}>(
  key: SORT_FIELD,
  sortField: SORT_FIELD,
  sortOrder: SORT_ORDER
) => {
  let str = '';

  if (key === sortField) {
    str = sortOrder === SORT_ORDER.ASC ? '↓' : '↑';
  }
  return <>{str}</>;
};

import React, { useContext, useState } from 'react';
import { store } from '../../store';
import { ActionTypes } from '../../store/reducer';

interface ISortingItem {
  type: SortingTypes;
  name: string;
}

const sortingMenu: ISortingItem[] = [
  { type: 'createdAt', name: '등록일 순' },
  { type: 'updatedAt', name: '수정일 순' },
  { type: 'complete', name: '완료' },
];

const getSortingTypeName = (type: SortingTypes): string => {
  const sorting = sortingMenu.find((item) => item.type === type);

  return sorting?.name || '';
};

const Sorting = () => {
  const { sortingType, dispatch } = useContext(store);
  const [open, setOpen] = useState<boolean>(false);

  const handleChangeType = (item: ISortingItem) => {
    if (item.type !== sortingType) {
      dispatch?.({ type: ActionTypes.CHANGE_SORTING_TYPE, payload: { sortingType: item.type } });
    }
    setOpen(false);
  };

  return (
    <div className={`dropdown mr-1 ${open ? 'show' : ''}`}>
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        onClick={() => setOpen(!open)}
      >
        {sortingType ? getSortingTypeName(sortingType) : '정렬 선택'}
      </button>
      <div className={`dropdown-menu ${open ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
        {sortingMenu.map((item) => (
          <button type="button" className="dropdown-item" key={item.type} onClick={() => handleChangeType(item)}>
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sorting;

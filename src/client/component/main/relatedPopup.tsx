import React, { useCallback, useContext, useMemo, useState } from 'react';
import { Check2Square, Square, XSquareFill } from 'react-bootstrap-icons';
import TodoApi from '../../api/todo';
import { DEFAULT_LIST_SIZE } from '../../constant';
import { store } from '../../store';
import { ActionTypes } from '../../store/reducer';
import PopupHelper from '../../utils/popupHelper';
import Loading from '../common/loading';
import Pagination from '../common/pagination';
import PopupContainer from '../common/popup/container';
import { IPopupOptions } from '../common/popup/manager';
import usePaging from './usePaging';

const TodoItem = ({
  data,
  isSelected,
  current,
  onDeselect,
  onSelect,
}: {
  data: ITodoItem;
  current: ITodoItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDeselect: (id: string) => void;
}) => {
  const icon = useMemo(() => {
    if (current._id === data._id || data.related.findIndex((related) => related._id === current._id) >= 0) {
      return <XSquareFill />;
    }

    if (isSelected) {
      return <Check2Square onClick={() => onDeselect(data._id)} />;
    }

    return <Square onClick={() => onSelect(data._id)} />;
  }, [current._id, data._id, data.related, isSelected, onDeselect, onSelect]);

  return (
    <p>
      {icon}
      <span className="pl-3 task mt-4">{data.content}</span>
    </p>
  );
};

const RelatedPopup = ({ current, onClose }: IPopupOptions & { current: ITodoItem }) => {
  const { totalCount, sortingType, data, dispatch } = useContext(store);
  const fetchData = useCallback(
    (pageNum = 0) => {
      TodoApi.getTodos(pageNum, DEFAULT_LIST_SIZE, sortingType).then((res) => {
        dispatch?.({
          type: ActionTypes.GET_TODO_LIST,
          payload: { data: res.list || [], page: res.page, totalCount: res.totalCount },
        });
      });
    },
    [sortingType, dispatch]
  );
  const { page, setPage } = usePaging({ data, fetchData });

  const [selected, setSelected] = useState<string[]>(current.related.map((item) => item._id));

  const handleComplete = () => {
    TodoApi.updateRelatedList(current._id, selected).then(() => {
      dispatch?.({ type: ActionTypes.UPDATE_RELATED_LIST, payload: { id: current._id, related: selected } });
    });
    if (onClose) {
      onClose();
    }
  };

  const handlePageChange = (pageNum: number) => {
    setPage(pageNum);
  };

  return (
    <PopupContainer onClose={onClose} title="연관 리스트 추가">
      {!data[page] ? (
        <Loading />
      ) : (
        data[page].map((item) => (
          <TodoItem
            key={item._id}
            current={current}
            isSelected={selected.includes(item._id)}
            data={item}
            onSelect={(id: string) => setSelected([...selected, id])}
            onDeselect={(id: string) => setSelected(selected.filter((itemId) => itemId !== id))}
          />
        ))
      )}
      <Pagination total={Math.ceil(totalCount / DEFAULT_LIST_SIZE)} current={page} onChange={handlePageChange} />
      <div>
        <button type="button" onClick={handleComplete}>
          완료
        </button>
      </div>
    </PopupContainer>
  );
};

const openRelatedPopup = (current: ITodoItem) =>
  PopupHelper.open((props: IPopupOptions) => <RelatedPopup onClose={props.onClose} current={current} />);

export default openRelatedPopup;

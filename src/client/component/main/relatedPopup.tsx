import React, { useContext, useMemo, useState } from 'react';
import { Check2Square, Square, XSquareFill } from 'react-bootstrap-icons';
import TodoApi from '../../api/todo';
import { ActionTypes, store } from '../../store';
import PopupHelper from '../../utils/popupHelper';
import Pagination from '../common/pagination';
import PopupContainer from '../common/popup/container';
import { IPopupOptions } from '../common/popup/manager';

const TodoItem = ({
  data,
  isSelected,
  isCurrent,
  onDeselect,
  onSelect,
}: {
  data: ITodoItem;
  isCurrent: boolean;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDeselect: (id: string) => void;
}) => {
  const icon = useMemo(() => {
    if (isCurrent) {
      return <XSquareFill />;
    }

    if (isSelected) {
      return <Check2Square onClick={() => onDeselect(data._id)} />;
    }

    return <Square onClick={() => onSelect(data._id)} />;
  }, [isCurrent, isSelected, onDeselect, data._id, onSelect]);

  return (
    <p>
      {icon}
      <span className="pl-3 task mt-4">{data.content}</span>
    </p>
  );
};

const RelatedPopup = ({ current, onClose }: IPopupOptions & { current: ITodoItem }) => {
  const [selected, setSelected] = useState<string[]>(current.related.map((item) => item._id));

  const { data: list, dispatch } = useContext(store);

  const handleComplete = () => {
    TodoApi.updateRelatedList(current._id, selected).then((res) => {
      if (res.status === 200) {
        dispatch?.({ type: ActionTypes.UPDATE_RELATED_LIST, payload: { id: current, related: selected } });
      }
    });
    if (onClose) {
      onClose();
    }
  };

  return (
    <PopupContainer onClose={onClose} title="연관 리스트 추가">
      {list.map((item) => (
        <TodoItem
          key={item._id}
          isCurrent={item._id === current._id}
          isSelected={selected.includes(item._id)}
          data={item}
          onSelect={(id: string) => setSelected([...selected, id])}
          onDeselect={(id: string) => setSelected(selected.filter((itemId) => itemId !== id))}
        />
      ))}
      <Pagination />
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

import { AxiosError } from 'axios';
/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect } from 'react';
import { Check2Square, PlusCircle, Square } from 'react-bootstrap-icons';
import TodoApi from '../../../api/todo';
import { ActionTypes, store } from '../../../store';
import { formatDate } from '../../../utils';
import Pagination from '../../common/pagination';
import openDialog from '../../common/popup/dialog';
import openRelatedPopup from '../relatedPopup';
import Plus from './plus';

interface ITodoItemProps {
  data: ITodoItem;
  onComplete: (id: string) => void;
  onUncomplete: (id: string) => void;
}

const TodoItem: React.FunctionComponent<ITodoItemProps> = ({ data, onComplete, onUncomplete }: ITodoItemProps) => {
  const handleComplete = () => {
    onComplete(data._id);
  };

  const handleUncomplete = () => {
    onUncomplete(data._id);
  };

  return (
    <div>
      <p>
        {data.isComplete ? <Check2Square onClick={handleUncomplete} /> : <Square onClick={handleComplete} />}
        <span className="pl-3 task mt-4">{data.content}</span>
        <span className="float-right">{formatDate(data.createdAt)}</span>
      </p>
      <p>
        연관 리스트:{' '}
        {data.related.map((item) => (
          <span className="mr-2" key={item._id}>
            {item.content}
          </span>
        ))}
        <PlusCircle className="mr-2" onClick={() => openRelatedPopup(data)} />
      </p>
    </div>
  );
};

const List: React.FunctionComponent = () => {
  const { data: list, dispatch } = useContext(store);

  useEffect(() => {
    TodoApi.getTodos().then((res) => {
      dispatch?.({ type: ActionTypes.GET_TODO_LIST, payload: { data: res.data || [] } });
    });
  }, [dispatch]);

  const handleAdd = (content: string) => {
    if (!content) {
      openDialog({ title: '', content: '내용을 입력해주세요' });
    } else {
      TodoApi.addTodo(content).then((res) => {
        dispatch?.({ type: ActionTypes.ADD_TODO, payload: { todo: res.data } });
      });
    }
  };

  const handleComplete = (id: string) => {
    TodoApi.completeTodo(id)
      .then(() => {
        dispatch?.({ type: ActionTypes.COMPLETE_TODO, payload: { id } });
      })
      .catch((e: AxiosError) => {
        openDialog({ content: e.response?.data || '', title: '' });
      });
  };

  const handleUnComplete = (id: string) => {
    TodoApi.uncompleteTodo(id).then(() => {
      dispatch?.({ type: ActionTypes.UNCOMPLETE_TODO, payload: { id } });
    });
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <Plus onAdd={handleAdd} key="plus" />
          {list.map((item) => (
            <TodoItem data={item} key={item._id} onComplete={handleComplete} onUncomplete={handleUnComplete} />
          ))}
        </div>
      </div>
      <div className="mt-3">
        <Pagination />
      </div>
    </>
  );
};

export default List;

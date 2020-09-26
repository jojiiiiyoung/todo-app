/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect, useState } from 'react';
import { Check2Square, Square } from 'react-bootstrap-icons';
import TodoApi from '../../../api/todo';
import { ActionTypes, store } from '../../../store';
import { formatDate } from '../../../utils';
import Pagination from './pagination';
import Plus from './plus';

interface ITodoItemProps {
  data: ITodoItem;
  onComplete: (id: string) => void;
  onUncomplete: (id: string) => void;
}

const TodoItem: React.FunctionComponent<ITodoItemProps> = ({
  data: { content, createdAt, ...data },
  onComplete,
  onUncomplete,
}: ITodoItemProps) => {
  const handleComplete = () => {
    onComplete(data._id);
  };

  const handleUncomplete = () => {
    onUncomplete(data._id);
  };

  return (
    <p>
      {data.isComplete ? <Check2Square onClick={handleUncomplete} /> : <Square onClick={handleComplete} />}
      <span className="pl-3 task mt-4">{content}</span>
      <span className="float-right">{formatDate(createdAt)}</span>
    </p>
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
    TodoApi.addTodo(content).then((res) => {
      dispatch?.({ type: ActionTypes.ADD_TODO, payload: { todo: res.data } });
    });
  };

  const handleComplete = (id: string) => {
    TodoApi.completeTodo(id).then((res) => {
      if (res.status === 200) {
        dispatch?.({ type: ActionTypes.COMPLETE_TODO, payload: { id } });
      }
    });
  };

  const handleUnComplete = (id: string) => {
    dispatch?.({ type: ActionTypes.UNCOMPLETE_TODO, payload: { id } });
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <Plus onAdd={handleAdd} />
          {list.map((item, index) => (
            <TodoItem data={item} key={index} onComplete={handleComplete} onUncomplete={handleUnComplete} />
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

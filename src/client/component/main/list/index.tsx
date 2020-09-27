import { AxiosError } from 'axios';
/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect } from 'react';

import TodoApi from '../../../api/todo';
import { ActionTypes, store } from '../../../store';

import Pagination from '../../common/pagination';
import openDialog from '../../common/popup/dialog';
import TodoItem from './item';
import Plus from './plus';

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

  const handleEdit = (id: string, content: string) => {
    TodoApi.updateContent(id, content).then(() => {
      dispatch?.({ type: ActionTypes.UPDATE_CONTENT, payload: { id, content } });
    });
  };

  const handleDelete = (id: string) => {
    TodoApi.deleteTodo(id).then(() => {
      dispatch?.({ type: ActionTypes.DELETE_TODO, payload: { id } });
    });
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <Plus onAdd={handleAdd} key="plus" />
          {list.map((item) => (
            <TodoItem
              data={item}
              key={item._id}
              onComplete={handleComplete}
              onUncomplete={handleUnComplete}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
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

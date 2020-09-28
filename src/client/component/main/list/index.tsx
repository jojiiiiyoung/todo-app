import { AxiosError } from 'axios';
import React, { useCallback, useContext } from 'react';

import TodoApi from '../../../api/todo';
import { DEFAULT_LIST_SIZE } from '../../../constant';
import { store } from '../../../store';
import { ActionTypes } from '../../../store/reducer';

import Pagination from '../../common/pagination';
import openDialog from '../../common/popup/dialog';
import usePaging from '../usePaging';
import TodoItem from './item';
import Plus from './plus';

const List: React.FunctionComponent = () => {
  const { totalCount, data, pages, sortingType, search, dispatch } = useContext(store);
  const fetchData = useCallback(
    (pageNum = 0) => {
      TodoApi.getTodos(pageNum, DEFAULT_LIST_SIZE, sortingType).then((res) => {
        dispatch?.({
          type: ActionTypes.GET_TODO_LIST,
          payload: { data: res.data.list || [], page: res.data.page, totalCount: res.data.totalCount },
        });
      });
    },
    [sortingType, dispatch]
  );

  const fetchSearchData = useCallback(
    (pageNum = 0) => {
      TodoApi.getSearch(pageNum, DEFAULT_LIST_SIZE, search?.query || '', sortingType).then((res) => {
        dispatch?.({
          type: ActionTypes.GET_SEARCH_DATA,
          payload: { data: res.data.list || [], page: res.data.page, totalCount: res.data.totalCount },
        });
      });
    },
    [sortingType, search, dispatch]
  );

  const { page, setPage, list } = usePaging(
    search && search.query
      ? { data: search.data, pages: search.pages, fetchData: fetchSearchData }
      : { data, pages, fetchData }
  );

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

  const handlePageChange = (pageNum: number) => {
    setPage(pageNum);
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <Plus onAdd={handleAdd} key="plus" disabled={!!search?.query} />
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
        <Pagination
          total={Math.ceil((search && search.query ? search.totalCount : totalCount) / DEFAULT_LIST_SIZE)}
          current={page}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default List;

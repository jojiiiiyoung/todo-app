import { useCallback, useContext, useEffect, useState } from 'react';
import TodoApi from '../../api/todo';
import { DEFAULT_LIST_SIZE } from '../../constant';
import { store } from '../../store';
import { ActionTypes } from '../../store/reducer';

const usePaging = () => {
  const [page, setPage] = useState<number>(0);
  const [list, setList] = useState<ITodoItemWithPage[]>([]);
  const { data, pages, sortingType, dispatch } = useContext(store);

  const fetchData = useCallback(
    (pageNum = 0) => {
      TodoApi.getTodos(pageNum, DEFAULT_LIST_SIZE, sortingType).then((res) => {
        dispatch?.({
          type: ActionTypes.GET_TODO_LIST,
          payload: { data: res.data.list || [], page: res.data.page, totalCount: res.data.totalCount },
        });
        setPage(res.data.list.length === 0 && pageNum > 0 ? pageNum - 1 : pageNum);
      });
    },
    [dispatch, sortingType]
  );

  const setCurrentList = useCallback(
    (pageNum: number) => {
      const firstIndex = data.findIndex((item) => item.page === pageNum);
      if (firstIndex >= 0) {
        setList(data.slice(firstIndex, firstIndex + DEFAULT_LIST_SIZE));
      } else {
        setList([]);
      }
    },
    [data]
  );

  useEffect(() => {
    if (pages.includes(page)) {
      setCurrentList(page);
    } else {
      fetchData(page);
    }
  }, [page, data, setCurrentList, pages, fetchData]);

  return { list, page, setPage };
};

export default usePaging;

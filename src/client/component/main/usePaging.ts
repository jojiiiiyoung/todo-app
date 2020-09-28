/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_LIST_SIZE } from '../../constant';

interface IProps {
  data: ITodoItemWithPage[];
  pages: number[];
  fetchData: (page: number) => void;
}

const usePaging = ({ data, pages, fetchData }: IProps) => {
  const [page, setPage] = useState<number>(0);
  const [list, setList] = useState<ITodoItemWithPage[]>([]);

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
    } else if (pages.length === 0 && page !== 0) {
      setPage(0);
    } else {
      fetchData(page);
    }
  }, [page, data, setCurrentList, pages, fetchData]);

  return { list, page, setPage };
};

export default usePaging;

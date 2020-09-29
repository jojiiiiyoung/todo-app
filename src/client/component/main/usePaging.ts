/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

interface IProps {
  data: { [key: number]: ITodoItem[] };
  fetchData: (page: number) => void;
}

const usePaging = ({ data, fetchData }: IProps) => {
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    if (Object.keys(data).length === 0 && page !== 0) {
      setPage(0);
    } else if (!data[page]) {
      fetchData(page);
    }
  }, [page, data, fetchData]);

  return { page, setPage };
};

export default usePaging;

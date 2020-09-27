import React, { useState, useCallback, useEffect } from 'react';

interface IProps {
  total: number;
  onChange: (page: number) => void;
  current: number | undefined;
}

const PAGES_SIZE = 5;
const TICK = 2;

const getPages = (current: number, total: number) => {
  const end = Math.min(PAGES_SIZE + Math.max(current - TICK, 0), total);
  let start = Math.max(end - PAGES_SIZE, 0);

  const pages = [];

  while (start < end) {
    pages.push(start);
    start += 1;
  }

  return pages;
};

interface IPageProps {
  page: number;
  isActive: boolean;
  onClick: (page: number) => void;
}

const Page = React.memo(({ onClick, isActive, page }: IPageProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick(page);
  };

  return (
    <li className={`page-item ${isActive ? 'active' : ''}`}>
      <button className="page-link" type="button" onClick={handleClick}>
        {page + 1}
      </button>
    </li>
  );
});

const Pagination = React.memo(({ total, onChange, current: originCurrent }: IProps) => {
  const [current, setCurrent] = useState<number>(originCurrent || 0);
  const [pages, setPages] = useState<number[]>(getPages(originCurrent || 0, total));

  const goToPage = useCallback(
    (next: number): void => {
      setCurrent(next);
      setPages(getPages(next, total));
      onChange(next);
    },
    [total, onChange]
  );

  useEffect(() => {
    setCurrent(originCurrent || 0);
    setPages(getPages(originCurrent || 0, total));
  }, [total, originCurrent]);

  return (
    <ul className="pagination justify-content-center">
      <li className="page-item">
        <button className="page-link" type="button" onClick={() => goToPage(current - 1)} disabled={current === 0}>
          Previous
        </button>
      </li>
      {pages.map((page: number) => {
        return <Page key={page} page={page} onClick={() => goToPage(page)} isActive={page === current} />;
      })}
      <li className="page-item">
        <button
          className="page-link"
          type="button"
          onClick={() => goToPage(current + 1)}
          disabled={current === total - 1}
        >
          Next
        </button>
      </li>
    </ul>
  );
});

export default Pagination;

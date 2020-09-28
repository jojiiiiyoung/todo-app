import React from 'react';
import { Search as SearchIcon } from 'react-bootstrap-icons';

const Search: React.FunctionComponent = () => {
  return (
    <div className="d-flex">
      <input type="text" className="flex-fill" placeholder="검색" />
      <button type="button" className="btn btn-outline-secondary align-middle h-100">
        <SearchIcon />
      </button>
    </div>
  );
};

export default Search;

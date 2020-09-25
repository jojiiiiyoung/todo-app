import React from 'react';
import { Search as SearchIcon } from 'react-bootstrap-icons';

const Search: React.FunctionComponent = () => (
  <div className="input-group mb-2">
    <input type="text" className="form-control pr-5" placeholder="검색" />
    <button type="button" className="rightside-input align-middle h-100">
      <SearchIcon />
    </button>
  </div>
);

export default Search;

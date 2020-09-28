import React, { useContext, useState } from 'react';
import { Search as SearchIcon, XCircle } from 'react-bootstrap-icons';
import { store } from '../../store';
import { ActionTypes } from '../../store/reducer';

const Search: React.FunctionComponent = () => {
  const { search, dispatch } = useContext(store);
  const [query, setQuery] = useState<string>(search?.query || '');

  const startSearch = () => {
    dispatch?.({ type: ActionTypes.START_SEARCH, payload: { query } });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      startSearch();
    }
  };

  const clearQuery = () => {
    setQuery('');
    dispatch?.({ type: ActionTypes.CLEAR_SEARCH_DATA });
  };

  return (
    <div className="d-flex">
      <div className="position-relative flex-fill">
        <input
          type="text"
          className="w-100 h-100 pl-2 pr-5"
          placeholder="검색"
          value={query}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        {query ? (
          <button type="button" className="rightside h-100" onClick={clearQuery}>
            <XCircle />
          </button>
        ) : null}
      </div>
      <button type="button" className="btn btn-outline-secondary align-middle h-100" onClick={startSearch}>
        <SearchIcon />
      </button>
    </div>
  );
};

export default Search;

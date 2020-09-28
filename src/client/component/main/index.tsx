import React from 'react';
import List from './list';
import Search from './search';
import Sorting from './sorting';

const Main: React.FunctionComponent = () => (
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-sm col-md-7">
        <div className="d-flex">
          <div className="flex-fill mr-2">
            <Search />
          </div>
          <Sorting />
        </div>
      </div>
    </div>
    <div className="row justify-content-center pt-3">
      <div className="col-sm col-md-7">
        <List />
      </div>
    </div>
  </div>
);

export default Main;

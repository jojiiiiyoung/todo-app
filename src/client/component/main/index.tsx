import React from 'react';
import List from './list';
import Search from './search';

const Main: React.FunctionComponent = () => (
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-sm col-md-6">
        <Search />
      </div>
    </div>
    <div className="row justify-content-center pt-3">
      <div className="col-sm col-md-6">
        <List />
      </div>
    </div>
  </div>
);

export default Main;

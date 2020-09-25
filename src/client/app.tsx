import React from 'react';

// components
import Main from './component/main';

// styles
import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FunctionComponent = () => {
  return (
    <div className="page">
      <Main />
    </div>
  );
};

export default App;

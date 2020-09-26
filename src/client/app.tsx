import React from 'react';

import { StateProvider } from './store';

// components
import Main from './component/main';

// styles
import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FunctionComponent = () => {
  return (
    <StateProvider>
      <div className="page">
        <Main />
      </div>
    </StateProvider>
  );
};

export default App;

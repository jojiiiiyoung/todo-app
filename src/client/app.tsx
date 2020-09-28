import React from 'react';

import { StateProvider } from './store';
import PopupHelper from './utils/popupHelper';

// components
import Main from './component/main';
import PopupManager from './component/common/popup/manager';

// styles
import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FunctionComponent = () => {
  return (
    <StateProvider>
      <PopupManager bind={PopupHelper.bind} />
      <div className="page" data-testid="mainContainer">
        <Main />
      </div>
    </StateProvider>
  );
};

export default App;

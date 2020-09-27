import React, { createContext, useReducer } from 'react';
import * as AppReducer from './reducer';

const store = createContext(AppReducer.INITIAL_STATE);
const { Provider } = store;

const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [appState, dispatch] = useReducer(AppReducer.reducer, AppReducer.INITIAL_STATE);

  return <Provider value={{ ...appState, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };

import React, { createContext, Dispatch, useReducer } from 'react';

interface IState {
  data: ITodoItem[];
  page: number;
  dispatch?: Dispatch<any>;
}

const initialState: IState = { data: [], page: 0 };
const store = createContext(initialState);
const { Provider } = store;

export enum ActionTypes {
  GET_TODO_LIST = 'GET_TODO_LIST',
  ADD_TODO = 'ADD_TODO',
  COMPLETE_TODO = 'COMPLETE_TODO',
  UNCOMPLETE_TODO = 'UNCOMPLETE_TODO',
}

const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer((originState: IState, action: { type: ActionTypes; payload: any }) => {
    switch (action.type) {
      case ActionTypes.GET_TODO_LIST:
        return {
          ...originState,
          data: originState.data.concat(action.payload.data),
        };
      case ActionTypes.ADD_TODO:
        return {
          ...originState,
          data: [action.payload.todo, ...originState.data],
        };
      case ActionTypes.COMPLETE_TODO: {
        const index = originState.data.findIndex((item) => item._id === action.payload.id);

        if (index >= 0) {
          return {
            ...originState,
            data: [
              ...originState.data.slice(0, index),
              { ...originState.data[index], isComplete: true },
              ...originState.data.slice(index + 1),
            ],
          };
        }

        return originState;
      }
      case ActionTypes.UNCOMPLETE_TODO: {
        const index = originState.data.findIndex((item) => item._id === action.payload.id);

        if (index >= 0) {
          return {
            ...originState,
            data: [
              ...originState.data.slice(0, index),
              { ...originState.data[index], isComplete: false },
              ...originState.data.slice(index + 1),
            ],
          };
        }

        return originState;
      }
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ ...state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };

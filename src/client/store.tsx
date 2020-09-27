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
  UPDATE_RELATED_LIST = 'UPDATE_RELATED_LIST',
  UPDATE_CONTENT = 'UPDATE_CONTENT',
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
          data: [...originState.data, action.payload.todo],
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
        return {
          ...originState,
          data: originState.data.map((item) => {
            if (item._id === action.payload.id || item.related?.find((elem) => elem._id === action.payload.id)) {
              return {
                ...item,
                isComplete: false,
              };
            }
            return item;
          }),
        };
      }
      case ActionTypes.UPDATE_RELATED_LIST: {
        const index = originState.data.findIndex((item) => item._id === action.payload.id);

        if (index >= 0) {
          return {
            ...originState,
            data: [
              ...originState.data.slice(0, index),
              {
                ...originState.data[index],
                related: originState.data.reduce((arr, item) => {
                  if (action.payload.related.includes(item._id)) {
                    arr.push({
                      ...item,
                      related: [],
                    });
                  }

                  return arr;
                }, [] as ITodoItem[]),
              },
              ...originState.data.slice(index + 1),
            ],
          };
        }

        return originState;
      }
      case ActionTypes.UPDATE_CONTENT: {
        const index = originState.data.findIndex((item) => item._id === action.payload.id);

        if (index >= 0) {
          return {
            ...originState,
            data: [
              ...originState.data.slice(0, index),
              {
                ...originState.data[index],
                content: action.payload.content,
              },
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

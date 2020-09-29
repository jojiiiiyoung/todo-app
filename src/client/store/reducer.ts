import { Dispatch } from 'react';
import { DEFAULT_LIST_SIZE } from '../constant';

interface IState {
  data: { [key: number]: ITodoItem[] };
  totalCount: number;
  sortingType?: SortingTypes;
  dispatch?: Dispatch<any>;
  search?: {
    query: string;
    data: { [key: number]: ITodoItem[] };
    totalCount: number;
  };
}

export const INITIAL_STATE: IState = { data: {}, totalCount: 0 };

export enum ActionTypes {
  GET_TODO_LIST = 'GET_TODO_LIST',
  ADD_TODO = 'ADD_TODO',
  COMPLETE_TODO = 'COMPLETE_TODO',
  UNCOMPLETE_TODO = 'UNCOMPLETE_TODO',
  UPDATE_RELATED_LIST = 'UPDATE_RELATED_LIST',
  UPDATE_CONTENT = 'UPDATE_CONTENT',
  DELETE_TODO = 'DELETE_TODO',
  CHANGE_SORTING_TYPE = 'CHANGE_SORTING_TYPE',
  GET_SEARCH_DATA = 'GET_SEARCH_DATA',
  CLEAR_SEARCH_DATA = 'CLEAR_SEARCH_DATA',
  START_SEARCH = 'START_SEARCH',
}

const getTodoIndex = (list: { [key: number]: ITodoItem[] }, id: string) => {
  const initial: { page: number; index: number } = { page: -1, index: -1 };
  return Object.keys(list).reduce((obj, key: string) => {
    const numberKey = Number(key);
    const index = list[numberKey].findIndex((item) => item._id === id);
    if (index >= 0) {
      return { page: numberKey, index };
    }
    return obj;
  }, initial);
};

export const reducer = (state: IState, action: { type: ActionTypes; payload: any }): IState => {
  switch (action.type) {
    case ActionTypes.GET_TODO_LIST: {
      const { page, data, totalCount } = action.payload;

      return {
        ...state,
        totalCount,
        data: {
          ...state.data,
          [page]: data,
        },
      };
    }
    case ActionTypes.ADD_TODO: {
      const lastPage = Math.floor(state.totalCount / DEFAULT_LIST_SIZE);
      if (
        (!state.sortingType || state.sortingType === 'complete') &&
        state.data[lastPage] &&
        state.data[lastPage].length < DEFAULT_LIST_SIZE
      ) {
        return {
          ...state,
          totalCount: state.totalCount + 1,
          data: {
            ...state.data,
            [lastPage]: [...(state.data[lastPage] || []), action.payload.todo],
          },
        };
      }

      if (state.sortingType === 'createdAt' || state.sortingType === 'updatedAt') {
        return {
          ...state,
          data: {},
          totalCount: 0,
        };
      }

      return {
        ...state,
        totalCount: state.totalCount + 1,
      };
    }
    case ActionTypes.COMPLETE_TODO: {
      const { page, index } = getTodoIndex(state.data, action.payload.id);

      if (index >= 0 && page >= 0) {
        return {
          ...state,
          data: {
            ...state.data,
            [page]: [
              ...state.data[page].slice(0, index),
              { ...state.data[page][index], isComplete: true },
              ...state.data[page].slice(index + 1),
            ],
          },
        };
      }

      return state;
    }
    case ActionTypes.UNCOMPLETE_TODO: {
      const { page, index } = getTodoIndex(state.data, action.payload.id);

      if (index >= 0 && page >= 0) {
        return {
          ...state,
          data: {
            ...state.data,
            [page]: [
              ...state.data[page].slice(0, index),
              { ...state.data[page][index], isComplete: false },
              ...state.data[page].slice(index + 1),
            ],
          },
        };
      }

      return state;
    }
    case ActionTypes.UPDATE_RELATED_LIST: {
      const { page, index } = getTodoIndex(state.data, action.payload.id);

      if (index >= 0 && page >= 0) {
        return {
          ...state,
          data: {
            ...state.data,
            [page]: [
              ...state.data[page].slice(0, index),
              {
                ...state.data[page][index],
                related: action.payload.related.reduce((arr: ITodoItem[], id: string) => {
                  const indices = getTodoIndex(state.data, id);
                  if (indices.page >= 0 && indices.index >= 0) {
                    const item = state.data[indices.page][indices.index];

                    arr.push({
                      ...item,
                      related: [],
                    });
                  }

                  return arr;
                }, [] as ITodoItem[]),
              },
              ...state.data[page].slice(index + 1),
            ],
          },
        };
      }

      return state;
    }
    case ActionTypes.UPDATE_CONTENT: {
      const { page, index } = getTodoIndex(state.data, action.payload.id);

      if (index >= 0 && page >= 0) {
        return {
          ...state,
          data: {
            ...state.data,
            [page]: [
              ...state.data[page].slice(0, index),
              { ...state.data[page][index], content: action.payload.content },
              ...state.data[page].slice(index + 1),
            ],
          },
        };
      }

      return state;
    }
    case ActionTypes.DELETE_TODO: {
      const { page } = getTodoIndex(state.data, action.payload.id);

      if (page >= 0) {
        const data = Object.keys(state.data).reduce((obj, key) => {
          const numberKey = Number(key);

          if (numberKey < page) {
            // eslint-disable-next-line no-param-reassign
            obj[numberKey] = state.data[numberKey];
          }

          return obj;
        }, {} as { [key: number]: ITodoItem[] });
        return {
          ...state,
          data,
        };
      }
      return state;
    }
    case ActionTypes.CHANGE_SORTING_TYPE: {
      if (state.sortingType !== action.payload.sortingType) {
        return {
          ...INITIAL_STATE,
          search: state.search ? { query: state.search.query, data: {}, totalCount: 0 } : undefined,
          sortingType: action.payload.sortingType,
        };
      }
      return state;
    }
    case ActionTypes.START_SEARCH: {
      return {
        ...state,
        search: {
          query: action.payload.query,
          data: {},
          totalCount: 0,
        },
      };
    }
    case ActionTypes.GET_SEARCH_DATA: {
      const { page, data, totalCount } = action.payload;

      return {
        ...state,
        search: {
          ...state.search,
          query: state.search?.query || '',
          data: {
            ...state.data,
            [page]: data,
          },
          totalCount,
        },
      };
    }
    case ActionTypes.CLEAR_SEARCH_DATA: {
      return {
        ...state,
        search: undefined,
      };
    }
    default:
      throw new Error();
  }
};

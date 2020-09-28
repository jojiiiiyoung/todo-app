import { Dispatch } from 'react';
import { DEFAULT_LIST_SIZE } from '../constant';
import { sortByAscending } from '../utils';

interface IState {
  data: ITodoItemWithPage[];
  totalCount: number;
  pages: number[];
  sortingType?: SortingTypes;
  dispatch?: Dispatch<any>;
}

export const INITIAL_STATE: IState = { data: [], pages: [], totalCount: 0 };

export enum ActionTypes {
  GET_TODO_LIST = 'GET_TODO_LIST',
  ADD_TODO = 'ADD_TODO',
  COMPLETE_TODO = 'COMPLETE_TODO',
  UNCOMPLETE_TODO = 'UNCOMPLETE_TODO',
  UPDATE_RELATED_LIST = 'UPDATE_RELATED_LIST',
  UPDATE_CONTENT = 'UPDATE_CONTENT',
  DELETE_TODO = 'DELETE_TODO',
  CHANGE_SORTING_TYPE = 'CHANGE_SORTING_TYPE',
}

export const reducer = (state: IState, action: { type: ActionTypes; payload: any }) => {
  switch (action.type) {
    case ActionTypes.GET_TODO_LIST: {
      const { page, data, totalCount } = action.payload;

      const greaterPage = state.pages.find((num) => num > page);
      let nextIndex = state.data.length;

      if (greaterPage) {
        nextIndex = state.data.findIndex((item) => item.page === greaterPage);
      }

      return {
        ...state,
        totalCount,
        pages: state.pages.concat([action.payload.page]).sort(sortByAscending),
        data:
          state.data.length === 0
            ? data.map((item: ITodoItem) => ({ ...item, page }))
            : [
                ...state.data.slice(0, nextIndex >= 0 ? nextIndex : 0),
                ...data.map((item: ITodoItem) => ({ ...item, page })),
                ...state.data.slice(nextIndex, state.data.length),
              ],
      };
    }
    case ActionTypes.ADD_TODO: {
      const lastPage = Math.floor(state.totalCount / DEFAULT_LIST_SIZE);
      if (
        (!state.sortingType || state.sortingType === 'complete') &&
        state.pages.includes(lastPage) &&
        (state.totalCount === 0 || lastPage * DEFAULT_LIST_SIZE < state.totalCount)
      ) {
        return {
          ...state,
          totalCount: state.totalCount + 1,
          data: [
            ...state.data,
            {
              ...action.payload.todo,
              page: lastPage,
            },
          ],
        };
      }

      if (state.sortingType === 'createdAt' || state.sortingType === 'updatedAt') {
        return {
          ...state,
          data: [],
          pages: [],
          totalCount: 0,
        };
      }

      return {
        ...state,
        totalCount: state.totalCount + 1,
      };
    }
    case ActionTypes.COMPLETE_TODO: {
      const index = state.data.findIndex((item) => item._id === action.payload.id);

      if (index >= 0) {
        return {
          ...state,
          data: [
            ...state.data.slice(0, index),
            { ...state.data[index], isComplete: true },
            ...state.data.slice(index + 1),
          ],
        };
      }

      return state;
    }
    case ActionTypes.UNCOMPLETE_TODO: {
      return {
        ...state,
        data: state.data.map((item) => {
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
      const index = state.data.findIndex((item) => item._id === action.payload.id);

      if (index >= 0) {
        return {
          ...state,
          data: [
            ...state.data.slice(0, index),
            {
              ...state.data[index],
              related: state.data.reduce((arr, item) => {
                if (action.payload.related.includes(item._id)) {
                  arr.push({
                    ...item,
                    related: [],
                  });
                }

                return arr;
              }, [] as ITodoItem[]),
            },
            ...state.data.slice(index + 1),
          ],
        };
      }

      return state;
    }
    case ActionTypes.UPDATE_CONTENT: {
      const index = state.data.findIndex((item) => item._id === action.payload.id);

      if (index >= 0) {
        return {
          ...state,
          data: [
            ...state.data.slice(0, index),
            {
              ...state.data[index],
              content: action.payload.content,
            },
            ...state.data.slice(index + 1),
          ],
        };
      }

      return state;
    }
    case ActionTypes.DELETE_TODO: {
      const elem = state.data.find((item) => item._id === action.payload.id);

      if (elem) {
        const { page } = elem;
        const firstIndex = state.data.findIndex((item) => item.page === page);
        return {
          ...state,
          data: state.data.slice(0, firstIndex),
          pages: state.pages.filter((num) => num < page),
        };
      }
      return state;
    }
    case ActionTypes.CHANGE_SORTING_TYPE: {
      if (state.sortingType !== action.payload.sortingType) {
        return {
          ...INITIAL_STATE,
          sortingType: action.payload.sortingType,
        };
      }
      return state;
    }
    default:
      throw new Error();
  }
};

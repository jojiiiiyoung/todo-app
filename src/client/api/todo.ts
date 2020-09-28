import { AxiosPromise } from 'axios';
import Api from '.';
import { DEFAULT_LIST_SIZE } from '../constant';

export default class TodoApi extends Api {
  public static addTodo(content: string): AxiosPromise<ITodoItem> {
    return Api.post('/todos', { content });
  }

  public static getTodos(
    page: number,
    size: number = DEFAULT_LIST_SIZE,
    sortingType?: SortingTypes
  ): AxiosPromise<{ list: ITodoItem[]; totalCount: number; page: number }> {
    return Api.get(
      `/todos?${new URLSearchParams({
        page: `${page}`,
        size: `${size}`,
        ...(sortingType ? { sortingType } : {}),
      }).toString()}`
    );
  }

  public static completeTodo(id: string): AxiosPromise<undefined> {
    return Api.patch(`/todos/${id}`, { isComplete: true });
  }

  public static uncompleteTodo(id: string): AxiosPromise<undefined> {
    return Api.patch(`/todos/${id}`, { isComplete: false });
  }

  public static updateRelatedList(id: string, related: string[]): AxiosPromise<undefined> {
    return Api.patch(`/todos/${id}`, { related });
  }

  public static updateContent(id: string, content: string): AxiosPromise<undefined> {
    return Api.patch(`/todos/${id}`, { content });
  }

  public static deleteTodo(id: string): AxiosPromise<undefined> {
    return Api.delete(`/todos/${id}`);
  }
}

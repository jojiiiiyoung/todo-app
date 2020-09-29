import Api from '.';
import { DEFAULT_LIST_SIZE } from '../constant';

export default class TodoApi extends Api {
  public static addTodo(content: string): Promise<ITodoItem> {
    return Api.post('/todos', { content }).then((res) => res.data);
  }

  public static getTodos(
    page: number,
    size: number = DEFAULT_LIST_SIZE,
    sortingType?: SortingTypes
  ): Promise<{ list: ITodoItem[]; totalCount: number; page: number }> {
    return Api.get(
      `/todos?${new URLSearchParams({
        page: `${page}`,
        size: `${size}`,
        ...(sortingType ? { sortingType } : {}),
      }).toString()}`
    ).then((res) => res.data);
  }

  public static getSearch(
    page: number,
    size: number = DEFAULT_LIST_SIZE,
    query: string,
    sortingType?: SortingTypes
  ): Promise<{ list: ITodoItem[]; totalCount: number; page: number }> {
    return Api.get(
      `/todos/search?${new URLSearchParams({
        page: `${page}`,
        size: `${size}`,
        query,
        ...(sortingType ? { sortingType } : {}),
      }).toString()}`
    ).then((res) => res.data);
  }

  public static completeTodo(id: string): Promise<undefined> {
    return Api.patch(`/todos/${id}`, { isComplete: true }).then((res) => res.data);
  }

  public static uncompleteTodo(id: string): Promise<undefined> {
    return Api.patch(`/todos/${id}`, { isComplete: false }).then((res) => res.data);
  }

  public static updateRelatedList(id: string, related: string[]): Promise<undefined> {
    return Api.patch(`/todos/${id}`, { related }).then((res) => res.data);
  }

  public static updateContent(id: string, content: string): Promise<undefined> {
    return Api.patch(`/todos/${id}`, { content }).then((res) => res.data);
  }

  public static deleteTodo(id: string): Promise<undefined> {
    return Api.delete(`/todos/${id}`).then((res) => res.data);
  }
}

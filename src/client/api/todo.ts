import { AxiosPromise } from 'axios';
import Api from '.';

export default class TodoApi extends Api {
  public static addTodo(content: string): AxiosPromise<ITodoItem> {
    return Api.post('/todos', { content });
  }

  public static getTodos(): AxiosPromise<ITodoItem[]> {
    return Api.get('/todos');
  }

  public static completeTodo(id: string): AxiosPromise<undefined> {
    return Api.patch(`/todos/${id}`, { isComplete: true });
  }
}

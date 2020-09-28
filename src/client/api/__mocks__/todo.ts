const TODO_LIST = [
  {
    _id: '1',
    content: 'test1',
    isComplete: false,
    related: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: '2',
    content: 'test2',
    isComplete: false,
    related: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: '3',
    content: 'test3',
    isComplete: false,
    related: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

export default class TodoApi {
  public static async getTodos(page: number) {
    if (page === -1) {
      throw new Error('FAKE_ERROR');
    }

    return TODO_LIST;
  }

  public static async getSearch(page: number) {
    if (page === -1) {
      throw new Error('FAKE_ERROR');
    }

    return TODO_LIST;
  }

  public static async completeTodo(id: string) {
    if (id === 'FAIL') {
      throw new Error('FAKE_ERROR');
    }
  }

  public static async uncompleteTodo(id: string) {
    if (id === 'FAIL') {
      throw new Error('FAKE_ERROR');
    }
  }

  public static async updateRelatedList(id: string) {
    if (id === 'FAIL') {
      throw new Error('FAKE_ERROR');
    }
  }

  public static async updateContent(id: string) {
    if (id === 'FAIL') {
      throw new Error('FAKE_ERROR');
    }
  }

  public static async deleteTodo(id: string) {
    if (id === 'FAIL') {
      throw new Error('FAKE_ERROR');
    }
  }
}
